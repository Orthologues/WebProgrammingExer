import React, { useState } from 'react';

interface Values {
    title: string;
}

interface Props {
    initialValues: Values;
}

const UpdateTodoForm: React.FC<Props> = ({ initialValues }) => {
    const [val, setVal] = useState<Values>(initialValues);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target; // $name here would be "title"
        setVal((prev) => ({
            ...prev, [name]: value
        }));
    }
    return (
      <form>
          <p>
              <label className="field-label">Title</label>
              <input type="text" 
                name="title" 
                className="text-input"
                value={val.title}
                onChange={handleChange}
              />
          </p>
          <p>
              <button className="button" type='submit'>Save</button>
          </p>
      </form>
    );
}

export default UpdateTodoForm;