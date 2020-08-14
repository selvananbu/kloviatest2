//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image, CheckBox } from 'react-native';
import { height,width } from 'react-native-dimension';


// create a component
class PrinterItem extends Component {

    constructor(props){
        super(props)
        this.state={
            favId:[],
            showPrintDialog:false,
            isSelected:false
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
        } else if(name.includes("samsung")){
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
    onPrintPressed(){

    }
    isPrinterSelected(){
        if(this.props.selectPrinterList === [] || this.props.selectPrinterList === undefined) return false;
        var isPrinterFound = false;
        this.props.selectPrinterList.map((printer) => {
            if(printer.PrinterId === this.props.printer.PrinterId){
                console.log("jknkjn",printer.PrinterId,this.props.printer.PrinterId);
                return true;
            }
        })
    }
    
    render() {
        var printer = this.props.printer;
        var isSelected = this.isPrinterSelected();
        console.log(isSelected,"hbjhbj");
        
        return (
            <TouchableOpacity style={{width:width(96),height:height(14),alignItems:"center",justifyContent:"center",marginTop:height(1),marginBottom:height(1),borderWidth:1,borderColor:"rgba(14, 70, 121, 0.1)",paddingLeft:width(4),flexDirection:"column"}} onPress={() =>this.props.onPrinterItemPressed(this.props.printer)}>
                <View style={{width:width(90),height:height(8),alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                {isSelected
                ?
                <View style={{width:width(8),height:height(6),alignItems:"flex-start",justifyContent:"flex-start"}}>
                <CheckBox value={this.state.isSelected}/>
                </View>
                :
                <View/>
                }
                <View style={{width:width(72),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
            <View style={{width:width(70),height:height(4),flexDirection:"row"}}>
           
            <View style={{width:width(50),alignItems:"flex-start",justifyContent:"center",height:height(4)}}>
            <Text style={{fontFamily: "Roboto",fontSize:14,fontWeight:"bold"}}>
                {printer.Name.length > 22 ? printer.Name.substring(0,22)+"..." : printer.Name}
            </Text>
            </View>
            <View style={{height:height(4),alignItems:"center",justifyContent:"center"}}>
            <TouchableOpacity style={{width:width(12),height:height(2),alignItems:"center",justifyContent:"center",backgroundColor:"#E8F0F7",borderRadius:12}}>
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

            <View style={{height:height(6),width:width(80),alignItems:"flex-start",justifyContent:"center"}}>
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
    }
    ,
    textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: "#fff",
        fontWeight:"bold"
      },
      buttonTouchable: {
        padding: 16,
        marginTop:height(8),
        backgroundColor:'#125DA3',
        borderRadius:18
      }
});

//make this component available to the app
export default PrinterItem;
