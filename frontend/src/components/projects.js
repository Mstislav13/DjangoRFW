import React from 'react';
import {Link} from "react-router-dom";
import ProjectFilterForm from "./project_filter_form";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <th>{project.id}</th>
            <td>{project.title}</td>
            <td>{project.desc}</td>
            <td>{project.project_link}</td>
            <td>{project.users}</td>
            <td>{project.created}</td>
            <td>{project.updated}</td>
            <td><button type='button'
                onClick={() => deleteProject(project.id)}>
                Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, filter}) => {
    return (
        <div>
            <ProjectFilterForm filter={filter}/>
            <table>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Ссылка</th>
                    <th>Пользователи</th>
                    <th>Создан</th>
                    <th>Изменён</th>
                    <th>&nbsp;</th>
                </tr>

                {projects.map((current_project) => <ProjectItem
                project={current_project} deleteProject={deleteProject} />)}

            </table>
        </div>
    )
}

export default ProjectList
