import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { z } from "zod";
import type { item } from "@prisma/client";
import { superValidate, setError } from "sveltekit-superforms/server";

const formSchema = z.object({
    id: z.number().nonnegative(),
});


export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    const conditions = await prisma.condition.findMany();
    const form = superValidate(formSchema);
    if (!user) throw redirect(302, "/login");
    return {
        form,
        conditions: conditions,
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, formSchema);

        const relationCount = await prisma.condition.findUnique({
            where: { id: form.data.id },
            include: {
                _count: {
                    select: { item: true }
                }
            }
        });
        if (relationCount._count.item > 0) {
            const conditionItems = await prisma.condition.findUnique({
                where: { id: form.data.id },
                include: {
                    item: true
                }
            });
            if (relationCount._count.item == 1) {
                return setError(form, "id", "Cannot delete condition with linked item: '" + conditionItems.item[0].name + "'");
            } else if (relationCount._count.item > 1) {
                return setError(form, "id", "Cannot delete condition with linked items: '" + conditionItems.item.map((item: item) => item.name).join("', '") + "'");
            }
        }
        await prisma.condition.delete(
            { where: { id: form.data.id } }
        )
        return { form };
    }
};