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
            loi_val: 100 /*[0:max length]*/ /*todo change this to pull in the length of the longest time series*/
        };
        this.update_feature = this.update_feature.bind(this);
        this.update_distance = this.update_distance.bind(this);
        this.update_sim = this.update_sim.bind(this);
        this.update_loi = this.update_loi.bind(this);
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
                <form className="row no-gutters" onSubmit={this.handleSubmit}>
                    <div className="col no-gutters d-flex justify-content-center">{/*general build options*/}
                        <div className="build_form left-side">
                            {/*form input 1*/}
                            <div className="form-group d-flex justify-content-sm-around">
                                <label className="form_label" htmlFor="feature_num">Feature Number:</label>
                                <input className="form-control" type="number" value={this.state.feature_val} id="feature_num" onChange={this.update_feature}/>
                            </div>
                            {/*form input 2*/}
                            <div className="form-group d-flex justify-content-sm-around">
                                <label className="form_label" htmlFor="distance_type">Distance Type:</label>
                                <select className="form-control" id="distance_type" value={this.state.distance_val} onChange={this.update_distance}>
                                    <option value="eu">Warped Euclidean</option>
                                    <option value="ma">Warped Manhattan</option>
                                    <option value="mi">Warped Minkowski</option>
                                    <option value="ch">Warped Chebyshev</option>
                                </select>
                            </div>
                            {/*form input 3*/}
                            <div className="form-group range-field d-flex justify-content-sm-around">
                                <label className="form_label" htmlFor="sim_thresh">Similarity Threshold:</label>
                                <span className="font-weight-bold indigo-text">0%</span>
                                {/*todo update "defaultValue" to be recommended similarity threshold */}
                                <input type="range" className="custom-range" id="sim_thresh" min="0" max="100" value={this.state.sim_val} onChange={this.update_sim}/>
                                <span className="font-weight-bold indigo-text">{this.state.sim_val}%</span>
                            </div>
                            {/*form input 4*/}
                            <div className="form-group range-field d-flex justify-content-sm-around">
                                {/*todo range "max" will have to be dynamically set by passing props from
                                    SelectADataset into BuildOptions state */}
                                {/*todo update "defaultValue" to be same as max */}
                                <label className="form_label" htmlFor="loi">Length of Interest:</label>
                                <span className="font-weight-bold indigo-text">0</span>
                                <input type="range" className="custom-range" id="loi" min="0" max="100" value={this.state.loi_val} onChange={this.update_loi}/>
                                <span className="font-weight-bold indigo-text">{this.state.loi_val}</span>
                            </div>
                            {/*form input 5*/}
                            <div className="form-group range-field d-flex justify-content-sm-around">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="use-spark">Use Spark</label>
                                    <input className="form-check-input" type="checkbox" value="" id="use-spark"/>
                                </div>
                                <button type="button" id="formButton">Toggle Form!</button>
                                {/*
                                <li><a class="toggle">Toggle Edit Mode</a>
                                $(".toggle").click(function () {
                                   $("div").toggleClass("hidden unhidden");
                                }*/}
                                {/*also this: https://www.pair.com/support/kb/how-to-use-jquery-to-show-hide-a-form-on-click/*/}
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters d-flex justify-content-center">
                        {/*right side*/}
                        {/*advanced spark options*/}
                        {/*appears when advanced options is toggled on*/}
                        <div className="build-form right-side">
                            <p>This is my form</p>
                        </div>
                    </div>
                    <div className="build-btns">
                        <Link to="/SelectNewDataset" className="back btn btn-secondary">
                            Back
                        </Link>
                        <Button className="start btn btn-primary" type="submit">Start Preprocessing</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default BuildOptions;
