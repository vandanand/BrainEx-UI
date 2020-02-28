import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, withRouter, Switch } from "react-router-dom";
import '../../Stylesheets/NavBar.css';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import RawDataExplorer from "../RawDataExplorer";
import ClusterExplorer from "../ClusterExplorer";
import QueryFinder from "../QueryFinder";
import Home from "../Preprocessing/Home";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import {cluster_exp, data_exp, query_page, root} from "../../data/default_values";
import axios from "axios";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

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
        this.goToQuery = this.goToQuery.bind(this);
    }

    goHome = (e) => {
      axios.post('http://localhost:5000/restart')
          .then((response) => {
              console.log(response);
          })
          .catch(function (error) {
              console.log(error);
          });
        this.props.history.push(root);
    };

    goToQuery = (e) => {
        this.props.history.push(query_page);
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
                            <Button onClick={this.goHome}>
                                <Typography className="nav_text">Home</Typography>
                            </Button>
                        </li>
                        <div className="nav-item">
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                                <Typography className="nav_text">Explore Data</Typography>
                            </Button>
                            <StyledMenu id="simple-menu" anchorEl={this.state.curr_target} keepMounted open={Boolean(this.state.curr_target)} onClose={this.handleClose}>
                                <MenuItem onClick={this.handleClose}>
                                        <Link className="nav-link" to={data_exp}>
                                            <Typography className="dd_text">Explore Raw Data</Typography>
                                        </Link>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose}>
                                        <Link className="nav-link" to={cluster_exp}>
                                            <Typography className="dd_text">Explore Clustered Data</Typography>
                                        </Link>
                                </MenuItem>
                            </StyledMenu>
                        </div>
                        <li className="nav-item">
                            <Button onClick={this.goToQuery}>
                                <Typography className="nav_text">Find Similar Sequences</Typography>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(NavBar);
