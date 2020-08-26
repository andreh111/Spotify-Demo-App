import React from 'react';
import {Text} from 'react-native';

const ListArtists = ({artists}) => {
  return (
    <React.Fragment>
      {artists &&
        artists.map((a, a_index) => {
          return (
            <Text
              key={a_index}
              style={{
                fontSize: 15,
                margin: 5,
                color: 'gray',
              }}>
              {a.name}
            </Text>
          );
        })}
    </React.Fragment>
  );
};

export default ListArtists;
