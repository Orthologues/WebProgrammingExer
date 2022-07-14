import { IResolvers } from '@graphql-tools/utils'
import { gql, ApolloServer } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types';
import mysql from 'serverless-mysql';
import { OkPacket } from 'mysql';

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

interface ApolloContext {
  sqldb: mysql.ServerlessMysql
}

enum TodoStatus {
  scheduled = "scheduled",
  active = "active",
  completed = "completed"
}

interface TodoDbRow {
  id: number;
  title: string;
  todo_status: TodoStatus;
}

interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}


type TodoDbQueryRes = Array<TodoDbRow>;

const resolvers: IResolvers<any, ApolloContext> = {
  Query: {
    async todos(
    parent, 
    args: { status?: TodoStatus } , 
    context): Promise<Array<Todo>> {
      let status = args.status;
      let query: string = 'SELECT id, title, todo_status FROM todos';
      let queryParams: Array<string> = [];
      if (status) {
        query += ' WHERE todo_status = ?';
        queryParams.push(status);
      }
      const todos = await context.sqldb.query<TodoDbQueryRes>(
        query,
        queryParams
      );
      await sqldb.end();
      return todos.map(({id, title, todo_status}) => ({id, title, status: todo_status}));
    },
    todo(parent, args, context) {
      return null
    }
  },
  Mutation: {
    async createTodo(parent, args: { input: { title: string } }, context): Promise<Todo> {
      const result = await context.sqldb.
      query<OkPacket>("INSERT INTO todos (title, todo_status) VALUES(?, ?)", 
      [args.input.title, TodoStatus.active]);
      return { id: result.insertId, title: args.input.title, status: TodoStatus.active }
    },
    updateTodo(parent, args: { input: TodoDbRow }, context) {
      return null
    },
    deleteTodo(parent, args: { id: Number }, context) {
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