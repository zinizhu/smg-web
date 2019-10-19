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
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}