import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
  render() {
    return (
      <header className="container-fluid mb-5" >
        <div className="row p-2">
          <div className="col text-right">
            {this.props.first ? `Welcome, ${this.props.first}! ` : ""}

            {this.props.first ?
              <GoogleLogout
                className="btn btn-warning small"
                buttonText="Sign Out"
                onLogoutSuccess={this.props.signOut}
              /> : ""}
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <h1>
              <img id="burgerIcon" className="mr-2" src="/images/burgerIcon.png" alt="burger" /> King's Burger Tracker
              </h1>
          </div>
        </div>
      </header>);
  }
}

export default Header;