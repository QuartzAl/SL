import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	id: z.number().min(1).optional(),
	name: z.string().min(1, {
		message: "Nama barang wajib diisi"
	}).max(50),
	description: z.string().max(250),
	amount: z.number().min(1, {
		message: "Jumlah barang paling tidak terdapat 1"
	}).max(1000000),
	conditionid: z.number().min(1, {
		message: "barang wajib memliki kondisi"
	}).max(1000000),
	categoryid: z.number().min(1, {
		message: "barang wajib memliki kategori"
	}).max(1000000),
	entryDate: z.date({
		required_error: "Tanggal masuk wajib diisi",
	}),
});

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, "/login");
	let item = null;
	if (params.id) {
		item = await prisma.item.findUnique({
			where: {
				id: Number(params.id)
			},
			include: {
				condition: true,
				category: true
			}
		});
	}

	if(params.id && item === null) {throw error(404, "Barang tidak ditemukan");}
	else if (item !== null) {item.entryDate = item.entryDate.toISOString().split("T")[0];}
	
	const categories = await prisma.category.findMany();
	const conditions = await prisma.condition.findMany();
	const form = await superValidate(item, schema);
	return {
		categories: categories,
		conditions: conditions,
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

		if (form.data.id !== undefined) {
			await prisma.item.update({
				where: {
					id: form.data.id
				},
				data: {
					name: form.data.name,
					description: form.data.description,
					amount: form.data.amount,
					condition: {
						connect: {
							id: form.data.conditionid,
						}
					},
					category: {
						connect: {
							id: form.data.categoryid,
						}
					},
					entryDate: form.data.entryDate,
				}
			});
		} else {
			await prisma.item.create({
				data: {
					name: form.data.name,
					description: form.data.description,
					amount: form.data.amount,
					condition: {
						connect: {
							id: form.data.conditionid,
						}
					},
					category: {
						connect: {
							id: form.data.categoryid,
						}
					},
					entryDate: form.data.entryDate,
				}
			});
		}
		

		throw redirect(302, "/app");
	}

};