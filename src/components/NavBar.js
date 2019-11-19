import React from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends React.Component {
    constructor(props) { 
        super(props);
    }

    onClickLogout = () => {
        // sessionStorage.removeItem('username');
        // sessionStorage.removeItem('userId');
        // sessionStorage.removeItem('jwtToken');
        sessionStorage.clear();
    }

    render() {
        // const { loginSuccess, username } = this.props;
        // console.log(loginSuccess, username);

        const username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');
        const jwtToken = sessionStorage.getItem('jwtToken');

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
                        {
                            username ? (
                                <NavDropdown title={"Hello, " + username} id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/" onClick={this.onClickLogout}>Logout</NavDropdown.Item>
                                 </NavDropdown>
                            ) : (
                                <Nav.Link href="/login" className="justify-content-end">Login</Nav.Link>
                            )
                        }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.authentication.success,
        username: state.authentication.username
    }
}

export default connect(mapStateToProps)(NavBar);