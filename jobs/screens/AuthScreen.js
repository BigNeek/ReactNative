import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, AsyncStorage } from 'react-native';
import * as actions from '../actions';

class AuthScreen extends Component {
  // when this component first renders it calls the facebookLogin actioncreator
  // which checks to see if there is an existing token in AsyncStorage. If there
  // is the component rerenders and componentWillReceiveProps is called as
  // componentDidMount is only called once on initial render.
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
    // AsyncStorage.removeItem('fb_token');
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
