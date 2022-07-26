import { UserInputError } from 'apollo-server-micro'
import { Todo, Resolvers } from '../generated/graphql-backend'
import { ServerlessMysql } from 'serverless-mysql';
import { sqldb } from './sqldb'
import { OkPacket } from 'mysql';

const getTodoById = async (id: number, db: ServerlessMysql): Promise<Todo|null> => {
    const todos = await db.query<TodoDbQueryRes>("SELECT id, title, todo_status FROM todos WHERE id = ?", 
    [id]);
    return todos.length ? {id: id, title: todos[0].title, status: todos[0].todo_status} : null
 }

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

export const resolvers: Resolvers<ApolloContext> = {
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