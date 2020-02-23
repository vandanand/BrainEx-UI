import React , {Component} from "react";
import {withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard";

class QueryFinder extends Component {

    render() {
        console.log("we are in QueryFinder");
        return(
            <div >
                <Dashboard loi_min={1} loi_max={20}/>
            </div>
        );
    }
}

export default withRouter(QueryFinder);