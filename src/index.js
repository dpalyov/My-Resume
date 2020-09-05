import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/style.css';
import './css/animate.css';
import './css/flexslider.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import * as serviceWorker from './serviceWorker';
import { ContextProvider } from './store';

library.add(fab,fas);


ReactDOM.render(<ContextProvider><App /></ContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
