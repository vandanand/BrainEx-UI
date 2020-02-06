import React, { Component } from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Stylesheets/BuildProgressMenu.css";
import ProgressBar from 'react-bootstrap/ProgressBar'

// todo -- my concern: refreshing the page makes the form data disappear. user will lose progress if they refresh the window.
//  how to get around this? looking into it but it is not a priority until we know what server/storage specs we have...

class BuildProgressMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: this.props.form_data,
            progress: 60
        };
    }

    render() {
        return (
            <div className="full-height"> {/* todo replace any height: 100% with "full-height" class on App.css */}
                <div className="prog-content">
                    {/*todo make it so progress bar quickly finishes*/}
                    {/*todo make certain versions of the screen show depending on the value of "now" (is it done or not?)*/}
                    <ProgressBar animated now={this.state.progress} label={`${this.state.progress}%`} />
                    {/*below is for when build is finished*/}
                    <h5 className="prog-item">Preprocessing stage is complete!</h5>
                    <h5 className="prog-item">Sequences Processed: N/A </h5>
                    <div className="prog-item">
                        <Link to="/" className="btn btn-secondary">
                            Restart with another dataset
                        </Link>
                        <Link to="/ExploreClusters" className="btn btn-secondary">
                            Explore loaded data
                        </Link>
                        <Link to="/QueryFinder" className="btn btn-primary">
                            Find Similar Sequences
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildProgressMenu;
