import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const getPosts = ({ page = 1, perPage = 5 }: GetPostsInput) =>
	ky<List<Post>>(`${import.meta.env.VITE_API_URL}/posts`, {
		searchParams: {
			_page: page,
			_per_page: perPage,
			_sort: "-createdAt",
		},
	}).json();

export const useGetPostsQuery = (input: GetPostsInput) =>
	useQuery({
		queryKey: ["posts", input],
		queryFn: () => getPosts(input),
	});

const createPost = (title: string) =>
	ky
		.post<Post>(`${import.meta.env.VITE_API_URL}/posts`, {
			json: { title, createdAt: new Date().toISOString() },
		})
		.json();

export const useCreatePostMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

const deletePost = (postId: string) =>
	ky.delete<Post>(`${import.meta.env.VITE_API_URL}/posts/${postId}`).json();

export const useDeletePostMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};
