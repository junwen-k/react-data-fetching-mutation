import { ky } from "@/lib/ky";
import type { List } from "@/types/list";
import type { Post } from "@/types/post";

export interface GetPostsInput {
	page?: number;
	perPage?: number;
}

export const getPosts = async ({ page = 1, perPage = 5 }: GetPostsInput) =>
	ky<List<Post>>("posts", {
		searchParams: {
			_page: page,
			_per_page: perPage,
			_sort: "-createdAt",
		},
	}).json();

export const createPost = async (title: string) =>
	ky
		.post<Post>("posts", {
			json: { title, createdAt: new Date().toISOString() },
		})
		.json();

export const deletePost = async (postId: string) =>
	ky.delete<Post>(`posts/${postId}`).json();
