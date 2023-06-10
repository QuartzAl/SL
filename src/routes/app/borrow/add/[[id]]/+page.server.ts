import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	id: z.number().optional(),
	borrowerName: z
		.string({
			required_error: 'Nama Peminjam wajib diisi'
		})
		.max(50),
	borrowerPhone: z
		.string({
			required_error: 'Nomor Telepon wajib diisi'
		})
		.max(50),
	borrowerEmail: z.string().max(50).optional(),
	itemId: z.number({
		required_error: 'Harus terdapat barang yang dipinjam'
	}),
	borrowDate: z.date(),
	amount: z.number().min(1, {
		message: 'Jumlah barang yang dipinjam paling tidak 1'
	})
});

export const load: PageServerLoad = async ({ locals, params }) => {
	const { user } = await locals.auth.validateUser();
	if (!user) throw redirect(302, '/login');
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

	if (params.id && borrow === null) {
		throw error(404, 'borrow item not found');
	} else if (borrow !== null) {
		borrow.borrowDate = borrow.borrowDate.toISOString().split('T')[0];
	}

	const items = await prisma.item.findMany();
	const form = await superValidate(borrow, schema);
	return {
		items: items,
		form: form
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		if (!form.valid) {
			console.log(form);
			return fail(400, { form });
		}
		const item = await prisma.item.findUnique({
			where: { id: form.data.itemId }
		});
		let borrowedItems = [];
		if (form.data.id === undefined) {
			borrowedItems = await prisma.borrow.findMany({
				where: {
					returnDate: null
				}
			});
		} else {
			borrowedItems = await prisma.borrow.findMany({
				where: {
					id: { not: form.data.id },
					returnDate: null
				}
			});
		}

		let totalBorrowed = 0;
		borrowedItems.forEach((borrowedItem: any) => {
			totalBorrowed += borrowedItem.amount;
		});
		const itemAvailable = item.amount - totalBorrowed;
		if (itemAvailable < form.data.amount) {
			return setError(
				form,
				'amount',
				'Jumlah barang yang dipinjam lebih banyak daripada jumlah barang tersedia untuk barang:' +
					item.name +
					' dengan jumlah tersedia: ' +
					itemAvailable
			);
		}

		if (form.data.id !== undefined) {
			await prisma.borrow.update({
				where: {
					id: form.data.id
				},
				data: {
					borrowerName: form.data.borrowerName,
					borrowerPhone: form.data.borrowerPhone,
					borrowerEmail: form.data.borrowerEmail,
					borrowDate: form.data.borrowDate,
					returnDate: null,
					amount: form.data.amount,
					item: {
						connect: {
							id: form.data.itemId
						}
					}
				}
			});
		} else {
			await prisma.borrow.create({
				data: {
					borrowerName: form.data.borrowerName,
					borrowerPhone: form.data.borrowerPhone,
					borrowerEmail: form.data.borrowerEmail,
					borrowDate: form.data.borrowDate,
					returnDate: null,
					amount: form.data.amount,
					item: {
						connect: {
							id: form.data.itemId
						}
					}
				}
			});
		}

		throw redirect(302, '/app/borrow');
	}
};
