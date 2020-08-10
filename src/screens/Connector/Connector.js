//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,Linking, ToastAndroid } from 'react-native';
import { width, height } from 'react-native-dimension';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import BluetoothConnector from './BluetoothConnector';
import NFCConnector from './NFCConnector';


// create a component
class Connector extends Component {

    constructor(props){
        super(props)
        this.state={
            isQRScannerOpened:false,
            isBluetoothScanner:false,
            isNFCConnector:false,
        }
        this.onSuccess = this.onSuccess.bind(this);
        this.onBluetoothCancel = this.onBluetoothCancel.bind(this);
    }

    onBluetoothCancel(){
      this.setState({isBluetoothScanner:false})
    }

    onSuccess = e => {
        ToastAndroid.show(e.data,ToastAndroid.SHORT)
        this.setState({isQRScannerOpened:false})
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
    }
    render() {
        return (
            <View style={styles.container}>

                {this.state.isQRScannerOpened
                ?
                <QRCodeScanner
                style={{width:width(99),height:height(95)}}
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
       
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({isQRScannerOpened:false})}>
            <Text style={styles.buttonText}>Cancel Scan</Text>
          </TouchableOpacity>
        }
      />
      :
      this.state.isBluetoothScanner
      ?
      <BluetoothConnector onBluetoothCancel={this.onBluetoothCancel}/>
      :
      this.state.isNFCConnector
      ?
      <NFCConnector/>
      :
      <View/>
    }
               {!this.state.isQRScannerOpened && !this.state.isBluetoothScanner && !this.state.isNFCConnector
               ?
              <View>
                <TouchableOpacity style={{width:width(99),height:height(12),alignItems:"center",justifyContent:"center",flexDirection:"row",borderWidth:1,borderRadius:12,borderColor:"#125DA3"}} onPress={() => this.setState({isQRScannerOpened:true})}>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/Vector.png")} style={{width:width(12),height:height(12)}} resizeMode="contain"/>
                   </View>
                   <View style={{width:width(65),height:height(15),alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#125DA3",fontSize:24,fontFamily:"Roboto",fontWeight:"bold"}}>
                           QR Code Scan
                       </Text>
                   </View>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/right-dir.png")} style={{width:width(10),height:height(10)}} resizeMode="contain"/>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:width(99),height:height(12),alignItems:"center",justifyContent:"center",flexDirection:"row",borderWidth:1,borderRadius:12,borderColor:"#125DA3",marginTop:height(5)}} onPress={() => this.setState({isNFCConnector:true})}>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/nfc.png")} style={{width:width(12),height:height(12)}} resizeMode="contain"/>
                   </View>
                   <View style={{width:width(65),height:height(15),alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#125DA3",fontSize:24,fontFamily:"Roboto",fontWeight:"bold"}}>
                          NFC Scan
                       </Text>
                   </View>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/right-dir.png")} style={{width:width(10),height:height(10)}} resizeMode="contain"/>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:width(99),height:height(12),alignItems:"center",justifyContent:"center",flexDirection:"row",borderWidth:1,borderRadius:12,borderColor:"#125DA3",marginTop:height(5)}} onPress={() => this.setState({isBluetoothScanner:true})}>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/bluetooth.png")} style={{width:width(12),height:height(12)}} resizeMode="contain"/>
                   </View>
                   <View style={{width:width(65),height:height(15),alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#125DA3",fontSize:24,fontFamily:"Roboto",fontWeight:"bold"}}>
                           Bluetooth Scan
                       </Text>
                   </View>
                   <View style={{width:width(15),height:height(15),alignItems:"center",justifyContent:"center"}}>
                    <Image source={require("../../image/right-dir.png")} style={{width:width(10),height:height(10)}} resizeMode="contain"/>
                   </View>
                </TouchableOpacity>
                </View>
                :
                <View/>
               }
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
export default Connector;
