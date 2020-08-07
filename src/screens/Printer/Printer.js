//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Image } from 'react-native';
import { width, height } from 'react-native-dimension';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const axios = require('axios');

// create a component
class Printer extends Component {

    constructor(props){
        super(props)
        this.state={
            printers:[],
            isloadingPrinters:true
        }
    }
    getPrintersFromServer(){
        var accesstoken = this.props.userdata.userdata.AccessToken;
        if(accesstoken !== undefined){
         axios({
            method: 'get',
            url: "https://infinitycloudadmin.uniprint.net/api/proximitydevices/printers/mappable",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({printers:response.data,isloadingPrinters:false})
            }

        });
        }
    }
    componentDidMount(){
            this.getPrintersFromServer();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width:width(90),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
                <Text style={{  fontSize: 18, fontFamily: "Roboto" }}>My Printers</Text>
                </View>
                <View style={{width:width(99),height:height(70),alignItems:"center",justifyContent:"center"}}>
                    {this.state.isloadingPrinters
                    ?
                    <View style={{flexDirection:"row",height:height(8),alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontFamily: "Roboto"}}>Loading Printers for you...</Text>
                    <ActivityIndicator size="large" color="#125DA3" />
                    
                    </View>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.printers.map((printer,idx) => {
                            return(<TouchableOpacity key={idx} style={{width:width(96),height:height(8),alignItems:"center",justifyContent:"center",marginTop:height(1),marginBottom:height(1),borderWidth:1,borderColor:"rgba(14, 70, 121, 0.1)",paddingLeft:width(4),flexDirection:"row"}}>
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
                            </TouchableOpacity>)
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

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserCredentials: Action.setUserCredentials
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Printer);
