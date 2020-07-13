import * as React from 'react';
import {Component, useState} from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import ReactDOM from 'react-dom';
import {build_language_percentages} from "./git_wrapper.js"

const history = createBrowserHistory();

class CodeBar extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        let user = "zantiki";
        let percentages = build_language_percentages(user);
    }
    render() {
        return (
            <div>
                <p>Test</p>
            </div>
        )
    }

}

class TestWrapper extends Component{
    render() {
        return(
            <div>
                <CodeBar username={"zantiki"}></CodeBar>
            </div>
        )
    }
}

const root = document.getElementById('root');
if (root) ReactDOM.render(
    <BrowserRouter history={history}>
        <Route exact path="/" component={TestWrapper}/>
    </BrowserRouter>,
    root
);