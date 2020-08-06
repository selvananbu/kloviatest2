import React, { Component } from 'react';
import { View, Text , SafeAreaView } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
      SplashScreen.hide();
  }

  render() {
    return (
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text> Welcome to  Search  Screen</Text>
      </SafeAreaView>
    );
  }
}
