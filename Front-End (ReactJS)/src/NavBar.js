import React, { Component } from 'react';
import Cookies from 'js-cookie';

class NavBar extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        if (Object.keys(Cookies.get()).length != 0) {
            return (
                <div className="navbar-content">
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <center>
                                    <a className="navbar-brand" href="/"><span style={{ fontFamily: 'cursive', fontSize: '25px' }} className="txt">picto</span></a>
                                </center>
                                <div className="nav-bar-toggle-btn">
                                    <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target" style={{ backgroundColor: 'Transparent', border: '0px' }}>
                                        <span className="glyphicon glyphicon-menu-hamburger" style={{ color: 'white', fontSize: '20px' }}></span>
                                    </button>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse" id="collapse_target">
                                <ul className="nav navbar-nav">
                                    <li ><a href="/newpost">Add new post</a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/profile"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
                                    <li><a href="/logout"><span className="glyphicon glyphicon-log-out"></span> Log-out</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            );
        }
        else {
            return (
                <div className="navbar-content">
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <center>
                                    <a className="navbar-brand" href="/"><span style={{ fontFamily: 'cursive', fontSize: '25px' }} className="txt">picto</span></a>
                                </center>
                                <div className="nav-bar-toggle-btn">
                                    <button className="navbar-toggler" data-toggle="collapse" data-target="#collapse_target" style={{ backgroundColor: 'Transparent', border: '0px' }}>
                                        <span className="glyphicon glyphicon-menu-hamburger" style={{ color: 'white', fontSize: '20px' }}></span>
                                    </button>
                                </div>
                            </div>
                            <div className="collapse navbar-collapse" id="collapse_target">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Sign-In</a></li>
                                </ul>
                            </div>

                        </div>

                    </nav>
                </div>
            );
        }
    }

}

export default NavBar;