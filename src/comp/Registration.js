import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, BackAndroid, ScrollView, Alert } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import CardSection from './common/CardSection';
import Card from './common/Card';
import Button from './common/Button';
import Input from './common/Input';
class Registration extends Component {

  state= {
    page: 0,
    signInEmail: '',
    signInPass: '',
    signInError: '',
    loading: ''
  };


  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.page === 1) this.setState({ page: 0 });
      else if (this.state.page === -1) this.setState({ page: 0 });
      return true;
    });
  }
  loader() {
  switch (this.state.loading) {
    case true:
    return (
      <ActivityIndicator size='small' />
    );
    case false:
    return (
      <Text style={{ color: '#cc0000' }}>{this.state.signInError}</Text>
    );
    default:
    return (null);

  }
}
  signIn(){
      this.setState({ loading: true });
      firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPass)
      .then(() => {
        this.setState({ loading: null });
        Actions.pop();
      }
    )
    .catch((error) => {
      this.setState({ loading: false });
      this.setState({ signInEmail: '', signInPass: '' });
      if (error.code === 'auth/invalid-email') this.setState({ signInError: 'Invalid email' });
      else if (error.code === 'auth/network-request-failed') this.setState({ signInError: 'Please Check Network' });
      else if (error.code === 'auth/user-not-found') this.setState({ signInError: 'This email is not registered' });
      else if (error.code === 'auth/wrong-password') this.setState({ signInError: 'Wrong Password' });
      else this.setState({ signInError: 'Authentication Failed, Try Again' });
    });
}
  signUp(){
    firebase.auth().createUserWithEmailAndPassword(this.state.signInEmail, this.state.signInPass)
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
  		if (user) {
  			this.setState({ userID:user.uid });
        firebase.database().ref('money/'+this.state.userID).set({money: 0}).then(()=>{
        Alert.alert(
                "Successful",
                "Register Complete",
                [
                  { text: 'OK' }
                ]
              );
        Actions.pop();

      });
          }
        }
      )
      }
    )
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    this.setState({signInPass: '', signInEmail: ''});
    Alert.alert(
            errorCode,
            errorMessage,
            [
              { text: 'OK' }
            ]
          );
  });
  }

mainpage() {
  return (
    <View style={Styles.mainViewStyle}>
    <View style={Styles.textViewStyle}>
    <Text style={Styles.textStyle}> Thoughts </Text>
    <Image style={Styles.imageStyle} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/idea.png' }} />
    </View>
    <View style={Styles.viewStyle}>
    <Button onPress={() => this.setState({ page: 1 })}>
    New User ? Register
    </Button>
    <Button onPress={() => this.setState({ page: -1 })}>
    Returning User ? Log In Here
    </Button>
    </View>
    </View>
  );
}
signinpage() {
  return (
    <View style={Styles.mainViewStyle}>
    <View style={Styles.textViewStyle}>
    <Text style={Styles.textStyle}> Thoughts </Text>
    <Image style={Styles.imageStyle} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/idea.png' }} />
    </View>

    <View style={Styles.viewStyle}>
    <Card>
    <CardSection>
    <Input
    label='Email'
    placeholder='Enter Registered email'
    value={this.state.signInEmail}
    onChangeText={signInEmail => this.setState({ signInEmail })}
    />
    </CardSection>
    <CardSection>
    <Input
    secureTextEntry
    label='Password'
    placeholder='Enter Correct Password'
    value={this.state.signInPass}
    onChangeText={signInPass => (this.setState({ signInPass }))}
    />
    </CardSection>
    <CardSection style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
    {this.loader()}
    <Button onPress={this.signIn.bind(this)}>
    Sign In
    </Button>
    </CardSection>
    </Card>
    </View>
    </View>
  );
}
signuppage() {
  return (
    <View style={Styles.mainViewStyle}>
    <View style={Styles.textViewStyle}>
    <Text style={Styles.textStyle}> Thoughts </Text>
    <Image style={Styles.imageStyle} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/idea.png' }} />
    </View>
    <View style={Styles.viewStyle}>
    <Card>
    <CardSection>
    <Input
    label='Email'
    placeholder='Enter a valid email'
    value={this.state.signInEmail}
    onChangeText={signInEmail => this.setState({ signInEmail })}
    />
    </CardSection>
    <CardSection>
    <Input
    secureTextEntry
    label='Password'
    placeholder='Choose a Password'
    value={this.state.signInPass}
    onChangeText={signInPass => (this.setState({ signInPass }))}
    />
    </CardSection>
    <CardSection style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
    <Button onPress={this.signUp.bind(this)}>
    Sign In
    </Button>
    </CardSection>
    </Card>
    </View>
    </View>
  );
}
renderer() {
  switch (this.state.page) {
    case -1:
    return (this.signinpage());
    case 0:
    return (this.mainpage());
    case 1:
    return (this.signuppage());
    default:
    return (<Text> Error </Text>);

  }
}

render() {
  return (
    <View style={{ flex: 1 }}>
    {this.renderer()}
    </View>

  );
}
}

const Styles = {

  textViewStyle: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 300,
    height: 200,
    resizeMode: 'stretch'
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#cc0000'
  }
};

export default Registration;
