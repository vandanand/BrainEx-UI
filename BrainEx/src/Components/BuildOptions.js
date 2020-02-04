import React , { Component } from "react";
import '../Stylesheets/BuildOptions.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
// todo use Material-UI tooltip
import { FaRegQuestionCircle } from 'react-icons/fa';

class BuildOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_val: 5,
            distance_val: "eu",
            sim_val: 0, /*[0:1]*/ /*todo get the desired default value*/
            loi_val: 100, /*[0:max length]*/ /*todo change this to pull in the length of the longest time series*/
            spark_val: true /*todo should the default be yes/true?*/
        };
        this.update_feature = this.update_feature.bind(this);
        this.update_distance = this.update_distance.bind(this);
        this.update_sim = this.update_sim.bind(this);
        this.update_loi = this.update_loi.bind(this);
        this.update_spark = this.update_spark.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // add any listeners here (ones that refer to DOM elements)
    }

    update_feature = (e) => {
        const feature_val = e.target.value;
        this.setState({
            feature_val: feature_val
        });
    };

    update_distance = (e) => {
        const distance_val = e.target.value;
        this.setState({
            distance_val: distance_val
        });
    };

    // dynamically update similarity threshold value shown to user
    update_sim = (e) => {
        const sim_val = e.target.value;
        this.setState({
            sim_val: sim_val
        });
    };

    // dynamically update length of interest value shown to user
    update_loi = (e) => {
        const loi_val = e.target.value;
        this.setState({
            loi_val: loi_val
        });
    };

    update_spark = (e) => {
        const spark_val = e.target.checked;
        this.setState({
            spark_val: spark_val
        });
    };

    // submit the content to the parent component (App.js) and proceed to the next page
    handleSubmit = (e) => {
        e.preventDefault();
        // send form info where it needs to go here (use state values)
        console.log("child about to send info");
        this.props.submit_form(this.state);
        this.props.history.push('/BuildProgressMenu'); // proceed to next page once information has been passed
    };

    render() {
        return(
            <div className="full-height">
                <form className="build_form" onSubmit={this.handleSubmit}>
                    {/*form input 1*/}
                    <tr className="form-group">
                        <td className="form_label">
                            <label className="fl" htmlFor="feature_num">Feature Number:</label>
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
                            <label className="fl" htmlFor="distance_type">Distance Type:</label>
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
                            <label className="fl" htmlFor="sim_thresh">Similarity Threshold:</label>
                        </td>
                        <td className="form_input is_range">
                            <span className="font-weight-bold indigo-text">0%</span>
                            {/*todo update "defaultValue" to be recommended similarity threshold */}
                            <input
                                type="range"
                                className="custom-range"
                                id="sim_thresh"
                                min="0" max="100"
                                value={this.state.sim_val}
                                onChange={this.update_sim}/>
                            <span className="font-weight-bold indigo-text">{this.state.sim_val}%</span>
                        </td>
                    </tr>
                    {/*form input 4*/}
                    <tr className="form-group">
                        {/*todo range "max" will have to be dynamically set by passing props from
                                    SelectADataset into BuildOptions state */}
                        {/*todo update "defaultValue" to be same as max */}
                        <td className="form_label">
                            <label className="fl" htmlFor="loi">Length of Interest:</label>
                        </td>
                        <td className="form_input is_range">
                            <span className="font-weight-bold indigo-text">0</span>
                            <input
                                type="range"
                                className="custom-range"
                                id="loi"
                                min="0" max="100"
                                value={this.state.loi_val}
                                onChange={this.update_loi}/>
                            <span className="font-weight-bold indigo-text">{this.state.loi_val}</span>
                        </td>
                    </tr>
                    {/*form input 5*/}
                    <tr className="form-group">
                        <td className="form_label">
                            <label className="fl" htmlFor="use_spark">Use Spark:</label>
                        </td>
                        {/*todo should the default be spark or no spark*/}
                        <td className="form_input">
                            <div className="form-check">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="use_spark"
                                    checked={this.state.spark_val}
                                    onChange={this.update_spark}/>
                            </div>
                            
                        </td>
                        <div className="advanced_spark">
                            {/*
                    driver_mem = int(request.form['driver_mem'])
                    max_result_mem = int(request.form['max_result_mem'])
                            */}
                        </div>
                        {/*https://www.pair.com/support/kb/how-to-use-jquery-to-show-hide-a-form-on-click/*/}
                    </tr>
                    <tr>
                        <Link to="/SelectNewDataset" className="back btn btn-secondary">
                            Back
                        </Link>
                        <Button className="start btn btn-primary" type="submit">Start Preprocessing</Button>
                    </tr>
                </form>
            </div>
        );
    }
}

export default BuildOptions;
