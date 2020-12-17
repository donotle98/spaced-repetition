import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
    static contextType = UserContext;

    handleLogoutClick = () => {
        this.context.processLogout();
    };

    renderLogoutLink() {
        return (
            <div className='user-sect'>
                <span>{this.context.user.name}</span>
                <nav>
                    <Link onClick={this.handleLogoutClick} to='/login'>
                        Logout
                    </Link>
                </nav>
            </div>
        );
    }

    renderLoginLink() {
        return (
            <div className='header-controls'>
                <nav>
                    <Link to='/login'>Login</Link>{" "}
                    <Link to='/register'>Sign up</Link>
                </nav>
            </div>
        );
    }

    render() {
        return (
            <div className='header'>
                <header>
                    <div className='title-header'>
                        <h1>
                            <Link to='/'>Spaced repetition</Link>
                        </h1>
                    </div>
                    {TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                </header>
            </div>
        );
    }
}

export default Header;
