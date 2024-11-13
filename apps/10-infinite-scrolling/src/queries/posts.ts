import { type GetPostsInput, getPosts } from "@/apis/posts";
import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

// Query options for fetching posts
export const getPostsInfiniteQueryOptions = (input?: GetPostsInput) =>
	infiniteQueryOptions({
		queryKey: ["posts", input],
		queryFn: async ({ pageParam }) => {
			await new Promise((res) => setTimeout(res, 500));
			return getPosts(pageParam);
		},
		initialPageParam: {
			page: 1,
			perPage: 10,
			...input,
		},
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (!lastPage.next) {
				return null;
			}

			return {
				...lastPageParam,
				page: lastPage.next,
			};
		},
		getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
			if (!firstPage.prev) {
				return null;
			}

			return {
				...firstPageParam,
				page: firstPage.prev,
			};
		},
	});

export const useGetPostsInfiniteQuery = (input?: GetPostsInput) =>
	useInfiniteQuery(getPostsInfiniteQueryOptions(input));
