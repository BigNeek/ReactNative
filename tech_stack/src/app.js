import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { Header } from './components/common';
import LibraryList from './components/LibraryList'

class App extends Component {
  render() {
    return (
      // Provider is what passes the redux store to react. it is the glue between react and redux
      // we pass store into provider and invoke createStore func and pass it our combineReducers
      // Provider can only have one child component. that child can have many children
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <Header headerText="Tech Stack" />
          <LibraryList />
        </View>
      </Provider>
    );
  }
}

export default App;
