import React , {Component} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from "../brain.png";
import NavBar from "./NavBar"

class QueryFinder extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        //todo template
        return(
            <div style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>

            {/*<div style={{backgroundColor: '#3C99DC', width: '100%', height: '17%', position: 'absolute', left:'0.01%', top:'0%'}}>
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">BrainEx</h1>
                <h3 className="App-Version">Version 1.0.0</h3>
                <h4 className="options" style={{position:'absolute', top:'39%', left:'48%'}}>Find Similar Sequences</h4>
            </div>*/}

            <NavBar />

        </div>

        );
    }
}

export default QueryFinder;