import React, { Component } from 'react';
import {Link as RouterLink} from "react-router-dom";
import '../../Stylesheets/Home.css'
import { preprocessed_files } from "../../data/dummy_data";
import {
    Button,
    Link,
    Typography,
    ButtonGroup,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog, TextField
} from '@material-ui/core';
import FormData from 'form-data';
import {build_progress, query_page, select_new_dataset, default_nw, default_dm, default_mrm} from "../../data/default_values";
import axios from 'axios'
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_files: null,
            all_files: [],
            current_file: null,
            open: false,
            num_workers: default_nw,
            dm_val: default_dm,
            mrm_val: default_mrm
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.fileHandler = this.fileHandler.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToQuery = this.goToQuery.bind(this);
    }

    // pull files from database here. this function will be called after render()
    componentDidMount() {
        axios.post('http://localhost:5000/proNames')
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.setState({
                        all_files: this.state.all_files.concat(response.data.pro_files)
                    }, () => {
                        // console.log(this.state.current_file);
                        console.log(response.data.pro_files);
                    });
                } else {
                    console.log("File selection failed.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // use this function to do any handling once a file in the list is selected
    fileHandler = (e) => {
        let curr_file = e.currentTarget.name;
        console.log(curr_file);
        this.setState({
            current_file: curr_file
        });
        let file_form = new FormData();
        file_form.append("set_data", curr_file);
        file_form.append("num_workers", this.state.num_workers);
        file_form.append("dm_val", this.state.dm_val);
        file_form.append("mrm_val", this.state.mrm_val);
        console.log(...file_form);
        axios.post('http://localhost:5000/setFilePro', file_form)
            .then((response) => {
                console.log(response);
                this.setState({
                    open: true
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    closeModal = () => {
        this.setState({
            open: false,
            current_file: null
        })
    };

    goToQuery = () => {
        this.props.history.push(query_page);
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
        var counter = 0;
        new_files.map((file) => {
            file_form.append("uploaded_data" + counter.toString(), file); // add upload_files to FormData object
            counter++;
        });
        const file_names = new_files.map(file => file.name); // get array of file_names to add to add_files (todo @Kyra would be nice to get this from backend instead)
        axios.post('http://localhost:5000/getDB', file_form)
            .then((response) => {
                // console.log("about to print response");
                console.log(response); // for debugging purposes
                // todo if the Files can be returned here I will do that instead, but will probably keep the if 200 just cause that's good practice
                if (response.status === 200) { // if successful
                    // add uploaded_data to all_files in state
                    this.setState({
                        all_files: this.state.all_files.concat(file_names),
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

    // dynamically update number of workers/cores value in state
    update_nw = (e) => {
        const num_workers = e.target.value;
        this.setState({
            num_workers: num_workers
        });
    };
    // dynamically update driver memory value in state
    update_dm = (e) => {
        const dm_val = e.target.value;
        this.setState({
            dm_val: dm_val
        });
    };
    // dynamically update max result memory value in state
    update_mrm = (e) => {
        const mrm_val = e.target.value;
        this.setState({
            mrm_val: mrm_val
        });
    };

    render() {
        return(
            <div className="full-height"> {/*this styling lets the content stretch to bottom of page*/}
                <Dialog className="dialog" open={this.state.open} onClose={this.closeModal}>
                    <DialogTitle className="prog-item" id="alert-dialog-title">Query with Dataset {this.state.current_file}?</DialogTitle>
                    <DialogContent>
                        <Typography className="prog-item" id="alert-dialog-description">
                            Would you like to explore/query this preprocessed dataset with the following parameters?
                            <form>
                                <FormGroup>
                                    <Typography>Number of Workers</Typography>
                                    <FormControl>
                                        <TextField
                                            id="num_workers"
                                            type="number"
                                            InputProps={{inputProps: {min: 0}}}
                                            value={this.state.num_workers}
                                            onChange={this.update_nw}/>
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <Typography>Driver Memory</Typography>
                                    <FormControl>
                                        <TextField
                                            id="driver_mem"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            value={this.state.dm_val}
                                            onChange={this.update_dm}
                                        />
                                    </FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <Typography>Max Result Memory</Typography>
                                    <FormControl>
                                        <TextField
                                            id="max_result_mem"
                                            type="number"
                                            InputProps={{ inputProps: { min: 0 } }}
                                            value={this.state.mrm_val}
                                            onChange={this.update_mrm}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </form>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} color="primary">
                            No
                        </Button>
                        <Button onClick={this.goToQuery} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="row no-gutters">
                    <div className="col col-3 no-gutters"> {/*bootstrap columns should add up to 12 (4 + 8 = 12)*/}
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <Typography className="directions" variant="h4">Select a preprocessed dataset to explore here</Typography>
                                <ButtonGroup className="file-list" orientation="vertical" color="primary">
                                    { this.state.all_files.map((file, index) => (
                                        <Button name={file} className="btn-file" variant="contained" key={index} onClick={this.fileHandler}>{file}</Button>
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
