//import liraries
import React, { Component } from 'react';
import { View, Image,Text, StyleSheet,TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';

// create a component
class Welcome extends Component {

    onSignInPressed(){
        console.log("hereeeeeeeee");
        this.props.navigation.navigate("Login");
    }
    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <View style={{width:width(100),height:height(40),alignItems:"center",justifyContent:"center"}}>
                        <Image source={require("../../image/kloviaicon.png")} style={{width:width(70),height:height(40)}} resizeMode="contain"/>
                </View>
                <View style={{width:width(99),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <View style={{width:width(100),height:height(12),alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:26,color:"#000",fontWeight:"bold"}}>Welcome</Text>
                    </View>
                </View>
                <View style={{width:width(100),height:height(15),alignItems:"center",justifyContent:"center"}}>
              
                    <Image source={require("../../image/lorem.png")} style={{width:width(70),height:height(12)}} resizeMode="contain"/>
                 
                </View>
                <View style={{width:width(100),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity style={{width:width(98),height:height(6),backgroundColor:"#125DA2",alignItems:"center",justifyContent:"center"}} onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={{color:"#fff"}}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
           
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Welcome;
