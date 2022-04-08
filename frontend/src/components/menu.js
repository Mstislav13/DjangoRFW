import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({menu}) => {
    return (
        <nav>
            <ul>

                <li class="link_menu">
                    <Link to="/">
                        Пользователи
                    </Link>
                </li>

                <li class="link_menu">
                    <Link to="/projects">
                        Проекты
                    </Link>
                </li>

                <li class="link_menu">
                    <Link to="/todos">
                        Заметки
                    </Link>
                </li>

                <li class="link_menu">
                    <Link to="/projects/create">
                        Создать новый проект
                    </Link>
                </li>

                <li class="link_menu">
                    <Link to="/todos/create">
                        Создать новую заметку
                    </Link>
                </li>

            </ul>
        </nav>
    )
}

export default Menu
