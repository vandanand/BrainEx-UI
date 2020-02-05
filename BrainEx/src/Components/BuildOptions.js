import React , { Component } from "react";
import '../Stylesheets/BuildOptions.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// todo use Material-UI tooltip
import Slider, { Range } from 'rc-slider';
import $ from 'jquery';
import 'rc-slider/assets/index.css';

class BuildOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_val: 5,
            distance_val: "eu",
            sim_val: 0, /*[0:1]*/ /*todo get the desired default value*/
            loi_val: [0, 100], /*[0:max length]*/ /*todo change this to pull in the length of the longest time series*/
            spark_val: true, /*todo should the default be yes/true?*/
            num_workers: 3, /*todo get default value*/
            dm_val: 0, /*todo get default values for spark memory*/
            mrm_val: 0
        };
        this.update_feature = this.update_feature.bind(this);
        this.update_distance = this.update_distance.bind(this);
        this.update_sim = this.update_sim.bind(this);
        this.update_loi = this.update_loi.bind(this);
        this.update_spark = this.update_spark.bind(this);
        this.update_nw = this.update_nw.bind(this);
        this.update_dm = this.update_dm.bind(this);
        this.update_mrm = this.update_mrm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // spark options listener -- toggles display of additional options using a button/link
        $("#spark_toggle").click(function(){
            $(".advanced_spark").toggle();
            if ($(".advanced_spark").is(":visible")) {
                $(".display").hide();
                $(".hide").show();
            } else {
                $(".display").show();
                $(".hide").hide();
            }
        });
    }

    // dynamically update feature number value in state
    update_feature = (e) => {
        const feature_val = e.target.value;
        this.setState({
            feature_val: feature_val
        });
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
    update_sim = (e) => {
        const sim_val = e;
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

    // dynamically update state of "use spark?" checkbox (checked/unchecked)
    update_spark = (e) => {
        const spark_val = e.target.checked;
        this.setState({
            spark_val: spark_val
        });
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
        const form_data = this.state;
        // send form info where it needs to go here (use state values)
        console.log("child about to send info");
        this.props.submit_form(form_data);
        this.props.history.push('/BuildProgressMenu'); // proceed to next page once information has been passed
    };

    render() {
        return(
            <div className="full-height">
                <form className="build_form" onSubmit={this.handleSubmit}>
                    <table>
                        <tbody>
                        {/*form input 1*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <label htmlFor="feature_num">Feature Number:</label>
                            </td>
                            <td className="form_input">
                                <input
                                    className="form-control"
                                    type="number"
                                    value={this.state.feature_val}
                                    id="feature_num"
                                    onChange={this.update_feature}/>
                            </td>
                        </tr>
                        {/*form input 2*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <label htmlFor="distance_type">Distance Type:</label>
                            </td>
                            <td className="form_input">
                                <select
                                    className="form-control"
                                    id="distance_type"
                                    value={this.state.distance_val}
                                    onChange={this.update_distance}>
                                    <option value="eu">Warped Euclidean</option>
                                    <option value="ma">Warped Manhattan</option>
                                    <option value="mi">Warped Minkowski</option>
                                    <option value="ch">Warped Chebyshev</option>
                                </select>
                            </td>
                        </tr>
                        {/*form input 3*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <label htmlFor="sim_thresh">Similarity Threshold:</label>
                            </td>
                            <td className="form_input is_range">
                                <span className="font-weight-bold indigo-text">0%</span>
                                {/*todo update "defaultValue" to be recommended similarity threshold */}
                                <Slider
                                    id="sim_thresh"
                                    value={this.state.sim_val}
                                    min={0}
                                    max={100}
                                    onChange={this.update_sim}
                                />
                                <span className="font-weight-bold indigo-text">{this.state.sim_val}%</span>
                            </td>
                        </tr>
                        {/*form input 4*/}
                        <tr className="form-group">
                            {/*todo range "max" will have to be dynamically set by passing props from
                                    SelectADataset into BuildOptions state */}
                            {/*todo update "defaultValue" to be same as max */}
                            <td className="form_label">
                                <label htmlFor="loi">Length of Interest:</label>
                            </td>
                            <td className="form_input is_range">
                                <span className="font-weight-bold indigo-text">{this.state.loi_val[0]}</span>
                                <Range
                                    id="loi"
                                    value={this.state.loi_val}
                                    min={0}
                                    max={100}
                                    onChange={this.update_loi}
                                />
                                <span className="font-weight-bold indigo-text">{this.state.loi_val[1]}</span>
                            </td>
                        </tr>
                        {/*form input 5*/}
                        <tr className="form-group">
                            <td className="form_label">
                                <label htmlFor="use_spark">Use Spark:</label>
                            </td>
                            <td className="form_input is_check">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="use_spark"
                                    checked={this.state.spark_val}
                                    onChange={this.update_spark}/>
                                <Button id="spark_toggle" className="btn" variant="link">
                                    <p className="display">Display advanced Spark options</p>
                                    <p className="hide">Hide advanced Spark options</p>
                                </Button>
                            </td>
                        </tr>
                        {/*advanced spark form options*/}
                        <tr className="advanced_spark">
                            <td className="spark-options" colSpan={2}>
                                <div className="left-element">
                                    <label>Number of Workers</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={this.state.num_workers}
                                        id="driver_mem"
                                        onChange={this.update_nw}/>
                                </div>
                                <div className="middle-element">
                                    <label>Driver Memory</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={this.state.dm_val}
                                        id="driver_mem"
                                        onChange={this.update_dm}/>
                                </div>
                                <div className="right-element">
                                    <label>Max Result Memory</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={this.state.mrm_val}
                                        id="max_result_mem"
                                        onChange={this.update_mrm}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to="/SelectNewDataset" className="back btn btn-secondary">
                                    Back
                                </Link>
                                <Button className="start btn btn-primary" type="submit">Start Preprocessing</Button>
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
