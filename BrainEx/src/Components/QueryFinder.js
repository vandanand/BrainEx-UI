import React , {Component} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard";

class QueryFinder extends Component {

    render() {
        console.log("we are in QueryFinder");
        return(
            <div >
                <Dashboard/>
            </div>
        );
    }
}

export default withRouter(QueryFinder);