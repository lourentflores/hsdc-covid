import React, { Component } from 'react';
import styles from '../styles/styles.css';


const QuizRow = (props) => {
    return (
        <tr>
            <td>{props.quiz}</td>
            <td>{props.date}</td>
            <td>{props.score}</td>
        </tr>
    );
}

export default QuizRow;

