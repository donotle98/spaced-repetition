import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "./RegistrationRoute.css";
import { withRouter } from "react-router-dom";

class RegistrationRoute extends Component {
    handleRegistrationSuccess = () => {
        this.props.history.push("/");
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

export default withRouter(RegistrationRoute);
