This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Adding a new chain to the app

This should be done in tandem with backend but can be deployed safely before or after backedn goes live with their updates, the frontend will gracefully fallback to basic chain info until its added.

1. Add a new project in the frontend Alchemy org for the chain needed, this will give you the RPC url. It might be worth adding both the mainnet and a testnet for the chain if it has one.
2. Add an environment variable to Vercel for any preview and production releases for the RPC url, the name should be `ALCHEMY_{chain name}_{chain env}_URL`, you can use the existing ones as a template.
3. Go to `/utils/network.ts` and add the networks to the `networks` const, this should use the networks id as the key and the network object from viem.
4. Go to `/utils/getNetworkRPC.ts` and add in the environment variable for the RPC url's that you created on Alchemy, each case in the switch statement is the networks id, use that and then return the environment varaible from it.
5. Fetch a svg logo for the chain and add it as a React compoenent to `/components/icons/`, make sure to run it through svgomg first to optimise it. Once created go to `/utils/getNetworkIcon.tsx` and add it as a new case in the switch statement, the key should be the networks id and the value should be the React component you created, you should be able to use the same component for both the mainnet and testnet if they share the same logo.
6. Go to `/hooks/useContractAbi.ts` and add in the `networkQueryStrings` variable and add in the property of the network id and then th value that is required from `https://abidata.net/`, if you scroll down the page you should find the correct network ID that is needed.
7. You should also add the env var keys to the `.env.example` file so that we can keep track of environment varaibles being added.
