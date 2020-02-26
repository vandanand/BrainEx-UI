import React, { Component } from 'react';
import {Link as RouterLink} from "react-router-dom";
import '../../Stylesheets/Home.css'
import { preprocessed_files } from "../../data/dummy_data";
import { Button, Link, Typography, ButtonGroup } from '@material-ui/core';
import FormData from 'form-data';
import {select_new_dataset} from "../../data/default_values";
import axios from 'axios'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_files: null,
            all_files: []
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.showFilename = this.showFilename.bind(this);
    }

    // pull files from database here. this function will be called after render()
    componentDidMount() {
        this.setState({
            all_files: preprocessed_files // todo have this set to pull from wherever the files are pulled from -mg
        });
    }

    // use this function to do any handling once a file in the list is selected
    showFilename = (e) => {
        let element = e.currentTarget;
        console.log(element.name);
        let file_form = new FormData();
        file_form.append("set_data", element);
        axios.post('http://localhost:5000/setFilePro', file_form)
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });
    };

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
    // todo eventually have this add the file to the backend - mg
    onClickHandler = (e) => {
        e.preventDefault(); // prevents page refresh
        let file_form = new FormData();
        let new_files = this.state.upload_files;
        new_files.map((file) => {
            file_form.append("uploaded_data", file); // add upload_files to FormData object
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
        axios.post('http://localhost:5000/getDB', file_form)
            .then((response) => {
                // console.log("about to print response");
                // console.log(response); // for debugging purposes
                // todo if the Files can be returned here I will do that instead, but will probably keep the if 200 just cause that's good practice
                if (response.status === 200) { // if successful
                    // add uploaded_data to all_files in state
                    this.setState({
                        all_files: all_files.concat(new_files),
                        upload_files: null // reset upload_files to none
                    }, () => { // callback function for debugging
                        console.log(response.data);
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
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters"> {/*bootstrap columns should add up to 12 (4 + 8 = 12)*/}
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h4">Select a preprocessed dataset to explore here</Typography>
                                <ButtonGroup className="file-list" orientation="vertical" color="primary">
                                    { this.state.all_files.map((file, index) => (
                                        <Button name={file.name} className="btn-file" variant="contained" key={index} onClick={this.showFilename}>{file.name}</Button>
                                    ))}
                                </ButtonGroup>
                                {/*adding a new file*/}
                                <form className="form-group files home-content">
                                    <Typography className="directions" variant="h5">Load another preprocessed dataset</Typography>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".zip" onChange={this.onChangeHandler} multiple/>
                                        <Button type="submit" className="btn-primary" variant="contained" color="primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h5">The tool that helps find the top similar matches in fNIRS time series sequences</Typography>
                                <Link
                                    className="right-item preprocess-bt btn btn-primary"
                                    variant="button"
                                    color="default"
                                    underline="none"
                                    component={RouterLink}
                                    to={select_new_dataset} >
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
