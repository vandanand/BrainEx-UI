import React, { Component } from "react";
import {Link as RouterLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Stylesheets/BuildProgressMenu.css";
import {Link, ButtonGroup, Typography, LinearProgress } from '@material-ui/core';
import $ from "jquery";

// todo -- my concern: refreshing the page makes the form data disappear. user will lose progress if they refresh the window.
//  how to get around this? looking into it but it is not a priority until we know what server/storage specs we have...

class BuildProgressMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: this.props.form_data,
        };
    }

    componentDidMount() {
        $(".title").click(function(){
            if ($(".in-progress").is(":visible")) {
                $(".display").hide();
                $(".hide").show();
            } else {
                $(".display").show();
                $(".hide").hide();
            }
        });
    }

    render() {
        return (
            <div className="full-height"> {/* todo replace any height: 100% with "full-height" class on App.css */}
                    {/*todo make it so progress bar quickly finishes*/}
                    {/*todo make certain versions of the screen show depending on the value of "now" (is it done or not?)*/}
                    {/*display when build is in progress*/}
                    <div className="prog-content in-progress display">
                        <LinearProgress className="progress" />
                        <Typography className="prog-item" variant="h6">Preprocessing is currently in progress</Typography>
                        <ButtonGroup className="prog-item">
                            <Link
                                className="btn btn-secondary"
                                variant="button"
                                color="default"
                                underline="none"
                                component={RouterLink}
                                to="/">
                                Return to Home Page
                            </Link>
                            <Link
                                className="btn btn-secondary"
                                variant="button"
                                color="default"
                                underline="none"
                                component={RouterLink}
                                to="/BuildOptions">
                                Cancel
                            </Link>
                        </ButtonGroup>
                    </div>
                    {/*display below is for when build is finished*/}
                    <div className="prog-content finished hide">
                        <LinearProgress variant="determinate" value={100} className="progress"/>
                        <Typography className="prog-item" variant="h6">Preprocessing stage is complete!</Typography>
                        {/*todo by Sequences does she mean lines of data?*/}
                        <Typography className="prog-item" variant="h6">Sequences Processed: N/A</Typography>
                        <ButtonGroup className="prog-item">
                            <Link
                                className="btn btn-secondary"
                                variant="button"
                                color="default"
                                underline="none"
                                component={RouterLink}
                                to="/">
                                Restart with another dataset
                            </Link>
                            <Link
                                className="btn btn-primary"
                                variant="button"
                                color="default"
                                underline="none"
                                component={RouterLink}
                                to="/ExploreClusters">
                                Explore loaded data
                            </Link>
                            <Link
                                className="btn btn-primary"
                                variant="button"
                                color="default"
                                underline="none"
                                component={RouterLink}
                                to="/QueryFinder">
                                Find Similar Sequences
                            </Link>
                        </ButtonGroup>
                    </div>
            </div>
        );
    }
}

export default BuildProgressMenu;
