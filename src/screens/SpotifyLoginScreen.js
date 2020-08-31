import React from 'react';
import {View, Text, Linking, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default class SpotifyLoginScreen extends React.Component {
  async onLogin() {
    // Just created a backend using node js for handling authentication for spotify using passport js
    //it will take just some seconds to redirect because i am using free version of heroku
    const url = `https://quiet-harbor-68498.herokuapp.com/auth/spotify`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, 'spotifyapp', {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then(async (response) => {
          if (response.type === 'success' && response.url) {

            //read the params from the redirection url

            //redirection url is a deep link to the app called spotifyapp://Detail?accessToken=637ASas7sd7&profile=....
            //so i am reading the access token to store it in my cache
            var regex = /[?&]([^=#]+)=([^&#]*)/g,
              params = {},
              match;
            while ((match = regex.exec(response.url))) {
              params[match[1]] = match[2];
            }
            await AsyncStorage.setItem(
              'accessToken',
              String(params.accessToken),
            );
            Linking.openURL(response.url);
          }
        });
      } else Linking.openURL(url);
    } catch (error) {
      Linking.openURL(url);
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
            padding: 5,
          }}
          onPress={() => this.onLogin()}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/spotify.jpg')}
          />
          <Text style={{color: '#FFF', fontSize: 20}}>Login With Spotify</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
