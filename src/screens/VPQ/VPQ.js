//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Modal,TextInput,TouchableOpacity,PermissionsAndroid,Alert, ToastAndroid , RefreshControl,Image } from 'react-native';
import { height,width } from 'react-native-dimension';
import AsyncStorage from '@react-native-community/async-storage';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob'
import RNPrint from 'react-native-print';
import {Picker} from '@react-native-community/picker';
// import ActionSheet from 'react-native-actionsheet'
import Actionsheet from 'react-native-enhanced-actionsheet'
import Share from "react-native-share";


import base64 from 'react-native-base64';
import FileItem from '../component/FileItem';

import MainApiClient_document from '../../api/documentapi'
import ClooudPrinter from './CloudPrinterModel';

const axios = require('axios');
var RNFS = require('react-native-fs');

 

 

// create a component
class VPQ extends Component {
    constructor(props) {
        super(props)
        this.state={
            printedDocument:[],
            printQueueDocument:[],
            refreshing: false,
            printedDocumentLoading:true,
            printQueueDocumentLoading:true,
            showSecurePinModal: false,
            currentfile: '',
            pin: '',
            userdata: '',
            selectedValue:"0",
            printerType:'local',
            visible: false,
            actionsheetoptions:[],
            selected: 0,
            renderStation:'',
            showPrintDialog:false,
            selectedbin:null,
            bins:[],
            startPage:0,
            endPage:0,
            orientation:[{label:"landscape",value:0},{label:"portrait",value:1}],
            color:[{label:"Black & White",value:0},{label:"Color",value:1}],
            duplex:[{label:"1 - Sided",value:0},{label:"2 - Sided",value:1}],
            selectedOrientation:1,
            copies:0,
            selectedColor:1,
            collate:0,
            selectedduplex:0
        }
        this.onPrintPressed = this.onPrintPressed.bind(this);
        this.getDocumentsFromServer = this.getDocumentsFromServer.bind(this);
        this.onActionSheetSelected = this.onActionSheetSelected.bind(this);
    }
    
    componentDidMount() {
        this.loadUserData();
    }

    getOptions(){
        var COUNT = 0
        var OPTIONS = [];
        
        if(this.props.userdata.favouriteprinters.length !== undefined){
          this.props.userdata.favouriteprinters.map((printer,idx) =>{
              OPTIONS.push({id:idx,label:printer.Name.length > 18 ? printer.Name.substring(0,17)+"..." : printer.Name,printer:printer})
          })
        }
        
        
        return OPTIONS;
    }

    getPrintJobsCurrentCallback(index, response){
        console.log(response, 'response')
        if (response.status === 200) {
            if(index === 0){
                    this.setState({printQueueDocument:response.data,printQueueDocumentLoading:false,refreshing:false})
            }
            else{
                this.setState({printedDocument:response.data,printedDocumentLoading:false,refreshing:false})
            }
        }
        else {
            console.log("njknjknkjn");
        }
    }
    
    getDocumentsFromServer(userdata){
        this.setState({refreshing:true})
        var accesstoken = userdata.AccessToken;
        var encodedUser = base64.encode(userdata.UserName);
        var self = this;
        
        if (accesstoken !== undefined) {
            
            new MainApiClient_document().GET_printJobsCurrent(this.getPrintJobsCurrentCallback.bind(this, 0), '0', encodedUser, accesstoken)
            new MainApiClient_document().GET_printJobsCurrent(this.getPrintJobsCurrentCallback.bind(this, 1), '1', encodedUser, accesstoken)

        }
    }

    loadUserData(){
        try {
            var self = this;
            const value = this.props.userdata.userdata;
            // const value = await AsyncStorage.getItem('com.processfusion.userdata');
            if (value !== null) {
                var data = value;
                self.getDocumentsFromServer(data);
                this.setState({ userdata: data })
            }
            else {
                // this.setState({isloading:false})
            }
        } catch (e) {
            // error reading value
        }
    }

    onSubmitPressed() {
        this.setState({ showSecurePinModal: false,isFileLoading:true });
        ToastAndroid.show("Loading File...",ToastAndroid.SHORT)
        var accesstoken = this.state.userdata.AccessToken;
        
        if (accesstoken !== undefined) {
            var body = { "JobId": this.state.currentfile.PrintJobId.toString(), "Pin": this.state.pin.toString() };
            new MainApiClient_document().GET_printJobsPrintFile(this.downLoadPrintFile.bind(this), body, accesstoken)
          }
          
    }


