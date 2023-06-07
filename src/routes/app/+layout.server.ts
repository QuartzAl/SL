import { auth } from "$lib/server/lucia";
import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";


export const _actions: Actions = {
	default: async ({ locals }) => {
		console.log("test");
		const { session } = await locals.auth.validateUser();
		
		if (!session) return fail(401);
		
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, "/login");
	}
};