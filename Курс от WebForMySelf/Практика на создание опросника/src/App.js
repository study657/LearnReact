import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout.js';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz.js';
import QuizList from './components/QuizList/QuizList.js';
import Auth from './components/Auth/Auth.js';
import QuizCreator from './components/QuizCreator/QuizCreator.js';
import { connect } from 'react-redux';
import Logout from './components/Logout/Logout.js';
import { autoLogin } from './store/actions/auth.js';

class App extends Component{

  componentDidMount(){
    this.props.autoLogin();
  };

  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){ // Если пользователь вышел из сети (потерял токен авторизации), то переопределяем код верстки
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  };
};

function mapStateToProps(state){
  return {
    isAuthenticated: !!state.auth.token // Если токен есть, значит мы авторизованы, а если нет, значит не авторизованны
  }
};

function mapDispatchToProps(dispatch){
  return {
     autoLogin: () => dispatch(autoLogin()) 
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));