

import { auth } from "$lib/server/lucia";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";


export const actions: Actions = {
	default: async ({ locals }) => {
		const { session } = await locals.auth.validateUser();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
	}
};