import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";


const schema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().max(150),
});

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) throw redirect(302, "/login");
    const form = superValidate(schema);
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

        await prisma.category.create(
            { data: { name: form.data.name, description: form.data.description } }
        );

        throw redirect(302, "/app/categories");
        

    }
};