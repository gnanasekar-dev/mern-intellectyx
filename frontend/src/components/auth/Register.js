import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Util from '../../utils/Util';
import { registerCustomer } from "../../actions/authActions.js";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            error: null,
            buttonDisabled: true,
        };
    }

    register() {

        var error = null;

        if (this.state.name == "" || this.state.email == "" || this.state.password == "") {

            error = "Please enter all the details";
            this.setState({
                error: error
            });
            return false;
        }

        if (!Util.validateEmail(this.state.email)) {

            error = "Please enter a valid email address.";
            this.setState({
                error: error
            });
            return false;
        }

        const customerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        this.props.registerCustomer(customerData);
    }

    keypress(e) {
        if (e.key === 'Enter') {
            this.register();
        }
    }

    handleNameChange(e) {
        this.setState({
            error: null,
            name: e.target.value,
        }, () => {
            if(this.state.name && this.state.email && this.state.password) {
                this.setState({
                    buttonDisabled: false,
                });
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }

        });
    }

    handleEmailChange(e) {
        this.setState({
            error: null,
            email: e.target.value,
        }, () => {
            if(this.state.name && this.state.email && this.state.password) {
                this.setState({
                    buttonDisabled: false,
                });
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }

        });
    }

    handlePasswordChange(e) {
        this.setState({
            error: null,
            password: e.target.value,
        }, () => {
            if(this.state.name && this.state.email && this.state.password) {
                this.setState({
                    buttonDisabled: false,
                }); 
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }
        });
    }

    renderButton() {

        return (
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.register.bind(this)}>Sign up</button>
        );
    }

    render() {

        return (
            <div className="body-section page-content">
                <div className="container">
                    <ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
                    <div className="login-form-section">
                        <div className="row">
                            <div className="col-sm-6 align-self-center pb-10">
                                <img src="/images/system_img.png" className="img-fluid" alt="system" />
                            </div>
                            <div className="col-sm-6 align-self-center">
                                <div className="row signin-heading">
                                    <div className="col-sm-4">
                                        <h4 className="text-sm-left text-center">Register</h4>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onKeyPress={this.keypress.bind(this)} onChange={this.handleNameChange.bind(this)} placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email} onKeyPress={this.keypress.bind(this)} onChange={this.handleEmailChange.bind(this)} placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="pwd" name="password" placeholder="Password" value={this.state.password} onKeyPress={this.keypress.bind(this)} onChange={this.handlePasswordChange.bind(this)} />
                                </div>

                                <div id="errorMsg">
                                    <p>{this.state.error}</p>
                                </div>

                                {this.renderButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerCustomer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerCustomer })(Register);