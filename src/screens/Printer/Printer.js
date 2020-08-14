//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Modal,TextInput,TouchableOpacity,PermissionsAndroid,Alert, ToastAndroid , ScrollView,Image } from 'react-native';
import { width, height } from 'react-native-dimension';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrinterItem from './PrinterItem';
import FavouritePrinterItem from './FavouritePrinterItem';
import RNPrint from 'react-native-print';
import MainApiClient_document from '../../api/documentapi';

import CloudPrinter from './CloudPrinterModel';

import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';


import MainApiClient_proximitydevice from '../../api/proximitydeviceapi'
import MainApiClient_releaseprintjob from '../../api/releaseprintjob'

var RNFS = require('react-native-fs');
const axios = require('axios');
// create a component
class Printer extends Component {

    constructor(props){
        super(props)
        this.state={
            printers:[],
            favList:[],
            isloadingPrinters:true,
            showPrintDialog:false,
            showSecurePinModal: false,
            pin: '',
            currentfile:'',
            isFileLoading:false,
            showScanner:false,
            selectedCloudPrinter:[],
            proximityDeviceList:[]
        }
        this.onQRScannerPressed = this.onQRScannerPressed.bind(this);
        
        this.onSuccess = this.onSuccess.bind(this);
        this.onPrinterItemPressed = this.onPrinterItemPressed.bind(this);
        this.printRemotely = this.printRemotely.bind(this);
        this.onRemotePrinterPressed = this.onRemotePrinterPressed.bind(this);
        this.getProximityDeviceList = this.getProximityDeviceList.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onPrinterDetailsFromProximityId = this.onPrinterDetailsFromProximityId.bind(this);
        
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
    getProximityPrinters(){
        var accesstoken = this.props.userdata.userdata.AccessToken;
        if(accesstoken !== undefined){
            new MainApiClient_proximitydevice().GET_proximitydevice_printers_mappable(this.callbackProximityPrinters.bind(this));
        } 
    }
    getProximityDeviceList(){
        var accesstoken = this.props.userdata.userdata.AccessToken;
        if(accesstoken !== undefined){
            new MainApiClient_proximitydevice().GET_proximitydevice_list(this.callBackProximityDevice.bind(this));
        } 
    }
    callBackProximityDevice(response){
        if(response !== undefined){
            this.setState({proximityDeviceList:response.data})
        }
    }
    componentDidMount(){
            this.getPrintersFromServer();
            this.getProximityDeviceList()
            // this.getProximityPrinters();
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
    onSubmitPressed() {
        this.setState({ showSecurePinModal: false,isFileLoading:true });
        var accesstoken = this.props.route.params.userdata.userdata.AccessToken;
        console.log("Acesss",accesstoken);
        if (accesstoken !== undefined) {
                ToastAndroid.show("Loading File...",ToastAndroid.SHORT)
                var body = { "JobId": this.state.currentfile.PrintJobId.toString(), "Pin": this.state.pin.toString() };
                new MainApiClient_document().GET_printJobsPrintFile(this.downLoadPrintFile.bind(this), body, accesstoken)
          }
          
    }
    onQRScannerPressed(){
        this.setState({showScanner:true})
    }
    onPrinterDetailsFromProximityId(response){
        if(response !== undefined){
            console.log("ffffffffffff",response.data);
            var list = this.state.selectedCloudPrinter;
            response.data.map((printer) => {
                list.push(printer);
            })
            this.setState({selectedCloudPrinter:list})
            this.printRemotely();
        }
    }
    onSuccess = e => {
        ToastAndroid.show("Printer Found...",ToastAndroid.SHORT);
        this.state.proximityDeviceList.map((proximityDevice) => {
            if(proximityDevice.Data === e.data){
                new MainApiClient_proximitydevice().GET_printer_from_proximity_id(this.onPrinterDetailsFromProximityId.bind(this),proximityDevice.ProximityDeviceId);
            }
        })
        this.setState({showScanner:false})
        
    }
    async printRemotePDF(path) {
        await RNPrint.print({ filePath: path })
        this.props.printedDocument([], false)
        this.props.navigation.navigate("VPQ");
    }
    onRenderStationsRetrieved(response){
        var self = this;
        if(response !== undefined){
          console.log(response.data.includes("No stations mapped to printers"));
          if(response.data !== undefined && !response.data.includes("No stations mapped to printers")){
                  ToastAndroid.show("Render Station Available for the Printer...",ToastAndroid.SHORT);
                  var data = JSON.parse(response.data)
                  console.log(data);

                  var list  = [];
                  data.Bins.map((bin) => {
                      list.push({label:bin.Name,value:bin.BinId})
                  })
                  self.setState({renderStation:data,bins:list,selectedbin:list[0].value,showPrintDialog:true})
              }
              else{
                      ToastAndroid.show("No stations mapped to printers..",ToastAndroid.SHORT);
              }
        }
      
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
    onPrintPressed(){
        this.setState({ showSecurePinModal: true, currentfile: this.props.route.params.param })
    }
    onRemotePrinterPressed(body){
           
            this.state.selectedCloudPrinter.map((printer) => {
                if(body.ReleaseQueues !== undefined && body.ReleaseQueues.length > 0){
                    body.ReleaseQueues.map((release) => {
                        release.PrinterId = printer.PrinterId;
                        release.PrintJobId = this.props.route.params.param.PrintJobId;
                    })

                    new MainApiClient_releaseprintjob().POST_releaseprintjob(this.onReleasePrintJobCalled.bind(this),body)
                }
            })

           

            console.log(body);
    }
    onReleasePrintJobCalled(response){
            var self = this;
            if(response !== undefined){
            if(response.data !== undefined){
                var data = JSON.parse(response.data);

                console.log(data);
                if(data[0].ErrorCode === 0){
                    ToastAndroid.show("File Released to Printer Sucessfully...",ToastAndroid.SHORT);
                    self.setState({showPrintDialog:false,selectedCloudPrinter:[]})
                    self.props.navigation.navigate("VPQ");
                }
                }
            }
    } 
    onPrinterItemPressed(printer){
        var isPrinterAlreadyAdded = false;
        var printerIdx = -1;
        var list = this.state.selectedCloudPrinter;
        if(list.length === 0)
            list.push(printer)
        else{
        list.map((temp,idx) => {
            if(temp.PrinterId === printer.PrinterId){
                isPrinterAlreadyAdded = true;
                printerIdx = idx;
            }
        })
        if(isPrinterAlreadyAdded){
                list.splice(printerIdx,1);
            }
        else{
            list.push(printer);
        }
        }
        this.setState({selectedCloudPrinter:list})
    }
    printRemotely(){
        this.state.selectedCloudPrinter.map((cloudPrinter) => {
            new MainApiClient_document().GET_availableRenderStationForPrinter(this.onRenderStationsRetrieved.bind(this),cloudPrinter.PrinterId)
        })
      
     
    }
    render() {
        var currentfile = this.props.route.params;
        return (
            <View style={styles.container}>
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
                <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showPrintDialog}
            onRequestClose={() => {
                this.setState({showPrintDialog:false})
            }}
        >
               <CloudPrinter showPrintDialog={this.state.showPrintDialog} bins={this.state.bins} selectedbin={this.state.selectedbin}  renderStation={this.state.renderStation} onRemotePrinterPressed={this.onRemotePrinterPressed}/>
               </Modal>
               
                {this.state.showScanner
                ?
                  <QRCodeScanner
                style={{width:width(99),height:height(75),alignItems:"center",justifyContent:"center"}}
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({showScanner:false})}>
                        <Text style={styles.buttonText}>Cancel Scan</Text>
                    </TouchableOpacity>
                    }
                />
                :
                <View>
                <View style={{width:width(90),height:height(6),alignItems:"flex-start",justifyContent:"center"}}>
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
                            <FavouritePrinterItem style={{marginLeft:width(5)}} printer={printer} key={idx} favList={this.state.favList} onFavouritePressed={this.onFavouritePressed.bind(this)} onPrinterItemPressed={this.onPrinterItemPressed} selectPrinterList={this.state.selectedCloudPrinter}/>
                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                    }
                    </View>
                <View style={{width:width(99),height:height(50),alignItems:"center",justifyContent:"center"}}>
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
                            return(<PrinterItem printer={printer} file={currentfile} key={idx}  onPrinterItemPressed={this.onPrinterItemPressed} selectPrinterList={this.state.selectedCloudPrinter} favList={this.state.favList} onFavouritePressed={this.onFavouritePressed.bind(this)}/>)
                        })}
                    </ScrollView>
                    }
                </View>
                {this.state.selectedCloudPrinter.length === 0 
                ?
                <View style={{height:height(15),width:width(100),alignItems:"center",justifyContent:"center",borderTopWidth:1,borderColor:"rgba(14, 70, 121,0.1)"}}>
                    <View style={{width:width(95),alignItems:"center",justifyContent:"space-evenly",flexDirection:"row",elevation:8}}>
                        <View style={{width:width(30),alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity style={{width:width(15),height:height(8),borderWidth:1,borderColor:"#125DA2",borderRadius:8,alignItems:"center",justifyContent:"center",opacity:this.state.selectedCloudPrinter.length === 0  ? 1 : 0.25}} disabled={this.state.selectedCloudPrinter.length === 0 ? false : true} onPress={() => this.onQRScannerPressed()}>
                            <Image source={require("../../image/nfc.png")} style={{width:width(10),height:height(6)}} resizeMode="contain"/>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:width(30),alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity style={{width:width(15),height:height(8),borderWidth:1,borderColor:"#125DA2",borderRadius:8,alignItems:"center",justifyContent:"center",opacity:this.state.selectedCloudPrinter.length === 0 ? 1 : 0.25}} disabled={this.state.selectedCloudPrinter.length === 0 ? false : true}>
                            <Image source={require("../../image/Vector.png")} style={{width:width(10),height:height(6)}} resizeMode="contain"/>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:width(30),alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity style={{width:width(15),height:height(8),borderWidth:1,borderColor:"#125DA2",borderRadius:8,alignItems:"center",justifyContent:"center",opacity:this.state.selectedCloudPrinter.length === 0 ? 1 : 0.25}} disabled={this.state.selectedCloudPrinter.length === 0 ? false : true}>
                            <Image source={require("../../image/bluetooth.png")} style={{width:width(10),height:height(6)}} resizeMode="contain"/>
                        </TouchableOpacity>
                        </View>

                 
                    </View>
                    <View style={{height:height(5),width:width(85),alignItems:"center",justifyContent:"center"}}>
                           <TouchableOpacity style={{width:width(80),height:height(4),borderWidth:1,borderColor:"#125DA2",borderRadius:8,alignItems:"center",justifyContent:"center",opacity:this.state.selectedCloudPrinter.length === 0? 1 : 0.25}} disabled={this.state.selectedCloudPrinter.length === 0? false : true} onPress={() => this.onPrintPressed()}>
                            <Text style={{fontSize:16,fontWeight:"bold",fontFamily:"Roboto",color:"#125DA2"}}>
                                Print Locally
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={{height:height(15),width:width(100),alignItems:"center",justifyContent:"center",borderTopWidth:1,borderColor:"rgba(14, 70, 121,0.1)"}}>
                      <TouchableOpacity style={{width:width(80),height:height(4),borderWidth:1,borderColor:"#125DA2",borderRadius:8,alignItems:"center",justifyContent:"center"}}  onPress={() => this.printRemotely()}>
                            <Text style={{fontSize:16,fontWeight:"bold",fontFamily:"Roboto",color:"#125DA2"}}>
                                Print Remotely
                            </Text>
                        </TouchableOpacity>
                </View>
                }
                </View>
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
    }
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
        setFavouritePrinters: Action.setFavouritePrinters,
        printedDocument: Action.printedDocument
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Printer);
