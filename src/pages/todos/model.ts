import {createEffect, createEvent, createStore, sample} from "effector";
import {ITodo} from "./dto/todo";
import React from "react";

const initialState: ITodo[] = [
    {
        id: 1,
        title: "Todo 1",
        completed: true
    },
    {
        id: 2,
        title: "Todo 2",
        completed: false
    },
    {
        id: 3,
        title: "Todo 3",
        completed: true
    }
];
export const getPostFX = createEffect( async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
    return await res.json();
});
export const getData = createEvent<React.SyntheticEvent>();
export const componentMounted = createEvent();
export const componentUnmounted = createEvent();
export const toggleStatus = createEvent<number>();
export const deleteTodo = createEvent<number>();
export const insert = createEvent<string>();
export const change = createEvent<string>();
export const clear = createEvent<React.SyntheticEvent>();
export const submit = createEvent<React.SyntheticEvent>();

export const $isComponentMount = createStore<boolean>(false)
    .on(componentMounted, () => true)
    .reset(componentUnmounted);

export const $input = createStore<string>('')
    .on(change, (_, value) => value)
    .reset(insert, clear);

export const $disabled = $input.map(value => value.trim().length < 3);

sample({
    clock: submit,
    source: $input,
    target: insert
})
sample({
    clock: getData,
    target: getPostFX
});

export const $todos = createStore<ITodo[]>(initialState)
    .on(getPostFX.doneData, (_, payload) => payload)
    .on(insert, (state, payload) => {
        const formData = {
            userId: 1,
            id: state.length ? state[state.length - 1].id + 1 : 1,
            title: payload.trim(),
            completed: false
        };
        return [...state, formData];
    })
    .on(toggleStatus, (state, payload) => state.map(todo => todo.id === payload ? ({
        ...todo,
        completed: !todo.completed
    }) : todo))
    .on(deleteTodo, (state, payload) => state.filter(todo => todo.id !== payload));

export const $count = $todos.map(todos => todos.length);
export const $completed = $todos.map(todos => todos.filter((todo) => todo.completed).length);
