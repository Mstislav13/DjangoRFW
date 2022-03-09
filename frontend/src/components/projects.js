import React from 'react';
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <th>{project.id}</th>
            <td>{project.title}</td>
            <td>{project.desc}</td>
            <td>{project.project_link}</td>
            <td>{project.users}</td>
            <td>{project.created}</td>
            <td>{project.updated}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>id</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Ссылка</th>
                <th>Пользователи</th>
                <th>Создан</th>
                <th>Изменён</th>
            </tr>

            {projects.map((current_project) => <ProjectItem
            project={current_project} />)}

        </table>
    )
}

export default ProjectList
