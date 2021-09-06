import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Home"/>
        </Route>
        <Route path="/Home" component={Home}/>
        <Route path="/Quiz" component={Quiz}/>
        <Route path="/Result" component={Result}/>
      </Switch>
    </BrowserRouter>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
