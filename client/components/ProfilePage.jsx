import React, { Component } from 'react';
import styles from '../styles/styles.css';
import QuizTable from './QuizTable.jsx';
import AboutWindow from "./AboutWindow.jsx";

class ProfilePage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
         this.props.getQuizzes();
    }

    render() {
        return (
            <div>
                <QuizTable quizzes={this.props.quizzes}/>
                <br/>
                <AboutWindow />
            </div>
        );
    }

}

export default ProfilePage;