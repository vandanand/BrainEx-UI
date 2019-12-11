import React from "react";
import './csvViewer.css';
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from "../brain.png";
import Card from 'react-bootstrap/Card';


const csvViewer = () => (


        <Container className="container">
            <div style={{backgroundColor: '#3C99DC', width: '100%', height: '17%', position: 'absolute', left:'0.01%', top:'0%'}}>
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">BrainEx</h1>
                <h3 className="App-Version">Version 1.0.0</h3>
                <h4 className="viewer">CSV Viewer</h4>
            </div>


            <Container className="csvFile" style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', width: '31%'}}>

                <div className="col-sm-4">
                    <div className="well">
                        <Card style={{backgroundColor: '#3C99DC', width: '328%', position: 'absolute', left:'-14%'}}>
                            <div className="card-body">
                                <h5 className="card-title">Previously imported unpreprocessed CSV Files</h5>
                                <div className="scrollable" style={{overflowY: 'auto', maxHeight: '210px'}}>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset1</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset2</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset3</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset4</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset5</Button>
                                    <p> </p>
                                    <Button style={{ borderColor: 'black', width: '100%', backgroundColor:'#0F5298'}}>Dataset6</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>

            <Link to="/">
                <Button className="back btn-primary" style={{width: '10%', position: 'absolute', top: '90%', left: '33%', backgroundColor:'#0F5298', borderColor: 'black'}}>Back</Button>
            </Link>


            <Link to="/Components/BuildOptions">
                <Button className="nextbtn btn-primary" style={{width: '10%', position: 'absolute', top: '90%', left: '88%', backgroundColor:'#0F5298', borderColor: 'black'}}>Next</Button>
            </Link>



        </Container>
    );


export default csvViewer;