import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import StarRating from 'react-native-star-rating';

const ArtistCard = ({name, image, followers, popularity, clickEvent}) => {
  return (
    <TouchableOpacity
      onPress={clickEvent}
      style={{
        width: 140,
        height: 200,
        justifyContent: 'flex-start',
        borderWidth: 0.5,
        margin: 5,
      }}>
      <Image
        style={{width: 140, height: 100}}
        source={image}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          margin: 2,
        }}>
        {name}
      </Text>
      <Text
        style={{
          fontSize: 14,
          margin: 5,
        }}>
        {followers && followers.total} followers
      </Text>
      <StarRating
        disabled
        maxStars={5}
        rating={(popularity * 5) / 100}
        starSize={20}
        fullStarColor={'#FDCC0D'}
      />
    </TouchableOpacity>
  );
};

export default ArtistCard;
