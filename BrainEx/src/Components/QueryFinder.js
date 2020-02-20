import React , {Component} from "react";
import {withRouter} from 'react-router-dom';
import Dashboard from "./Dashboard";

class QueryFinder extends Component {

    render() {
        console.log("we are in QueryFinder");
        return(
            <div >
                <Dashboard loi_min={(this.props.location.state !== undefined) ? this.props.location.state.loi_min : 1} loi_max={(this.props.location.state !== undefined) ? this.props.location.state.loi_max : 100}/>
            </div>
        );
    }
}

export default withRouter(QueryFinder);