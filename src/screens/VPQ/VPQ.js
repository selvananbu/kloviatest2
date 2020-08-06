//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Modal,TextInput,TouchableOpacity,PermissionsAndroid,Alert } from 'react-native';
import { height,width } from 'react-native-dimension';
import AsyncStorage from '@react-native-community/async-storage';
import * as Action from '../../liaction/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob'

import base64 from 'react-native-base64';
import FileItem from '../component/FileItem';
const axios = require('axios');

var BASEURL = "https://infinitycloudadmin.uniprint.net/api/printjobs";
// create a component
class VPQ extends Component {
    constructor(props){
        super(props)
        this.state={
            printedDocument:[],
            printQueueDocument:[],
            printedDocumentLoading:true,
            printQueueDocumentLoading:true,
            showSecurePinModal: false,
            currentfile:'',
            pin:'',
            userdata:''
        }
        this.onPrintPressed = this.onPrintPressed.bind(this);
    }
    componentDidMount(){
        this.loadUserData();
    }
    getDocumentsFromServer(userdata,index){
        var accesstoken = userdata.AccessToken;
        var encodedUser = base64.encode(userdata.UserName);
        var self = this;
        if (accesstoken !== undefined) {
            var url = BASEURL + '/'+ index + `/${encodedUser}`;
            axios({
                method: 'get',
                url: url,
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                },

            }).then(response => {

                if (response.status === 200) {
                    console.log("respinse",response);
                    if(index === 0){
                            self.setState({printQueueDocument:response.data,printQueueDocumentLoading:false})
                    }
                    else{
                        self.setState({printedDocument:response.data,printedDocumentLoading:false})
                    }
                }
                else {
                    console.log("njknjknkjn");
                }
            });

            var printedurl = BASEURL + '/1' + `/${encodedUser}`;

            axios({
                method: 'get',
                url: printedurl,

                headers: {
                    Authorization: `Bearer ${accesstoken}`
                },

            }).then(response => {

                if (response.status === 200) {
                    var temp = this.state.fileList;
                    temp = response.data;
                    self.setState({ printedFileList: temp, isloadingFileData: false, refreshing: false })
                }
                else {
                    console.log("njknjknkjn");
                }
            });
        }
    }
    loadUserData = async () => {
        try {
        var self = this;
        const value = await AsyncStorage.getItem('com.processfusion.userdata');
        if (value !== null) {
            var data = JSON.parse(value);
            self.getDocumentsFromServer(data,0);
            self.getDocumentsFromServer(data,1);
            this.setState({userdata:data})
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

        var accesstoken = this.state.userdata.AccessToken;
        // console.log(accesstoken)
        if (accesstoken !== undefined) {
            // console.log(accesstoken);
            var url = `https://infinitycloudadmin.uniprint.net/api/printjobs/file`;
            var body = { "JobId": this.state.currentfile.PrintJobId.toString(), "Pin": this.state.pin.toString() };

            let fs = RNFetchBlob.fs;
            let DownloadDir = fs.dirs.DownloadDir;
            RNFetchBlob.fetch('POST', url, {
                "Authorization": `Bearer ${accesstoken}`,

                'Content-Type': 'application/json',
                'Accept': 'application/pdf',
            }, JSON.stringify(body))
            .then((resp) => {
                console.log(resp,"kjnjknkjnkjn",this.state.currentfile.PrintJobId,this.state.pin);
                if(resp.data !== "Get print job file failed!: Invalid username and/or password!"){
                    var responseData = resp.data;
                    const file_path = DownloadDir + "/" + this.state.pin.toString() + ".pdf"
                    console.log(file_path,"huhuhuhu");
                    fs.writeFile(file_path, responseData, 'base64').then((res) => {
                        this.printRemotePDF(file_path)
                        this.setState({isFileLoading:false})
                    })
                    .catch((error) => {
                        this.setState({isFileLoading:false})
                        alert(JSON.stringify(error));
                    });
                }
                else{
                    this.setState({showSecurePinModal:false,})    
                    ToastAndroid.show("Invalid Pin...",ToastAndroid.SHORT);
                    this.setState({isFileLoading:false,pin:''})
                }
                
            })
            .catch((err) => {
            
                console.log(err)

            })

        }

    }
    async downloadFile() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            console.log("njknjknjknkjn");
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                try {
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
    onPrintPressed(file){
        console.log("knknkjn",file);
        this.setState({showSecurePinModal:true,currentfile:file})
    }
    render() {
        return (
            <View style={styles.container}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showSecurePinModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        {this.state.isFileContentLoading
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
                                <View style={{ width: width(45), height: height(8), borderBottomRightRadius: 20, borderBottomLeftRadius: 20, alignItems: "center", justifyContent: "space-evenly" ,flexDirection:"row"}}>

                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={this.downloadFile.bind(this)}
                                    >

                                        <Text style={styles.textStyle}>SUBMIT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={() => this.setState({showSecurePinModal:false,})}
                                    >

                                        <Text style={styles.textStyle}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                </Modal>
              
                <View style={{height:height(42),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height(5),width:width(90),alignItems:"flex-start",justifyContent:'center'}}>
                        <Text style={{fontFamily:"Roboto",fontSize:18}}>
                            Print queue
                        </Text>
                    </View>
                    <View style={{height:height(35),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    {this.state.printQueueDocumentLoading
                    ?
                    <ActivityIndicator  size="large" color="#125DA3"/>
                    :
                    <ScrollView>
                        {this.state.printQueueDocument.map((file,idx) =>{
                            return(
                                <FileItem key={idx} file={file} onPrintPressed={this.onPrintPressed}/>
                            )
                        })}    
                    </ScrollView>}
                    </View>
                </View>
                <View style={{height:height(42),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    <View style={{height:height(5),width:width(90),alignItems:"flex-start",justifyContent:'center'}}>
                        <Text style={{fontFamily:"Roboto",fontSize:18}}>
                            Printed Docuemnts
                        </Text>
                    </View>
                    <View style={{height:height(35),width:width(100),alignItems:"center",justifyContent:"center"}}>
                    {this.state.printedDocumentLoading
                    ?
                    <ActivityIndicator  size="large" color="#125DA3"/>
                    :
                    <ScrollView>
                        {this.state.printedDocument.map((file,idx) =>{
                              return(
                                <FileItem key={idx} file={file}/>
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
});

function mapStateToProps(state) {
    return {
        userdata: state.userdata,

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserCredentials: Action.setUserCredentials
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(VPQ);
