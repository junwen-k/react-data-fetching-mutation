import { useQuery } from "@tanstack/react-query";
import ky from "ky";

interface Post {
	id: string;
	title: string;
	views: string;
}

const getPosts = () =>
	ky<Post[]>(`${import.meta.env.VITE_API_URL}/posts`).json();

function App() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

	return (
		<div>
			<h1>Query React Query CSR</h1>
			<ul>
				{data?.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
