import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducers from './reducers';


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
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Text>
            Hello!
          </Text>
        </View>
      </Provider>
    );
  }
}

export default App;
