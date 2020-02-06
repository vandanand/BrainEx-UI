import React, {Component} from 'react';
import logo from "../brain.png";

class BrainExHeader extends Component {

    render() {
        return(
            <div className="header">
                <div className="info">
                    <div className="logo"><img src={logo}  alt="logo"/></div>
                    <h1 className="title">BrainEx</h1>
                    <h3 className="version">Version 1.0.0</h3>
                </div>
            </div>
        );
    }
}

export default BrainExHeader;