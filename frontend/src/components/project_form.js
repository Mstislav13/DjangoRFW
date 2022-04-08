import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'title': '',
            'desc': '',
            'project_link': '',
            'users': [],
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            ['users']: users
        })
    }

    handleSubmit(event) {
        this.props.createProject(this.state.title,
                                this.state.desc,
                                this.state.project_link,
                                this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label htmlFor="title">Заголовок: </label>
                    <input type="text"
                        id="title"
                        name="title"
                        placeholder="Заголовок"
                        onChange={(event) => this.handleChange(event)}
                        value={this.state.title}/>
                </div>

                <div>
                    <label htmlFor="desc">Описание: </label>
                    <textarea rows="5"
                        id="desc"
                        name="desc"
                        placeholder="Описание"
                        onChange={(event) => this.handleChange(event)}
                        value={this.state.description}/>
                </div>

                <div>
                    <label htmlFor="project_link">Ссылка: </label>
                    <input type="url"
                        id="project_link"
                        name="project_link"
                        placeholder="Ссылка на проект"
                        onChange={(event) => this.handleChange(event)}
                        value={this.state.project_link}/>
                </div>

                <div>
                    <label htmlFor="users">Пользователи: </label>
                    <select multiple
                        id="users"
                        name="users"
                        onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((user) => <option
                        value={user.id}>{user.first_name}
                            {user.last_name} ({user.username})</option>)}
                    </select>
                </div>

                <input type="submit" className="btn" value="Создать" />
            </form>
        )
    }
}

export default ProjectForm
