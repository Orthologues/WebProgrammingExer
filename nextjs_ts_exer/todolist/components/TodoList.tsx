import React from 'react';
import { Todo } from '../generated/graphql-frontend';
import Link from 'next/link';

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
                <Link href={`/update/${encodeURIComponent(todo.id)}`}>
                  <a className="todo-list-item-title">{todo.title}</a>
                </Link>
              </li>
            );
          })
        }
      </ul>
    );
};

export default TodoList;