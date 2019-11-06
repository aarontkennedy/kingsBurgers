import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line
import $ from 'jquery';
// eslint-disable-next-line
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './utils/jquery.autocomplete';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faMeh, faGrinStars, faTired, faSadTear, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons';
library.add(faMeh, faGrinStars, faTired, faSadTear, faTimesCircle, faSyncAlt);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
