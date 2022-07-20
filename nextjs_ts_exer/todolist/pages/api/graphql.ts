import { gql, ApolloServer, UserInputError } from 'apollo-server-micro'
import { MicroRequest } from 'apollo-server-micro/dist/types';
import mysql, { ServerlessMysql } from 'serverless-mysql';
import { OkPacket } from 'mysql';
import { Todo, Resolvers } from '../../generated/graphql-backend'

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
  sqldb: ServerlessMysql
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

type TodoDbQueryRes = TodoDbRow[];

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    async todos(parent, args, context) {
      const status = args.status;
      let query: string = 'SELECT id, title, todo_status FROM todos';
      const queryParams: string[] = [];
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
    async todo(parent, args, context) {
      const todo = await getTodoById(args.id, context.sqldb);
      return todo;
    }
  },
  Mutation: {
    async createTodo(parent, args, context) {
      const result = await context.sqldb.
      query<OkPacket>("INSERT INTO todos (title, todo_status) VALUES(?, ?)", 
      [args.input.title, TodoStatus.active]);
      return { id: result.insertId, title: args.input.title, status: TodoStatus.active }
    },

    async updateTodo(parent, args, context) {
      const id = args.input.id;
      const db = context.sqldb;
      const cols_to_set: string[] = [];
      const sqlParams: Array<string|number> = [];
      //add exisiting columns to $columns where would be SET in MySQL query
      if (args.input.title) {
        cols_to_set.push('title = ?');
        sqlParams.push(args.input.title);
      }
      if (args.input.status) {
        cols_to_set.push('todo_status = ?')
        sqlParams.push(args.input.status);
      }
      sqlParams.push(id);

      await db.query(`UPDATE todos SET ${cols_to_set.join(",")} WHERE id = ?`, sqlParams);
      const updatedTodo = await getTodoById(id, db);
      return updatedTodo;
    },

    async deleteTodo(parent, args, context) {
      const id = args.id;
      const db = context.sqldb; 
      const todo = await getTodoById(id, db);
      if(!todo) {
        throw new UserInputError(`Your input id: ${id} is non-existent at the mySQL DB!`)
      }
      await db.query('DELETE FROM todos WHERE id = ?', [id]);
      return todo;
    }
  }
}

const getTodoById = async (id: number, db: ServerlessMysql): Promise<Todo|null> => {
  const todos = await db.query<TodoDbQueryRes>("SELECT id, title, todo_status FROM todos WHERE id = ?", 
  [id]);
  return todos.length ? {id: id, title: todos[0].title, status: todos[0].todo_status} : null
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