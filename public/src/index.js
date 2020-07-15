import * as React from 'react';
import {Component, useState} from "react";
import {Route, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from "history";
import ReactDOM from 'react-dom';
import {build_language_percentages} from "./git_wrapper.js"

const history = createBrowserHistory();

class CodeBar extends Component{
    state = {
        colors: ["bg-success", "bg-info", "bg-warning", "bg-danger"]
    };

    constructor(props){
        super(props);
        let user = this.props.username;
        build_language_percentages(user)
            .then(percentages =>{
                let with_colors = []
                for(let i = 0; i < percentages.length; i++){
                    let values = percentages[i];
                    console.log(values);
                    values.push(this.state.colors[i]);
                    with_colors.push(values);
                }
                console.log(with_colors);
                this.setState({percentages: with_colors});
            })
    }

    render() {
        if (!this.state.percentages) return null;
        return (
            <div className="progress" style={{height: "3em", borderRadius: "10px"}}>
                {
                    this.state.percentages.map(value => (
                        <div className={"progress-bar "+value[2]} role={"progressbar"} style={{width: value[1]*100+"%"}}
                             aria-valuemin={"0"} aria-valuemax={"100"}><h4>{value[0]}</h4></div>
                    ))
                }
            </div>
        )
    }

}

class TestWrapper extends Component{
    render() {
        return(
            <div>
                <div style={{
                    marginRight: "10px",
                    marginLeft: "10px",
                    marginTop: "20px"}}>
                    <CodeBar username={"zantiki"}/>
                </div>
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