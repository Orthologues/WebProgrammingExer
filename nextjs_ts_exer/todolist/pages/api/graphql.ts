import { ApolloServer } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { schema } from '../../backend/schema'
import { sqldb } from '../../backend/sqldb'
// An issue: Error in 3.0+ version of apollo-server-micro with Next.js, requires server.start() in server less environment
// Solution to the issue: https://github.com/apollographql/apollo-server/issues/5547

const apolloServer = new ApolloServer({ schema, context: { sqldb } });
const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: MicroRequest, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
      "Access-Control-Allow-Origin",
      "https://studio.apollographql.com"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
  );
  if (req.method === "OPTIONS") {
      res.end();
      return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res);
}