import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({ album }) => {

  const { thumbnail_image, title, artist, image, url } = album;
  const {
    imageStyle,
    headerTextStyle,
    thumbnailContainerStyle,
    thumbnailStyle,
    headerContentStyle
  } = styles;

  return (
    // each album detail is wrapped in a card component for styling purposes
    // within each card component are multiple card sections for styling purposes
    <Card>
      <CardSection>
      <View style={thumbnailContainerStyle}>
        <Image
          style={thumbnailStyle}
          source={{ uri: thumbnail_image }}
        />
      </View>
      <View style={headerContentStyle}>
        <Text style={headerTextStyle}>{title}</Text>
        <Text>{artist}</Text>
      </View>
      </CardSection>

      <CardSection>
        <Image
          source={{ uri: image }}
          style={imageStyle}
        />
      </CardSection>

      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          Buy Now
        </Button>
      </CardSection>
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default AlbumDetail;
