import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const axios = require('axios');

import { Form, Button } from 'react-bootstrap';
import { setAuthentication } from '../../../actions/authentication';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameOrEmail:'',
            password: '',
            success: true
        }
    }

    onChange = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        console.log(id, ': ', value);

        let stateObject = this.state;
        stateObject[id] = value;
        this.setState({...stateObject});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { onSubmitConfig } = this.props;

        const ele = document.getElementsByName('role'); 
        console.log(ele);
        ele.forEach((radio) => {
            if (radio.checked === true) {
                this.setState({role: radio.value});
            }
        });
        const requestData = {
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password
        }
        console.log(requestData);
        axios.post('http://localhost:8080/api/auth/signin', requestData)
            .then((response) => {
                console.log(response);
                this.setState({success: true});
                // store JWT token somewhere
                const auth = {
                    userId: response.data.id,
                    username: response.data.username,
                    jwtToken: response.data.accessToken
                }
                onSubmitConfig(auth);

                // use session storage
                sessionStorage.setItem('userId', auth.userId);
                sessionStorage.setItem('username', auth.username);
                sessionStorage.setItem('jwtToken', auth.jwtToken);
                this.props.history.push('/');
            }).catch((err) => {
                this.setState({success: false});
                console.log('Error when logging in');
                console.log(err);
                if (err.response) {
                    console.log(err.response);
                }
            });
    }

    render() {
        const { success } = this.state;
        return (
            <Form>
                <Form.Group controlId="usernameOrEmail">
                    <Form.Label>Username/Email Address</Form.Label>
                    <Form.Control placeholder="Enter username or email" onChange={this.onChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password" onChange={this.onChange}/>
                </Form.Group>
                {
                    !success && 
                    (
                        <React.Fragment>
                            <p style={{color: "red"}}>Username/Password is not correct.</p>
                        </React.Fragment>
                    )

                }
                <Button variant="primary" onClick={this.onSubmit}>
                    Login
                </Button>
                <p><Link to="/signup">Don't have an account? Sign up here.</Link></p>
                <p><Link to="/">Back to Main Page</Link></p>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameSchedules: state.gameSchedules.gameSchedules
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitConfig: auth => dispatch(setAuthentication(auth))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
