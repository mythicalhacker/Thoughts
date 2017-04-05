import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './Home';
import Registration from './Registration';
import Add from './Add'
const Routercomp = () => {
  return (
      <Router sceneStyle={{ paddingTop: 55 }} navigationBarStyle={{ backgroundColor: '#87ceff' }} titleStyle={{ color: '#FFF', fontWeight: 'bold' }} barButtonIconStyle={{ tintColor: '#FFF' }} backButtonTextStyle={{ color: '#f9f9f9' }}>
        <Scene key='home' component={Home} title='Home' type='reset' rightTitle='Add' onRight={()=>{Actions.add()}} rightButtonTextStyle={{color:'#FFF'}} />
        <Scene key='registration' component={Registration} hideBackImage title='Registration' panHandlers={null} />
        <Scene key='add' component={Add} title='Add' />

      </Router>
  );
};

export default Routercomp;
