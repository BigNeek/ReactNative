import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides'

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  // do not need to do this.onSlidesComplete.bind(this) b/c I am using arrow
  // function. On a different note, whenever we render a component with the
  // react-navigation library it is called with a navigation prop which we can
  // then use to navigate elsewhere
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
