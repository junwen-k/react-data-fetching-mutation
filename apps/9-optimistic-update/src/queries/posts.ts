import { createPost, deletePost } from "@/actions/posts";
import { type GetPostsInput, getPosts } from "@/apis/posts";
import { useActionMutation } from "@/lib/use-action-mutation";
import {
	type QueryClient,
	queryOptions,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

// Query options for fetching posts
export const getPostsQueryOptions = (input: GetPostsInput) =>
	queryOptions({
		queryKey: ["posts", input],
		queryFn: async () => {
			await new Promise((res) => setTimeout(res, 2000));
			return getPosts(input);
		},
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

/* Approach 1: Using Server Actions with useActionMutation
 * This approach can be beneficial in a full-stack Next.js app where
 * server actions perform additional validation or access control
 * before interacting with the database or API.
 */
export const useCreatePostMutation = () => {
	const queryClient = useQueryClient();

	return useActionMutation({
		action: createPost,
		transformError: (result) => {
			if ("message" in result) {
				return new Error(result.message);
			}
			return null;
		},
		onError: (error) => alert(error.message),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export const useDeletePostMutation = () => {
	const queryClient = useQueryClient();

	return useActionMutation({
		action: deletePost,
		transformError: (result) => {
			if ("message" in result) {
				return new Error(result.message);
			}
			return null;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

/* Approach 2: Direct API Calls with useMutation (Uncomment to Use)
 * If you prefer or need direct API calls without server actions,
 * useMutation can be configured to work with an API endpoint.
 * This is useful when interacting with separate services or when server actions
 * are not required to add additional processing.
 */

// export const useCreatePostMutation = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: createPost,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 		},
// 	});
// };

// export const useDeletePostMutation = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: deletePost,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 		},
// 	});
// };
