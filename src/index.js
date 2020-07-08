import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';

// redux-thunk is a middleware that waits and sees if any actions return a
//function instead of object
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {searchRobots, requestRobots} from './reducers';
import 'tachyons';


const logger = createLogger();


const rootReducer = combineReducers({searchRobots, requestRobots});

//store describe the state of our app, normally should be rootReducer
const store = 
createStore(rootReducer, applyMiddleware(thunkMiddleware,logger));

//we can remove all state from reacct up and keep it inside of a store
//and pass down the store as a prop

ReactDOM.render(

	//instead of passing the component to the app, just include
	//it into the provider is taking care of passing the store
	//all the components down the component tree from the app
	//use connect the finish this connection, use the connection
	//we are going to make the component redux aware so that to 
	// know which component we want subscribe to changes
				<Provider store={store}>
				  <App />
				  </Provider>, document.getElementById('root'));
				
registerServiceWorker();

