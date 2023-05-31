// lib/server/lucia.ts
import lucia from "lucia-auth";
import { sveltekit } from "lucia-auth/middleware";
import prisma from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { dev } from "$app/environment";

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: "DEV",
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			password: userData.password
		};
	}
});

export type Auth = typeof auth;