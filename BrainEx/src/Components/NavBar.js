import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, withRouter, Switch } from "react-router-dom";
import '../Stylesheets/NavBar.css';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import RawDataExplorer from "./RawDataExplorer";
import ClusterExplorer from "./ClusterExplorer";
import QueryFinder from "./QueryFinder";
import Home from "./Home";

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curr_target: null,
            currentPath: this.props.currentPath
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    goHome = (e) => {
        this.props.history.push('/');
    };

    handleClick = (e) => {
        this.setState({
            curr_target: e.currentTarget
        });
    };

    handleClose = (e) => {
        this.setState({
            curr_target: null
        });
    };

    render() {
        return(
            <div>
                <nav className="navbar navbar-expand">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Button onClick={this.goHome}>Home</Button>
                        </li>
                        <div className="nav-item">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>Explore Data</Button>
                            <Menu id="simple-menu" anchorEl={this.state.curr_target} keepMounted open={Boolean(this.state.curr_target)} onClose={this.handleClose}>
                                <MenuItem onClick={this.handleClose}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/MainPage/ExploreRawData">Explore Raw Data</Link>
                                    </li>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/MainPage/ExploreClusters">Explore Clustered Data</Link>
                                    </li>
                                </MenuItem>
                            </Menu>
                        </div>
                        <li className="nav-item">
                            <Link className="nav-link" to="/MainPage/QueryFinder">Find Similar Sequences</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(NavBar);
