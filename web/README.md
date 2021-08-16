# Graphql client

- Next.js TS bootstrap (create-next-app)
- Urql: Graphql client + graphcache + next-urql(ssr)
- Chakra-ui
- Formik

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.
The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

By default, urql uses a concept called Document Caching. It will avoid sending the same requests to a GraphQL API repeatedly by caching the result of each query. This works like the cache in a browser. urql creates a key for each request that is sent based on a query and its variables.

## Getting Started

`yarn dev` & go [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
