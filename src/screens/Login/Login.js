//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AppState, Image, TextInput, ActivityIndicator,Alert } from 'react-native';
import { width, height } from 'react-native-dimension';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-simple-toast';
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackgroundTimer from 'react-native-background-timer';
import * as Action from '../../action/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const axios = require('axios');

import MainApiClient_auth from '../../api/authapi'
var DEFAULT_BASEURL = "https://infinitycloudadmin.uniprint.net/api"
// create a component
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isloading: true,
            isSecurePassword:true,
            status:'active',
            baseurl:""
            
        }
        this.checkForLogin = this.checkForLogin.bind(this);
        this.checkForFirstTime = this.checkForFirstTime.bind(this);
        this.onChangeURLPressed = this.onChangeURLPressed.bind(this);
    }

  
  
    componentDidMount() {
        var self = this;
        SplashScreen.hide();
        // AppInstalledChecker
        // .isAppInstalledAndroid('uniprint')
        // .then((isInstalled) => {
            self.checkForFirstTime(false);

        // });
        AsyncStorage.getItem('com.processfusion.baseurl').then((baseurl) => {
            if(baseurl === null){
                this.setState({baseurl:DEFAULT_BASEURL})
                AsyncStorage.setItem('com.processfusion.baseurl',DEFAULT_BASEURL);
            }
            else{
                console.log("klmk",baseurl);
                self.setState({baseurl: JSON.parse(baseurl)})
            }
          });

        //   console.log(value, 'userDATAAAAAAAAAAAAAAAA')

    }

    onFingerPressed(){
      
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      }); 
    }

    showPassword(){
        this.setState({isSecurePassword:!this.state.isSecurePassword})
    }

    checkForLogin = async () => {

        try {
            const value = await AsyncStorage.getItem('com.processfusion.userdata');
            if (value !== null) {
                var data = JSON.parse(value);
                // console.log(data, 'dsadasd');
                this.getNewToekn(data)
                
                // this.props.setUserCredentials(data);
                // Toast.show('Successfully Logged In...', Toast.SHORT);
                // this.props.navigation.navigate("Home",{data});

            }
            else {
                this.setState({ isloading: false })
            }
        } catch (e) {
            // error reading value
        }
    }

    componentDidUpdate(prevProps){
        // console.log(prevProps,"knjknjknkjnkjnjn");
        if ( Object.keys(prevProps.userdata.userdata).length > 0 && prevProps.userdata.userdata !== this.props.userdata.userdata ) {
            this.props.navigation.navigate("Home");
        }
    }

    checkForFirstTime = async (isInstalled) => {
        console.log(await AsyncStorage.getItem('com.processfusion.userdata'), 'userDATAAAAAAAAAAAAAAAA')

        try {
            const value = await AsyncStorage.getItem('com.processfusion.isfirsttime');
            
            if (value !== null) {
                const userData = await AsyncStorage.getItem('com.processfusion.userdata');
                if(userData === null){
                    this.setState({isloading:false})
                    this.props.navigation.navigate("Login")
                }
                else{
                    this.props.setUserCredentials(JSON.parse(userData))
                    this.props.navigation.navigate("Home")
                }
                

            }
            else {
                this.setState({isloading:false})
                AsyncStorage.setItem("com.processfusion.isfirsttime", JSON.stringify(false));
                this.props.navigation.navigate("WizardScreens", {'param': isInstalled})
            }
        } catch (e) {
            // error reading value
        }


    }

    getNewToekn(data) {
        const body = {
            AccessToken: data.AccessToken,
            RefreshToken: data.RefreshToken,
            Rts: data.Rts
        }
        // console.log(MainApiClient_auth, 'asdasd')
        new MainApiClient_auth().POST_login(this.getTokenCallback.bind(this), body)

    }

    getTokenCallback(responseData){
        // console.log(responseData, 'asdasd')
        if (responseData.status === 200) {
            var data = responseData.data;
            this.props.setUserCredentials(data);
            AsyncStorage.setItem("com.processfusion.userdata", JSON.stringify(data));
            Toast.show('Token Refreshed...', Toast.SHORT);
            this.props.navigation.navigate("Home", { data });
        }
        else{
            Toast.show('Invalid Credentials ! Error Refreshing Token...', Toast.SHORT);

        }
    }
    
    onSignInPressed(username, password) {
        // console.log(usernmae, password, 'asdas');
        var credentials = {
            "UserName": username,
            "Password": password
        };

        new MainApiClient_auth().POST_loginFirst(this.getTokenCallback.bind(this), credentials)
    }

    onChangeURLPressed(){
            if(this.state.baseurl !== ''){
                    AsyncStorage.setItem("com.processfusion.baseurl",JSON.stringify(this.state.baseurl));
            }
    }
    render() {

        return (
            
            <KeyboardAwareScrollView>
            <SafeAreaView style={styles.container}>
                {this.state.isloading
                    ?
                    <View style={{ width: width(99), height: height(90), alignItems: "center", justifyContent: "center", flexDirection: "row" }}>

                        <ActivityIndicator size="large" color="#125DA3" />
                        <Text style={{ fontFamily: "Roboto", marginLeft: width(5) }}>
                            Fetching your account...
           </Text>
                    </View>
                    :
                    <View style={{ width: width(99), height: height(70), alignItems: "center", justifyContent: "center" }}>
                        <View style={{ width: width(99), height: height(70), alignItems: "center", justifyContent: "center" }}>
                            <View style={{height:height(25),alignItems:"center",justifyContent:"center",width:width(100)}}>
                            <Image source={require("../../image/kloviaicon.png")} style={{ width: width(85), height: height(20) }} resizeMode="contain" />
                            </View>

                            <View style={{ width: width(90), heighStatut: height(38), backgroundColor: "#f2f2f7", borderWidth: 1, borderColor: "#a7a7a7", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ height: height(8), borderBottomWidth: 1, borderBottomColor: "#a7a7a7", width: width(86), flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <View style={{ width: width(25), height: height(8), alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ color: "#315b91", fontSize: 16 }} >
                                            User Name
                    </Text>
                                    </View>
                                    <View style={{ width: width(60), height: height(8), alignItems: "center", justifyContent: "center" }} >
                                        <TextInput placeholder="UserName@domain.com" style={{ width: width(48), height: height(8), color: "#000", fontSize: 16 }} autoCapitalize="none" onChangeText={(text) => this.setState({ username: text })} />
                                    </View>
                                </View>
                                <View style={{ height: height(8), borderBottomWidth: 1, borderBottomColor: "#a7a7a7", width: width(86), marginBottom: height(3) }}>
                                    <View style={{ height: height(8), borderBottomWidth: 1, borderBottomColor: "#a7a7a7", width: width(86), flexDirection: "row" }}>
                                        <View style={{ width: width(25), height: height(8), alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ color: "#315b91", fontSize: 16 }}>
                                                Password
                </Text>
                                        </View>
                                        <View style={{ width: width(60), height: height(8), alignItems: "center", justifyContent: "center" ,flexDirection:"row"}} >
                                            <TextInput secureTextEntry={true} placeholder="********" secureTextEntry={this.state.isSecurePassword} style={{ width: width(38), height: height(8), color: "#000", fontSize: 16 }} onChangeText={(text) => this.setState({ password: text })} />
                                            <TouchableOpacity style={{height:height(8),alignItems:"center",justifyContent:"center"}} onPress={this.showPassword.bind(this)}>
                                                <Image source={!this.state.isSecurePassword?require("../../image/eye.png") : require("../../image/hidden.png") } style={{width:width(8),height:height(8)}} resizeMode="contain"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ height: height(9), borderBottomWidth: 1, borderBottomColor: "#a7a7a7", width: width(86), flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                  
                                    <View style={{ width: width(85), height: height(8), alignItems: "center", justifyContent: "center" ,flexDirection:"row"}} >
                                        <TextInput placeholder="UserName@domain.com" style={{ width: width(75), height: height(8), color: "#000", fontSize: 16 }}
                                        value={this.state.baseurl} 
                                        autoCapitalize="none" onChangeText={(text) => this.setState({ baseurl: text })} />

                                            
                                    </View>
                                </View>
                                <View style={{width:width(85),height:height(7),alignItems:"flex-end",justifyContent:"center"}}>
                                <TouchableOpacity style={{height:height(6),width:width(30),alignItems:"center",justifyContent:"center",backgroundColor:"#63b3f1"}} onPress={this.onChangeURLPressed.bind(this)}>
                                                <Text style={{color:"#fff",fontWeight:"bold",fontSize:16}}>
                                                    Change URL
                                                </Text>
                                            </TouchableOpacity>
                                </View>
                               
                                {this.state.username.length === 0 || this.state.password.length === 0
                                    ?
                                    <View style={{ opacity: 0.2 }}>
                                        <TouchableOpacity style={{ width: width(85), height: height(6), backgroundColor: "#64b2f1", alignItems: "center", justifyContent: "center", marginBottom: height(2), borderRadius: 4 }} onPress={this.onSignInPressed.bind(this, this.state.username, this.state.password)}>
                                            <Text style={{ color: "#fff", fontSize: 20 }}>
                                                Sign In
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={{ opacity: 1 }}>
                                        <TouchableOpacity style={{ width: width(85), height: height(6), backgroundColor: "#64b2f1", alignItems: "center", justifyContent: "center", marginBottom: height(2), borderRadius: 4 }} onPress={this.onSignInPressed.bind(this, this.state.username, this.state.password)}>
                                            <Text style={{ color: "#fff", fontSize: 20 }}>
                                                Sign In
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>

                        <TouchableOpacity style={{ width: width(90), height: height(6), backgroundColor: "#f2f2f7", alignItems: "center", justifyContent: "center", marginBottom: height(2), flexDirection: "row", borderWidth: 1, borderColor: "#a7a7a7" }}>

                            <TouchableOpacity style={{ width: width(15), height: height(6), borderRightWidth: 1, alignItems: "center", justifyContent: "center", borderRightColor: "#b4b4b4" }}>
                                <Image source={require("../../image/microsofticon.png")} style={{ width: width(8), height: height(4), flexDirection: "column" }} resizeMode="contain" />

                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: width(70), alignItems: "center", justifyContent: "center" }}>

                                <Text style={{ color: "#5c575a", fontSize: 20 }}>
                                    Sign In With Azure
               </Text>
                            </TouchableOpacity>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: width(90), height: height(6), backgroundColor: "#f2f2f7", alignItems: "center", justifyContent: "center", marginBottom: height(2), flexDirection: "row", borderWidth: 1, borderColor: "#a7a7a7" }}>

                            <TouchableOpacity style={{ width: width(15), height: height(6), borderRightWidth: 1, alignItems: "center", justifyContent: "center", borderRightColor: "#b4b4b4" }}>
                                <Image source={require("../../image/googleicon.png")} style={{ width: width(8), height: height(8), flexDirection: "column" }} resizeMode="contain" />

                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: width(70), alignItems: "center", justifyContent: "center" }}>

                                <Text style={{ color: "#5c575a", fontSize: 20 }}>
                                    Sign In With G Suite
           </Text>
                            </TouchableOpacity>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: width(99), alignItems: "center", justifyContent: "center" }}>

                            <Text style={{ color: "#5c575a", fontSize: 16 }}>
                                Don't Have an account ? <Text style={{ color: "#5c575a", fontSize: 16, textDecorationLine: "underline" }}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </SafeAreaView>
            
</KeyboardAwareScrollView>
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
        height:height(100)
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
