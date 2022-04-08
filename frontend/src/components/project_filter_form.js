import React from "react";

class ProjectFilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'filter': ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.filter(this.state.filter)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <input type="text"
                        placeholder="Найти проект"
                        name="filter"
                        value={this.state.filter}
                        onChange={(event) => this.handleChange(event)} />
                    <input className="btn"
                        type="submit"
                        id="button-addon2"
                        value="Поиск" />
                </div>
            </form>
        )
    }
}

export default ProjectFilterForm
