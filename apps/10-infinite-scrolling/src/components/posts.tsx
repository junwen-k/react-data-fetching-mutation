"use client";

import * as React from "react";

import { getPostsInfiniteQueryOptions } from "@/queries/posts.client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InView } from "react-intersection-observer";

export const Posts = () => {
	const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery(
		getPostsInfiniteQueryOptions(),
	);

	const items = data?.pages?.flatMap((page) => page.data) ?? [];

	return (
		<div>
			<h1>Infinite Scrolling</h1>
			<div
				style={{
					maxHeight: 300,
					overflowY: "scroll",
					border: "1px solid black",
				}}
			>
				<ul>
					{items.map((item) => (
						<li key={item.id}>{item.title}</li>
					))}
					{hasNextPage && !isFetching && (
						<InView
							onChange={(inView) => inView && !isFetching && fetchNextPage()}
						/>
					)}
					{isFetching && "Loading..."}
				</ul>
			</div>
		</div>
	);
};
