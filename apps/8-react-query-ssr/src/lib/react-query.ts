import {
	type DefaultError,
	type UseMutationOptions,
	useMutation,
} from "@tanstack/react-query";

export function mutationOptions<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown,
>(
	options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationOptions<TData, TError, TVariables, TContext> {
	return options;
}

export interface UseActionMutationOptions<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
	transformError?: (
		...props: Parameters<
			NonNullable<
				UseMutationOptions<TData, TError, TVariables, TContext>["onSuccess"]
			>
		>
	) => TError | null;
}

export const useActionMutation = <
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown,
>({
	transformError,
	onSuccess,
	...options
}: UseActionMutationOptions<TData, TError, TVariables, TContext>) =>
	useMutation({
		onSuccess: (...props) => {
			const error = transformError?.(...props);
			if (error) {
				throw error;
			}

			onSuccess?.(...props);
		},
		...options,
	});
