import React, { Component } from 'react';
import {Link as RouterLink} from "react-router-dom";
import '../Stylesheets/Home.css'
import { preprocessed_files } from "../dummy_data";
import { Button, Link, Typography, ButtonGroup } from '@material-ui/core';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_files: null, // todo have this set to pull from wherever the files are pulled from -mg
            all_files: []
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
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
        let filenames = files.map((file) => {
            return file.name;
        });
        console.log(filenames);
        /*var op = input.products.map(function(item) {
            return item.productId;
        });
        console.log(op);*/
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
                    <div className="col col-3 no-gutters"> {/*bootstrap columns should add up to 12 (4 + 8 = 12)*/}
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h4">Select a preprocessed dataset to explore here</Typography>
                                <ButtonGroup className="file-list" orientation="vertical" color="primary">
                                    { this.state.all_files.map((file, index) => (
                                        <Button className="btn-file" variant="contained" key={index}>{file}</Button>
                                    ))}
                                </ButtonGroup>
                                {/*adding a new file*/}
                                <div className="form-group files home-content">
                                    <Typography className="directions" variant="h5">Load another preprocessed dataset</Typography>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" accept=".csv" onChange={this.onChangeHandler} multiple/>
                                         <Button className="btn-primary" variant="contained" color="primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </div>
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
                                    to="/SelectNewDataset" >
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