import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { prisma } from "$lib/server/prisma";
import { superValidate, setError } from "sveltekit-superforms/server";
import type { item } from "@prisma/client";
import { Schema, z } from "zod";

const formSchema = z.object({
    id: z.number().nonnegative(),
});



export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    const categories = await prisma.category.findMany();
    if (!user) throw redirect(302, "/login");
    const form = superValidate(formSchema);
    return {
        form,
        categories: categories,
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, formSchema);
        const relationCount = await prisma.category.findUnique({
            where: { id: form.data.id },
            include: {
                _count: {
                    select: { item: true }
                }
            }
        })
        if (relationCount._count.item > 0) {
            const categoryItems = await prisma.category.findUnique({
                where: { id: form.data.id },
                include: {
                    item: true
                }
            })
            if (relationCount._count.item == 1) {
                return setError(form, "id", "Tidak bisa menghapus kategori dengan barang yang terhubung: '" + categoryItems.item[0].name + "'");
            } else if (relationCount._count.item > 1) {
                return setError(form, "id", "Tidak bisa menghapus kategori dengan beberapa barang yang terhubung: '" + categoryItems.item.map((item: item) => item.name).join("', '") + "'");
            }
        }
            await prisma.category.delete(
                { where: { id: form.data.id } }
            )
            return { form };
        }
    };