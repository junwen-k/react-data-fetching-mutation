# Mastering Data Fetching and Mutations in React: A Practical Guide

[![License](https://img.shields.io/github/license/junwen-k/react-data-fetching-mutation)](https://github.com/junwen-k/react-data-fetching-mutation/blob/main/LICENSE) ![GitHub Repo stars](https://img.shields.io/github/stars/junwen-k/react-data-fetching-mutation)

If you find this project useful, please consider starring the repository to help others discover it!

## Prerequisites

1. [Node.js](https://nodejs.org/en): Ensure Node.js v22+ is installed.

1. [Corepack](https://nodejs.org/api/corepack.html): Enable Corepack to manage package managers like pnpm.

   ```zsh
   corepack enable
   ```

## Getting Started

1. Install dependencies:

   ```zsh
   pnpm install
   ```

1. Start development servers:

   ```zsh
   pnpm dev
   ```

1. Navigate to different topics by ports:

   Each example runs on a different port (4000 - 4009). The JSON server is available on port 3000, providing mock data for the examples.

   | Port                           | Topic                    | Description                                        |
   | ------------------------------ | ------------------------ | -------------------------------------------------- |
   | [3000](http://localhost:3000/) | Json Server              | Mock json server                                   |
   | [4000](http://localhost:4000/) | Basic Query CSR          | Basic CSR query setup                              |
   | [4001](http://localhost:4001/) | React Query CSR          | React Query CSR query setup                        |
   | [4002](http://localhost:4002/) | Basic Mutation CSR       | Basic CSR mutation setup                           |
   | [4003](http://localhost:4003/) | React Query Mutation CSR | React Query CSR mutation setup                     |
   | [4004](http://localhost:4004/) | Basic CSR                | Basic CSR setup                                    |
   | [4005](http://localhost:4005/) | React Query CSR          | React Query CSR setup                              |
   | [4006](http://localhost:4006/) | Basic SSR                | Basic SSR setup                                    |
   | [4007](http://localhost:4007/) | React Query SSR          | React Query SSR setup                              |
   | [4008](http://localhost:4008/) | Optimistic Update        | React Query optimistic updates without cache setup |
   | [4009](http://localhost:4009/) | Infinite Scrolling       | React Query infinite scrolling setup               |

1. API Server:

   A mock JSON server is available on port 3000, serving data for all examples.

   ```zsh
   pnpm --filter=server dev
   ```

## Running in Production

To deploy in production mode, follow these steps:

1. Build apps:

   ```zsh
   pnpm build
   ```

1. Start production servers:

   ```zsh
   pnpm start
   ```

## Directory Structure

Each subfolder under `apps/` represents a specific topic and contains all relevant code and assets:

```zsh
apps/
├── 1-query-basic-csr/
├── 2-query-react-query-csr/
├── 3-mutation-basic-csr/
├── 4-mutation-react-query-csr/
├── 5-basic-csr/
├── 6-react-query-csr/
├── 7-basic-ssr/
├── 8-react-query-ssr/
├── 9-optimistic-update/
└── 10-infinite-scrolling/
```

## Disclaimer

The contents of this repository are based on my personal experiences and opinions. While I strive to provide accurate and helpful information, there may be mistakes or oversights. I encourage readers to critically evaluate the content and contribute feedback or suggestions for improvement. The approaches shared here may not be suitable for all use cases, and I recommend exploring alternative methods or consulting other resources to make well-informed decisions. As always, use the right tools for the right job!

## License

[MIT](./LICENSE)
