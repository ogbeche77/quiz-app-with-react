import React, { Component } from 'react';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
import NavBar from "./components1/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components1/Profile";
import history from "./utils/history";
import PrivateRoute from "./components1/PrivateRoute";
import ExternalApi from "./views/ExternalApi";

class App extends Component {

    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };


    getQuestions = ()=>{
        quizService().then(question => {
            this.setState({
                questionBank: question
            })
        })
    }

    computeAnswer = (answer, correctAnswer) => {
        if (answer === correctAnswer) {
            this.setState({
                score:this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });

    }
    
    playAgain = ()=> {
        this.getQuestions();
        this.setState({
            score:0,
            responses:0
        });
    }


    componentDidMount() {
        this.getQuestions();
    }


    render() {
        return(
           <div className="container">
           <Router history={history}>
           <header>
           <NavBar/>
           
           </header>
           <Switch>
          <Route exact path="/"   />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
            <div className="title">General Knowledge Quiz</div>
           <ol className="myList">{this.state.questionBank.length > 0 &&
                this.state.responses < 5 && this.state.questionBank.map(({
                question,answers,correct, questionId }) => 
                 
                <li className="MyListClass"> <QuestionBox question={question} options={answers} key={questionId}
                  selected={answer => this.computeAnswer(answer, correct)}/> </li> )} </ol>
                  {this.state.responses === 5 ? (<Result score={this.state.score}
                     playAgain={this.playAgain}/>): null }

                     </Router>  
            </div>


        );
        }
}
export default App