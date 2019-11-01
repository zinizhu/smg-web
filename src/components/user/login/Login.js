import React from 'react';

import { Form, Button } from 'react-bootstrap';

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameOrEmail:'',
            password: '',
            role:'Player'
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

    onSubmit = () => {
        const ele = document.getElementsByName('role'); 
        console.log(ele);
        ele.forEach((radio) => {
            if (radio.checked === true) {
                this.setState({role: radio.value});
            }
        })
    }

    render() {

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
                <Form.Group controlId="role">
                    <Form.Label>Role</Form.Label>
                    <Form.Check inline type="radio" label="Player" name="role" value="Player"/>
                    <Form.Check inline type="radio" label="Coach" name="role" value="Coach"/>
                    <Form.Check inline type="radio" label="Admin" name="role" value="Admin"/>
                </Form.Group>
                <Button variant="primary" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>
        );
    }
}
