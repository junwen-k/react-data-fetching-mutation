import { client } from "@/lib/ky-client";
import { createPostsApi } from "./posts.base";

const api = createPostsApi(client);

export const { createPost, deletePost, getPosts } = api;
