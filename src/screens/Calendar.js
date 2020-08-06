import React, { Component } from 'react';
import { View, Text ,SafeAreaView } from 'react-native';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text> Welcome to Calendar Screen </Text>
      </SafeAreaView>
    );
  }
}
