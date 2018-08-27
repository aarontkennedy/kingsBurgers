import React, { Component } from 'react';
import './App.css';
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import callServer from "./utils/callServer";
import LocalProfileStorage from "./utils/LocalProfileStorage";

class App extends Component {

  state = {
    googleID: "",
    first: "",
    last: "",
    email: "",
    imageURL: ""
  };

  componentDidMount() {
    // retrieve from local storage if possible
    this.localStorage = new LocalProfileStorage("kingsburgersapp");
    const alreadyLoggedInProfile = this.localStorage.retrieve();
    if (alreadyLoggedInProfile) {
      console.log(alreadyLoggedInProfile);
      this.setState(alreadyLoggedInProfile);
    }
  }

  successfulSignIn = (response) => {
    console.log(response.profileObj);
    let profile = {
      googleID: response.profileObj.googleId,
      first: response.profileObj.givenName,
      last: response.profileObj.familyName,
      email: response.profileObj.email,
      imageURL: response.profileObj.imageUrl
    }
    this.setState(profile);
    this.localStorage.add(profile);
    callServer.setUser(profile)
      .then((res) => { console.log("callServer.setUser succeeded"); })
      .catch((err) => { console.log(err) });
  }

  unsuccessfulSignIn = (response) => {
    console.log(response);

    // what else should I do? 
  }

  signOut = (response) => {
    console.log("signOut");
    console.log(response);
    this.setState({
      signedIn: false,
      googleID: "",
      first: "",
      last: "",
      email: "",
      imageURL: ""
    });
    // remove form local storage
    this.localStorage.remove();
  }

  render() {
    return (
        <div className="App">
          <Header userID={this.state.googleID}
            first={this.state.first}
            imageURL={this.state.imageURL}
            signOut={this.signOut} />
            
          <section className="container">
            {this.state.googleID ?
              <Dashboard
                userID={this.state.googleID}
                first={this.state.first}
                imageURL={this.state.imageURL}
                signOut={this.signOut}
              /> :
              <Home
                onSuccess={this.successfulSignIn}
                onFailure={this.unsuccessfulSignIn}
              />}
          </section>

          <Footer />
        </div>
    );
  }
}

export default App;
