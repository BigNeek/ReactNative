import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyBShsZ-pdusf8mYtx96x-1Zv3oqZ-H9TJI',
      authDomain: 'auth-bfe3c.firebaseapp.com',
      databaseURL: 'https://auth-bfe3c.firebaseio.com',
      projectId: 'auth-bfe3c',
      storageBucket: 'auth-bfe3c.appspot.com',
      messagingSenderId: '858991579732'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );

      case false:
        return <LoginForm />;

      default:
        return <View style={styles.spinnerLocation}><Spinner /></View>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerLocation: {
    alignSelf: 'center'
  }
};

export default App;
