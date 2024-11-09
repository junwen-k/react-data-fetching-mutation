import * as React from "react";

interface Post {
	id: string;
	title: string;
	views: string;
}

function App() {
	const [posts, setPosts] = React.useState<Post[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	React.useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);

				if (!response.ok) {
					throw new Error(`Fetch error: ${response.statusText}`);
				}

				const posts = (await response.json()) as Post[];

				setPosts(posts);
			} catch (error) {
				setError(error as Error);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

	return (
		<div>
			<h1>Query Basic CSR</h1>
			<ul>
				{posts.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
