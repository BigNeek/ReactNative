import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCDuWRgEZbhwRPuS68lt0_y-H3z_5UyF4U',
      authDomain: 'one-time-password-31120.firebaseapp.com',
      databaseURL: 'https://one-time-password-31120.firebaseio.com',
      projectId: 'one-time-password-31120',
      storageBucket: 'one-time-password-31120.appspot.com',
      messagingSenderId: '482750690063'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

Expo.registerRootComponent(App);
