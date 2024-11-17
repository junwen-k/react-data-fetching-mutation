import { createPost, deletePost } from "@/actions/posts";
import { getPosts } from "@/apis/posts.client";
import { mutationOptions, useActionMutation } from "@/lib/react-query";
import { queryOptions, useQueryClient } from "@tanstack/react-query";

export const getPostsQueryOptions = (...input: Parameters<typeof getPosts>) =>
	queryOptions({
		queryKey: ["posts", ...input],
		queryFn: () => getPosts(...input),
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

/* Approach 1: Using Server Actions with useActionMutation
 * This approach can be beneficial in a full-stack Next.js app where
 * server actions perform additional validation or access control
 * before interacting with the database or API.
 */

const createPostMutationOptions = mutationOptions({
	mutationFn: createPost,
});

export const useCreatePostMutation = ({
	onSuccess,
	...options
}: Omit<typeof createPostMutationOptions, "mutationFn"> = {}) => {
	const queryClient = useQueryClient();

	return useActionMutation({
		...createPostMutationOptions,
		transformError: (result) => {
			if ("message" in result) {
				return new Error(result.message);
			}
			return null;
		},
		onSuccess: (...args) => {
			queryClient.invalidateQueries(getPostsQueryOptions());

			return onSuccess?.(...args);
		},
		...options,
	});
};

const deletePostMutationOptions = mutationOptions({
	mutationFn: deletePost,
});

export const useDeletePostMutation = ({
	onSuccess,
	...options
}: Omit<typeof deletePostMutationOptions, "mutationFn"> = {}) => {
	const queryClient = useQueryClient();

	return useActionMutation({
		...deletePostMutationOptions,
		transformError: (result) => {
			if ("message" in result) {
				return new Error(result.message);
			}
			return null;
		},
		onSuccess: (...args) => {
			queryClient.invalidateQueries(getPostsQueryOptions());

			return onSuccess?.(...args);
		},
		...options,
	});
};

/* Approach 2: Direct API Calls with useMutation (Uncomment to Use)
 * If you prefer or need direct API calls without server actions,
 * useMutation can be configured to work with an API endpoint.
 * This is useful when interacting with separate services or when server actions
 * are not required to add additional processing.
 */

// const createPostMutationOptions = mutationOptions({
// 	mutationFn: createPost,
// });

// export const useCreatePostMutation = ({
// 	onSuccess,
// 	...options
// }: Omit<typeof createPostMutationOptions, "mutationFn"> = {}) => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		...createPostMutationOptions,
// 		onSuccess: (...args) => {
// 			queryClient.invalidateQueries(getPostsQueryOptions());

// 			return onSuccess?.(...args);
// 		},
// 		...options,
// 	});
// };

// const deletePostMutationOptions = mutationOptions({
// 	mutationFn: deletePost,
// });

// export const useDeletePostMutation = ({
// 	onSuccess,
// 	...options
// }: Omit<typeof deletePostMutationOptions, "mutationFn"> = {}) => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		...deletePostMutationOptions,
// 		onSuccess: (...args) => {
// 			queryClient.invalidateQueries(getPostsQueryOptions());

// 			return onSuccess?.(...args);
// 		},
// 		...options,
// 	});
// };
