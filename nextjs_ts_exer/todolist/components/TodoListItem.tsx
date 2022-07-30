import React, { useEffect } from 'react';
import Link from 'next/link';
import { Todo, useDeleteTodoMutation } from '../generated/graphql-frontend';
import { Reference } from '@apollo/client';
import { useUpdateTodoMutation, TodoStatus } from '../generated/graphql-frontend';

interface Props {
    todo: Todo;
}

const TodoListItem: React.FC<Props> = ({ todo }) => {
    const [deleteTodo, { data, loading, error }] = useDeleteTodoMutation({
        variables: {
            id: todo.id
        },
        errorPolicy: 'all',
        update: (apolloCache, mutationRes) => {
            const deletedTodo = mutationRes.data?.deleteTodo;
            if (deletedTodo) {
                apolloCache.modify({
                    fields: {
                        todos(todoRefs: Reference[], { readField }) {
                            return todoRefs.filter(todoRef => {
                                return readField('id', todoRef) !== deletedTodo.id;
                            })
                        }
                    }
                })
            }
        }
    });
    
    const handleDeleteClick = async () => {
        try {
            await deleteTodo();
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(error) {
            alert('An error occurred, please try again.');
        }
    }, [error]);
    
    const [updateTodo, { loading: updateLoading, error: updateError}] = useUpdateTodoMutation({
        errorPolicy: 'all'
    })

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.target.checked ? TodoStatus.Completed : TodoStatus.Active;
        updateTodo({ variables: { input: {id: todo.id, status: newStatus} } })
    }

    useEffect(() => {
        if (updateError) {
            alert('An error occurred. Please try again!')
        }
    }, [updateError])

    return (
        <li className="todo-list-item">
          <label className="checkbox">
              <input type="checkbox" onChange={handleStatusChange}
                  checked={todo.status === TodoStatus.Completed}
                  disabled={updateLoading}
              />
              <span className="checkbox-mark">&#10003;</span>
          </label>
          <Link href={`/update/${encodeURIComponent(todo.id)}`}>
            <a className="todo-list-item-title">{todo.title}</a>
          </Link>
          <button className="todo-list-item-delete"
            onClick={handleDeleteClick}
            disabled={loading}
          >
              &times;
          </button>
        </li>
    )
}

export default TodoListItem;