    downLoadPrintFile(resp){
        console.log("jknkjnjknj",resp);
        if(resp.data !== "Get print job file failed!: Invalid username and/or password!" && resp.data !== ""){
            var responseData = resp.data;
            // const file_path = DownloadDir + "/" + this.state.pin.toString() + ".pdf"
            var path = RNFS.DownloadDirectoryPath + "/" + this.state.pin.toString() + ".pdf";
            // write the file
            RNFS.writeFile(path, responseData, 'base64')
            .then((success) => {
                this.printRemotePDF(path)
                this.setState({isFileLoading:false})
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
            this.setState({showSecurePinModal:false})    
            ToastAndroid.show("Invalid Pin...",ToastAndroid.SHORT);
            this.setState({isFileLoading:false,pin:''})
        }
    }

    async printRemotePDF(path) {
        console.log(path)
        await RNPrint.print({ filePath: path })
    }

    async downloadFile() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            // console.log("njknjknjknkjn");
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                try {
                    // console.log('asdasdasd')
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.onSubmitPressed();
                    } else {
                        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    onPrintPressed(file) {
        this.setState({ showSecurePinModal: true, currentfile: file })
    }
    onSharePressed(file){
        console.log("knknkjn",file);
        
    }
    getRefreshControl(data,index) {
        return (
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() =>this.getDocumentsFromServer(data,index)} />
        )
    }
    showActionSheet = () => {
        if(this.props.userdata.favouriteprinters === {}){
            ToastAndroid.show("No Favoutite Printers available...",ToastAndroid.SHORT);
            return;
        }
        else{
            this.ActionSheet.show()
        }
        
      }

      onActionSheetSelected(e){
        this.setState({visible: false, selected: e.id})
        var accesstoken = this.state.userdata.AccessToken;
       var self = this;
        if (accesstoken !== undefined){
        axios({
            method: 'get',
            url: 'https://infinitycloudadmin.uniprint.net/api/renderstations/mobile/release/printer/' + e.printer.PrinterId,
            headers: {
                Authorization: `Bearer ${accesstoken}`
            }
          })
            .then(function (response) {
            if(response.status === 200){
                ToastAndroid.show("Render Station Available for the Printer...",ToastAndroid.SHORT);
                // self.getBins();
                var list  = [];
                response.data.Bins.map((bin) => {
                    list.push({label:bin.Name,value:bin.BinId})
                })
                self.setState({showPrintDialog:true,renderStation:response.data,bins:list,selectedbin:list[0].value})
            }
            else{
                    ToastAndroid.show("No stations mapped to printers..",ToastAndroid.SHORT);
            }
             
            });
        }
        
      }
      getBins(){
          var list  = [];
          if(this.state.renderStation !== "" && this.state.renderStation.Bins !== []){
                this.state.renderStation.Bins.map((bin) => {
                    
                    list.push({label:bin.Name,value:bin.BinId})
                })
                this.setState({bins:list,selectedbin:list[0].value})
          }
      }

    render() {
        const selectedOption = this.getOptions().find((e) => e.id === this.state.selected)
        return (
            <View style={styles.container}>
                <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showPrintDialog}
            onRequestClose={() => {
                this.setState({showPrintDialog:false})
            }}
        >
               <ClooudPrinter showPrintDialog={this.state.showPrintDialog} bins={this.state.bins} selectedbin={this.state.selectedbin} renderStation={this.state.renderStation}/>
               </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSecurePinModal}
                    onRequestClose={() => {
                        this.setState({showSecurePinModal:false})
                    }}
                >
                    <View style={styles.centeredView}>
                        {this.state.isFileLoading
                            ?
                            <View style={styles.modalView}>
                                <ActivityIndicator />
                            </View>
                            :
                            <View style={styles.modalView}>
                                <View style={{ width: width(65), height: height(5), borderTopRightRadius: 20, borderTopLeftRadius: 20, backgroundColor: "#3A3A3A", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                                        Secure Pin
                            </Text>
                                </View>
                                <View style={{ height: height(8), width: width(65), alignItems: "center", justifyContent: "flex-end" }}>
                                    <TextInput
                                        placeholder="Enter Secure Pin..."
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({ pin: text })}
                                        style={{ width: width(45), height: height(7), marginTop: height(3), borderBottomColor: "grey", borderBottomWidth: 1 }} />
                                </View>
                                <View style={{ width: width(45), height: height(8), borderBottomRightRadius: 20, borderBottomLeftRadius: 20, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row" }}>

                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={this.downloadFile.bind(this)}
                                    >

                                        <Text style={styles.textStyle}>SUBMIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={() => this.setState({ showSecurePinModal: false, })}
                                    >

                                        <Text style={styles.textStyle}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </Modal>
                <View style={{flexDirection:"row"}}>
                <View style={{height:height(8),width:this.state.printerType === "local" ? width(90) : width(75),alignItems:"flex-start",justifyContent:'center'}}>
                <Text style={{fontFamily:"Roboto",fontSize:12,color:"#125DA3"}}>
                            Type of Printing 
                        </Text>
                
                <View style={{borderBottomWidth:1,borderBottomColor:"#125DA3",height:height(7),alignItems:"center",justifyContent:"center"}}>
                                    <Picker
                    selectedValue={this.state.printerType}
                    style={{height: height(6), width:this.state.printerType === "local" ? width(90) : width(75)}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({printerType: itemValue})
                    }>
                    <Picker.Item label="Local Printer" value="local" />
                    <Picker.Item label="Cloud Printer" value="cloud" />
                    </Picker>
                    </View>
                    </View>
                    {this.state.printerType === "local"
                    ?
                    <View/>
                    :
                    <View style={{width:width(15)}}>
       
        <TouchableOpacity style={{width:width(13),alignItems:"center",justifyContent:"center",height:height(8)}}  onPress={() => this.setState({visible: true})}>
        <Image source={require("../../image/cloudprint.png")} style={{ width: width(12), height: height(8) }} resizeMode="contain" />
        </TouchableOpacity>
       
        <Actionsheet 
          visible={this.state.visible}
          data={this.getOptions()} 
          title={'Select your Favourite Cloud Printer'}
          selected={this.state.selected}
          selectedOptionTextStyle={{color:"#fff",fontWeight:"bold"}}
          selectedOptionContainerStyle={{backgroundColor:"#90c2f0",height:height(6),alignItems:"center",justifyContent:"center"}}
          onOptionPress={(e) => this.onActionSheetSelected(e)}
          onCancelPress={() => this.setState({visible: false})}
        />
      </View>
    }
      </View>

              
                <View style={{height:height(35),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height(5),width:width(90),alignItems:"flex-start",justifyContent:'center'}}>
                        <Text style={{fontFamily:"Roboto",fontSize:18}}>
                            Current 
                        </Text>
                    </View>
                    <View style={{height:height(30),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    {this.state.printQueueDocumentLoading
                    ?
                    <ActivityIndicator  size="large" color="#125DA3"/>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}  refreshControl={
                        this.getRefreshControl(this.state.userdata,0)
                    }>
                        {this.state.printQueueDocument.map((file,idx) =>{
                            return(
                                <FileItem key={idx} file={file} onSharePressed={this.onSharePressed} onPrintPressed={this.onPrintPressed}/>
                            )
                        })}    
                    </ScrollView>}
                    </View>
                </View>
                <View style={{height:height(35),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height(5),width:width(90),alignItems:"flex-start",justifyContent:'center'}}>
                        <Text style={{fontFamily:"Roboto",fontSize:18}}>
                            Printed
                        </Text>
                    </View>
                    <View style={{height:height(30),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    {this.state.printedDocumentLoading
                    ?
                    <ActivityIndicator  size="large" color="#125DA3"/>
                    :
                    <ScrollView showsVerticalScrollIndicator={false}    refreshControl={
                        this.getRefreshControl(this.state.userdata,1)
                    }>
                        {this.state.printedDocument.map((file,idx) =>{
                              return(
                                <FileItem key={idx} file={file} onSharePressed={this.onSharePressed}   onPrintPressed={this.onPrintPressed}/>
                            )
                        })}    
                    </ScrollView>}
                    </View>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor: "rgba(255,255,255,0.45)"
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 12,
        elevation: 2
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 5,
        width: width(65),
        height: height(22),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalViewPrint: {
        marginTop:height(20),
        marginLeft:width(8),
        backgroundColor: "#fff",
        borderRadius: 20,
        // padding: 5,
        width: width(85),
        height: height(60),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
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
export default connect(mapStateToProps, mapDispatchToProps)(VPQ);
