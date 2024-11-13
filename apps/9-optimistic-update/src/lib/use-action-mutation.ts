import {
	type DefaultError,
	type UseMutationOptions,
	useMutation,
} from "@tanstack/react-query";

export interface UseActionMutationOptions<
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TContext = unknown,
> extends Omit<
		UseMutationOptions<TData, TError, TVariables, TContext>,
		"mutationFn"
	> {
	action: UseMutationOptions<TData, TError, TVariables, TContext>["mutationFn"];
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
	action,
	transformError,
	onSuccess,
	...options
}: UseActionMutationOptions<TData, TError, TVariables, TContext>) =>
	useMutation({
		mutationFn: action,
		onSuccess: (...props) => {
			const error = transformError?.(...props);
			if (error) {
				throw error;
			}

			onSuccess?.(...props);
		},
		...options,
	});
