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
            all_files: [] /* for storing files displayed in file-list */
        };
        /* binding all handlers to the class */
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
    }

    /*pull files from database here. this function is called after render() so all elements will be in place*/
    componentDidMount() {
        this.setState({
            all_files: rawdata_files
        });
    }

    /* file select handler. triggered once user clicks on a file in the file-list */
    // todo use this function to do any handling once a file in the list is selected
    fileHandler = (e) => {
        $(".curr-file").show(); // for debugging purposes
        let curr_file = e.currentTarget; // must use currentTarget to access only the button attributes

        console.log("current file:"); // for debugging purposes
        console.log(curr_file); // for debugging purposes

        /* store the currently selected file in state */
        this.setState({
            current_file: curr_file
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
            console.log(this.state.upload_files) // cannot print text and object in the same console.log
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
        console.log(...file_form); // for debugging purposes
        let all_files = this.state.all_files;
        // Hook up to Kyra's server
        axios.post('http://localhost:5000/getCSV', file_form)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });




        // // todo instead of below, send file_form to the server and make state update somehow
        // this.setState({
        //     all_files: all_files.concat(new_files),
        //     upload_files: null // reset upload_files to none
        // }, () => {
        //     console.log("files \"uploaded\" successfully"); // for debugging purposes
        //     console.log(this.state.all_files);
        // });
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
                                       <Button name={file.name} className="btn-file" variant="contained" key={index} onClick={this.fileHandler}>{file.name}</Button>
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
                                <p className="curr-file">{this.state.current_file.name}</p> {/*for debugging purposes*/}
                                <Link
                                    className="build-btn right-btn btn btn-primary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to={build_options} >
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
