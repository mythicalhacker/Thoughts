import React, {Component} from 'react';
import { Text , View, TouchableOpacity} from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import firebase from 'firebase';

//  firebase.database().ref("/user/"+props.uid).child(props.key).remove();
// onPress={ () => firebase.database().ref("/users/"+props.uid).child(props.keyy).remove() }
const Node = (props) => {
  return(
    <Card>
      <CardSection>
          <Text style={style.head}>{props.head}</Text>
      </CardSection>
      <CardSection>
        <Text style={style.body}>{props.body} </Text>
      </CardSection>
    </Card>
  );
};

const style = {
  head:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  body:{
    fontSize: 14,
    fontWeight: 'normal'
  }
};

export default Node;
