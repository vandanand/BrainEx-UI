import React , { Component } from "react";
import '../Stylesheets/BuildOptions.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import MappleToolTip from 'reactjs-mappletooltip';
import { FaQuestionCircle } from 'react-icons/fa';

class BuildOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_val: 5,
            distance_val: "eu",
            sim_val: 0, /*todo get the desired default value*/
            loi_val: 100 /*todo change this to pull in the length of the longest time series*/
        }
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

    handleSubmit = (e) => {
        e.preventDefault();
        // send form info where it needs to go here (use state values)
        console.log(this.state); // print for debugging
        console.log("child about to send info");
        this.props.submit_form(this.state);
        this.props.history.push('/BuildProgressMenu'); // proceed to next page once information has been passed
    }

    render() {
        return(
            <div className="d-flex justify-content-center" style={{height: "calc(100% - 75px)"}}>
                <form className="build_form" onSubmit={this.handleSubmit}>
                    <div className="form-group d-flex justify-content-center">
                        <label className="form_label" htmlFor="feature_num">Feature Number:</label>
                        <input className="form-control" type="number" value={this.state.feature_val} id="feature_num" onChange={this.update_feature}/>
                        <MappleToolTip>
                            <div>
                                <FaQuestionCircle/>
                            </div>
                            <div>
                                Hey! this is damn easy
                            </div>
                        </MappleToolTip>
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <label className="form_label" htmlFor="distance_type">Distance Type:</label>
                        <select className="form-control" id="distance_type" name="distance_type" value={this.state.distance_val} onChange={this.update_distance}>
                            {/* first item is automatically the default value todo check this fact */}
                            <option value="eu">Warped Euclidean</option>
                            <option value="ma">Warped Manhattan</option>
                            <option value="mi">Warped Minkowski</option>
                            <option value="ch">Warped Chebyshev</option>
                        </select>
                        <MappleToolTip>
                            <div>
                                <FaQuestionCircle/>
                            </div>
                            <div>
                                Hey! this is damn easy
                            </div>
                        </MappleToolTip>
                    </div>

                    <div className="form-group range-field d-flex justify-content-center">
                        <label className="form_label" htmlFor="sim_thresh">Similarity Threshold:</label>
                        <span className="font-weight-bold indigo-text">0%</span>
                        {/*todo update "defaultValue" to be recommended similarity threshold */}
                        <input type="range" className="custom-range" id="sim_thresh" min="0" max="100" value={this.state.sim_val} onChange={this.update_sim}/>
                        <span className="font-weight-bold indigo-text">{this.state.sim_val}%</span>
                        <MappleToolTip>
                            <div>
                                <FaQuestionCircle/>
                            </div>
                            <div>
                                Hey! this is damn easy
                            </div>
                        </MappleToolTip>
                    </div>

                    <div className="form-group range-field d-flex justify-content-center">
                        <label className="form_label" htmlFor="loi">Length of Interest:</label>
                        <span className="font-weight-bold indigo-text">0</span>
                        {/*todo range "max" will have to be dynamically set by passing props from
                        todo (cont.) SelectADataset into BuildOptions state */}
                        {/*todo update "defaultValue" to be same as max */}
                        <input type="range" className="custom-range" id="loi" min="0" max="100" value={this.state.loi_val} onChange={this.update_loi}/>
                        <span className="font-weight-bold indigo-text">{this.state.loi_val}</span>
                        <MappleToolTip>
                            <div>
                                <FaQuestionCircle/>
                            </div>
                            <div>
                                Hey! this is damn easy
                            </div>
                        </MappleToolTip>
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

// todo refactor and make more dynamic, also use full page
const buildOptions = () => (
    <Container className="container" style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>

        <label htmlFor="dropdown">Distance Type</label>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Choose a Distance
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href=" ">Warped Euclidean</a>
                <a className="dropdown-item" href=" ">Warped Manhattan</a>
                <a className="dropdown-item" href=" ">Warped Minkowski</a>
                <a className="dropdown-item" href=" ">Warped Chebyshev</a>
            </div>
        </div>

        <Button className="distHelp">?</Button>

        <form>
            <div className="form-group">
                <label htmlFor="formControlRange">Similarity Threshold</label>
                <input type="range" className="form-control-range" id="formControlRange"/>
            </div>
        </form>

        <Button className="simHelp">?</Button>

        <form>
            <div className="form-group">
                <label htmlFor="formControlRange">Length of Interest</label>
                <input type="range" className="form-control-range" id="formControlRange"/>
            </div>
        </form>

        <Button className="lenHelp">?</Button>


        <Link to="/BuildProgressMenu">
            <Button className="startprocess btn-primary">Start Preprocessing</Button>
        </Link>

        <Container className="Box"> </Container>

        <Link to="/SelectNewDataset">
            <Button className="back btn-primary">Back</Button>
        </Link>

    </Container>
);


