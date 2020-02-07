import React, { Component } from 'react';
import {preprocessed_files, rawdata_files} from "../dummy_data";
import '../Stylesheets/Home.css';
import { Button, Link, Typography, ButtonGroup } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import FormData from "form-data";
import $ from "jquery";

class SelectNewDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentFile: {},
            upload_files: null,
            all_files: rawdata_files
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.showFilename = this.showFilename.bind(this);
    }

    // pull files from database here. this function will be called after render()
    componentDidMount() {
        this.setState({
            all_files: rawdata_files
        });
    }

    // use this function to do any handling once a file in the list is selected
    showFilename = (e) => {
        $(".curr-file").show();
        let currFile = e.currentTarget;
        console.log(currFile.name);
        this.setState({
            currentFile: currFile
        });
    };

    // todo link used for file upload logic:
    //  https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
    onChangeHandler = (e) => {
        // convert FileList to an array of files
        const new_files = [...e.target.files];
        this.setState({
                upload_files: new_files
            }, () => {
            console.log("files added to state successfully:");
            console.log(this.state.upload_files) // cannot print text and object in the same console.log
        }); // print state for debugging
    };

    //handles the "Add" button functionality to add selected file to the server
    // todo eventually have this add the file to the "database" - mg
    onClickHandler = (e) => {
        e.preventDefault(); // prevents page refresh
        let file_form = new FormData();
        let new_files = this.state.upload_files;
        new_files.map((file) => {
            file_form.append("file", file); // add upload_files to FormData object
        });
        let all_files = this.state.all_files;
        console.log(...file_form);
        // todo instead of below, send FormData to server and make state update somehow
        this.setState({
            all_files: all_files.concat(new_files),
            upload_files: null
        }, () => {
            console.log("files \"uploaded\" successfully");
            console.log(this.state.all_files);
        });
    };

    render() {
        return(
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters">
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h4">Select a dataset to preview here</Typography>
                                <ButtonGroup className="file-list" orientation="vertical" color="primary">
                                    { this.state.all_files.map((file, index) => (
                                       <Button name={file.name} className="btn-file" variant="contained" key={index} onClick={this.showFilename}>{file.name}</Button>
                                    ))}
                                </ButtonGroup>
                                {/*adding a new file*/}
                                <form className="form-group files home-content">
                                    <Typography className="directions" variant="h5">Load another dataset</Typography>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".csv" onChange={this.onChangeHandler} multiple/>
                                        <Button type="submit" className="btn-primary" variant="contained" color="primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right build">
                            <div className="home-content">
                                <p className="curr-file">{this.state.currentFile.name}</p>
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
                                    className="build-btn left-btn btn btn-secondary"
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