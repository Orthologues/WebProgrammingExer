import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types';
import mysql from 'serverless-mysql';

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
    todo_status: TodoStatus!
  }
  input CreateTodoInput {
    title: String!
  }
  input UpdateTodoInput {
    id: Int!
    title: String
    todo_status: TodoStatus
  }
  type Query {
    todos(todo_status: TodoStatus): [Todo!]!
    todo(id: Int!): Todo
  }
  type Mutation {
    createTodo(input: CreateTodoInput!): Todo
    updateTodo(input: UpdateTodoInput!): Todo
    deleteTodo(id: Int!): Todo
  }
`;

interface ApolloContext {
  sqldb: mysql.ServerlessMysql
}

const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    async todos(parent, args, context) {
      const result = await context.sqldb.query(
        'SELECT "SVENSKA_DANSKE" as svenska_danske'
      );
      await sqldb.end();
      console.log({ result });
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

const sqldb = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
  },
  // add this to solve the issue at 'https://github.com/jeremydaly/serverless-mysql/issues/117'
  //library: require('mysql2')
});

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: { sqldb } });
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