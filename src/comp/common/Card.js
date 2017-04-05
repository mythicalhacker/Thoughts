import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth:0.5,
    borderColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    elevation: 1,
  }
};

export default Card;
