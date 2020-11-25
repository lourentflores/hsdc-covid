import React, { Component } from 'react';
import styles from '../styles/styles.css';
import QuizRow from './QuizRow.jsx';

class QuizTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // create a quiz row compoenent array
        const quizEntry = [];
        for (let i = 0; i < this.props.quizzes.length; i++) {
            quizEntry.push(<QuizRow
                quiz={this.props.quizzes[i].quizid}
                date={this.props.quizzes[i].date}
                score={this.props.quizzes[i].score}
            />)
        }
        return (
            <div className='about-window'>
                <h3>Covid Daily Journal</h3>
                <br />
                <table>
                    <th>Quiz ID</th>
                    <th>Date</th>
                    <th>Risk Score</th>
                    {quizEntry}
                </table>
            </div>
        );
    }

}

export default QuizTable;