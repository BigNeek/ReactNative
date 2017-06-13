import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-31120.cloudfunctions.net';
class SignUpForm extends Component {
  state = { phone: '' };

  handleSubmit = async () => {
    console.log('handleSubmit');
    // await cause async function to pause and wait for a promises resolution
    // try{}catch is how you manage errors within async/await
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
    } catch (err) {
      console.log(`Here is the error ${err}`);
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
        <Button
          small
          title='Submit'
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

export default SignUpForm;
