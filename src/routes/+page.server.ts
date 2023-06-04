import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/server/lucia";
import { PrismaClient } from "@prisma/client";

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();
	const items = await new PrismaClient().item.findMany();
	if (!user) throw redirect(302, "/login");
    await delay(2000);
	throw redirect(302, "/app");
};

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}