import React from 'react';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class NavBar extends React.Component {
    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark" expand="lg"  style={{ marginBottom: '40px' }}>
                    <Navbar.Brand href="/">SMG-Life</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/schedule">Game Schedule</Nav.Link>
                            <Nav.Link href="/trainingPlan">Training Plan</Nav.Link>
                            <Nav.Link href="/stats">Statistics</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/login" className="justify-content-end">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}