import * as React from "react";

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

export const useGetPosts = (input: GetPostsInput) => {
	const [data, setData] = React.useState<List<Post>>();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	const { page = 1, perPage = 5 } = input;

	const fetchPosts = React.useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/posts?_page=${page}&_per_page=${perPage}&_sort=-createdAt`,
			);

			if (!response.ok) {
				throw new Error(`Fetch error: ${response.statusText}`);
			}

			const data = (await response.json()) as List<Post>;

			setData(data);
		} catch (error) {
			setError(error as Error);
		}

		setIsLoading(false);
	}, [page, perPage]);

	React.useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return {
		data,
		isLoading,
		error,
		fetchPosts,
	};
};

export const useCreatePost = () => {
	const [post, setPost] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	const createPost = React.useCallback(async (title: string) => {
		setIsLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
				method: "POST",
				body: JSON.stringify({ title, createdAt: new Date().toISOString() }),
				headers: {
					"content-type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Fetch error: ${response.statusText}`);
			}

			const post = (await response.json()) as Post[];

			setPost(post);
		} catch (error) {
			setError(error as Error);
		}

		setIsLoading(false);
	}, []);

	return {
		post,
		isLoading,
		error,
		createPost,
	};
};

export const useDeletePost = () => {
	const [post, setPost] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	const deletePost = React.useCallback(async (postId: string) => {
		setIsLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/posts/${postId}`,
				{ method: "DELETE" },
			);

			if (!response.ok) {
				throw new Error(`Fetch error: ${response.statusText}`);
			}

			const post = (await response.json()) as Post[];

			setPost(post);
		} catch (error) {
			setError(error as Error);
		}

		setIsLoading(false);
	}, []);

	return {
		post,
		isLoading,
		error,
		deletePost,
	};
};
