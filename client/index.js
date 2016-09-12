import React from 'react'
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import '../Public/stylesheet.css'
//could use inital state as param - ssr - none here yet
const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>

		<Router history={browserHistory} routes={routes} />

	</Provider>, document.getElementById('app'))