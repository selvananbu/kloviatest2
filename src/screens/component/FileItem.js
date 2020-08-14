//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { width, height } from 'react-native-dimension';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
// create a component
class FileItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.state={
            menu:false
        }
    }

    getFileImage(name) {
        var extension = name.split(".").pop();
        if (extension === "pdf") {
            return require("../../image/pdficon.png");
        }
        else if (extension === "pdf") {
            return require("../../image/pdficon.png");
        }
        else if (extension === "txt") {
            return require("../../image/text.png");
        }
        else{
            return require("../../image/file.png"); 
        }
    }

    onPrintPressed(file) {
        if (this.props.onPrintPressed !== undefined)
            this.props.onPrintPressed(file);
    }
    onSharePressed(file){
        if(this.props.onSharePressed !== undefined)
                this.props.onSharePressed(file);
    }
    onMenuPressed(file){
            console.log("fieeeeeeee",file);
    }
    getMenuOption(){
        return(
            <TouchableOpacity style={{width:width(10),height:height(8),alignItems:"center",justifyContent:"center"}} onPress={() => this.setState({menu:true})}>
                <Image source={require("../../image/hambermenu.png")} style={{width:width(2),height:height(2)}} resizeMode="contain"/>
            </TouchableOpacity>
        )
    }
    
    render() {
        var file = this.props.file;

        return (

            <TouchableOpacity style={{ width: width(90), height: height(9), alignItems: "center", justifyContent: 'center', borderWidth: 1, borderColor: "rgba(14, 70, 121,0.1)", marginBottom: height(1), flexDirection: "row" }}>
                <View style={{ width: width(20), height: height(6), alignItems: "center", justifyContent: "center" ,flexDirection:"row"}}>
                    <Image source={this.getFileImage(file.DocumentName)} style={{ width: width(8), height: height(5) }} resizeMode="contain" />
                    {file.Pin
                    ?
                    <Image source={require("../../image/lock.png")} style={{ width: width(5), height: height(3),position:"absolute",bottom:0,left:45 }} resizeMode="contain" />
                    :
                    <View/>
                    }
                </View>
                <View style={{ width: width(40), height: height(6), alignItems: "flex-start", justifyContent: "center", flexDirection: "column" }}>
                    <Text style={{ fontSize: 14, fontFamily: "Roboto", color: "#3A3A3A" }}>
                        {file.DocumentName.length > 12 ? file.DocumentName.substring(0, 11) + "..." : file.DocumentName}
                    </Text>
                    <Text style={{ fontSize: 11, fontFamily: "Roboto", color: "#3A3A3A" }}>
                        {file.Date}
                    </Text>
                </View>
                {/* <View style={{ width: width(12), height: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    <TouchableOpacity style={{ width: width(2), height: width(2), borderRadius: width(2) / 2, backgroundColor: file.Status === 0 ? "#38BF7C" : "#DF5140" }} />
                    <Text style={{ fontFamily: "Roboto", fontSize: 10 }}>
                        Status
                </Text>
                </View> */}
                <TouchableOpacity style={{ width: width(10), height: height(6), alignItems: "center", justifyContent: "center" }} onPress={this.onPrintPressed.bind(this, file)}>
                    <Image source={require("../../image/print.png")} style={{ width: width(5), height: height(5) }} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: width(10), height: height(6), alignItems: "center", justifyContent: "center" }} onPress={this.onMenuPressed.bind(this, file)}>
                    <Image source={require("../../image/share.png")} style={{ width: width(5), height: height(5) }} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: width(10), height: height(6), alignItems: "center", justifyContent: "center" }} onPress={this.onMenuPressed.bind(this, file)}>
                    <Image source={require("../../image/delete.png")} style={{ width: width(5), height: height(5) }} resizeMode="contain" />
                </TouchableOpacity>
               
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
export default FileItem;
