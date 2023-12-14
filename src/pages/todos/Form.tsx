import React from 'react';
import {useStore} from "effector-react";
import {$disabled, $input, change, clear, getData, submit} from "./model";

const Form: React.FC = () => {
    const input = useStore($input);
    const disabled = useStore($disabled);
    return (
        <div className="forma">
            <input value={input} onChange={(e) => change(e.target.value)} />
            <button onClick={clear}>Очистить</button>
            <button onClick={submit} disabled={disabled}>Добавить</button>
            <button onClick={getData}>Получить fetch-данные</button>
        </div>
    )
};

export default Form;
