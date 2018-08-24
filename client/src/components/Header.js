import React, { Component } from 'react';
import './Header.css';
import { GoogleLogout } from 'react-google-login';

class Header extends Component {
  render() {
    return (
      <header className="container-fluid mb-5" >
        <div className="row p-2">
          <div className="col text-right">
            {this.props.first ? `Welcome, ${this.props.first}! ` : ""}

            {this.props.imageURL ? 
              <img alt={this.props.first} 
              className="Header-EaterPhoto"
              src={this.props.imageURL} />
            : ""}

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