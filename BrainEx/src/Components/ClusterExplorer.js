import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class ClusterExplorer extends Component {
    render() {
        console.log("we are in ClusterExplorer")
        return(
            //todo template
            <div>
                <h1>Clusters</h1>
            </div>
        );
    }
}

export default withRouter(ClusterExplorer);