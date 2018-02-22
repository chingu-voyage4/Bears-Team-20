import React, { Component } from 'react';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleLoginClick() {
        //HERE RUNS THE ACTION REQUIRED FOR LOGIN
        console.log("Login CLICKED!!!");
    }

    render() {
        return <div className="columns">
            <div className="column is-4 is-offset-4">
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        />
                        <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fa fa-check"></i>
                        </span>
                    </p>
                    </div>
                    <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        />
                        <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                        </span>
                    </p>
                    </div>
                    <div className="field">
                    <p className="control">
                        <button className="button is-success" onClick={this.handleLoginClick}>
                        Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    }
}