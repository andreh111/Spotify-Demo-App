import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SpotifyLoginScreen from './src/screens/SpotifyLoginScreen';
import ArtistSearchScreen from './src/screens/ArtistSearchScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['spotifyapp://', 'https://quiet-harbor-68498.herokuapp.com/'],
  config: {
    SpotifyLogin: 'SpotifyLogin',
    ArtistSearch: 'ArtistSearch',
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="SpotifyLogin" component={SpotifyLoginScreen} />
        <Stack.Screen name="ArtistSearch" component={ArtistSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
