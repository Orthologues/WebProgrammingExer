import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
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