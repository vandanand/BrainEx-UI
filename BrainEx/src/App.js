import './Stylesheets/App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BuildOptions from "./Components/Preprocessing/BuildOptions";
import BuildProgressMenu from "./Components/Preprocessing/BuildProgressMenu";
import QueryFinder from "./Components/QueryFinder";
import Home from "./Components/Preprocessing/Home";
import RawDataExplorer from "./Components/RawDataExplorer"
import ClusterExplorer from "./Components/ClusterExplorer";
import BrainExHeader from "./Components/Singletons/BrainExHeader";
import SelectNewDataset from "./Components/Preprocessing/SelectNewDataset";
import MainApp from "./Components/MainApp";
import NavBar from "./Components/Singletons/NavBar";
import {
    select_new_dataset,
    build_options,
    build_progress,
    main_app,
    data_exp,
    cluster_exp,
    query_page,
    root
} from "./data/default_values";
import ReactNotification from "react-notifications-component";

class App extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         form_data: {}
    //     };
    //     // this.submit_form = this.submit_form.bind(this);
    // }

    /*submit_form = (form_data) => {
        console.log(form_data);
        Object.assign(this.state.form_data, form_data); // assigns properties/values of form_data to state field
        console.log("parent received info!");
        console.log(this.state.form_data); // print for debugging
    };*/

    render() {
        return (
            <Router>
                <ReactNotification />
                <div className="App">
                    <div style={{height: '100%'}}> {/*this styling lets the content stretch to bottom of page*/}
                        <BrainExHeader/>
                        <Route exact path={root} component={Home} />
                        <Route exact path={select_new_dataset} component={SelectNewDataset} />
                        {/*todo below is how you pass props through React Router*/}
                        <Route exact path={build_options} component={BuildOptions} />
                        <Route exact path={build_progress} component={BuildProgressMenu} />
                        {/*below is single page app version of the main page containing the explorers and query*/}
                        {/*todo if you want to make changes to what/where/how the dashboard stuff is rendered change these to match*/}
                        <MainApp>
                            <Route path={main_app} component={NavBar} /> {/*renders navbar if the pathname contains MainPage*/}
                            <Switch>
                                <Route exact path={data_exp} component={RawDataExplorer} />
                                <Route exact path={cluster_exp} component={ClusterExplorer} />
                                <Route exact path={query_page} component={QueryFinder} />
                            </Switch>
                        </MainApp>
                    </div>
                </div>
            </Router>
        )

    }
}

export default App;
