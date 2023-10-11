import React from 'react';
import {useStore} from "effector-react";
import {$todos, deleteTodo, toggleStatus} from "./model";
import Form from "./Form";
import Header from "./Header";

const Todos: React.FC = () => {
    const data = useStore($todos);

    return (
        <>
            <Header />
            <Form />
            <div className="content">
                <ul>
                    {data.map(({ id, title, completed }) => (
                        <li key={id}>
                            <input
                                type='checkbox'
                                checked={completed}
                                onChange={() => toggleStatus(id)}
                            />
                            <span>{title}</span>
                            <span
                                onClick={() => deleteTodo(id)}
                            >&times;</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Todos;