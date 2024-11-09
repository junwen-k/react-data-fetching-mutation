import {
	type Post,
	useCreatePost,
	useDeletePost,
	useGetPosts,
} from "@/hooks/use-posts";
import {
	type CellContext,
	type PaginationState,
	type RowData,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

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

function App() {
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading, error, fetchPosts } = useGetPosts({
		page: pagination.pageIndex + 1,
		perPage: pagination.pageSize,
	});
	const { createPost } = useCreatePost();
	const { deletePost } = useDeletePost();

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

	const table = useReactTable({
		data: data?.data ?? [],
		rowCount: data?.items,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (post) => post.id,
		manualPagination: true,
		onPaginationChange: setPagination,
		state: { pagination },
		meta: {
			onPostDelete: ({ row }) => handleDeletePost(row.id),
		},
	});

	const [value, setValue] = React.useState("");

	if (isLoading) {
		return "Loading...";
	}

	if (error) {
		return "Something went wrong, please try again later.";
	}

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
}

export default App;
