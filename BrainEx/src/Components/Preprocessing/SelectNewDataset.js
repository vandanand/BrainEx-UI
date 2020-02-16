import React, { Component } from 'react';
import {preprocessed_files, rawdata_files} from "../../data/dummy_data";
import '../../Stylesheets/Home.css';
import { Button, Link, Typography, ButtonGroup } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import FormData from "form-data";
import $ from "jquery";
import axios from 'axios';
import {build_options, root} from "../../data/default_values";

class SelectNewDataset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_file: {}, /* for storing the currently selected file in the file-list */
            upload_files: null, /* for storing the file(s) chosen to be uploaded */
            all_files: [], /* for storing files displayed in file-list */
            curr_loi_max: null
        };
        /* binding all handlers to the class */
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.isFileSelected = this.isFileSelected.bind(this);
    }

    /*pull files from database here. this function is called after render() so all elements will be in place*/
    componentDidMount() {
        //todo @Kyra -- pull all files from backend here (make the response an arrow function)
        this.setState({
            all_files: rawdata_files
        });
    }

    // if no file is selected, do not go to next page
    isFileSelected = (e) => {
        if (Object.keys(this.state.current_file).length === 0) {
            e.preventDefault();
        }
    };

    /* file select handler. triggered once user clicks on a file in the file-list */
    // todo use this function to do any handling once a file in the list is selected
    fileHandler = (e) => {
        if ($(".next").attr("disabled")) {
            $(".next").removeAttr("disabled");
        }
        // get the id (index in all_files array) of the currently selected button
        let id = e.currentTarget.id;
        console.log(id);
        // grab the file with that id from the list
        let curr_file = this.state.all_files[id];

        console.log("current file:"); // for debugging purposes
        console.log(curr_file);
        /*console.log(curr_file); // for debugging purposes

        /* store the currently selected file in state */
        this.setState({
            current_file: curr_file,
            curr_loi_max: curr_file.maxValue
        }, () => {
            console.log("State updated.");
        });
    };

    /* triggered when files are selected from the file explorer. stores files to be uploaded to state so they can be accessed
    * when the "Add" button is clicked */
    onChangeHandler = (e) => {
        // convert FileList to an array of files
        const new_files = [...e.target.files];
        /*store files to be uploaded in state*/
        this.setState({
            upload_files: new_files
        }, () => {
            console.log("upload files added to state successfully:"); // for debugging purposes
            // console.log(this.state.upload_files) // cannot print text and object in the same console.log
        }); // print state for debugging
    };

    /* when "add" is triggered this function takes the files currently in upload_states and should
    * send them to the server.
    * todo the server should then add them to wherever all_files is pulling from */
    onClickHandler = (e) => {
        e.preventDefault(); // prevents page refresh on submit
        /* create form data object and append files to be uploaded onto it*/
        let file_form = new FormData();
        let new_files = this.state.upload_files;
        new_files.map((file) => {
            file_form.append("uploaded_data", file); // add upload_files to FormData object
        });
        // console.log(...file_form); // for debugging purposes
        let all_files = this.state.all_files;
        // Hook up to Kyra's server
        axios.post('http://localhost:5000/getCSV', file_form)
            .then((response) => {
                console.log(response); // for debugging purposes
                // todo if the Files can be returned here I will do that instead, but will probably keep the if 200 just cause that's good practice
                if (response.status === 200) { // if successful
                    // add uploaded_data to all_files in state
                    this.setState({
                        all_files: all_files.concat(new_files),
                        upload_files: null // reset upload_files to none
                    }, () => { // callback function for debugging
                        console.log(response.data.message);
                        // console.log("loi_max: " + this.state.loi_max);
                    })
                } else {
                    console.log("file upload unsuccessful. :(");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return(
            <div className="full-height">
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters">
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                {/*list of files from the server (all_files, current_file)*/}
                                <Typography className="directions" variant="h4">Select a dataset to preview here</Typography>
                                <ButtonGroup className="file-list" orientation="vertical" color="primary">
                                    { this.state.all_files.map((file, index) => (
                                        <Button id={index} className="btn-file" variant="contained" key={index} onClick={this.fileHandler}>{file.name}</Button>
                                    ))}
                                </ButtonGroup>
                                {/*adding a new file (upload_files)*/}
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
                                {/*display currently selected file to the user*/}
                                {(Object.keys(this.state.current_file).length !== 0) ? (
                                    <p className="curr-file">File currently selected: {this.state.current_file.name}</p>
                                ) : (
                                    <p className="curr-file">There is no file currently selected</p>
                                )}
                                <Link
                                    onClick={this.isFileSelected}
                                    disabled={true}
                                    className="build-btn next btn btn-primary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to={{
                                        pathname: `${build_options}`,
                                        state: {
                                            loi_max: this.state.curr_loi_max,
                                            file: this.state.current_file
                                        }}}>
                                    Next
                                </Link>
                                <Link
                                    className="build-btn left-btn btn btn-secondary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to={root}>
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
