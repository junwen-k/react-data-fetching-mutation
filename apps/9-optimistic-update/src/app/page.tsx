import { Posts } from "@/components/posts";
import { getPostsQueryOptions } from "@/queries/posts.server";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import * as React from "react";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { page = "1", perPage = "5" } = await searchParams;

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(
		getPostsQueryOptions({
			page: Number(page),
			perPage: Number(perPage),
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<React.Suspense fallback={<>Loading...</>}>
				<Posts />
			</React.Suspense>
		</HydrationBoundary>
	);
}
