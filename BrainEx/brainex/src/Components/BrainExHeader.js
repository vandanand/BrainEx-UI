import React, {Component} from 'react';
import NavBar from './NavBar'
import logo from "../brain.png";

class BrainExHeader extends Component {

    render() {
        // style={{backgroundColor: '#3C99DC', width: '100%', height: '17%', position: 'absolute', left:'0.01%', top:'0%'}}
        // style={{position:'absolute', top:'39%', left:'48%'}}
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