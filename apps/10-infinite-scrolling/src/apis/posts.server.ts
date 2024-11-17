import { server } from "@/lib/ky-server";
import { createPostsApi } from "./posts.base";

const api = createPostsApi(server);

export const { createPost, deletePost, getPosts } = api;
