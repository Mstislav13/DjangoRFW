import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UserList from './components/users_list.js';
import Menu from './components/menu.js';
import Footer from './components/footer.js';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
            this.setState({
                'users': users
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div class="body">
                <nav>
                    <Menu menu = {this.state.menu} />
                </nav>

                <content>
                    <UserList users={this.state.users} />
                </content>

                <br />

                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
}

export default App;
