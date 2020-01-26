import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from "axios";
import './Home.css'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null // todo have this set to pull from wherever the files are pulled from -mg
        }
    }

    onChangeHandler=event=>{
        const files = event.target.files;
        this.setState({
            selectedFile: files // todo eventually change this to pull from wherever the files are _again_ -mg
        })
        /*if(this.checkMimeType(event)) {
            this.setState({
                selectedFile: files // todo eventually change this to pull from wherever the files are _again_ -mg
            })
        }*/
    };

    //handles the "Add" button functionality to add selected file to the server
    onClickHandler = () => {
        const data = new FormData();
        for(var i=0; i<this.state.selectedFile.length; i++) {
            data.append('file', this.state.selectedFile[i]); // todo eventually have this add the file to the "database" - mg
        }
        console.log(data);
        axios.post("http://localhost:8000/upload", data, {//parameter endpoint url, form data
        }).then(res => { //print response status
            console.log(res.statusText)
        })
    };

    checkMimeType = (event) => {
        // get the file object
        let files = event.target.files;

        // permitted file types
        const types = ['text/csv'];

        let err = '';
        for(let i = 0; i < files.length; i++) {
            // check file type
            if (types.every(type => files[i].type !== type)) {
                err += files[i].type + ' is not a supported format\n';
            }
        }

        // TODO figure out what this does/why this does this here - mg
        if (err !== '') {
            event.target.value = null; // remove selected file
            console.log(err);
            return false;
        }
        return true;

    };

    render() {
        return(
            //todo extract header and combine with navbar at least in style/appearance
            <div style={{height: 'calc(100% - 75px)'}}> {/*this styling lets the content stretch to bottom of page*/}
                <div className="row no-gutters">
                    <div className="col-3 no-gutters"> {/*bootstrap columns should add up to 12 (4 + 8 = 12)*/}
                        <div className="left d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <h4 className="directions">Select a preprocessed dataset to explore here</h4>
                                {/*todo dynamically populate this instead with files gotten from server*/}
                                <div className="file-list">
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART1</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART2</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART3</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART4</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART5</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>SART6</Button>
                                </div>
                                {/*option to add a new file*/}
                                <div className="form-group files home-content">
                                    <h5 className="directions">Load another preprocessed dataset:</h5>
                                    <div className="new-file d-flex justify-content-center align-items-center">
                                        <input type="file" name="file" className="form-control-file" multiple accept=".csv" onChange={this.onChangeHandler}/>
                                        <Button className="add-file btn-primary" onClick={this.onClickHandler}>Add</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="right d-flex justify-content-center align-items-center">
                            <div className="home-content">
                                <h5 className="app-description">The tool that helps find the top similar matches in fNIRS time series sequences</h5>
                                <Link to="/SelectNewDataset">
                                    <Button className="preprocess-bt">Preprocess a new dataset</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/*todo refactor this div to be more dynamically positioned while keeping the same functionality -mg
                 Functionality for choosing files to upload to the server
                <div className="form-group files front">
                    <h5 align="center">Load another </h5>
                    <h5 align="center">preprocessed dataset:</h5>
                    <input type="file" name="file" className="form-control" multiple onChange={this.onChangeHandler} style={{width:'77%',backgroundColor: '#3C99DC', borderColor:'#3C99DC'}}/>
                    <div className="chooseFile">
                        Choose File
                        <input type="file" className="hide_file"/>
                    </div>
                    <Button className="addfile btn-primary" style={{ width: '18%', position: 'absolute', top:'48pt', left:'75%', borderColor:'#000000', backgroundColor:'#0F5298'}} onClick={this.onClickHandler}>Add</Button>
                </div>
                todo make this paragraph/button better looking and more professional looking -mg
                <div style={{width: '40%', position: 'absolute', left:'47%', top:'30%'}}>
                    <h5 align="center">The tool that helps find the top similar matches in fNIRS time series sequences</h5>
                </div>


                <Link to="/SelectNewDataset">
                    <Button className="preprocess" style={{borderColor:'#000000', backgroundColor:'#0F5298'}}>Preprocess a new dataset</Button>
                </Link>*/}
            </div>
        );
    }
}

export default Home;