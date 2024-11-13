"use server";

import ky from "ky";

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

export const getPosts = async ({ page = 1, perPage = 5 }: GetPostsInput) =>
	ky<List<Post>>(`${process.env.API_URL}/posts`, {
		searchParams: {
			_page: page,
			_per_page: perPage,
			_sort: "-createdAt",
		},
	}).json();

export const createPost = async (title: string) => {
	// Simulate slow action.
	await new Promise((res) => setTimeout(res, 2000));

	// Simulate something that might fail to demonstrate rollback via `invalidateQueries`.
	if (Math.random() < 0.5) {
		// Server actions should not throw error. For more information, see
		// https://nextjs.org/docs/app/building-your-application/routing/error-handling#handling-expected-errors-from-server-actions
		return { error: "This is failed intentionally" };
	}

	return ky
		.post<Post>(`${process.env.API_URL}/posts`, {
			json: { title, createdAt: new Date().toISOString() },
		})
		.json();
};

export const deletePost = async (postId: string) =>
	ky.delete<Post>(`${process.env.API_URL}/posts/${postId}`).json();
