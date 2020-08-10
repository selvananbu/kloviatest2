//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity, ToastAndroid } from 'react-native';
import { width, height } from 'react-native-dimension';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

// create a component
class Setting extends Component {
    constructor(props){
        super(props);
        this.onSignOutPressed = this.onSignOutPressed.bind(this);
    }

    onSignOutPressed(){
        ToastAndroid.show("Signed Out Sucessfully..",ToastAndroid.SHORT);
        AsyncStorage.removeItem("com.processfusion.userdata");
        this.props.navigation.navigate("Login");
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:36,fontFamily:"Roboto",fontWeight:"bold"}}>Klovia</Text>
                <Text>Version 1.0</Text>
                <Image style={{width:width(75),height:height(35)}} source={require("../../image/kloviaicon.png")} resizeMode="contain"/>
                <Text>@2020 Process Fusion Inc.</Text>
                <Text>All Rights Reserved</Text>

                <TouchableOpacity style={styles.buttonTouchable} onPress={this.onSignOutPressed}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
                
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
        width:width(65),
        alignItems:"center",
        justifyContent:"center"
        // borderRadius:18
      },
      
      buttonText: {
        fontSize: 21,
        color: "#fff",
        fontWeight:"bold"
      },
});
// export default Setting;

