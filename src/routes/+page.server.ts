import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";
import { PrismaClient } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const items = await new PrismaClient().item.findMany();
	if (!user) throw redirect(302, "/login");
	return {
		user,
		items
	};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { session } = await locals.auth.validateUser();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
	}
};