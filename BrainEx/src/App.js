import React, { Component } from 'react';
import './Stylesheets/App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BuildOptions from "./Components/BuildOptions";
import BuildProgressMenu from "./Components/BuildProgressMenu";
import QueryFinder from "./Components/QueryFinder";
import Home from "./Components/Home";
import RawDataExplorer from "./Components/RawDataExplorer"
import ClusterExplorer from "./Components/ClusterExplorer";
import BrainExHeader from "./Components/BrainExHeader";
import SelectNewDataset from "./Components/SelectNewDataset";

{/* todo to send props through Link component: */}
                    {/*<Link to={{ pathname: '/', state: 'flushDeal' }}>
                        Home
                    </Link>
                    source: https://medium.com/@dcai900/how-to-refresh-data-when-using-react-router-link-396a2ddf8373
                    */}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form_data: {}
        }
        this.submit_form = this.submit_form.bind(this);
    }

    submit_form = (form_data) => {
        console.log(form_data);
        Object.assign(this.state.form_data, form_data); // assigns properties/values of form_data to state field
        console.log("parent received info!");
        console.log(this.state.form_data); // print for debugging
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <div style={{height: '100%'}}> {/*this styling lets the content stretch to bottom of page*/}
                        <BrainExHeader/>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/SelectNewDataset" component={SelectNewDataset} />
                        {/*todo below is how you pass props through React Router*/}
                        <Route exact path="/BuildOptions" component={(props) => <BuildOptions {...props} submit_form={this.submit_form}/>} />
                        <Route exact path="/BuildProgressMenu" component={(props) => <BuildProgressMenu {...props} form_data={JSON.stringify(this.state.form_data)}/>} />
                        <Route exact path="/ExploreRawData" component={RawDataExplorer} />
                        <Route exact path="/ExploreClusters" component={ClusterExplorer} />
                        <Route exact path="/QueryFinder" component={QueryFinder} />
                    </div>
                </div>
            </Router>
        )

    }
}



export default App;
