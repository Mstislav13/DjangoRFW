import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
//        const default_project = 1;
//        const default_user = 1;
        super(props);
        this.state = {
            'title': '',
            'desc': '',
//            'project': default_project,
            'project': '',
//            'user': default_user,
            'user': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let project = parseInt(event.target.selectedOptions.item(0).value)

        this.setState({
            ['project']: project
        });
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let user = parseInt(event.target.selectedOptions.item(0).value)

        this.setState({
            ['user']: user
        });
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.title,
                            this.state.desc,
                            this.state.project,
                            this.state.user)
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
                        value={this.state.title}
                        onChange={(event) => this.handleChange(event)}/>
                </div>

                <div>
                    <label htmlFor="desc">Описание:</label>
                    <textarea rows="5"
                        id="desc"
                        name="desc"
                        placeholder="Описание"
                        value={this.state.desc}
                        onChange={(event) => this.handleChange(event)}/>
                </div>

                <div>
                    <label htmlFor="project">Проект:</label>
                    <select id="project"
                        name="project"
                        onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((proj) => <option
                            value={proj.id}>{proj.title}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="user">Пользователь:</label>
                    <select id="user"
                        name="user"
                        onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((user) => <option
                            value={user.id}>{user.first_name}
                                {user.last_name} ({user.username})</option>)}
                    </select>
                </div>

                <input type="submit" className="btn" value="Создать"/>
            </form>
        )
    }
}

export default TodoForm
