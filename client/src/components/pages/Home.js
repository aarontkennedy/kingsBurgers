import React, { Component } from 'react';
import './Home.css';
import { GoogleLogin } from 'react-google-login';
import BurgerStats from '../BurgerStats';

class Home extends Component {
    render() {
        return (<div className="row">
            <div className="col">
                <h2>King's Bar & Grill</h2>
                <p>King's is a great bar in Miesville, MN. They have tons of ways you can order a burger. The only problem is you can
                    have a hard time remembering all the ones you have eaten. This is really a big problem if you want to try them
                    all.
            </p>
                <p>Now you can track all your favorite King's burgers here. Just search if the burger is in the database. Then, you
                can eat it and even leave a rating! For the hardcore, you can even see your King's burger history!</p>
                <p className="text-center">

                    <GoogleLogin
                        clientId="789657667406-cralr387a21q0pr8hv8p4kmsb3icp65q.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        className="btn btn-lg btn-warning"
                        onSuccess={this.props.onSuccess}
                        onFailure={this.props.onFailure}
                        redirectUri="/dashboard" />

                </p>
            </div>
            <div className="col  text-center">
                <div id="totalBurgerStatistics" className="col mb-5">
                    <BurgerStats />
                </div>
                <div className="iframeHolder">
                    <iframe title="King's Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2840.8329327538754!2d-92.81583898442504!3d44.60044237910021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f7be7cb111318b%3A0x42df3c99b899026a!2sKings+Place!5e0!3m2!1sen!2sus!4v1528948176778"
                        width="400" height="300" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                </div>
                <div className="text-center">
                    {/* put social media here */}
                </div>
            </div>
        </div>);
    }

}

export default Home;