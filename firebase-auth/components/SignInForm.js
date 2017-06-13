import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-31120.cloudfunctions.net';
class SignInForm extends Component {
  state = { phone: '', code: '' };

  handleSubmit = async () => {
    console.log('handleSubmit');
    // await cause async function to pause and wait for a promises resolution
    // try{}catch is how you manage errors within async/await
    try {
    // we use let instead of const b/c the async function returns null at first
    // as the response takes time to complete. So it changes. If we used const
    //  it would not be able to change as the var would be immutable.
      let { data } = await axios.post(
        `${ROOT_URL}/verifyOneTimePassword`,
        { phone: this.state.phone, code: this.state.code
      });
      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        <Button
          small
          title='Sign In'
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignInForm;
