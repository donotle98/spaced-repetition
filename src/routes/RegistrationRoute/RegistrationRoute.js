import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import AuthApiService from "../../services/auth-api-service";
import "./RegistrationRoute.css";

class RegistrationRoute extends Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    };

    handleRegistrationSuccess = (username, password) => {
        AuthApiService.postLogin({
            username: username.value,
            password: password.value,
        })
            .then((res) => {
                username.value = "";
                password.value = "";
                this.context.processLogin(res.authToken);
                this.props.onLoginSuccess();
            })
            .catch((res) => {
                this.setState({ error: res.error });
            });
    };

    render() {
        return (
            <section className='reg-route'>
                <p>
                    Practice learning a language with the spaced repetition
                    revision technique.
                </p>
                <h2>Sign up</h2>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </section>
        );
    }
}

export default RegistrationRoute;
