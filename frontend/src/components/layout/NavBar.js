import React, { Component } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    // NavBar toggle for mobile
    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    // Logout user from the app
    logout() {
        this.props.logoutUser();
    }

    navigate(link) {
        this.props.history.replace(link)
    }

    // Render private links
    renderNavbarAuthLinks() {

        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/dashboard/" activeClassName="active">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.logout.bind(this)}>Logout</NavLink>
                </NavItem>
            </Nav>
        );
    }

    // Render public/guests links
    renderNavbarGuestLinks() {

        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/login" activeClassName="active">Login</NavLink>
                </NavItem>
            </Nav>
        );
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        return (
            <Navbar expand="md">
                <NavbarBrand tag={RRNavLink} exact to={isAuthenticated ? "/dashboard/" : "/"}><img src="/images/logo192.png" width="50" /></NavbarBrand>
                <NavbarToggler onClick={this.toggle.bind(this)} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {isAuthenticated ? this.renderNavbarAuthLinks() : this.renderNavbarGuestLinks()}
                </Collapse>
            </Navbar>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
    NavBar
);