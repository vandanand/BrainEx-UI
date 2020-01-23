import React, { Component } from 'react';
import logo from "../brain.png";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import axios from "axios";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    onChangeHandler=event=>{
            var files = event.target.files;
            if(this.checkMimeType(event)) {
                this.setState({
                    selectedFile: files
                })
            }
        };

    //handles the "Add" button functionality to add selected file to the server
    onClickHandler = () => {
        const data = new FormData();
        for(var i=0; i<this.state.selectedFile.length; i++) {
            data.append('file', this.state.selectedFile[i]);
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
        for(var i = 0; i < files.length; i++) {
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
            <div>

            {/* Functionality for choosing files to upload to the server*/}
                <div className="form-group files front" style={{ width: '30%', position: 'absolute', top:'320pt', left:'1%'}}>
                    <h5 align="center">Load another </h5>
                    <h5 align="center">preprocessed dataset:</h5>
                    <input type="file" name="file" className="form-control" multiple onChange={this.onChangeHandler} style={{width:'77%',backgroundColor: '#3C99DC', borderColor:'#3C99DC'}}/>
                    <div className="chooseFile">
                        Choose File
                        <input type="file" className="hide_file"/>
                    </div>
                    <Button className="addfile btn-primary" style={{ width: '18%', position: 'absolute', top:'48pt', left:'75%', borderColor:'#000000', backgroundColor:'#0F5298'}} onClick={this.onClickHandler}>Add</Button>
                </div>

            <div style={{width: '40%', position: 'absolute', left:'47%', top:'30%'}}>
                <h5 align="center">The tool that helps find the top similar matches in fNIRS time series sequences</h5>
            </div>


            <Link to="/SelectNewDataset">
                <Button className="preprocess" style={{borderColor:'#000000', backgroundColor:'#0F5298'}}>Preprocess a new dataset</Button>
            </Link>

            {/* Container for files that have been uploaded to the server*/}
            <Container className="csvFileInfo" style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '31%'}}>

                <div className="col-sm-4">
                    <div className="well">
                        <Card style={{backgroundColor: '#3C99DC', width: '328%', position: 'absolute', left:'-14%'}}>
                            <div className="card-body">
                                <h5 className="card-title">Start with an existing preprocessed dataset:</h5>
                                <div className="scrollable" style={{overflowY: 'auto', maxHeight: '210px'}}>
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
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>

        </div>
        );
    }
}

export default Home;