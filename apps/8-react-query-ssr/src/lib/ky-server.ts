import "server-only";

import ky from "ky";

export const server = ky.create({
	prefixUrl: process.env.API_URL,
	// If you are using `authjs`, you might have a `beforeRequest` hook that looks like this.
	// hooks: {
	// 	beforeRequest: [
	// 		async (request) => {
	// 			const session = await auth();
	// 			if (session) {
	// 				request.headers.set("Authorization", `Bearer ${session.accessToken}`);
	// 			}
	// 		},
	// 	],
	// },
});
