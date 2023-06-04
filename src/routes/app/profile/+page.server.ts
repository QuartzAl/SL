import type { PageServerLoad, Actions } from "./$types";
import { PrismaClient } from "@prisma/client";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
	return {
		user: user,
	};
}
