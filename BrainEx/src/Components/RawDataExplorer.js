import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class RawDataExplorer extends Component {
    render() {
        console.log("we are in RawDataExplorer");
        return(
            <div>
                <h1>Raw Data</h1>
            </div>
        );
    }
}

export default withRouter(RawDataExplorer);