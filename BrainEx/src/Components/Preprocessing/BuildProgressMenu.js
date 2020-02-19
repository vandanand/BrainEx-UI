import React, { Component } from "react";
import {Link as RouterLink} from "react-router-dom";
import "../../Stylesheets/BuildProgressMenu.css";
import {Link, ButtonGroup, Typography, LinearProgress,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import $ from "jquery";
import {query_page, data_exp, build_options, root} from "../../data/default_values";
import Button from "@material-ui/core/Button";
import {homepage} from "d3/dist/package";

class BuildProgressMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form_data: this.props.form_data,
            loi_min: this.props.location.state.loi_min,
            loi_max: this.props.location.state.loi_max,
            open: false,
            message: null,
            mode: null
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.cancelPreprocessing = this.cancelPreprocessing.bind(this);
    }

    componentDidMount() {
        // for debugging
        console.log(this.state.loi_min);
        console.log(this.state.loi_max);

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

    openModal = (mode) => {
        let message = "";
        if (mode === "cancel") {
            message = "Cancel preprocessing and return to previous page?";
        } else if (mode === "home") {
            message = "Cancel preprocessing and return to the home page?"
        } else {
            console.log("Invalid modal mode.");
        }
        return (e) => {
            this.setState({
                open: true,
                message: message,
                mode: mode
            });
        }
    };

    // reset all modal state values to close modal
    closeModal = () => {
        this.setState({
            open: false,
            message: null,
            mode: null
        });
    };

    // cancel preprocessing, close modal and go to next page
    // todo @Kyra cancel preprocessing here
    cancelPreprocessing = () => {
        let mode = this.state.mode;
        this.closeModal();
        console.log("preprocessing \"cancelled\".");
        if (mode === "cancel") {
            // return to previous screen
            this.props.history.push(build_options);
        } else if (mode === "home") {
            // return to home
            this.props.history.push(root);
        } else {
            console.log("invalid modal mode.")
        }
    };

    render() {
        return (
            <div className="full-height">
                {/* DIALOG MODAL FOR CANCELLING PREPROCESSING */}
                <Dialog className="dialog" open={this.state.open} onClose={this.closeModal}>
                    <DialogTitle className="prog-item" id="alert-dialog-title">{this.state.message}</DialogTitle>
                    <DialogContent>
                        <Typography className="prog-item" id="alert-dialog-description">
                            Clicking "yes" will cancel the preprocessing that is currently running and
                            send you to the page indicated above.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            No
                        </Button>
                        <Button onClick={this.cancelPreprocessing} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/*display when build is in progress*/}
                <div className="prog-content in-progress display-this">
                    <LinearProgress className="progress" />
                    <Typography className="prog-item" variant="h4">Preprocessing is currently in progress</Typography>
                    <ButtonGroup className="prog-item">
                        {/*<Link
                            className="btn btn-secondary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={root}>
                            Return to Home Page
                        </Link>*/}
                        <Button className="btn btn-secondary" color="default" onClick={this.openModal("home")}>
                            Cancel and return to home
                        </Button>
                        <Button className="btn btn-secondary" color="default" onClick={this.openModal("cancel")}>
                            Cancel
                        </Button>
                        {/*<Link
                            className="btn btn-secondary"
                            variant="button"
                            color="default"
                            underline="none"
                            component={RouterLink}
                            to={build_options}>
                            Cancel
                        </Link>*/}
                    </ButtonGroup>
                </div>
                {/*display below is for when build is finished*/}
                <div className="prog-content finished hide-this">
                    <LinearProgress variant="determinate" value={100} className="progress"/>
                    <Typography className="prog-item" variant="h4">Preprocessing stage is complete!</Typography>
                    {/*todo by Sequences does she mean lines of data?*/}
                    {/*<Typography className="prog-item" variant="h4">Sequences Processed: N/A</Typography>*/}
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
                            to={{
                                pathname: `${query_page}`,
                                state: {
                                    loi_max: this.state.loi_max,
                                    loi_min: this.state.loi_min
                                }}}>
                            Find Similar Sequences
                        </Link>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default BuildProgressMenu;
