
import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import Button from './common/Button';
import Balance from './Balance';
import Thoughts from './Thoughts';
class Home extends Component {

	state = { logged: null, option: 1, userID: null };
	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
		if (user) {
			this.setState({ logged: true, userID:user.uid });
		}	else {
			this.setState({ logged: false });
		}
		});
	}
	renderoption(){
		switch (this.state.option){
			case 1:
			return(
				<Thoughts />
			);
			break;
			case 2:
			return(
				<Balance />
			);
			break;
			default:
				return( <Text> Error </Text>);
			}
	}
	mainview() {
		return (
			<View>
      <View style={{ flexDirection: 'row'}}>
				<Button style={{ flex:1, marginRight: 0, marginLeft: 0, borderRadius:0, borderTopWidth:0 }} onPress={() => {this.setState({option: 1})}}>
					Thoughts
				</Button>
				<Button style={{ flex:1, marginLeft: 0, marginRight: 0, borderRadius: 0, borderTopWidth:0 }} onPress={() => {this.setState({option: 2})}}>
					Balance
				</Button>
			</View>
			{this.renderoption()}
			</View>
    );
  }

	renderer() {
		switch (this.state.logged) {
			case true:
				return (this.mainview());
			case false:
				Actions.registration();
				return (this.mainview());
			default:
				return (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size={'large'} />
					</View>);
		}
	}
	render() {
		return (
			this.renderer()
		);
	}
}

const Styles = {
};
export default Home;
