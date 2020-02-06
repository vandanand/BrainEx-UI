import React, { Component } from 'react';
import { rawdata_files } from "../dummy_data";
import '../Stylesheets/Home.css';
import { Button, Link, Typography, ButtonGroup } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";

class SelectNewDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_files: null,
            all_files: rawdata_files
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    // todo link used for file upload logic:
    //  https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    onChangeHandler = (e) => {
        // convert FileList to an array of files
        const files = [...e.target.files];
        let filenames = files.map((file) => {
            return file.name;
        });
        // add the selected files to state so they can be accessed in onClickHandler
        this.setState({
                upload_files: filenames
            }, () => console.log(this.state.upload_files)); // print state for debugging
    };

    //handles the "Add" button functionality to add selected file to the server
    // todo eventually have this add the file to the "database" - mg
    onClickHandler = (e) => {
        let new_files = this.state.upload_files;
        let all_files = this.state.all_files;
        this.setState({
            all_files: all_files.concat(new_files)
        }, () => console.log(this.state.all_files));
    };

    render() {
        return(
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters">
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h5">Select a dataset to preview here</Typography>
                                <ButtonGroup orientation="vertical" color="primary" className="file-list"> {/*todo button group?*/}
                                    { this.state.all_files.map((file, index) => (
                                        <Button className="btn-file" variant="contained" key={index}>{file}</Button>
                                    ))}
                                </ButtonGroup>
                                {/*adding a new file*/}
                                <div className="form-group files home-content">
                                    <Typography className="directions" variant="h6">Load another dataset</Typography>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".csv" onChange={this.onChangeHandler} multiple/>
                                        <Button className="btn-primary" variant="contained" color="primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right build">
                            <div className="home-content">
                                <Link
                                    className="build-btn right-btn btn btn-primary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to="/BuildOptions" >
                                    Next
                                </Link>
                                <Link
                                    className="build-btn left-btn btn btn-primary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to="/">
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