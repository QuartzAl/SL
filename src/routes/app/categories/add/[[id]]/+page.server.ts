import { redirect, type Actions, fail, error } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";


const schema = z.object({
    id: z.number().min(1).optional(),
    name: z.string().min(1, {
        message: "Nama kategori wajib diisi"
    }).max(50),
    description: z.string().max(150),
});

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/login");
    let category = {};
    if (params.id !== undefined) {
        category = await prisma.category.findUnique({
            where: {
                id: Number(params.id)
            }
        });
        if(category === null) {throw error(404, "kategori tidak ditemukan");}
    }

    const form = superValidate(category, schema);
    return{
        form: form
    };
}

export const actions: Actions = {

    default: async ({ request, locals }) => {
        const form = await superValidate(request, schema);
        console.log("post", form);

        if (!form.valid){
            return fail(400, { form });
        }
        console.log(form.data);

        if (form.data.id !== undefined) {
            await prisma.category.update({
                where: {
                    id: form.data.id
                },
                data: {
                    name: form.data.name,
                    description: form.data.description
                }
            });
        } else {
            await prisma.category.create(
                { data: { name: form.data.name, description: form.data.description } }
            );
        }
        throw redirect(302, "/app/categories");
        

    }
};