import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.loginToken(this.state.username, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label htmlFor="username">Логин: </label>
                    <input type="text" name="username" placeholder="username"
                        value={this.state.username}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <div>
                    <label htmlFor="password" >Пароль: </label>
                    <input type="password" name="password"
                        placeholder="password" value={this.state.password}
                        onChange={(event) => this.handleChange(event)} />
                </div>

                <input type="submit" className="btn" value="Войти" />
            </form>
        )
    }
}

export default LoginForm
