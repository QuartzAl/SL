import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const borrows = await prisma.borrow.findMany(
		{
			include:{
				item: true
			}
		}
	);
	if (!user) throw redirect(302, "/login");
	return {
		borrows
	};
};

export const actions: Actions = {
	delete: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) return fail(401);
		const form = await request.formData();
		const id = form.get("id");
		await prisma.borrow.delete({
			where: {
				id: Number(id)
			}
		});
		throw redirect(302, "/app/borrow");
	}
};