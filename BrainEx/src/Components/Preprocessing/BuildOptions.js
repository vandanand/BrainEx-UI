import React , { Component } from "react";
import '../../Stylesheets/BuildOptions.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
    TextField,
    Select,
    MenuItem,
    Checkbox,
    Button,
    Link,
    InputLabel,
    DialogTitle,
    DialogContent, Typography, DialogActions, Dialog
} from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import $ from 'jquery';
import axios from 'axios';
import Input from "@material-ui/core/Input";
import { default_dv, default_st, default_spark, default_sv, default_nw, default_dm, default_mrm, build_progress, select_new_dataset } from "../../data/default_values";
import BuildProgressMenu from "./BuildProgressMenu.js";
import FormData from "form-data";

class BuildOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // feature_val: 5,
            distance_val: default_dv,
            sim_val: default_st, /*[0:1]*/
            loi_val: (this.props.location.state !== undefined) ? [1, this.props.location.state.loi_max] : [1, 100], /*[0:max length]*/
            loi_max: (this.props.location.state !== undefined) ? this.props.location.state.loi_max : 100,
            spark_val: default_sv,
            spark_installed: default_spark,
            num_workers: default_nw,
            dm_val: default_dm,
            mrm_val: default_mrm,
            file: (this.props.location.state !== undefined) ? this.props.location.state.file : {
                "name": "Bqrzgwyjeumizp.csv",
                "lastModified": "7112684915113",
                "lastModifiedDate": "7/9/2019",
                "webkitRelativePath": null,
                "size": 597813,
                "maxValue": 215
            }
        };
        this.update_distance = this.update_distance.bind(this);
        this.update_sim_range = this.update_sim_range.bind(this);
        this.update_sim_text = this.update_sim_text.bind(this);
        this.update_loi = this.update_loi.bind(this);
        this.update_loi_start = this.update_loi_start.bind(this);
        this.update_loi_end = this.update_loi_end.bind(this);
        this.update_spark = this.update_spark.bind(this);
        this.update_nw = this.update_nw.bind(this);
        this.update_dm = this.update_dm.bind(this);
        this.update_mrm = this.update_mrm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleOptions = this.toggleOptions.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toggleOptions = (e) => {
        $(".advanced_spark").toggle();
        if ($(".advanced_spark").is(":visible")) {
            $(".display-this").hide();
            $(".hide-this").show();
        } else {
            $(".display-this").show();
            $(".hide-this").hide();
        }
    };

    // dynamically update distance type value in state
    update_distance = (e) => {
        const distance_val = e.target.value;
        this.setState({
            distance_val: distance_val
        });
    };

    // dynamically update similarity threshold value shown to user
    // value from Slider component is stored in e, not e.target.value
    update_sim_range = (e) => {
        const sim_val = e;
        this.setState({
            sim_val: sim_val
        });
    };
    update_sim_text = (e) => {
        const sim_val = parseFloat(e.target.value);
        this.setState({
            sim_val: sim_val
        });
    };

    // dynamically update length of interest value shown to user
    // value from Range component is stored in e, not e.target.value
    update_loi = (e) => {
        const loi_val = e;
        this.setState({
            loi_val: loi_val
        });
    };
    update_loi_start = (e) => {
        const loi_start = parseFloat(e.target.value);
        const loi_end = this.state.loi_val[1];
        this.setState({
            loi_val: [loi_start, loi_end]
        });
    };
    update_loi_end = (e) => {
        const loi_start = this.state.loi_val[0];
        const loi_end = parseFloat(e.target.value);
        this.setState({
            loi_val: [loi_start, loi_end]
        });
    };

    // dynamically update state of "use spark?" checkbox (checked/unchecked)
    // todo @Kyra -> make api call to test spark -- return "spark is properly installed" or the error
    update_spark = (e) => {
        const spark_val = e.target.checked;
        if (spark_val && !this.state.spark_installed) { // if the user wants spark and we have not checked if it is installed
            axios.post('http://localhost:5000/checkSpark')
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.setState({
                            spark_installed: true,
                            spark_val: spark_val
                        }, () => {
                            console.log(response.data);
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.openModal(error);
                });
        }
    };
    // dynamically update number of workers/cores value in state
    update_nw = (e) => {
        const num_workers = e.target.value;
        this.setState({
            num_workers: num_workers
        });
    };
    // dynamically update driver memory value in state
    update_dm = (e) => {
        const dm_val = e.target.value;
        this.setState({
            dm_val: dm_val
        });
    };
    // dynamically update max result memory value in state
    update_mrm = (e) => {
        const mrm_val = e.target.value;
        this.setState({
            mrm_val: mrm_val
        });
    };

    // submit the content to the parent component (App.js) and proceed to the next page (BuildProgressMenu.js)
    handleSubmit = (e) => {
        e.preventDefault();
        const form_data = Object.assign({}, this.state);
        console.log(form_data);
        // convert spark true/false to 1/0 for backend
        form_data.spark_val = (form_data.spark_val) ? "1" : "0";
        // convert form data elements to strings for parsing in the backend
        form_data.num_workers = form_data.num_workers.toString();
        form_data.dm_val = form_data.dm_val.toString();
        form_data.mrm_val = form_data.mrm_val.toString();
        form_data.sim_val = form_data.sim_val.toString();
        form_data.loi_val = form_data.loi_val.toString();
        // todo form_data.current_file = form_data.current_file.toString();
        // console.log(form_data);
        // send form info where it needs to go here (use state values)
        this.props.history.push(build_progress, {
            form_data: form_data,
            loi_min: this.state.loi_val[0],
            loi_max: this.state.loi_val[1]
        }); // proceed to next page once information has been passed
    };

    // functions for opening and closing spark modal
    openModal = (message) => {
        this.setState({
            open: true,
            message: message
        });
    };
    closeModal = () => {
        this.setState({
           open: false,
           message: null
        });
    };

    render() {
        return(
            <div className="full-height">
                <Dialog className="dialog" open={this.state.open} onClose={this.closeModal}>
                    <DialogTitle id="alert-dialog-title">{this.state.message}</DialogTitle>
                    <DialogContent>
                        <Typography id="alert-dialog-description">
                            Spark must be properly installed on this computer to be able to access this feature.
                            (note: include directions towards resources on how to do this)
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <form className="build_form" onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        {/*form input 2*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <InputLabel htmlFor="distance_type">Distance Type:</InputLabel>
                            </td>
                            <td className="form_input">
                                <Select
                                    id="distance_type"
                                    value={this.state.distance_val}
                                    onChange={this.update_distance}
                                >
                                    <MenuItem value="eu">Warped Euclidean</MenuItem>
                                    <MenuItem value="ma">Warped Manhattan</MenuItem>
                                    <MenuItem value="mi">Warped Minkowski</MenuItem>
                                    <MenuItem value="ch">Warped Chebyshev</MenuItem>
                                </Select>
                            </td>
                        </tr>
                        {/*form input 3*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <InputLabel htmlFor="sim_thresh">Similarity Threshold:</InputLabel>
                            </td>
                            <td className="form_input is_range">
                                <Slider
                                    id="sim_thresh"
                                    value={this.state.sim_val}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onChange={this.update_sim_range}
                                />
                                {/* hitting enter with cursor in TextField submits form - is this still true?*/}
                                <TextField
                                    className="percent_text"
                                    id="sim_thresh"
                                    type="number"
                                    value={this.state.sim_val}
                                    onChange={this.update_sim_text}
                                    inputProps={{
                                        style: {width: 65},
                                        max: 1,
                                        min: 0,
                                        step: 0.01
                                    }}
                                />
                            </td>
                        </tr>
                        {/*form input 4*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <InputLabel htmlFor="loi">Length of Interest:</InputLabel>
                            </td>
                            <td className="form_input is_range">
                                <TextField
                                    label="start"
                                    id="loi"
                                    inputProps={{
                                        step: 0.1,
                                        min: 1,
                                        max: this.state.loi_max,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    value={this.state.loi_val[0]}
                                    onChange={this.update_loi_start}
                                />
                                <Range
                                    id="loi"
                                    value={this.state.loi_val}
                                    step={0.1}
                                    min={1}
                                    max={this.state.loi_max}
                                    onChange={this.update_loi}
                                />
                                <Input
                                    label="end"
                                    id="loi"
                                    inputProps={{
                                        step: 0.1,
                                        min: 1,
                                        max: this.state.loi_max,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    value={this.state.loi_val[1]}
                                    onChange={this.update_loi_end}
                                />
                            </td>
                        </tr>
                        {/*form input 7*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <InputLabel htmlFor="num_workers">Number of Workers</InputLabel>
                            </td>
                            <td className="form_input">
                                <TextField
                                    id="num_workers"
                                    type="number"
                                    InputProps={{inputProps: {min: 0}}}
                                    value={this.state.num_workers}
                                    onChange={this.update_nw}/>
                            </td>
                        </tr>
                        {/*form input 6*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <InputLabel htmlFor="use_spark">Preprocess Using Spark:</InputLabel>
                            </td>
                            <td className="form_input is_check">
                                <Checkbox
                                    id="use_spark"
                                    color="primary"
                                    checked={this.state.spark_val}
                                    onChange={this.update_spark}
                                />
                                <Button id="spark_toggle" color="primary" onClick={this.toggleOptions}>
                                    <p className="display-this">Display advanced Spark options</p>
                                    <p className="hide-this">Hide advanced Spark options</p>
                                </Button>
                            </td>
                        </tr>
                        {/*advanced spark form options*/}
                        <tr className="advanced_spark">
                            <td className="spark-options" colSpan={2}>
                                <div className="left-element">
                                    <InputLabel>Driver Memory</InputLabel>
                                    <TextField
                                        id="driver_mem"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        value={this.state.dm_val}
                                        onChange={this.update_dm}
                                    />
                                    <span className="font-weight-bold indigo-text">GB</span>
                                </div>
                                <div className="right-element">
                                    <InputLabel>Max Result Memory</InputLabel>
                                    <TextField
                                        id="max_result_mem"
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                        value={this.state.mrm_val}
                                        onChange={this.update_mrm}
                                    />
                                    <span className="font-weight-bold indigo-text">GB</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link
                                    className="back btn btn-secondary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to={select_new_dataset}>
                                    Back
                                </Link>
                                <Button className="start" variant="contained" color="primary" type="submit">
                                    Start Preprocessing
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default BuildOptions;
