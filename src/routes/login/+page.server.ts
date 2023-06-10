import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from 'zod';

const schema = z.object({
	username: z.string({
		required_error: "Username wajib diisi"
	}),
	password: z.string({
		required_error: "Kata sandi wajib diisi"
	})
});


// If the user exists, redirect authenticated users to the profile page.
export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, "/");
	const form = superValidate(schema);
	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		// check for empty values
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const key = await auth.useKey("username", form.data.username, form.data.password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
			
		} catch (error) {
			// invalid username/password
			console.error(error);
			return setError(form, "username", "username/kata sandi salah");
		}
		throw redirect(302, "/");
	}
};