import { error, fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { z } from 'zod';

const schema = z.object({
	username: z.string({
		required_error: "Username wajib diisi"
	})
	.min(3, { message: "Username harus lebih dari 3 karakter" })
	.max(50, { message: "Username tidak belok lebih dari 50 karakter" }),
	password: z.string({
		required_error: "Kata sandi wajib diisi"
	}).min(8, { message: "Kata sandi harus lebih dari 8 karakter" })
	.max(100, { message: "Kata sandi tidak boleh lebih dari 100 karakter" }),
	passwordConfirm: z.string({
		required_error: "Konfirmasi kata sandi wajib diisi"
	}).min(8, { message: "Konfirmasi kata sandi harus lebih dari 8 karakter" })
	.max(100, { message: "Konfirmasi kata sandi tidak boleh lebih dari 100 karakter" }),

	signPassword: z.string({
		required_error: "Pin masuk wajib diisi"
	}),
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

		if (form.data.password !== form.data.passwordConfirm) {
			return setError(form, "passwordConfirm", "Kata sandi tidak sama dengan konfirmasi kata sandi");
		}

		if (form.data.signPassword !== process.env.SIGNUP_PIN) {
			return setError(form, "signPassword", "Pin pendaftaran salah");
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
			return setError(form, "username", "Username telah diambil");
		}
		throw redirect(302, "/login");
	}

};