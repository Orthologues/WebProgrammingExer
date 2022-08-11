This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies to <code>node_modules</code>:

```bash
npm i
# or
yarn add
```

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

To get MySQL run, please pull the latest mysql docker image first
```bash
docker pull mysql:latest
```

Let a MySQL docker container run <code>./docker-compose.yml</code>
```bash
docker-compose up
```

Load a SQL db <code>./db/schema.sql</code> (with password) using an interactive command into the docker container
```bash
docker exec -i todolist_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE' < db/schema.sql 
```
This command would get a warning <b>mysql: [Warning] Using a password on the command line interface can be insecure.</b>

Then use the command for dev mode, and check <code>localhost:3000</code>
```bash
yarn dev
```

To deploy the production-mode app at <b>localhost:2999</b> instead of <b>localhost:3000</b>, first create a file <code>.env</code> at the root folder, add <code>PORT=2999</code> (switch it back to 3000 in dev mode) to the <code>/.env</code>, 
change "scripts.start" at <code>package.json</code> to <code>node node_modules/next/dist/cli/next-start.js -p 2999</code>. In addition, add 
```javascript
env: {
  PORT: process.env.PORT
},
```
to <code>module.exports</code> at <code>next.config.js</code>,then update the target URI at <code>lib/client.ts</code>. Finally, add then run
```bash
yarn build && yarn start
```

To automatically generate GraphQL code
```bash
npx graphql-codegen init
```
Generate the options as specified at <code>./codegen.yml</code><br/>
Thus run <code>yarn dev && npm run codegen</code><br />
To solve a typing error, <code>enum TodoStatus</code> at <code>generated/graphql-backend.ts</code> must have its attributes names switched to entirely non-capitalized

### Be aware that there is a git-ignored file called <code>.env.local</code> which stores sensitive info of the MYSQL db at a docker container at localhost:3306, written as
```bash
MYSQL_HOST=localhost
MYSQL_USER=xxxxxx
MYSQL_DATABASE=xxxxxx_db
MYSQL_PASSWORD=123456_abcdef
```