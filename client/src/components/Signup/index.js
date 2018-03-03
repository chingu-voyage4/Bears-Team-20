import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { TextField, Button, Typography } from 'material-ui';
import * as actions from "../../actions/signup";
import "./Signup.css";




export class SignupComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
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
        const{ signupRequest } = this.props;
        const { email, password, username } = this.state;
        signupRequest({
            username,
            email,
            password
        })
    }

    render() {

        return <div id="signup-container">
            <div id="signup-form-container">
                <Typography align="center" id="signup-logo">
                    App logo here
                </Typography>

                <TextField className="signup-form-field" id="signup-textfield-username" type="username" name="username"
                autoFocus={true}
                value={this.state.username}
                onChange={this.handleInputChange}
                onKeyDown={ (e) => {if(e.keyCode===13) this.handleLoginClick();} } //Allow "Enter" to submit
                placeholder="Username"
                InputLabelProps={{
                    required: true
                }}
                />
                
                <TextField className="signup-form-field" id="signup-textfield-email" type="email" name="email"
                autoFocus={true}
                value={this.state.email}
                onChange={this.handleInputChange}
                onKeyDown={ (e) => {if(e.keyCode===13) this.handleLoginClick();} } //Allow "Enter" to submit
                placeholder="Email"
                InputLabelProps={{
                    required: true
                }}
                />

                <TextField className="signup-form-field" id="signup-textfield-password" type="password" name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                onKeyDown={ (e) => {if(e.keyCode===13) this.handleLoginClick();} } //Allow "Enter" to submit
                placeholder="Password"
                InputLabelProps={{
                    required: true
                }}
                />

                <Button className="signup-form-field" id="signup-button"
                disabled={this.props.isFetching}
                color="primary"
                onClick={this.handleLoginClick}
                >
                Signup
                </Button>
                
            </div>
        </div>
    }
}


SignupComponent.propTypes = {
    isFetching: PropTypes.bool,
    errors: PropTypes.object,
    signupRequest: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    username: PropTypes.string
};

const mapStateToProps = ({ signup }) => ({
    errors: signup.errors,
    isFetching: signup.isFetching
});

const mapDispatchToProps = dispatch => ({
    signupRequest: (signupData) => {
        // Front Validation
        let newErrors = {};
        let hasErrors = false;
        let { email, password, username } = signupData;
        if ( !email || email.length < 2) {
            newErrors.email = "min 2";
            hasErrors = true;
        }
        if ( !username || username.length < 2) {
            newErrors.username = "min 2";
            hasErrors = true;
        }
        if ( !password || password.length < 2) {
            newErrors.password = "min 2";
            hasErrors = true;
        }
        if ( !hasErrors ){
            dispatch(actions.signupRequest(signupData));
        } else {
            dispatch(actions.signupFailed(newErrors));
        }
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(SignupComponent);

