import React, { Component } from "react";
import {Link as RouterLink} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../Stylesheets/BuildProgressMenu.css";
import {Link, ButtonGroup, Typography, LinearProgress } from '@material-ui/core';
import $ from "jquery";
import {query_page, data_exp, build_options, root} from "../data/default_values";

class BuildProgressMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: this.props.form_data,
        };
    }

    componentDidMount() {
        $(".info").click(function(){
            if ($(".in-progress").is(":visible")) {
                $(".display-this").hide();
                $(".hide-this").show();
            } else {
                $(".display-this").show();
                $(".hide-this").hide();
            }
        });
    }

    render() {
        return (
            <div className="full-height">
                {/*display when build is in progress*/}
                <div className="prog-content in-progress display-this">
                    <LinearProgress className="progress" />
                    <Typography className="prog-item" variant="h4">Preprocessing is currently in progress</Typography>
                    <ButtonGroup className="prog-item">
                        <Link
                            className="btn btn-secondary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={root}>
                            Return to Home Page
                        </Link>
                        <Link
                            className="btn btn-secondary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={build_options}>
                            Cancel
                        </Link>
                    </ButtonGroup>
                </div>
                {/*display below is for when build is finished*/}
                <div className="prog-content finished hide-this">
                    <LinearProgress variant="determinate" value={100} className="progress"/>
                    <Typography className="prog-item" variant="h4">Preprocessing stage is complete!</Typography>
                    {/*todo by Sequences does she mean lines of data?*/}
                    <Typography className="prog-item" variant="h4">Sequences Processed: N/A</Typography>
                    <ButtonGroup className="prog-item">
                        <Link
                            className="btn btn-secondary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={root}>
                            Restart with another dataset
                        </Link>
                        <Link
                            className="btn btn-primary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={data_exp}>
                            Explore loaded data
                        </Link>
                        <Link
                            className="btn btn-primary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={query_page}>
                            Find Similar Sequences
                        </Link>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default BuildProgressMenu;
