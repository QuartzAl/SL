import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { prisma } from "$lib/server/prisma";


export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const categories = await prisma.category.findMany();
	if (!user) throw redirect(302, "/login");
	return {
		categories: categories,
	};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const id = form.get("id");
        await prisma.category.delete(
            { where: { id: Number(id) } }
        )
        throw redirect(302, "/app/categories");
    }
};