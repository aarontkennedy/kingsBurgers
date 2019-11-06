import React, { Component } from 'react';
import './Dashboard.css';
import BurgerSearch from '../BurgerSearch';
import BurgerEatenForm from '../BurgerEatenForm';
import BurgerHistory from '../BurgerHistory';
import BurgerSuggestions from '../BurgerSuggestions';
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
            burgerDescription: description,
            updateHistory: false
        });
        //console.log(this.state);
    }

    addBurgerEatenSubmit = (rating) => {
        callServer.addBurgerEaten(
            this.props.userID,
            this.state.burgerID,
            rating)
            .then(()=>{
                this.setState({updateHistory: true});
            });
        this.burgerEatenFormClear();
    }

    historyUpdated = () => {
        this.setState({updateHistory: false});
    }

    burgerEatenFormClear = () => {
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

                    <BurgerSuggestions
                        eaterID={this.props.userID} 
                        />

                    <BurgerEatenForm
                        eaterID={this.props.userID}
                        burgerID={this.state.burgerID}
                        burgerName={this.state.burgerName}
                        burgerDescription={this.state.burgerDescription}
                        handleRatingSubmit={this.addBurgerEatenSubmit} 
                        burgerEatenFormClear={this.burgerEatenFormClear} />

                    <BurgerHistory
                        eaterID={this.props.userID} 
                        updateHistory={this.state.updateHistory}
                        updatedHistory={this.historyUpdated}
                        />
                </div>
            </div>);
    }

}

export default Dashboard;