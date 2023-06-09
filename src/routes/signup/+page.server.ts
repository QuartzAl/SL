import { error, fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from 'zod';

const schema = z.object({
	username: z.string({
		required_error: "Username is required"
	})
	.min(3, { message: "Username must be more than 3 characters" })
	.max(50, { message: "Username cannot be more than 50 characters" }),
	password: z.string({
		required_error: "Password is required"
	}).min(8, { message: "Password must be more than 8 characters" })
	.max(100, { message: "Password cannot be more than 100 characters" }),
	email: z.string().email().optional()
});

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	if (user) throw redirect(302, "/app");
	const form = superValidate(schema);
	return {
		form
	};
};


export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: "username",
					providerUserId: form.data.username,
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					email: form.data.email ? form.data.email : null
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);

		} catch (error) {
			// username taken
			console.error(error);
			return setError(form, "username", "Username is taken");
		}
		throw redirect(302, "/login");
	}

};