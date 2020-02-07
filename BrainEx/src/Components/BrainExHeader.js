import React, {Component} from 'react';
import logo from "../brain.png";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

class BrainExHeader extends Component {

    render() {
        return(
            <AppBar position="static">
                <Toolbar className="info">
                    <div className="logo"><img src={logo}  alt="logo"/></div>
                    <Typography className="title" variant="h1">BrainEx</Typography>
                    <Typography className="version" variant="h3">Version 1.0.0</Typography>
                </Toolbar>
            </AppBar>
            /*<div className="header">
                <div className="info">
                    <div className="logo"><img src={logo}  alt="logo"/></div>
                    <h1 className="title">BrainEx</h1>
                    <h3 className="version">Version 1.0.0</h3>
                </div>
            </div>*/
        );
    }
}

export default BrainExHeader;