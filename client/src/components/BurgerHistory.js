import React, { Component } from 'react';
import callServer from '../utils/callServer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BurgerHistory extends Component {

    state = {
        burgers: null
    };

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        callServer.getBurgersEaten(this.props.eaterID)
            .then((results) => {
                console.log(results);
                this.setState({ burgers: results.data });
            });
    }

    getNumDifferentBurgersEaten() {
        if (!this.state.burgers) { return 0; }

        // this function here will take an array and using the classifier
        // in this case, i pass in the burger name, it makes a new object
        // with an entry with burgerName and how many times it occurs
        function count(array, classifier) {
            return array.reduce(function (counter, item) {
                var p = classifier(item); // get the burgerName
                // check if the burger name already exists
                // if it does, increment else create the entry and set = 1
                counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
                return counter;
            }, {})
        };

        const countByName = count(this.state.burgers, function (item) {
            return item.burgerName
        });

        // we need to find how many keys there are, that corresponds to the number
        // of different burgers consumed
        let numDifBurgers = 0;
        // eslint-disable-next-line
        for (let key in countByName) {
            numDifBurgers++;
        }

        return numDifBurgers;
    }

    getRatingIcon(rating) {
        switch (rating) {
            case 0: 
                return <FontAwesomeIcon className="bad" icon={['far', 'sad-tear']}/>;
            case 1:
                return <FontAwesomeIcon className="okay" icon={['far', 'meh']}/>;
            case 2:
                return<FontAwesomeIcon className="great" icon={['far', 'grin-stars']}/>;
            default:
                return `ERROR!`;
        }
    }

    realRender() {
        return (<div id="burgerHistory" className="outlineSection">
            <h3 className="text-center">Burger History</h3>
            <div id="burgerHistoryTable">
                <table>
                    <tbody>
                    {
                        this.state.burgers.map((b, i) => {
                            return (<tr key={i}>
                            <td>{b.burgerDate}</td>
                            <td>{b.burgerName}</td>
                            <td>{this.getRatingIcon(b.burgerRating)}</td>
                            </tr>);
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div id="burgerStatistics">
                <p>
                    <img alt="" src="/images/burgerIconBullet.png" /> Total Burgers Eaten: {this.state.burgers.length}
                </p>
                <p>
                    <img alt="" src="/images/burgerIconBullet.png" /> Total Different Burgers: {this.getNumDifferentBurgersEaten()}
                </p>
                <p className="text-center">
                    {/* social media here */}
                </p>
            </div>
        </div>);
    }

    render() {
        if (this.state.burgers) {
            return this.realRender();
        }
        return "";
    }
}

export default BurgerHistory;