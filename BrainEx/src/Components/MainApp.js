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
        this.state ={
            currentPath: this.props.location.state.currentPath /*todo use this to tell the Switch what page to render at first*/
        };
    }

    componentDidMount() {
         this.props.history.push(this.state.currentPath);
    }

    /*todo try this: https://stackoverflow.com/questions/42933167/react-router-with-a-custom-root-and-a-base-component*/

    render() {
        console.log(this.state.currentPath);
        return(
            <Router>
                <NavBar/>
                <Switch>
                    <Route exact path="/ExploreRawData" component={RawDataExplorer} />
                    <Route exact path="/ExploreClusters" component={ClusterExplorer} />
                    <Route exact path="/QueryFinder" component={QueryFinder} />
                </Switch>
            </Router>
        );
    }
}

export default withRouter(MainApp);