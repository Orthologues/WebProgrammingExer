import React, { useState } from 'react';
import { useCreateTodoMutation } from '../generated/graphql-frontend';

interface CreateTodoProps {
  onSuccess: () => void
}

const TaskForm: React.FC<CreateTodoProps> = ({ onSuccess }) => {
    const [title, setTitle] = useState<string>('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    // "createTodoRes" consists of { data, loading, error }
    const [createTodo, { data, loading, error }] = useCreateTodoMutation({
      onCompleted: () => {
        onSuccess()
        setTitle('')
      }
    });
    
    const handleSubmitAddTodo = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!loading) {
        try {
          await createTodo({
            variables: {
               input: { 
                 title: title
               }
            }
          });
        } catch (err) {
          console.log(err)
        } finally {
          console.log("A mutation request to the GraphQL server has been responded")
        }
      }
    }
    return (
      <form onSubmit={handleSubmitAddTodo}>
          {error && <p className="alert-error">An error occurred.</p>}
          <input 
            type="text" 
            name="title" 
            placeholder="What tasks would you like to add to this todo-list?"
            autoComplete="off" 
            className="text-input new-todo-text-input"
            value={title}
            onChange={handleTitleChange}
          />
      </form>
    )
}

export default TaskForm;
