import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SimplePage from "./pages/SimplePage";
export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/Register">
                        <Register />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                    {/**
                    <Route path="/">
                        <SimplePage />
                    </Route>
                    */}
                </Switch>
            </Router>
        );
    }
}

const appC = document.querySelector("#app");

ReactDOM.render(<App />, appC);
