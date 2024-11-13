## Overview

The `queries` directory offers pre-configured data-fetching hooks, mutations, and utility functions built on `react-query`. This includes not only custom `useQuery` and `useMutation` hooks but also additional query utilities for features like query prefetching, suspense-based queries, and other convenience methods.

Each function in this directory abstracts away low-level details of data fetching and mutations, allowing for direct use of hooks like `useGetPostsSuspenseQuery` or `useCreatePostMutation` without needing to configure query options manually.

These hooks and utilities often wrap functions from the `actions` and `apis` directories, ensuring type safety and seamless integration with both server-side and client-side API calls. By centralizing `react-query` options and configuration, this directory provides a streamlined approach to managing data and mutation states in components.
