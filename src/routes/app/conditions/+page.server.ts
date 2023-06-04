import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";


export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const conditions = await prisma.condition.findMany();
	if (!user) throw redirect(302, "/login");
	return {
		conditions: conditions,
	};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const id = form.get("id");
        await prisma.condition.delete(
            { where: { id: Number(id) } }
        )
        throw redirect(302, "/app/conditions");
    }
};