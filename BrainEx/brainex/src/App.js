import React, { Component } from 'react';
import logo from './brain.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import csvViewer from './Components/csvViewer';
import BuildOptions from "./Components/BuildOptions";
import buildProgressMenu from "./Components/BuildProgressMenu";
import explorerPage from "./Components/ExplorerPages";
import queryFinder from "./Components/QueryFinder";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const MainMenu = () => {
//   return (
//     <div>
//       <Link to="/">
//         <button>home</button>
//       </Link>
//       <Link to="/about">
//         <button>About</button>
//       </Link>
//       <Link to="/code">
//         <button>code</button>
//       </Link>
//       <Link to="/contact">
//         <button>contact</button>
//       </Link>
//       <Link to="/info">
//         <button>info</button>
//       </Link>
//     </div>
//   );
// };

    //rendering the Homepage
    const Home = () => (


        <Container className="container">

            {/*top navbar with BrainEx logo*/}
            <div style={{backgroundColor: '#3C99DC', width: '100%', height: '17%', position: 'absolute', left:'0.01%', top:'0%'}}>
                <img src={logo} className="App-logo" alt="logo"/>
                {/*<MainMenu/>*/}
                <h1 className="App-title">BrainEx</h1>
                <h3 className="App-Version">Version 1.0.0</h3>
                <h4 className="homepage">Homepage</h4>
                <Button className="Help" style={{backgroundColor: '#3C99DC', color:'#000000', borderColor: '#3C99DC'}}><u>Need Help?</u></Button>
            </div>

            <div style={{width: '40%', position: 'absolute', left:'47%', top:'30%'}}>
                <h5 align="center">The tool that helps find the top similar matches in fNIRS time series sequences</h5>
            </div>


            <Link to="/Components/csvViewer">
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

        </Container>


    );

    //handles the choose file button functionailty to select a file
    class App extends Component {
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

        checkMimeType=(event)=>{
          //get the file object
          let files = event.target.files;

            //define message container
          let err = '';

         const types = ['text/csv']; //file types allowed

          for(var i = 0; i<files.length; i++) {
                // compare file types and see if it matches
               if (types.every(type => files[i].type !== type)) {

                   err += files[i].type+' is not a supported format\n'; // error message if file types don't match

               }
           }

         if (err !== '') {
              event.target.value = null; // remove selected file
              console.log(err);
               return false;
          }
         return true;

        };

        constructor(props) {
            super(props);
            this.state = {
            selectedFile: null
            }
        }


      render() {
        return (

            /* Router to start homepage*/
          <Router>
            <div className="App">
              <div>
                <Route exact path="/" component={Home} />

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

                {/* Routers for page navigation*/}
                <Route exact path="/Components/csvViewer" component={csvViewer} />
                <Route exact path="/Components/BuildOptions" component={BuildOptions} />
                <Route exact path="/Components/BuildProgressMenu" component={buildProgressMenu} />
                <Route exact path="/Components/ExplorerPages" component={explorerPage} />
                <Route exact path="/Components/QueryFinder" component={queryFinder} />

              </div>
            </div>
          </Router>
        )

      }
    }



export default App;
