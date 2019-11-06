import React, { Component } from 'react';
import './BurgerStats.css';
import callServer from '../utils/callServer';

class BurgerStats extends Component {
    unmounted = false;

    state = {
        numBurgers: null,
        burgersEaten: null,
        burgerTrackers: null
    }

    componentDidMount() {
        callServer.getBurgerStats()
            .then((result) => {
                console.log(result);
                if (!this.unmounted) {
                    this.setState({
                        numBurgers: result.data.burgers,
                        burgersEaten: result.data.burgersEaten,
                        burgerTrackers: result.data.eaters
                    });
                }
            });
    }
    componentWillUnmount() {
        this.unmounted = true;
    }

    render() {
        return (<div>
            {this.state.numBurgers ?
                <h3>
                    <img className="BurgerStats" alt="" src="/images/burgerIconBullet.png" />
                    {this.state.numBurgers} Burgers Listed
            </h3> : ""}
            {this.state.burgersEaten ?
                <h3>
                    <img className="BurgerStats" alt="" src="/images/burgerIconBullet.png" />
                    {this.state.burgersEaten} Burgers Eaten
                </h3> : ""}
            {this.state.burgerTrackers ?
                <h3>
                    <img className="BurgerStats" alt="" src="/images/burgerIconBullet.png" />
                    {this.state.burgerTrackers} Burger Trackers
            </h3> : ""}
        </div>);
    }
}

export default BurgerStats;