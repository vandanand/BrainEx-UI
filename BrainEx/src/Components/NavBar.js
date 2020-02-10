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
                                        <Link className="nav-link" to="/ExploreRawData">Explore Raw Data</Link>
                                    </li>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/ExploreClusters">Explore Clustered Data</Link>
                                    </li>
                                </MenuItem>
                            </Menu>
                        </div>
                        <li className="nav-item">
                            <Link className="nav-link" to="/QueryFinder">Find Similar Sequences</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            // TODO transfer relevant router info to here and continue trying to make central page where you pass in some sort of prop to go to the right place
            // TODO (cont) so when the user clicks "explore loaded data", what should that go to (i.e. should it go to a page that has directions or default to clustered data)
            /*<nav className="navbar navbar-expand">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <div> {/!*MUI DROP DOWN MENU*!/}
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            Open Menu
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.curr_target} // state
                            keepMounted
                            open={Boolean(this.state.curr_target)} // state
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/RawDataExplorer">Explore Raw Data</Link>
                                </li>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ClusterExplorer">Explore Clustered Data</Link>
                                </li>
                            </MenuItem>
                        </Menu>
                    </div>
                    <li className="nav-item">
                        <Link className="nav-link" to="/QueryFinder">Find Similar Sequences</Link>
                    </li>
                </ul>
            </nav>*/
        );
    }
}

export default withRouter(NavBar);
