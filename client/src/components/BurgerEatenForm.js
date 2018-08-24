import React, { Component } from 'react';

class BurgerEatenForm extends Component {
    state = {
        rating: 1
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRatingSubmit(this.state.rating);
    }

    handleRatingChange = (event) => {
        const { value } = event.target;
        //console.log(value);
        this.setState({
            rating: value
        });
    };

    realRender() {
        console.log("realRender");
        return (<form id="burgerEatenForm" className="text-center" onSubmit={this.handleSubmit}>
            <input type="hidden" name="burgerID" value={this.props.burgerID} />
            <input type="hidden" name="eaterID" value={this.props.eaterID} />
            <h2 id="burgerSelectionName" className="mb-3">{this.props.burgerName}</h2>
            <p id="burgerSelectionDescription" className="mb-3">{this.props.burgerDescription}</p>
            <div className="mb-4">
                <label htmlFor="badRating" className="ratingRadio">
                    <input type="radio"
                        id="badRating"
                        name="burgerRating"
                        onChange={this.handleRatingChange}
                        value="0" />
                    <i className="far fa-frown bad" />
                </label>
                <label htmlFor="okayRating" className="ratingRadio">
                    <input type="radio"
                        id="okayRating"
                        name="burgerRating"
                        onChange={this.handleRatingChange}
                        value="1"
                        defaultChecked="checked" />
                    <i className="far fa-meh okay" />
                </label>
                <label htmlFor="greatRating" className="ratingRadio">
                    <input type="radio"
                        id="greatRating"
                        name="burgerRating"
                        onChange={this.handleRatingChange}
                        value="2" />
                    <i className="far fa-smile great" />
                </label>
            </div>
            <button id="signInButton" className="btn btn-warning btn-lg" type="submit">I ate this burger! </button>
            <a id="cancelAddBurgerEaten" href="">Cancel</a>
        </form>);
    }

    render() {
        if (!this.props.burgerID) {
            return "";
        }
        return this.realRender();
    }
}

export default BurgerEatenForm;