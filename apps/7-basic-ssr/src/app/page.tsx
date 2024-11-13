import { getPosts } from "@/actions/posts";
import { Posts } from "@/components/posts";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const { page = "1", perPage = "5" } = await searchParams;

	const data = await getPosts({
		page: Number(page),
		perPage: Number(perPage),
	});

	return <Posts data={data} />;
}
