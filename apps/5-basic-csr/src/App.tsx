import { useCreatePost, useDeletePost, useGetPosts } from "@/hooks/use-posts";
import * as React from "react";

function App() {
	const { posts, isLoading, error, fetchPosts } = useGetPosts();
	const { createPost } = useCreatePost();
	const { deletePost } = useDeletePost();

	const [value, setValue] = React.useState("");

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await createPost(value);
		await fetchPosts();
		setValue("");
	};

	const handleDeletePost = async (postId: string) => {
		await deletePost(postId);
		await fetchPosts();
	};

	return (
		<div>
			<h1>Basic CSR</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{posts.map((item) => (
					<li key={item.id}>
						{item.title}
						<button type="button" onClick={() => handleDeletePost(item.id)}>
							X
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
