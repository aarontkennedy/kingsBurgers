import React, { Component } from 'react';
import './BurgerSuggestions.css';
import callServer from '../utils/callServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BurgerSuggestions extends Component {
    state = {
        burgers: [],
        closed: false
    };

    componentDidMount() {
        this.refresh();
    }

    refresh = () => {
        callServer.getBurgerSuggestion(this.props.eaterID)
            .then((results) => {
                console.log(results);
                this.setState({ burgers: results.data });
            });
    }

    close = () => {
        this.setState({
            closed: true
        });
    }

    render() {
        if (this.state.closed || this.state.burgers.length < 1) { 
            return ""; 
        }

        return (
        <div id="burgerSuggestions" className="calloutSection">
            <h3>
                Need help choosing?&nbsp;
                <span  onClick={this.refresh}>
                    <FontAwesomeIcon className="calloutSection__refresh" icon={['fas', 'sync-alt']} />
                </span>
            </h3>

            <span onClick={this.close}>
                <FontAwesomeIcon className="calloutSection__close" icon={['far', 'times-circle']} />
            </span>

            <div id="burgerSuggestionsTable">
                <ul>
                {
                    this.state.burgers.map((b, i) => {
                        return (<li key={i}>&nbsp;
                        <span className="burgerSuggestionName">{b.name} </span>
                        <span className="burgerSuggestionDescription">{b.description}</span>
                        </li>);
                    })
                }
                </ul>
            </div>
        </div>);
    }
}

export default BurgerSuggestions;