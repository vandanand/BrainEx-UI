import React , {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";

class QueryFinder extends Component {

    render() {

        //todo template
        //style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}
        return(
            <div >
                <NavBar/>
                <h1>Find Similar sequences</h1>
            </div>
        );
    }
}

export default QueryFinder;