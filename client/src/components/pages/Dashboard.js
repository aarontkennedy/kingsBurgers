import React, { Component } from 'react';
import './Home.css';
import BurgerSearch from '../BurgerSearch';
import BurgerEatenForm from '../BurgerEatenForm';
import BurgerHistory from '../BurgerHistory';
import callServer from '../../utils/callServer';

class Dashboard extends Component {
    state = {
        burgerID: "",
        burgerName: "",
        burgerDescription: ""
    }

    // when a user finds a burger or creates a new one, we
    // need to populate and display the selected burger pane
    // so a user can choose to rate it and indicate if they have eaten it
    populateSelectedBurger = (id, name, description) => {
        this.setState({
            burgerID: id,
            burgerName: name,
            burgerDescription: description
        });
        console.log(this.state);
    }

    addBurgerEatenSubmit = (rating) => {
        callServer.addBurgerEaten(
            this.props.userID,
            this.state.burgerID,
            rating);
        this.setState({
            burgerID: "",
            burgerName: "",
            burgerDescription: ""
        });
    }


    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <BurgerSearch populateSelectedBurger={this.populateSelectedBurger} />
                </div>
                <div className="col-12 col-md-6">

                    <BurgerEatenForm
                        eaterID={this.props.userID}
                        burgerID={this.state.burgerID}
                        burgerName={this.state.burgerName}
                        burgerDescription={this.state.burgerDescription}
                        handleRatingSubmit={this.addBurgerEatenSubmit} />

                    <BurgerHistory
                        eaterID={this.props.userID} />
                </div>
            </div>);
    }

}

export default Dashboard;