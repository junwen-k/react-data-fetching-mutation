import { getPosts } from "@/apis/posts.server";
import { queryOptions } from "@tanstack/react-query";

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
