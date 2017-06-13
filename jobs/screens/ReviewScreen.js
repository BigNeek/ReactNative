import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import SettingsScreen from './SettingsScreen';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
        />
      )
    };
  }

  render() {
    return (
      <View>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
        <Text>REVIEWSCREEN</Text>
      </View>
    );
  }
}

export default ReviewScreen;
