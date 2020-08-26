import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AlbumCard from '../src/components/AlbumCard';

it('renders correctly', () => {
  renderer.create(<AlbumCard />);
});
