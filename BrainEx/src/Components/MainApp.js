import React , {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import {Route, BrowserRouter as Router, withRouter, Switch} from "react-router-dom";
import RawDataExplorer from "./RawDataExplorer";
import ClusterExplorer from "./ClusterExplorer";
import QueryFinder from "./QueryFinder";

class MainApp extends Component {
    constructor(props) {
        super(props);
    }

    /*todo try this: https://stackoverflow.com/questions/42933167/react-router-with-a-custom-root-and-a-base-component*/

    render() {
        return(
            <div>
                <NavBar/>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(MainApp);