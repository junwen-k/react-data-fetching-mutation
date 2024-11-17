import type { List } from "@/types/list";
import type { Post } from "@/types/post";
import type { KyInstance } from "ky";

export interface GetPostsInput {
	page?: number;
	perPage?: number;
}

export const createPostsApi = (ky: KyInstance) => ({
	getPosts: ({ page = 1, perPage = 5 }: GetPostsInput = {}) =>
		ky<List<Post>>("posts", {
			searchParams: {
				_page: page,
				_per_page: perPage,
				_sort: "-createdAt",
			},
		}).json(),

	createPost: (title: string) =>
		ky
			.post<Post>("posts", {
				json: { title, createdAt: new Date().toISOString() },
			})
			.json(),

	deletePost: (postId: string) => ky.delete<Post>(`posts/${postId}`).json(),
});
