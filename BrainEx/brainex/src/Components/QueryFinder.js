import React , {Component} from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import BrainExHeader from "./BrainExHeader";

class QueryFinder extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        //todo template
        //style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}s
        return(
            <div >
                <BrainExHeader/>
                <h1>Find Similar</h1>
            </div>
        );
    }
}

export default QueryFinder;