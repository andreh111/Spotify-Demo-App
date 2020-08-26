import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking} from 'react-native';
import ListArtists from './ListArtists';

const AlbumCard = ({
  name,
  image,
  artists,
  release_date,
  total_tracks,
  external_urls,
}) => {
  return (
    <View
      style={{
        width: 140,
        justifyContent: 'space-between',
        borderWidth: 0.5,
        margin: 5,
      }}>
      <View>
        <Image
          style={{width: 140, height: 100}}
          source={{uri: image}}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            margin: 5,
          }}>
          {name}
        </Text>
      </View>
      <View>
        <View>
          <ListArtists artists={artists} />
        </View>

        <Text
          style={{
            fontSize: 12,
            margin: 5,
            color: 'gray',
          }}>
          {release_date}
        </Text>
        <Text
          style={{
            fontSize: 14,
            margin: 5,
            color: 'gray',
          }}>
          {total_tracks} Tracks
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(external_urls.spotify)}
        style={{
          backgroundColor: 'gray',
          width: '100%',
          height: 30,
          alignSelf: 'flex-end',
        }}>
        <Text
          style={{
            textAlign: 'center',
            margin: 5,
            color: '#fff',
            fontSize: 17,
          }}>
          Preview Spotify
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlbumCard;
