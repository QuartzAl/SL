import { error, fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get("username");
		const password = form.get("password");

		// check for empty values
		if (typeof username !== "string" || typeof password !== "string") {
			return fail(400);
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: "username",
					providerUserId: username,
					password: password
				},
				attributes: {
					username: username,
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
			throw redirect(302, "/");
		} catch (error) {
			// username taken
			console.error(error);
			return fail(400);
		}
	}
};