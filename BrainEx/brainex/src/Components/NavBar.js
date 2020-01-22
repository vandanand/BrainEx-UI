import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.css';

class NavBar extends Component {

    render() {
        return(
            // TODO style navbar and integrate with header
            <nav className="navbar navbar-expand-lg">
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


            /*<div className="navbar">
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
            </div>*/
        );
    }
}

export default NavBar;