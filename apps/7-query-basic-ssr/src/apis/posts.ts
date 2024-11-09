"use server";

import { revalidatePath } from "next/cache";

export interface Post {
	id: string;
	title: string;
	views: string;
	createdAt: string;
}

export interface List<T> {
	first: number;
	prev: number | null;
	next: number | null;
	last: number;
	pages: number;
	items: number;
	data: T[];
}

export interface GetPostsInput {
	page?: number;
	perPage?: number;
}

export const getPosts = async ({ page = 1, perPage = 5 }: GetPostsInput) => {
	const response = await fetch(
		`${process.env.API_URL}/posts?_page=${page}&_per_page=${perPage}&_sort=-createdAt`,
	);

	if (!response.ok) {
		throw new Error(`Fetch error: ${response.statusText}`);
	}

	const data = (await response.json()) as List<Post>;

	return data;
};

export const createPost = async (title: string) => {
	const response = await fetch(`${process.env.API_URL}/posts`, {
		method: "POST",
		body: JSON.stringify({ title, createdAt: new Date().toISOString() }),
		headers: {
			"content-type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Fetch error: ${response.statusText}`);
	}

	const post = (await response.json()) as Post;

	revalidatePath("/");

	return post;
};

export const deletePost = async (postId: string) => {
	const response = await fetch(`${process.env.API_URL}/posts/${postId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error(`Fetch error: ${response.statusText}`);
	}

	const post = (await response.json()) as Post;

	revalidatePath("/");

	return post;
};
