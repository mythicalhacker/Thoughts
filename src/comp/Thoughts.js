import React, {Component} from 'react';
import { Text,ScrollView , View, ActivityIndicator,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Node from './Node';
class Thoughts extends Component{
  state={
    loged: false,
    thoughts: [],
    userID: null
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
		if (user) {
        this.setState({userID: user.uid});
        firebase.database().ref('users/' + this.state.userID + '/').on('child_added',
    					(snapshot) => {
                  this.setState({ loged: true});
    							this.setState(prev => ({
                    thoughts: [...prev.thoughts,snapshot.val()]
                  }));
    					},
    					(errorObject) => {
    							console.log(errorObject);
    					}
    				);
      }
    }
    );
  }
  renderList(){
    return this.state.thoughts.map(thought =>
        <Node head={thought.head} body={thought.body} key={thought.key} keyy={thought.key} uid={this.state.userID} />
    );
  }
  renderer(){
    switch (this.state.loged) {
      case true:
        return(
          <ScrollView style={{marginBottom:50}}>
          {this.renderList()}
          <TouchableOpacity onPress={()=>firebase.auth().signOut()}>
            <Text style={{color:'#87ceff'}}> Sign Out </Text>
          </TouchableOpacity>
          </ScrollView>
        );
      default:
      return(
        <View style={{flex:1,paddingTop:50,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );

    }
  }
  render(){
    return(
      this.renderer()

      );
  }
}
export default Thoughts;
