import React, { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState<string>('');
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    return (
      <form>
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
