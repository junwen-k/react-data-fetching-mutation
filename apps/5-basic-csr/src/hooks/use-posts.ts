import * as React from "react";

interface Post {
	id: string;
	title: string;
	views: string;
}

export const useGetPosts = () => {
	const [posts, setPosts] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	const fetchPosts = React.useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);

			if (!response.ok) {
				throw new Error(`Fetch error: ${response.statusText}`);
			}

			const posts = (await response.json()) as Post[];

			setPosts(posts);
		} catch (error) {
			setError(error as Error);
		}

		setIsLoading(false);
	}, []);

	React.useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return {
		posts,
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
				body: JSON.stringify({ title }),
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
