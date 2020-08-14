//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity, ToastAndroid } from 'react-native';
import { width, height } from 'react-native-dimension';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { Switch } from 'react-native-paper';

import TouchID from 'react-native-touch-id';
const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
// create a component
class Setting extends Component {
    constructor(props){
        super(props);
        this.state={
            isSwitchOn:true,
            isAutoRelease:false
        }
        this.onSignOutPressed = this.onSignOutPressed.bind(this);
    }

    onSignOutPressed(){
        ToastAndroid.show("Signed Out Sucessfully..",ToastAndroid.SHORT);
        AsyncStorage.removeItem("com.processfusion.userdata");
        this.props.setUserCredentials({});
        this.props.navigation.navigate("Login");
    }
    onFingerPressed(){
      
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        // Alert.alert('Authenticated Successfully');
        this.setState({isSwitchOn:!this.state.isSwitchOn})
      })
      .catch(error => {
        // Alert.alert('Authentication Failed');
      }); 
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:36,fontFamily:"Roboto",fontWeight:"bold"}}>Klovia</Text>
                
                <Image style={{width:width(75),height:height(30)}} source={require("../../image/kloviaicon.png")} resizeMode="contain"/>
                

                <View style={{width:width(95),alignItems:"flex-start",justifyContent:"center"}}>
                <Text style={{fontSize:18,fontFamily:"Roboto",fontWeight:"bold"}}>
                    Settings
                </Text>
               
                <View style={{width:width(95),height:height(8),borderBottomColor:"grey",borderBottomWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <View style={{width:width(65)}}>
                <Text>Secure Pin</Text>
                </View>
                <Switch value={this.state.isSwitchOn} onValueChange={() => this.onFingerPressed()} />
                </View>

                <View style={{width:width(95),height:height(8),borderBottomColor:"grey",borderBottomWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <View style={{width:width(65)}}>
                <Text>Auto Release</Text>
                </View>
                <Switch value={this.state.isAutoRelease} onValueChange={() => this.onFingerPressed()} />
                </View>

                <View style={{width:width(95),height:height(8),borderBottomColor:"grey",borderBottomWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <View style={{width:width(65)}}>
                <Text>Version</Text>
                </View>
                <Text>1.0</Text>
                </View>
                </View>
               
                
                <TouchableOpacity style={styles.buttonTouchable} onPress={this.onSignOutPressed}>
                
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>

          <Text>@2020 Process Fusion Inc.</Text>
                <Text>All Rights Reserved</Text>
                
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        userdata: state.Credentials,

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserCredentials: Action.setUserCredentials
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
      buttonTouchable: {
        padding: 16,
        marginTop:height(8),
        backgroundColor:'#125DA3',
        width:width(95),
        borderRadius:4,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:height(5)
        // borderRadius:18
      },
      
      buttonText: {
        fontSize: 21,
        color: "#fff",
        fontWeight:"bold"
      },
});
// export default Setting;

