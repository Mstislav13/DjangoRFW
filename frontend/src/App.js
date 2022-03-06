import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, useLocation} from "react-router-dom";
import UserList from "./components/users_list";
import Menu from "./components/menu";
import Footer from "./components/footer";
import ProjectList from "./components/projects";
import TodoList from "./components/todo";


const NotFound = () => {
    let location = useLocation()
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
            'menu': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div class="body">
                <BrowserRouter>

                    <nav>
                        <Menu menu={this.state.menu}/>
                    </nav>

                    <content>
                        <Routes>
                            <Route exact path='/' element={<UserList users={this.state.users} />} />

                            <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />

                            <Route path='/user/:id' element={<TodoList
                            todos={this.state.todos} />} />

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
