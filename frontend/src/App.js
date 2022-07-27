import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, useLocation} from
"react-router-dom";
import UserList from "./components/users_list";
import Menu from "./components/menu";
import Footer from "./components/footer";
import ProjectList from "./components/projects";
import TodoList from "./components/todo";
import LoginForm from "./components/login_form";
import ProjectForm from "./components/project_form";
import TodoForm from "./components/todo_form";


const NotFound = ({location}) => {
    return (
        <div>
            <div>Page: {location.pathname} not found </div>
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'menu': [],
            'token': '',
            'username': ''
        }
    }

    loginToken(username, password) {
        localStorage.setItem('username', username)
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {"username": username, "password": password})
            .then(response  => {
                localStorage.setItem('token', response.data.token)
                let token = localStorage.getItem('token')
                let username = localStorage.getItem('username')
                this.setState({'token': token, 'username': username},
                    this.loadData)
            })
            .catch(error => alert("Неверные логин и/или пароль"))
    }

    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        this.setState({'token': '', 'username': ''}, this.loadData)
    }

    isAuthenticated() {
        return !!this.state.token
    }

    getHeaders() {
        if (this.isAuthenticated()) {
            return {'Authorization': 'Token ' + this.state.token}
        }
        return {}
    }

    filterProjects(filter) {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/projects/',
            {headers, params: {'title': filter}})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            .catch(error => {
                console.log(error)
            })
    }

    createProject(title, desc, project_link, users) {
        const headers = this.getHeaders()
//        console.log(title, desc, project_link, users)
        axios.post('http://127.0.0.1:8000/api/projects/', {
                        'title': title,
                        'desc': desc,
                        'project_link': project_link,
                        'users': users}, {headers})
                        .then(response => {
                                this.loadData();
                            })
                            .catch(error => {
                                console.log(error)
                            })
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.loadData();
            })
            .catch(error => {
                console.log(error)
            })
    }

    createTodo(title, desc, project, user) {
        const headers = this.getHeaders()
//        console.log(title, desc, project, user)
        axios.post('http://127.0.0.1:8000/api/todo/', {
                        'title': title,
                        'desc': desc,
                        'project': project,
                        'user': user}, {headers})
                        .then(response => {
                                this.loadData();
                            })
                            .catch(error => {
                                console.log(error)
                            })
    }

    deleteTodo(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.loadData();
            })
            .catch(error => {
                console.log(error)
            })
    }

    loadData() {
        const headers = this.getHeaders()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'todos': []
                })
            })
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        this.setState({'token': token, 'username': username}, this.loadData)
    }

    render() {
        return (
            <div class="body">
                <BrowserRouter>

                    <nav>
                        <Menu menu={this.state.menu} />
                        { this.isAuthenticated() ?
                            <span>{this.state.username}
                                <button onClick={() => this.logout()}>
                                    Выйти
                                </button>
                            </span> :
                            <Link className="nav-link" to="/login">Войти</Link>
                        }
                    </nav>

                    <content>
                        <Routes>
                            <Route exact path='/' element={<UserList
                            users={this.state.users} />} />

                            <Route exact path='/projects'
                                element={<ProjectList
                                    projects={this.state.projects}
                                    deleteProject={
                                        (id) => this.deleteProject(id)}
                                    filter={
                                        (filter) => this.filterProjects(filter)
                                        }/>}/>

                            <Route exact path='/projects/create'
                                element={<ProjectForm
                                    users={this.state.users}
                                    createProject={(title,
                                                    desc,
                                                    project_link,
                                                    users) => this
                                                    .createProject(title,
                                                            desc,
                                                            project_link,
                                                            users)}/>}/>

                            <Route exact path='/todos'
                                element={<TodoList
                                    todos={this.state.todos}
                                    deleteTodo={(id) => this.deleteTodo(id)}
                                    />} />

                            <Route exact path='/todos/create'
                                element={<TodoForm
                                    projects={this.state.projects}
                                    users={this.state.users}
                                    createTodo={(title,
                                                desc,
                                                project,
                                                user) => this.createProject(
                                                                title,
                                                                desc,
                                                                project,
                                                                user)}/>}/>

                            <Route exact path='/login' element={<LoginForm
                            loginToken={(username, password) => this
                            .loginToken(username, password)}/>}/>


                            <Route path="*" element = {<NotFound />} />
                        </Routes>
                    </content>

                    <footer>
                        <Footer/>
                    </footer>

                </BrowserRouter>
            </div>
        )
    }
}

export default App;
