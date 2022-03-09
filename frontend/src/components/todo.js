import React from 'react';
import {useParams, Link} from "react-router-dom";

const TodoItem = ({todo}) => {
    let closed;
    if (todo.closed) {
        closed = 'Закрыто';
    } else {
        closed = 'Открыто';
    }
    return (
        <tr>
            <th>{todo.id}</th>
            <td>{todo.title}</td>
            <td>{todo.desc}</td>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{closed}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {


    return (
        <table>
            <tr>
                <th>id</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Проект</th>
                <th>Пользователь</th>
                <th>Закрыт</th>
            </tr>

            {todos.map((current_todo) => <TodoItem
            todo={current_todo} />)}

        </table>
    )
}

export default TodoList
