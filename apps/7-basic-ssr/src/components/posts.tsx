"use client";

import * as React from "react";

import { type List, type Post, createPost, deletePost } from "@/apis/posts";
import {
	type CellContext,
	type PaginationState,
	type RowData,
	type Updater,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		onPostDelete?: (context: CellContext<TData, unknown>) => void;
	}
}

const columnHelper = createColumnHelper<Post>();

const columns = [
	columnHelper.accessor("title", {
		header: "Title",
	}),
	columnHelper.display({
		header: "Actions",
		cell: (context) => (
			<button
				type="button"
				onClick={() => context.table.options.meta?.onPostDelete?.(context)}
			>
				X
			</button>
		),
	}),
];

interface PostsProps {
	data: List<Post>;
}

export const Posts = ({ data }: PostsProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const pagination = React.useMemo(
		() =>
			({
				pageIndex: Number(searchParams.get("page") ?? "1") - 1,
				pageSize: Number(searchParams.get("perPage") ?? "5"),
			}) as const satisfies PaginationState,
		[searchParams],
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await createPost(value);
		setValue("");
	};

	const handleDeletePost = async (postId: string) => {
		await deletePost(postId);
	};

	const handlePaginationChange = React.useCallback(
		(updater: Updater<PaginationState>) => {
			if (typeof updater === "function") {
				const newPagination = updater(pagination);
				const params = new URLSearchParams(searchParams.toString());
				params.set("page", `${newPagination.pageIndex + 1}`);
				params.set("perPage", `${newPagination.pageSize}`);
				router.push(`${pathname}?${params.toString()}`);
			}
		},
		[pagination, router.push, searchParams, pathname],
	);

	const [value, setValue] = React.useState("");

	const table = useReactTable({
		data: data?.data ?? [],
		rowCount: data?.items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (post) => post.id,
		manualPagination: true,
		onPaginationChange: handlePaginationChange,
		state: { pagination },
		meta: {
			onPostDelete: ({ row }) => handleDeletePost(row.id),
		},
	});

	return (
		<div>
			<h1>Basic SSR</h1>
			<form onSubmit={handleSubmit}>
				<input
					value={value}
					onChange={(event) => setValue(event.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} colSpan={header.colSpan}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<button
					type="button"
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</button>
				<button
					type="button"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</button>
				<button
					type="button"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</button>
				<button
					type="button"
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</button>
				<span>
					<div>Page</div>
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount().toLocaleString()}
					</strong>
				</span>
				<span>
					| Go to page:
					<input
						type="number"
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							table.setPageIndex(page);
						}}
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
				>
					{[5, 10, 15, 20].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};