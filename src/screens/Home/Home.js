//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ActivityIndicator,ScrollView,AppState } from 'react-native';
import { width, height } from 'react-native-dimension';
import { TouchableNativeFeedback, TouchableOpacity,  } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";
import FileItem from '../component/FileItem';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-community/async-storage';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainApiClient_document from '../../api/documentapi'
const axios = require('axios');
const screenWidth = Dimensions.get("window").width;
var BASEURL = "https://infinitycloudadmin.uniprint.net/api/printjobs";

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

var list = [
    { image: require("../../image/foldericon.png") },
    { image: require("../../image/drive.png") },
    { image: require("../../image/dropbox.png") },
    { image: require("../../image/gmail.png") }

]
var printedfile = [

];

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ],
    legend: ["Rainy Days"] // optional
};

// create a component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vpqdata: '',
            userdata: '',
            recentdocs: [],
            appState: AppState.currentState
        }

        this.navigationWillFocusListener = this.props.navigation.addListener('focus', () => {
            this.loadUserData();


        })
    }
    
    static navigationOptions = ({ navigation }) => {
   
        return {
          headerTitle: "Title",
          headerLeft: (
            <TouchableOpacity transparent
           >
           <Icon name='menu' 
           onPress={() => navigation.navigate('DrawerScreen')}
           />
           </TouchableOpacity>
          ),
        };
      };

    getVPQData(userdata) {
        var accesstoken = userdata.AccessToken;
        var encodedUser = base64.encode(userdata.UserName);

        var self = this;
        console.log("jknjknjknjknkj");
        if (accesstoken !== undefined) {

            new MainApiClient_document().GET_printJobsCurrent(this.getPrintJobsCurrentCallback.bind(this), '0', encodedUser, accesstoken)


        }
    }

    componentWillUnmount () {
        this.navigationWillFocusListener.remove()
    }

    getPrintJobsCurrentCallback(response){
        if (response.status === 200) {
            this.setState({ vpqdata: response.data.length, recentdocs: response.data })


        }
        else {
            // console.log("njknjknkjn");
        }
    }
    
    loadUserData(){
        const value = this.props.userdata.userdata;
        if (value !== null) {
            var data = value;
            this.getVPQData(data);
            this.setState({ userdata: data })
        }
        else {
            // this.setState({isloading:false})
        }
    
    }

    
      
    componentDidMount() {
        this.loadUserData();
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={{ width: width(100), height: height(30), backgroundColor: "#125DA2", borderBottomLeftRadius: 50, borderBottomRightRadius: 50, position: "absolute", top: 0, left: 0, right: 0 }}>
                    {this.state.userdata !== ''
                        ?
                        <View style={{ width: width(100), height: height(15), paddingLeft: width(5), justifyContent: "center" }}>
                            <Text style={{ fontSize: 22, color: "#fff", opacity: 0.40 }}>
                                Hello,
                    </Text>
                            <Text style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
                                {this.state.userdata.UserName}
                            </Text>
                        </View>
                        :
                        <ActivityIndicator size="large" color="#125DA3" />
                    }
                </View>
                <View>
                    <View style={{ width: width(100), height: height(30), marginTop: height(4), alignItems: "center", justifyContent: "center" }}>

                        <Image source={require("../../image/chart.png")} style={{ width: width(95), height: height(30) }} resizeMode="contain" />
                    </View>
                    <View style={{ width: width(100), height: height(38), alignItems: "center", justifyContent: "center" }}>
                        <ImageBackground source={require("../../image/kpiwidget.png")} style={{ width: width(85), height: height(12), alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            {this.state.vpqdata !== ''
                                ?
                                <TouchableOpacity style={{ width: width(85), height: height(12), alignItems: "center", justifyContent: "center", flexDirection: "row" }} onPress={() => this.props.navigation.navigate("VPQ")}>

                                    <View style={{ width: width(17), height: height(12), alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ color: "#F8392C", fontSize: 32, fontFamily: "Roboto" }}>
                                            {this.state.vpqdata < 10 ? "0" + this.state.vpqdata : this.state.vpqdata}
                                        </Text>
                                    </View>
                                    <View style={{ width: width(38), height: height(12), alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ color: "rgba(123, 140, 155, 0.8)", fontFamily: "Roboto" }}>
                                            Pending Jobs in VPQ
                            </Text>
                                    </View>
                                    <TouchableOpacity style={{ width: width(10), height: width(10), borderRadius: width(10) / 2, backgroundColor: "#E7F1FA", alignItems: "center", justifyContent: "center" }}>
                                        <Image source={require("../../image/right.png")} style={{ width: width(3), height: height(2) }} resizeMode="contain" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                :
                                <ActivityIndicator size="large" color="#125DA3" />
                            }
                        </ImageBackground>
                        <View style={{ width: width(95), height: height(12), alignItems: "flex-start", justifyContent: "center" }}>

                            <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
                                Sync Accounts
                        </Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                {list.map((accounts, idx) => {
                                    return (
                                        <TouchableOpacity key={idx} style={{ width: width(10), height: width(10), borderRadius: width(10) / 2, backgroundColor: "#E7F1FA", alignItems: "center", justifyContent: "center", margin: width(2) }}>
                                            <Image source={accounts.image} style={{ width: width(5), height: height(5) }} resizeMode="contain" />
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>

                        </View>
                        <View style={{ width: width(95), height: height(22), alignItems: "center", justifyContent: "center" }}>
                            {this.state.recentdocs.length > 0
                                ?
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {this.state.recentdocs.map((file, idx) => {
                                        return (
                                            <FileItem file={file} key={idx} />
                                        )
                                    })}
                                </ScrollView>
                                :
                                <Text>
                                    {this.state.recentdocs !== null && this.state.recentdocs.length === 0 ? "Loading Recent files" : " No Recenet Files"}
                        </Text>
                            }
                        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
