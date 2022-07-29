import React from 'react';
import { Todo } from '../generated/graphql-frontend';

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
                {todo.title} ({todo.status})
              </li>
            );
          })
        }
      </ul>
    );
};

export default TodoList;