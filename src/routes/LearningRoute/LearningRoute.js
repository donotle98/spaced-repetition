import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import config from "../../config";
import TokenService from "../../services/token-service";
import "./LearningRoute.css";

class LearningRoute extends Component {
    static contextType = UserContext;
    state = {
        usersGuess: "",
        resultsShowing: false,
    };

    handleChange = (e) => {
        this.setState({
            usersGuess: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.resultsShowing) {
            this.setState({ resultsShowing: !this.state.resultsShowing });
            setTimeout(
                () => document.getElementById("learn-guess-input").focus(),
                250
            );
        } else {
            this.context.setCurrentWord(this.context.nextWord);
            this.context.setGuess(this.state.usersGuess);
            this.setState({ resultsShowing: !this.state.resultsShowing });
            fetch(`${config.API_ENDPOINT}/language/guess`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                },
                body: JSON.stringify({ guess: this.state.usersGuess }),
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    this.context.setNextWord(json);
                });
        }
    };

    showResults = () => {
        if (this.state.resultsShowing) {
            if (this.context.nextWord.isCorrect) {
                return `You were correct! :D`;
            } else {
                return "Good try, but not quite right :(";
            }
        }
    };

    showResponseFeedback = () => {
        if (
            this.context.nextWord &&
            typeof this.context.nextWord.isCorrect !== "undefined"
        ) {
            return `The correct translation for ${this.context.currentWord.nextWord} was ${this.context.nextWord.answer} and you chose ${this.context.userGuess}!`;
        }
    };

    showButtonText = () => {
        if (this.state.resultsShowing) {
            return `Try another word!`;
        } else {
            return `Submit your answer`;
        }
    };

    componentDidMount() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.context.setNextWord(res);
            })
            .catch((err) => console.log(err));
    }
    goNext(e) {
        if (e.key === "Enter" || e.key === " ") {
            this.clearFeedback();
        }
    }
    showText = () => {
        if (this.state.resultsShowing) {
            return ``;
        } else {
            return `Translate the word:`;
        }
    };

    render() {
        return (
            <section className='learning-sect'>
                <div className='header-word'>
                    <h2>{this.showText()}</h2>
                    <span>
                        {this.context.nextWord
                            ? this.state.resultsShowing
                                ? this.context.currentWord.nextWord
                                : this.context.nextWord.nextWord
                            : "nothing"}
                    </span>
                    <h2 className='feedback'>{this.showResults()}</h2>
                    <div className='DisplayScore'>
                        <p>
                            Your total score is:{" "}
                            {this.context.nextWord
                                ? this.context.nextWord.totalScore
                                : null}
                        </p>
                    </div>
                    <div className='DisplayFeedback'>
                        <p>{this.showResponseFeedback()}</p>
                    </div>
                </div>

                <form
                    className='word-form'
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <label htmlFor='learn-guess-input'>
                        What's the translation for this word?
                    </label>
                    <input
                        autoFocus={true}
                        id='learn-guess-input'
                        name='userinput'
                        type='text'
                        onChange={(e) => this.handleChange(e)}
                        required
                    ></input>
                    <button type='submit' className='rainbow-button'>
                        {this.showButtonText()}
                    </button>
                </form>
                <div className='correctWrong-sect'>
                    <p className='wrong-guesses'>
                        You have answered this word incorrectly{" "}
                        {this.context.nextWord.wordIncorrectCount} times.
                    </p>
                    <p className='correct-guesses'>
                        You have answered this word correctly{" "}
                        {this.context.nextWord.wordCorrectCount} times.
                    </p>
                </div>
            </section>
        );
    }
}

export default LearningRoute;
