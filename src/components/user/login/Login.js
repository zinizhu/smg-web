import React from 'react';
const axios = require('axios');

import { Form, Button } from 'react-bootstrap';
import { setAuthentication } from '../../../actions/authentication';

export class Login extends React.Component {
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
                    jwtToken: response.data.accessToken
                }
                setAuthentication(auth);
            }).catch((err) => {
                if (err.response) {
                    this.setState({success: false});
                }
                console.log('Error when logging in');
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
            </Form>
        );
    }
}

// onClick={this.onSubmit}
