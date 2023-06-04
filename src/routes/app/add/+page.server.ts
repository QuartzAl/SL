import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	name: z.string().min(1).max(50),
	description: z.string().min(1).max(250),
	amount: z.number().min(1).max(1000000),
	conditionId: z.number().min(1).max(1000000),
	categoryId: z.number().min(1).max(1000000),
	entryDate: z.date(),
});

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.auth.validateUser();
	if (!session) throw redirect(302, "/login");
    const categories = await prisma.category.findMany(); 
	const conditions = await prisma.condition.findMany();
	const form = await superValidate(schema);
	return {
		categories: categories,
		conditions: conditions,
		form: form
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);
		console.log("post", form);

		if (!form.valid) {
			console.log(form);
			return fail(400, { form });
		}

		
		await prisma.item.create({
			data: {
				name: form.data.name,
				description: form.data.description,
				amount: form.data.amount,
				condition: {
					connect: {
						id: form.data.conditionId,
					}
				},
				category: {
					connect: {
						id: form.data.categoryId,
					}
				},
				entryDate: form.data.entryDate,
			}});

		throw redirect(302, "/app");
	}
	
};