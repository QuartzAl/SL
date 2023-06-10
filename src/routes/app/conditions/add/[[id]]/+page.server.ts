import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";


const schema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, {
        message: "Nama kondisi wajib diisi"
    }).max(50),
    description: z.string().max(150),
});

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/login");
    let condition = {};
    if (params.id){
        condition = await prisma.condition.findUnique({
            where: {
                id: Number(params.id)
            }
        });
    }
    if (params.id !== undefined && condition === null) {throw error(404, "kondisi tidak ditemukan");}
    const form = superValidate(condition, schema);
    return{
        form
    };
}

export const actions: Actions = {

    default: async ({ request, locals }) => {
        const form = await superValidate(request, schema);
        console.log("post", form);

        if (!form.valid){
            return fail(400, { form });
        }

        if (form.data.id !== undefined) {
            await prisma.condition.update({
                where: {
                    id: form.data.id
                },
                data: {
                    name: form.data.name,
                    description: form.data.description
                }
            });
        } else {
            await prisma.condition.create(
                { data: { name: form.data.name, description: form.data.description } }
            );
        }

        throw redirect(302, "/app/conditions");
    }
};