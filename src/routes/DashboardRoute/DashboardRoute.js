import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import config from "../../config";
import "./DashboardRoute.css";
import UserContext from "../../contexts/UserContext";

function WordList(props) {
    return (
        <li>
            <h4>{props.word.original}</h4>
            <div className='correct-wrong'>
                <span className='guesses correct-guesses'>
                    correct answer count: {props.word.correct_count}
                </span>
                <span className='guesses wrong-guesses'>
                    incorrect answer count: {props.word.incorrect_count}
                </span>
            </div>
        </li>
    );
}
class DashboardRoute extends Component {
    static contextType = UserContext;

    generateListOfWords = (words) => {
        let result = [];

        words.forEach((word, y) => {
            result.push(<WordList key={y} word={word} />);
        });

        return <ul className='word-list'>{result}</ul>;
    };
    componentDidMount() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                this.context.setLanguage(res.language);
                this.context.setWords(res.words);
            });
    }
    render() {
        return (
            <section className='lang-word'>
                <h2>{this.context.language.name}</h2>
                <button>
                    <NavLink to='/learn'>Start practicing</NavLink>
                </button>
                <h3>Words to practice</h3>
                <div className='each-word'>
                    {this.generateListOfWords(this.context.words)}
                </div>
                <h4 className='total-correct'>
                    Total correct answers: {this.context.language.total_score}
                </h4>
            </section>
        );
    }
}

export default DashboardRoute;
