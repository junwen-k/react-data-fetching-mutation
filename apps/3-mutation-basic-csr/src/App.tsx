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

	const [value, setValue] = React.useState("");

	const fetchPosts = React.useCallback(async () => {
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
	}, []);

	React.useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
				method: "POST",
				body: JSON.stringify({ title: value }),
				headers: {
					"content-type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Fetch error: ${response.statusText}`);
			}

			await fetchPosts();

			setValue("");
		} catch (error) {
			setError(error as Error);
		}
	};

	return (
		<div>
			<h1>Mutation Basic CSR</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{posts.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
