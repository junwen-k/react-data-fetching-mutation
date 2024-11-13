## Overview

This app demonstrates data fetching and mutation in Next.js. It fetches a list of posts with pagination, and allows users to create and delete posts. The `getPosts` function retrieves posts from an API, while `createPost` and `deletePost` handle adding and removing posts. Pagination is managed client-side with `useReactTable`, and the app ensures data is up-to-date by revalidating pages after mutations.
