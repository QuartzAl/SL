import type { PageLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ }) => {
    await delay(1000);
	throw redirect(302, "/app");
}

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
