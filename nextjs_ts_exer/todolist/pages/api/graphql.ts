import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types';
// An issue: Error in 3.0+ version of apollo-server-micro with Next.js, requires server.start() in server less environment
// Solution to the issue: https://github.com/apollographql/apollo-server/issues/5547

// An exclamation mark would render a property required or no null type/empty array would be returned
const typeDefs = gql`
  enum TodoStatus {
    scheduled
    active
    completed
  }
  type Todo {
    id: Int!
    title: String!
    status: TodoStatus!
  }
  input CreateTodoInput {
    title: String!
  }
  input UpdateTodoInput {
    id: Int!
    title: String
    status: TodoStatus
  }
  type Query {
    todos(status: TodoStatus): [Todo!]!
    todo(id: Int!): Todo
  }
  type Mutation {
    createTodo(input: CreateTodoInput!): Todo
    updateTodo(input: UpdateTodoInput!): Todo
    deleteTodo(id: Int!): Todo
  }
`;

const resolvers: IResolvers = {
  Query: {
    todos(parent, args, context) {
      return []
    },
    todo(parent, args, context) {
      return null
    }
  },
  Mutation: {
    createTodo(parent, args, context) {
      return null
    },
    updateTodo(parent, args, context) {
      return null
    },
    deleteTodo(parent, args, context) {
      return null
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
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