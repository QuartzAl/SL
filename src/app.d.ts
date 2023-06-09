// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface Locals {
			validate: import("@lucia-auth/sveltekit").ValidateRequest;
			validateUser: import("@lucia-auth/sveltekit").ValidateRequest;
			setSession: import("@lucia-auth/sveltekit").SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia-auth").AuthRequest;
		}

	}
}

/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/lucia").Auth;
		type UserAttributes = {
			username: string;
			email: string?;
		};
	}
}

export {};
