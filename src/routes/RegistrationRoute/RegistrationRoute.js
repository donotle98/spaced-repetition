import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import "./RegistrationRoute.css";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";

class RegistrationRoute extends Component {
    static contextType = UserContext;
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    };

    handleRegistrationSuccess = (username, password) => {
        console.log(username, password);
        AuthApiService.postLogin({
            username: username,
            password: password,
        })
            .then((res) => {
                this.context.processLogin(res.authToken);
                const { location, history } = this.props;
                const destination = (location.state || {}).from || "/";
                history.push(destination);
            })
            .catch((res) => {
                this.setState({ error: res.error });
            });
        console.log("okay here");
    };
    // handleRegistrationSuccess = () => {
    //     console.log("okay here");
    //     this.props.history.push("/login");
    // };

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
