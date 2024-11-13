"use client";

import ky from "ky";

export const client = ky.create({
	prefixUrl: process.env.NEXT_PUBLIC_API_URL,
	// If you are using `authjs`, you might have a `beforeRequest` hook that looks like this.
	// hooks: {
	// 	beforeRequest: [
	// 		async (request) => {
	// 			const session = await getSession();
	// 			if (session) {
	// 				request.headers.set("Authorization", `Bearer ${session.accessToken}`);
	// 			}
	// 		},
	// 	],
	// },
});
