import React from 'react';
import { Todo } from '../generated/graphql-frontend';
import Link from 'next/link';
import UpdateTodoForm from './UpdateTodoForm'

interface Props {
    todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
    return (
      <ul className="todo-list">
        {
          todos.map(todo => {
            return (
              <li key={todo.id} className="todo-list-item">
                <Link href="/update/[id]" as={`/update/${todo.id}`}>
                  <a className="todo-list-item-title">
                    <UpdateTodoForm initialValues={{title: todo.title}} />
                  </a>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
};

export default TodoList;