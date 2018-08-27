import React, { Component } from 'react';
import $ from 'jquery';
//import './Home.css';
import callServer from '../utils/callServer';

class BurgerSearch extends Component {
    state = {
        display: false,
        burgerName: "",
        burgerDescription: "",
    }

    componentDidMount() {
        // Initialize ajax autocomplete:
        $('#burgerAutocomplete').autocomplete({
            serviceUrl: '/autosuggest/burgers',
            onSelect: (suggestion) => {
                //console.log(suggestion);
                this.handleSelectedBurger(suggestion.data,
                    suggestion.value,
                    suggestion.description);
            }
        });
    }

    handleToggleDisplay = () => {
        if (this.state.display) {
            this.setState({ display: false });
        }
        else {
            this.setState({ display: true });
        }
    }

    handleFormCancel = () => {
        this.clearForms();
    }

    clearForms = () => {
        this.setState({
            display: false,
            burgerName: "",
            burgerDescription: ""
        });
        $("#burgerAutocomplete").val("");
    }

    handleChange = (event) => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
        // Set the state for the appropriate input field
        //console.log(event.target);
        //console.log(value);
        this.setState({
            [name]: value
        });
    };

    handleSelectedBurger = (id, name, description) => {
        /*console.log(id);
        console.log(name);
        console.log(description);*/
        this.props.populateSelectedBurger(id, name, description);
        this.clearForms();
    }

    handleSubmit = (e) => {
        // handles the validation of the add burger form and
        // sends the post request to the server
        e.preventDefault();
        callServer.addBurger(this.state.burgerName.trim(),
            this.state.burgerDescription.trim())
            .then((data) => {
                //console.log(data);
                this.handleSelectedBurger(data.data.id,
                    data.data.name,
                    data.data.description);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <label
                    style={{
                        display: !this.state.display ? 'block' : 'none'
                    }}
                    htmlFor="burgerAutocomplete"
                    id="burgerSearch">
                    Burger Search
                <input type="text" name="burger" id="burgerAutocomplete" />
                </label>

                <div className="outlineSection">
                    <h3 id="toggleAddBurger" onClick={this.handleToggleDisplay}>
                        Not finding a burger? Add it!</h3>
                    {this.state.display ?
                        <form id="addBurger" onSubmit={this.handleSubmit}>
                            <label htmlFor="burgerName">
                                Burger Name
                        <input type="text"
                                    id="burgerName"
                                    name="burgerName"
                                    placeholder="The Dagwood Burger"
                                    value={this.state.burgerName}
                                    onChange={this.handleChange}
                                    required />
                            </label>
                            <label htmlFor="burgerDescription">
                                Description
                        <textarea id="burgerDescription"
                                    name="burgerDescription"
                                    placeholder="The dagwood has everything: egg, onion, cheese, pickles, bacon, etc."
                                    value={this.state.burgerDescription}
                                    onChange={this.handleChange}
                                    required />
                            </label>
                            <button type="submit"
                                className="btn btn-warning btn-lg Button-MR">
                                Add Burger
                            </button>
                            <span className="Pointer"
                                onClick={this.handleFormCancel}>Cancel</span>
                        </form>
                        : ""}
                </div>
            </div >);
    }
}

export default BurgerSearch;