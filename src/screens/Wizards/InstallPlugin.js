//import liraries
import React, { Component } from 'react';
import { View, Image,Text, StyleSheet,Linking,TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';

// create a component
class InstallPlugin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{width:width(99),height:height(40),alignItems:"center",justifyContent:"center"}}>
                        <Image source={require("../../image/plugin.png")} style={{width:width(70),height:height(40)}} resizeMode="contain"/>
                </View>
                <View style={{width:width(99),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <View style={{width:width(99),height:height(12),alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:26,color:"#000",fontWeight:"300"}}>Install Print Service</Text>
                    </View>
                </View>
                <View style={{width:width(99),height:height(15),alignItems:"center",justifyContent:"center"}}>
              
                    <Image source={require("../../image/lorem.png")} style={{width:width(70),height:height(12)}} resizeMode="contain"/>
                 
                </View>
                <View style={{width:width(99),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <TouchableOpacity style={{width:width(98),height:height(6),backgroundColor:"#125DA2",alignItems:"center",justifyContent:"center"}} onPress={() => Linking.openURL("market://details?id=net.uniprint.printservice")}>
                        <Text style={{color:"#fff"}}>
                            Install Plugin
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
export default InstallPlugin;
