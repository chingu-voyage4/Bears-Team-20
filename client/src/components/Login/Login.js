import React, { Component } from 'react';
import { TextField, Button, Typography } from 'material-ui';
import "./Login.css";




export class Login extends Component {

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
        const{ onSubmitLogin } = this.props;
        const { email, password } = this.state;
        if(!onSubmitLogin) return;
        onSubmitLogin({
            email,
            password
        })
    }

    render() {

        return <div id="login-container">
            <div id="login-form-container">
                <Typography align="center" id="login-logo">
                    App logo here
                </Typography>

                <TextField className="login-form-field" id="login-textfield-email" type="email" name="email"
                autoFocus={true}
                value={this.state.email}
                onChange={this.handleInputChange}
                placeholder="Email"
                InputLabelProps={{
                    required: true
                }}
                />

                <TextField className="login-form-field" id="login-textfield-password" type="password" name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
                InputLabelProps={{
                    required: true
                }}
                />

                <Button className="login-form-field" id="login-button"
                color="primary"
                onClick={this.handleLoginClick}
                >
                Login
                </Button>
                
            </div>
        </div>
    }
}