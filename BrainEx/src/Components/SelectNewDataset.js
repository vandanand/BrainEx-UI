import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { rawdata_files } from "../dummy_data";
import './Home.css';

// todo finish refactoring with responsive content
class SelectNewDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            all_files: rawdata_files
        }
    }

    render() {
        return(
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters">
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <h4 className="directions">Select a dataset to preview here</h4>
                                <div className="file-list">
                                    { this.state.all_files.map((file, index) => (
                                        <Button className="btn-file" key={index}>{file}</Button>
                                    ))}
                                </div>
                                {/*adding a new file*/}
                                <div className="form-group files home-content">
                                    <h5 className="directions">Load another dataset:</h5>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".csv" onChange={this.onChangeHandler} multiple/>
                                        <Button className="add-file btn-primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right build">
                            <div className="home-content">
                                <Link to="/BuildOptions" className="build-btn right-btn btn btn-primary">
                                    Next
                                </Link>
                                <Link to="/" className="build-btn left-btn btn btn-primary">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectNewDataset;