import React, { Component } from 'react';
import { View, Text,SafeAreaView, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{marginBottom:height(5)}}> Welcome to Test Screen in Stack Navigator </Text>
        <TouchableOpacity style={{width:width(45),height:height(6),borderRadius:12,backgroundColor:"#baa6ed",alignItems:"center",justifyContent:"center"}} onPress={() => this.props.navigation.navigate("Chat")}>
        <Text style={{fontSize:18,fontWeight:"500",color:"#fff"}}>
            Move Back
        </Text>
    </TouchableOpacity>
        </SafeAreaView>
    );
  }
}
