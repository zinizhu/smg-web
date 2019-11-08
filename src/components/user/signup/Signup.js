import React from 'react';
const axios = require('axios');

import { Form, Button } from 'react-bootstrap';

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            email:'',
            password: '',
            role:'Player',
            usernameExists: false,
            emailInUse: false,
            emailInvalid:false
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

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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

        // validate email
        const emailIsValid = this.validateEmail(this.state.email);
        if (!emailIsValid) {
            this.setState({
                usernameExists: false,
                emailInUse: false,
                emailInvalid: true
            });
            console.log('Email is not valid!');
            return;
        }

        const requestData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role.toUpperCase()
        }
        console.log(requestData);
        axios.post('http://localhost:8080/api/auth/signup ', requestData)
            .then((response) => {
                console.log(response);
                this.setState({usernameExists: false, emailInUse: false, emailInvalid: false});

                this.props.history.push('/');
            }).catch((err) => {
                console.log(err.response);
                const msg = err.response.data.message;
                if (msg === 'Username already exists.') {
                    this.setState({usernameExists: true, emailInUse: false, emailInvalid: false});
                }
                else if (msg === 'Email Address already in use.') {
                    this.setState({emailInUse: true, usernameExists: false, emailInvalid: false});
                }
                console.log('Error when logging in');
            });

    }

    render() {
        const { usernameExists, emailInUse, emailInvalid} = this.state;

        return (
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" onChange={this.onChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Enter email" onChange={this.onChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="Password" onChange={this.onChange}/>
                </Form.Group>
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Check inline type="radio" label="Player" name="role" value="Player"/>
                    <Form.Check inline type="radio" label="Coach" name="role" value="Coach"/>
                    <Form.Check inline type="radio" label="Admin" name="role" value="Admin"/>
                </Form.Group>
                {
                    usernameExists && 
                    (
                        <React.Fragment>
                            <p style={{color: "red"}}>Username already exists.</p>
                        </React.Fragment>
                    )
                }
                {
                    emailInUse && 
                    (
                        <React.Fragment>
                            <p style={{color: "red"}}>Email adrress already in use.</p>
                        </React.Fragment>
                    )
                }
                {
                    emailInvalid && 
                    (
                        <React.Fragment>
                            <p style={{color: "red"}}>Input email address invalid.</p>
                        </React.Fragment>
                    )
                }
                <Button variant="primary" onClick={this.onSubmit}>
                    Signup
                </Button>
            </Form>
        );
    }
}

// onClick={this.onSubmit}
