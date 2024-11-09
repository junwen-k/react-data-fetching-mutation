import * as React from "react";

interface Post {
	id: string;
	title: string;
	views: string;
}

function App() {
	const [items, setItems] = React.useState<Post[]>([]);
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

				const json = (await response.json()) as Post[];

				setItems(json);
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
		<ul>
			{items.map((item) => (
				<li key={item.id}>{item.title}</li>
			))}
		</ul>
	);
}

export default App;
