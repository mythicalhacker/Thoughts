import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import firebase from 'firebase';
import Routercomp from './Routercomp';

class App extends Component {
	state = { splash: 1 };
	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyBLu1NXX3fzenSCmgVB5QVAQdKegOFnr84",
     authDomain: "thoughts-ec264.firebaseapp.com",
     databaseURL: "https://thoughts-ec264.firebaseio.com",
     projectId: "thoughts-ec264",
     storageBucket: "thoughts-ec264.appspot.com",
     messagingSenderId: "288331341870"
  });
	}
	renderer() {
		switch (this.state.splash) {
				case 1:
					setTimeout(() => this.setState({ splash: 2 }), 1000);
					return (
						<View style={Styles.viewStyle} >
							<Text style={Styles.textStyle}> Thoughts </Text>
							<Image style={Styles.imageStyle}source={{uri: 'https://cdn3.iconfinder.com/data/icons/higher-education-icon-set/256/idea.png'}} />
						</View>
					);
				default:
				return (
					<Routercomp />
				);
		}
	}
	render() {
		return (
			this.renderer()
		);
	}
}

const Styles = {
	imageStyle: {
		height: 200,
		width: 350,
		resizeMode: 'stretch'
	},
	viewStyle: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#87ceff'
  }
}
export default App;
