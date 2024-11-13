// Server actions with "use server";
"use server";

import * as posts from "@/apis/posts";

export const createPost = async (title: string) => {
	if (!title) {
		return { message: "Title is required" };
	}

	// Simulate slow action.
	await new Promise((res) => setTimeout(res, 2000));

	// Simulate something that might fail to demonstrate rollback via `invalidateQueries`.
	if (Math.random() < 0.5) {
		// Server actions should not throw error. For more information, see
		// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-expected-errors-from-server-actions
		return { message: "This is failed intentionally" };
	}

	return posts.createPost(title);
};

export const deletePost = async (postId: string) => {
	if (!postId) {
		return { message: "PostId is required" };
	}

	return posts.deletePost(postId);
};
