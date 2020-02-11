import React, {Component} from 'react';
import logo from "../brain.png";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

/*todo here is another way to apply styles without using !important. we could have a document for each type of element to store the styles
*  and apply the styles that way (similar to classes.root) */
const appStyles = {
  bg_color: {
    backgroundColor: "#0f5298"
  }
};

class BrainExHeader extends Component {

    render() {
        return(
            <AppBar position="static">
                <Toolbar className="info" style={appStyles.bg_color}>
                    <div className="logo"><img src={logo}  alt="logo"/></div>
                    <Typography className="title" variant="h1">BrainEx</Typography>
                    <Typography className="version" variant="h3">Version 1.0.0</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default BrainExHeader;