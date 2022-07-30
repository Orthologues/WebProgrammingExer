import React, { useEffect } from 'react';
import Link from 'next/link';
import { Todo, useDeleteTodoMutation } from '../generated/graphql-frontend';
import { Reference } from '@apollo/client';
import { defaultFieldResolver } from 'graphql';

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

    return (
        <li className="todo-list-item">
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