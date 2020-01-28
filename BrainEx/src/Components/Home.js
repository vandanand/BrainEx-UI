import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import './Home.css'
import { preprocessed_files } from "../dummy_data";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_files: null, // todo have this set to pull from wherever the files are pulled from -mg
            all_files: []
        }
        this.onChangeHandler.bind(this);
        this.onClickHandler.bind(this);
    }

    componentDidMount() {
        // pull from database/server here to get stored files and populate the file list on the left
        this.setState({
            all_files: preprocessed_files
        })
    }

    // todo link used for file upload logic:
    //  https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    onChangeHandler = (e) => {
        // convert FileList to an array of files
        const files = [...e.target.files];
        // add the selected files to state so they can be accessed in onClickHandler
        this.setState({
                upload_files: files
            }, () => console.log(this.state.upload_files)); // print state for debugging
    };

    //handles the "Add" button functionality to add selected file to the server
    // todo eventually have this add the file to the "database" - mg
    onClickHandler = (e) => {
        const new_files = new FormData();
        for (let i = 0; i < this.state.upload_files.length; i++) {
            new_files.append('file', this.state.upload_files[i]);
        }
        console.log(new_files); // print for debugging
        // add new_files to database/server <here>
    };

    render() {
        return(
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters"> {/*bootstrap columns should add up to 12 (4 + 8 = 12)*/}
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <h4 className="directions">Select a preprocessed dataset here</h4>
                                <div className="file-list">
                                    { this.state.all_files.map((file, index) => (
                                        <Button className="btn-file" key={index}>{file}</Button>
                                    ))}
                                </div>
                                {/*adding a new file*/}
                                <div className="form-group files home-content">
                                    <h5 className="directions">Load another preprocessed dataset:</h5>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".csv" onChange={this.onChangeHandler} multiple/>
                                        <Button className="add-file btn-primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <h5 className="right-item app-description">The tool that helps find the top similar matches in fNIRS time series sequences</h5>
                                <Link to="/SelectNewDataset" className="right-item preprocess-bt btn btn-primary">
                                    Preprocess a new dataset
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;