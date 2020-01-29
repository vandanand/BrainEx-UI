import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../Stylesheets/NavBar.css';

class NavBar extends Component {

    render() {
        return(
            // TODO transfer relevant router info to here and continue trying to make central page where you pass in some sort of prop to go to the right place
            // TODO (cont) so when the user clicks "explore loaded data", what should that go to (i.e. should it go to a page that has directions or default to clustered data)
            <nav className="navbar navbar-expand">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Explorer Pages
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/ExploreRawData">Explore Raw Data</Link>
                            <Link className="dropdown-item" to="/ExploreClusters">Explore Clusters</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/QueryFinder">Find Similar Sequences</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;