This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Construct a GraphQL query front-end via Next.js to conduct CRUD operations at a MySQL server that runs in a Docker container  

Let a MySQL docker container run <code>./docker-compose.yml</code>
```bash
docker-compose up
```

Load a SQL db <code>./db/schema.sql</code> (with password) using an interactive command into the docker container
```bash
docker exec -i todolist_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql 
```
This command would get a warning <b>mysql: [Warning] Using a password on the command line interface can be insecure.</b>

Then use the command for development
```bash
npm run dev
```

To automatically generate GraphQL code
```bash
npx graphql-codegen init
```
Generate the options as specified at <code>./codegen.yml</code><br/>
Thus run <code>npm i && npm run dev && npm run codegen</code><br />
To solve a typing error, <code>enum TodoStatus</code> at <code>generated/graphql-backend.ts</code> must have its attributes names switched to entirely non-capitalized