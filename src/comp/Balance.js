import React, {Component} from 'react';
import { View,Button,Text, TextInput, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import Input from './common/Input';
import firebase from 'firebase';
import Node from './Node';
class Balance extends Component{
state={
  money: 0,
  userID:null,
  rec:false,
  modalVisible:false,
  expense: [],
  amount: 0,
  amount2: 0,
  amount3: 0,
  dis: '',
  modal2Visible: false,
  load: false
}
  constructor(props){
    super(props);

  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
		if (user) {
			this.setState({ userID:user.uid });
        this.setState({ rec: true});
      firebase.database().ref('money/' + this.state.userID + '/').on('value',
              (snapshot) => {
                  this.setState({amount: snapshot.val().money});
                  console.log(this.state.amount);
                });
      firebase.database().ref('exp/' + this.state.userID + '/').on('child_added',
            (snapshot) => {
                this.setState(prev => ({
                  expense: [...prev.expense,snapshot.val()]
                }));
                this.setState({load:true})
            },
            (errorObject) => {
                console.log(errorObject);
            }
          );
		}
		});
  }
  renderList(){
    switch (this.state.load) {
      case true:
      return this.state.expense.map(exp =>
          <Node head={exp.amount} body={exp.body} key={exp.key} keyy={exp.key} uid={this.state.userID} />
      );

      default:
        return null;
    }

  }
  loader(){
    return(
        <ActivityIndicator size="large" />
    )
  }
  topb(){
    return
    (
      null

  );
}
  modal(){
    return(
      <View style={{paddingTop:55}}>
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=>this.setState({modalVisible:false})}

          >
          <View style={{backgroundColor: '#f9f9f9', margin:30, marginTop: 200}}>
          <Text style={{color:'#000'}}> Enter the Amount Below and Save</Text>
          <TextInput
          placeholder='Amount'
          keyboardType= 'numeric'
          value={this.state.amount2.toString()}
          onChangeText={amount2 => this.setState({ amount2 })}
          />
          <Button onPress={()=>{
            firebase.database().ref('money/'+this.state.userID).set({money: this.state.amount2});
            this.setState({modalVisible:false})
          }} title="Save" />
          </View>
          </Modal>
          </View>
    );
  }
  expModal(){
    return(
    <View style={{paddingTop:55}}>
    <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.modal2Visible}
        onRequestClose={()=>this.setState({modal2Visible:false})}

        >
        <View style={{backgroundColor: '#f9f9f9', margin:30, marginTop: 200}}>
        <Text style={{color:'#000'}}> Enter the Amount, Discription and Save</Text>
        <TextInput
        placeholder='Amount'
        keyboardType= 'numeric'
        value={this.state.amount3.toString()}
        onChangeText={amount3 => this.setState({ amount3 })}
        />
        <TextInput
        placeholder='Discription'
        value={this.state.dis}
        onChangeText={dis => this.setState({ dis })}
        />
        <Button onPress={()=>{
          firebase.database().ref('exp/'+this.state.userID).push({amount: this.state.amount3, body: this.state.dis});
          firebase.database().ref('money/'+this.state.userID).set({money: this.state.amount-this.state.amount3});
          this.setState({modal2Visible:false, amount3: 0, dis: ''})
        }} title="Save" />
        </View>
        </Modal>
        </View>
      );
  }
  mainView(){
    return(
      <View style={{marginTop:40}}>
      <TouchableOpacity onPress={()=>this.setState({modalVisible:true})}>
      {console.log('I just jans')}
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:30}}> {this.state.amount} </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.setState({modal2Visible:true})}>
        <Text style={{color:'#87ceff'}}> Add Expense </Text>
      </TouchableOpacity>
      {console.log("main ran")}
      {this.renderList()}
      {this.modal()}
      {this.expModal()}
      </View>
    );
  }
  renderer(){
    switch (this.state.rec) {
      case true:
        return this.mainView();
      default:
        return this.loader();
    }
  }
  render(){
    return(
    this.renderer()
    );
  }
}
export default Balance;
