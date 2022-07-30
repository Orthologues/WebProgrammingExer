import React from 'react';
import { Todo } from '../generated/graphql-frontend';
import TodoListItem from './TodoListItem';

interface Props {
    todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
    return (
      <ul className="todo-list">
        {
          todos.map(todo => {
            return (
              <TodoListItem key={todo.id} todo={todo}/>
            );
          })
        }
      </ul>
    );
};

export default TodoList;