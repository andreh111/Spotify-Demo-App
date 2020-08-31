import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import ArtistCard from '../components/ArtistCard';
import AlbumCard from '../components/AlbumCard';
import {ScrollView} from 'react-native-gesture-handler';

const ArtistSearchScreen = () => {
  const [q, setQ] = useState('');

  const [searchRes, setSearchRes] = useState([]);
  const [albums, setAlbums] = useState([]);


  // api for searching an artist
  const searchArtist = async () => {
    setSearchRes([]);
    setAlbums([]);
    let token = await AsyncStorage.getItem('accessToken');
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${q}&type=artist`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSearchRes(response.data.artists.items);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // api for getting artist albums when clicking on an artist
  const getArtistAlbums = async (artist) => {
    setAlbums([]);
    let token = await AsyncStorage.getItem('accessToken');
    axios({
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${artist}/albums`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAlbums(response.data.items);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Search Artist"
          style={{
            borderWidth: 1,
            width: '90%',
            margin: 20,
            padding: 10,
            fontSize: 20,
            borderRadius: 4,
          }}
          value={q}
          onChangeText={(q) => setQ(q)}
        />
        <Button onPress={() => searchArtist()} title="Search" />

        <FlatList
          horizontal
          style={{flexGrow: 0}}
          data={searchRes}
          renderItem={({item}) => (
            <ArtistCard
              clickEvent={() => getArtistAlbums(item.id)}
              name={
                item.name.length > 10 ? item.name.substring(0, 10) : item.name
              }
              image={
                item.images[0]
                  ? {uri: item.images[0].url}
                  : require('../../assets/person.png')
              }
              followers={item.followers}
              popularity={item.popularity}
            />
          )}
        />

        {albums && (
          <>
            <View
              style={{
                height: 40,
                backgroundColor: '#ccc',
                justifyContent: 'center',
                padding: 10,
                margin: 5,
              }}>
              <Text style={{fontSize: 20}}>Albums</Text>
            </View>
            <FlatList
              horizontal
              style={{flexGrow: 0}}
              data={albums}
              renderItem={({item}) => (
                <AlbumCard
                  name={
                    item.name.length > 10
                      ? item.name.substring(0, 10)
                      : item.name
                  }
                  image={item.images[0].url}
                  artists={item.artists}
                  total_tracks={item.total_tracks}
                  release_date={item.release_date}
                  external_urls={item.external_urls}
                />
              )}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ArtistSearchScreen;
