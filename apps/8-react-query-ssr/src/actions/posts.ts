// Server actions with "use server";
"use server";

import * as posts from "@/apis/posts.server";

export const createPost = async (title: string) => {
	if (!title) {
		return { message: "Title is required" };
	}

	return posts.createPost(title);
};

export const deletePost = async (postId: string) => {
	if (!postId) {
		return { message: "PostId is required" };
	}

	return posts.deletePost(postId);
};
