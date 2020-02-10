import React , {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router-dom';

class QueryFinder extends Component {

    render() {
        console.log("we are in QueryFinder");
        //todo template
        //style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}
        return(
            <div >
                <h1>Find Similar sequences</h1>
            </div>
        );
    }
}

export default withRouter(QueryFinder);