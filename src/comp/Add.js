import React, {Component} from 'react';
import { Text,TextInput , View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import Input from './common/Input';
import Button from './common/Button';
class Add extends Component{
  state={
    heading: '',
    body: '',
    user:null
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
		if (user) {
			this.setState({ user: user.uid });
		}
		});
  }
  add(){
    firebase.database().ref('users/'+this.state.user).push().set({
      head: this.state.heading,
      body: this.state.body,
      key: firebase.database().ref('users/'+this.state.user).push().getKey()
    });
    Actions.pop()
  }
  render(){
    return(
      <View style={{flex:1}}>
      <View style={{flex:1,flexDirection:'column' ,alignItems:'flex-start' ,justifyContent: 'flex-start'}}>
      <TextInput
      style={{alignSelf:'stretch', borderBottomWidth:1}}
      placeholder='Heading'
      value={this.state.heading}
      onChangeText={heading => this.setState({ heading })}
      />
      <TextInput
      style={{ alignSelf: 'stretch',height:450}}
      placeholder='Once Upon A Time.......'
      multiline
      value={this.state.body}
      onChangeText={body => this.setState({ body })}
      />
      <Button onPress={this.add.bind(this)}>
        Save
      </Button>
      </View>
      </View>
    );
  }
}
export default Add;
