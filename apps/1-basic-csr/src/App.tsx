import * as React from "react";

interface List<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

interface NamedResource {
	name: string;
	url: string;
}

function App() {
	const [items, setItems] = React.useState<NamedResource[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<Error>();

	React.useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(
					// https://pokeapi.co/docs/v2#pokemon
					`${import.meta.env.VITE_POKEAPI_URL}/pokemon/`,
				);

				if (!response.ok) {
					throw new Error(`Fetch error: ${response.statusText}`);
				}

				const json = (await response.json()) as List<NamedResource>;

				setItems(json.results);
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
				<li key={item.name}>{item.name}</li>
			))}
		</ul>
	);
}

export default App;
