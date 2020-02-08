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
        );
    }
}

export default BrainExHeader;