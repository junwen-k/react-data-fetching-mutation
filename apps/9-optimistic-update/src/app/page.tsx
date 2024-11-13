import { Posts } from "@/components/posts";
import { prefetchGetPostsQuery } from "@/queries/posts";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { page = "1", perPage = "5" } = await searchParams;

	const queryClient = new QueryClient();

	await prefetchGetPostsQuery(queryClient, {
		page: Number(page),
		perPage: Number(perPage),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Posts />
		</HydrationBoundary>
	);
}
