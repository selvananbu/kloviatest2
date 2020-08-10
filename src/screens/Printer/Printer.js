//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Image } from 'react-native';
import { width, height } from 'react-native-dimension';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainApiClient_proximitydevice from '../../api/proximitydeviceapi'
import PrinterItem from './PrinterItem';
import FavouritePrinterItem from './FavouritePrinterItem';
 

const axios = require('axios');

// create a component
class Printer extends Component {

    constructor(props){
        super(props)
        this.state={
            printers:[],
            favList:[],
            isloadingPrinters:true
        }
    }

    callbackProximityPrinters(response){
        console.log(response)
        if (response.status === 200) {
            this.setState({printers:response.data,isloadingPrinters:false})
        }
    }

    getPrintersFromServer(){
        var accesstoken = this.props.userdata.userdata.AccessToken;
        if(accesstoken !== undefined){
            new MainApiClient_proximitydevice().GET_proximitydevice_printers_mappable(this.callbackProximityPrinters.bind(this));
        }
    }
    componentDidMount(){
            this.getPrintersFromServer();
    }
    onFavouritePressed(printer){
        
        var list = this.state.favList;
        var isPrinterFav = false;
        list.map((temp) => {
            if(temp.PrinterId === printer.PrinterId){
                isPrinterFav = true;
            } 
        })
        if(isPrinterFav){
           var temp = [];
           list.map((printerId) => {
           
               if(printerId.PrinterId !== printer.PrinterId){
                    temp.push(printerId)
               }
           })
          
           this.setState({favList:temp})
           this.props.setFavouritePrinters(temp)
        }
        else{
            list.push(printer);
            this.setState({favList:list})
            this.props.setFavouritePrinters(list)
        }

        
      
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width:width(90),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
                <Text style={{  fontSize: 18, fontFamily: "Roboto" }}>My Favourite Printers ({this.state.favList.length})</Text>
                </View>
                <View style={{width:width(100),height:height(15),alignItems:"center",justifyContent:"center"}}>
                {this.state.favList.length === 0
                    ?
                    <View style={{flexDirection:"row",height:height(8),alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontFamily: "Roboto"}}>Add Below Printers as Favourite...</Text>
                   
                    
                    </View>
                    :
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {this.state.favList.map((printer,idx) => {
                            return(
                            <TouchableOpacity  key={idx} style={{alignItems:"center",justifyContent:"center"}}>
                            <FavouritePrinterItem style={{marginLeft:width(5)}} printer={printer} key={idx} favList={this.state.favList} onFavouritePressed={this.onFavouritePressed.bind(this)}/>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                    }
                    </View>
                <View style={{width:width(99),height:height(60),alignItems:"center",justifyContent:"center"}}>
                <View style={{width:width(90),height:height(4),alignItems:"flex-start",justifyContent:"center"}}>
        <Text style={{  fontSize: 18, fontFamily: "Roboto" }}>All Available Printers ({this.state.printers.length})</Text>
                </View>
               
               
                    {this.state.isloadingPrinters
                    ?
                    <View style={{flexDirection:"row",height:height(8),alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontFamily: "Roboto"}}>Loading Printers for you...</Text>
                    <ActivityIndicator size="large" color="#125DA3" />
                    
                    </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.printers.map((printer,idx) => {
                            return(<PrinterItem printer={printer} key={idx} favList={this.state.favList} onFavouritePressed={this.onFavouritePressed.bind(this)}/>)
                        })}
                    </ScrollView>
                    }
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


function mapStateToProps(state) {
    return {
        userdata: state.Credentials,
        favouriteprinters:state.Credentials

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserCredentials: Action.setUserCredentials,
        setFavouritePrinters: Action.setFavouritePrinters
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Printer);
