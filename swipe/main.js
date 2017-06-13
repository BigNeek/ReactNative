import Expo from 'expo';
import React from 'react';
import { Card, Button } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';


const DATA = [
  { id: 1, text: 'Fedor Emelianenko', desc: 'Fedor Vladimirovich Emelianenko is a Russian heavyweight mixed martial artist, sambist, and judoka, currently competing for Rizin Fighting Federation and Bellator MMA.', uri: 'https://cdn.vox-cdn.com/thumbor/-NCAV6W_MNiSmLg6NEVWEyc8IzU=/0x0:1600x900/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/45770712/FedorEmelianenkoEstherLin_crop_650x440.0.0.jpg' },
  { id: 2, text: 'Gegard Mousasi', desc: 'Gegard Mousasi, is a Dutch mixed martial artist and kickboxer currently competing in the Ultimate Fighting Championship.', uri: 'http://media.ufc.tv/generated_images_sorted/NewsArticle/G/Gegard-Mousasi-A-Different-Kind-of-Excited/Gegard-Mousasi-A-Different-Kind-of-Excited_500824_OpenGraphImage.png' },
  { id: 3, text: 'Shogun Rua', desc: 'Maurício "Shogun" Milani Rua is a Brazilian professional mixed martial artist currently competing in the Light Heavyweight division of the Ultimate Fighting Championship.', uri: 'https://thebloguin.files.wordpress.com/2014/03/shogun-rua.jpg' },
  { id: 4, text: 'Mark Hunt', desc: 'Mark Richard Hunt is a New Zealand mixed martial artist and former kickboxer of Samoan descent, currently living in Sydney, Australia. Hunt competes in the Ultimate Fighting Championship and was the winner of the 2001 K-1 World Grand Prix.', uri: 'http://www.markhunt.tv/wp-content/uploads/2016/02/mark_hunt_Master.jpg' },
  { id: 5, text: 'Robbie Lawler', desc: 'Robert Glenn "Robbie" Lawler is an American professional mixed martial artist and former UFC Welterweight Champion.', uri: 'http://halfguarded.com/wp-content/uploads/robbie-lawler.png' },
  { id: 6, text: 'Joanna Jedrzejczyk', desc: 'Joanna Jędrzejczyk is a Polish mixed martial artist who competes in the womens strawweight division of the Ultimate Fighting Championship.', uri: 'http://media.ufc.tv/generated_images_sorted/Media/536/536137/Fight-Night-Berlin--Ronda-Rousey-And-Conor-McGregor-Discuss-Joanna-Jedrzejczyk-s-Rising-Star_536137_OpenGraphImage.png' },
  { id: 7, text: 'Nick Diaz', desc: 'Nicholas Robert "Nick" Diaz is an American professional mixed martial artist who is currently signed with the Ultimate Fighting Championship.', uri: 'http://cdn.scrapdigest.com/wp-content/uploads/2015/12/012215-UFC-Nick-Diaz-SS-PI.vresize.1200.675.high_.641.jpg' },
  { id: 8, text: 'Max Holloway', desc: 'Jerome Max Holloway is a mixed martial artist from Hawaii, currently fighting in the featherweight division of the Ultimate Fighting Championship where he is the current interim UFC Featherweight Champion.', uri: 'https://usatmmajunkie.files.wordpress.com/2015/04/max-holloway-cub-swanson-ufc-on-fox-15-1.jpg' },
];

class App extends React.Component {
  // we call renderCard in main so that the Deck component can remain reusable
  // we have a renderCards function in the Deck component that maps over the
  // hardcoded data and calls the renderCard method within main.js
  // both the data and renderCard method are being passed as props to Deck
  renderCard(item) {
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Button
          icon={{ name: 'code' }}
          backgroundColor='#03a9f4'
          title="View More!"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
        <Card
          title='All Done!'
        >
          <Text style={{ marginBottom: 10 }}>
            There is no more content to be shown!
          </Text>
          <Button
            title='Get More'
            backgroundColor='#03a9f4'
          />
        </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          renderCard={this.renderCard}
          data={DATA}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 10
  },
  cardStyle: {
    alignSelf: 'stretch'
  }
});

Expo.registerRootComponent(App);
