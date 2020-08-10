//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { height,width } from 'react-native-dimension';

// create a component
class FavouritePrinterItem extends Component {

    constructor(props){
        super(props)
        this.state={
            favId:[]
        }
    }

    getPrinter(printer){
        var imgPath = '';
        var name = printer.Name.toLowerCase();
        if(name.includes("hp")){
            imgPath = require("../../image/hp.png"); 
        }
        else if(name.includes("xerox")){
            imgPath = require("../../image/hp.png"); 
        }
        else if(name.includes("samsung")){
            imgPath = require("../../image/samsung.png"); 
        }
        else{
            imgPath = require("../../image/printicon.png");
        }

        return imgPath;
    }
    isFavouritePrinter(printer){
       
        var imgPath = require("../../image/unstar.png");
        this.props.favList.map((temp) => {
           
            if(printer.PrinterId === temp.PrinterId){
                imgPath = require("../../image/star.png"); 
            }
        })
        return imgPath;
    }
    onFavouritePressed(printer){
       this.props.onFavouritePressed(printer)
    }
    render() {
        var printer = this.props.printer;
        
        return (
            <TouchableOpacity style={{width:width(65),height:height(14),alignItems:"center",justifyContent:"center",borderWidth:1,marginRight:width(5),marginLeft:width(5),borderColor:"rgba(14, 70, 121, 0.1)",paddingLeft:width(4),flexDirection:"column"}}>
                <View style={{width:width(60),height:height(8),alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                <View style={{width:width(55),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
            <View style={{width:width(60),height:height(4),flexDirection:"row"}}>
            <View style={{width:width(45),alignItems:"flex-start",justifyContent:"center",height:height(4)}}>
            <Text style={{fontFamily: "Roboto",fontSize:14,fontWeight:"bold"}}>
                {printer.Name.length > 22 ? printer.Name.substring(0,22)+"..." : printer.Name}
            </Text>
            </View>
            <View style={{height:height(4),alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity style={{width:width(10),height:height(2),alignItems:"center",justifyContent:"center",backgroundColor:"#E8F0F7",borderRadius:12}}>
            <Text style={{fontFamily: "Roboto",fontSize:10}}>
                Status
            </Text>
            </TouchableOpacity>
            </View>
            </View>
            <View>
                <Text>
                    {printer.Location}
                </Text>
            </View>
            </View>
           
            <TouchableOpacity style={{width:width(8),height:height(8),alignItems:"center",justifyContent:"flex-start"}} onPress={this.onFavouritePressed.bind(this,printer)}>
            <Image source={this.isFavouritePrinter(printer)} style={{ width: width(5), height: height(5) }} resizeMode="contain" />
            </TouchableOpacity>

            </View>

            <View style={{height:height(6),width:width(60),alignItems:"flex-start",justifyContent:"center"}}>
            <Image source={this.getPrinter(printer)} style={{ width: width(8), height: height(6) }} resizeMode="contain" />
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
export default FavouritePrinterItem;
