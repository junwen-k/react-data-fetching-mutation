import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import * as React from "react";

interface Post {
	id: string;
	title: string;
	views: string;
}

const getPosts = () =>
	ky<Post[]>(`${import.meta.env.VITE_API_URL}/posts`).json();

const createPost = (title: string) =>
	ky
		.post<Post>(`${import.meta.env.VITE_API_URL}/posts`, {
			json: { title },
		})
		.json();

function App() {
	const [value, setValue] = React.useState("");

	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	const { mutate } = useMutation({
		mutationFn: createPost,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			setValue("");
		},
	});

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		mutate(value);
	};

	return (
		<div>
			<h1>Mutation React Query CSR</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{data?.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
