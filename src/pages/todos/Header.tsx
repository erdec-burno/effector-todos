import React from 'react';
import {useStore} from "effector-react";
import {$completed, $count} from "./model";

const Header: React.FC = () => {
    const count = useStore($count);
    const completed = useStore($completed);
    return (
        <header>
            Количество: {count > 0 ? count : "пусто..."} | Завершенных: {completed}
        </header>
    );
};

export default Header;