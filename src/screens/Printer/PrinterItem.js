//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { height,width } from 'react-native-dimension';

// create a component
class PrinterItem extends Component {
    render() {
        var printer = this.props.printer;
        return (
            <TouchableOpacity style={{width:width(96),height:height(8),alignItems:"center",justifyContent:"center",marginTop:height(1),marginBottom:height(1),borderWidth:1,borderColor:"rgba(14, 70, 121, 0.1)",paddingLeft:width(4),flexDirection:"row"}}>
            <View style={{width:width(30),height:height(4),alignItems:"flex-start",justifyContent:"center"}}>
            <Image source={require("../../image/printicon.png")} style={{ width: width(8), height: height(5) }} resizeMode="contain" />
            </View>
            <View style={{width:width(60),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
            <Text style={{fontFamily: "Roboto",fontSize:12}}>
                {printer.Name}
            </Text>
            <Text style={{fontFamily: "Roboto",fontSize:12}}>
                {printer.PrinterId}
            </Text>

            </View>
        </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default PrinterItem;
