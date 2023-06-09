import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { auth } from "$lib/server/lucia";
import { prisma } from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const items = await prisma.item.findMany(
		{
		include: {
			condition: {
				select: {
					name: true
				}
			},
			category: {
				select: {
					name: true
				}
			},
		}
	});
	const borrowedItems = await prisma.borrow.groupBy({
		by: ["itemId"],
		where: {
			returnDate: null
		},
		_sum: {
			amount: true
		}
	});
	if (!user) throw redirect(302, "/login");
	return {
		items,
		borrowedItems
	};
};

export const actions: Actions = {
	signout: async ({ locals }) => {
		const { session } = await locals.auth.validateUser();
		if (!session) return fail(401);
		
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, "/login");
	},
	delete: async ({ locals, request }) => {
		const { user } = await locals.auth.validateUser();
		if (!user) return fail(401);
		const form = await request.formData();
		const id = form.get("id");
		await prisma.item.delete({
			where: {
				id: Number(id)
			}
		});
		throw redirect(302, "/app");
	}
};