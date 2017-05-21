import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBZdK3ZhdLMC7pRurJvdMaccJB-DrWQvIk',
      authDomain: 'manager-7ae81.firebaseapp.com',
      databaseURL: 'https://manager-7ae81.firebaseio.com',
      projectId: 'manager-7ae81',
      storageBucket: 'manager-7ae81.appspot.com',
      messagingSenderId: '149432328407'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
