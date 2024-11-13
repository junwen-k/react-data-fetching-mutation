import {
	type GetPostsInput,
	createPost,
	deletePost,
	getPosts,
} from "@/apis/posts";
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

export const getPostsQueryOptions = (input: GetPostsInput) =>
	queryOptions({
		queryKey: ["posts", input],
		queryFn: () => getPosts(input),
		placeholderData: {
			first: 0,
			prev: null,
			next: null,
			last: 0,
			pages: 0,
			items: 0,
			data: [],
		},
	});

export const prefetchGetPostsQuery = (
	queryClient: QueryClient,
	input: GetPostsInput,
) => queryClient.prefetchQuery(getPostsQueryOptions(input));

export const useGetPostsSuspenseQuery = (input: GetPostsInput) =>
	useSuspenseQuery(getPostsQueryOptions(input));

export const useCreatePostMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPost,
		onError: (error) => alert(error.message),
		onSuccess: (result) => {
			if ("error" in result) {
				// We rethrow error message as error here so that `onError` callback will be triggered.
				throw new Error(result.error);
			}
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export const useDeletePostMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};
