import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { setError, superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	id: z.number(),
    returnDate: z.date({
		required_error: "Tanggal pengembalian wajib diisi"
	})

});

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
	let borrow = null;
	if (params.id) {
		borrow = await prisma.borrow.findUnique({
			where: {
				id: Number(params.id)
			},
			include: {
				item: true
			}
		});
	}

	if(params.id && borrow === null) {throw error(404, "Peminjaman barang tidak ditemukan");}
	
	const items = await prisma.item.findMany();
	const form = await superValidate(borrow, schema);
	return {
		form: form
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			console.log(form);
			return fail(400, { form });
		}


		
        await prisma.borrow.update({
            where: {
                id: form.data.id
            },
            data: {
                returnDate: form.data.returnDate,
            }
        });
		
		
		throw redirect(302, "/app/borrow");
	}

};