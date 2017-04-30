import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

// When component renders sends get request and fetches albums
// then updates the state which causes component to rerender
  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({
        albums: response.data
      }));
  }

// helper method that maps over album array and creates new array full of <AlbumDetail />
// while passing a prop to each with a specific album
  renderAlbums() {
    return this.state.albums.map(album =>
       <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default AlbumList;
