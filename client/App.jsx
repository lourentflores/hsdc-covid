import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AssessmentPage from "./components/AssessmentPage.jsx";
import ResultsPage from "./components/ResultsPage.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Map from "./components/MapsPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riskLevel: '',
      riskyActs: [],
      answers: [],
      isLoggedIn: false,
      username: '',
      password: '',
      quizzes: []
    };

    this.submitAnswers = this.submitAnswers.bind(this);
    this.addToAnswers = this.addToAnswers.bind(this);
    this.removeFromAnswers = this.removeFromAnswers.bind(this);
    this.getRiskLevel = this.getRiskLevel.bind(this);
    this.getRiskyActs = this.getRiskyActs.bind(this);
    
    this.login = this.login.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);

    this.getQuizzes = this.getQuizzes.bind(this);

  }

  // get quizzes here, which will fetch and setState
  // when do we call it?
  // call it in the Profile page, on the creation of the page

  getQuizzes() {
    // fetch('/profile', {
    //     method: 'GET', 
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username: this.state.username }),
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
          
    //   }).catch(err=>err);
    const newQuizzes = [
      {quizid: 0, date: '2020-01-01', score: 100},
      {quizid: 1, date: '2020-01-02', score: 110},
      {quizid: 2, date: '2020-01-03', score: 120}
    ];
    this.setState({ ...this.state, quizzes: newQuizzes })
    console.log(newQuizzes);
}

  updateUsername(passedUsername) {
    this.setState({ ...this.state, username: passedUsername })
    console.log(passedUsername);
  }

  updatePassword(passedPassword) {
    this.setState({ ...this.state, password: passedPassword })
    console.log(passedPassword);
  }

  login() {
    this.setState({ ...this.state, isLoggedIn: true });
  }

  submitAnswers() {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activities: this.state.answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("risky acts include", data.activities.riskyActs);
        const newRisk = data.activities.riskLevel;
        const newRiskyActs = data.activities.riskyActs;

        this.setState({
          ...this.state,
          riskLevel: newRisk,
          riskyActs: newRiskyActs,
        });
      });
  }

  addToAnswers(keyword) {
    const newAnswers = this.state.answers.slice();
    newAnswers.push(keyword);

    console.log("keyword is", keyword, "new answers include :", newAnswers);
    this.setState({
      ...this.state,
      answers: newAnswers,
    });
  }

  removeFromAnswers(keyword) {
    let newAnswers = this.state.answers.slice();
    newAnswers = newAnswers.filter((answer) => answer !== keyword);

    console.log("keyword was ", keyword, "new answers include :", newAnswers);
    this.setState({
      ...this.state,
      answers: newAnswers,
    });
  }

  getRiskyActs() {
    return this.state.riskyActs;
  }

  getRiskLevel() {
    return this.state.riskLevel;
  }

  render() {
    console.log("About to render: ", this.state);
    if (this.state.isLoggedIn === false) {
      return (
        <div>
          <h1>Covid Risk Assessment Quiz</h1>
          <LoginPage 
            login={this.login} 
            isLoggedIn={this.state.isLoggedIn} 
            updateUsername={this.updateUsername} 
            updatePassword={this.updatePassword}
          />
        </div>
      );
    }

    return (
      <div>
        <h1>Covid Risk Assessment Quiz</h1>
        <Switch>
          <Route exact path="/">
            <ProfilePage 
              getQuizzes={this.getQuizzes}
              quizzes={this.state.quizzes}
              />
          </Route>

          <Route exact path="/quiz">
            <AssessmentPage
              submitAnswers={this.submitAnswers}
              add={this.addToAnswers}
              remove={this.removeFromAnswers}
            />
          </Route>

          <Route path="/results">
            <ResultsPage
              riskLevel={this.state.riskLevel}
              riskyActs={this.state.riskyActs}
              getRiskLevel={this.getRiskLevel}
              getRiskyActs={this.getRiskyActs}
            />
          </Route>

          <Route path="/maps">
            <Map />
          </Route>

          <Route component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
