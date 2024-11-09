import { getPosts } from "@/apis/posts";
import { Posts } from "@/components/posts";

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const { page = "1", perPage = "5" } = await searchParams;

	const data = await getPosts({
		page: Number(page),
		perPage: Number(perPage),
	});

	return <Posts data={data} />;
}
