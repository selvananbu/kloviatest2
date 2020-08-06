//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, ImageBackground } from 'react-native';
import { width, height } from 'react-native-dimension';
import { TouchableNativeFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from "react-native";
import FileItem from '../component/FileItem';
import {LineChart} from "react-native-chart-kit";
import * as Action from '../../liaction/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const screenWidth = Dimensions.get("window").width;

const  chartConfig={
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
    {image:require("../../image/foldericon.png")},
    {image:require("../../image/drive.png")},
    {image:require("../../image/dropbox.png")},
    {image:require("../../image/gmail.png")}
    
]
var printedfile = [
    {DataFileName: "7210a00e-4696-4829-8c1c-8a575cd9df80.ppf",
    Date: "2020-07-24T13:40:34.9",
    DocumentName: "Anbu Selvan Mobile Developer.pdf",
    Status:0},
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
   
    componentDidMount(){
        console.log("lkmlkm",this.props);
    }
    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
              <View style={{width:width(100),height:height(30),backgroundColor:"#125DA2",borderBottomLeftRadius:50,borderBottomRightRadius:50,position:"absolute",top:0,left:0,right:0}}>
                    <View style={{width:width(100),height:height(15),paddingLeft:width(5),justifyContent:"center"}}>
                    <Text style={{fontSize:22,color:"#fff",opacity:0.40}}>
                        Hello,
                    </Text>
                    <Text style={{fontSize:22,color:"#fff",fontWeight:"bold"}}>
                        Anbu Selvan
                    </Text>
                    </View>
                </View>
                <View>
                <View style={{width:width(100),height:height(30),marginTop:height(4),alignItems:"center",justifyContent:"center"}}>
       
                 <Image source={require("../../image/chart.png")} style={{width:width(95),height:height(30)}} resizeMode="contain"/>
                 </View>
                 <View style={{width:width(100),height:height(38),alignItems:"center",justifyContent:"center"}}>
                     <ImageBackground source={require("../../image/kpiwidget.png")} style={{width:width(85),height:height(12),alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                         <TouchableOpacity style={{width:width(85),height:height(12),alignItems:"center",justifyContent:"center",flexDirection:"row"}} onPress={() => { 
    console.log('onpress');
 }}>
                         <View style={{width:width(17),height:height(12),alignItems:"center",justifyContent:"center"}}>
                            <Text style={{color:"#F8392C",fontSize:32,fontFamily:"Roboto"}}>
                                    00
                            </Text>
                         </View>
                         <View style={{width:width(38),height:height(12),alignItems:"center",justifyContent:"center"}}>
                            <Text style={{color:"rgba(123, 140, 155, 0.8)",fontFamily:"Roboto"}}>
                                    Pending Jobs in VPQ
                            </Text>
                         </View>
                         <TouchableOpacity style={{width:width(10),height:width(10),borderRadius:width(10)/2,backgroundColor:"#E7F1FA",alignItems:"center",justifyContent:"center"}}>
                         <Image source={require("../../image/right.png")} style={{width:width(3),height:height(2)}} resizeMode="contain"/>
                         </TouchableOpacity>
                         </TouchableOpacity>
                     </ImageBackground>
                     <View style={{width:width(95),height:height(12),alignItems:"flex-start",justifyContent:"center"}}>
                        
                        <Text style={{fontSize:12,fontFamily:"Roboto"}}>
                            Sync Accounts
                        </Text>

                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            {list.map((accounts,idx) =>{
                                return(
                                    <TouchableOpacity key={idx} style={{width:width(10),height:width(10),borderRadius:width(10)/2,backgroundColor:"#E7F1FA",alignItems:"center",justifyContent:"center",margin:width(2)}}>
                                    <Image source={accounts.image} style={{width:width(5),height:height(5)}} resizeMode="contain"/>
                                    </TouchableOpacity> 
                                )
                            })}
                        </ScrollView>

                     </View>

                     <View style={{width:width(100),height:height(20),alignItems:"center",justifyContent:"center"}}>
                        <View style={{width:width(95),height:height(4),alignItems:"flex-start",justifyContent:"center"}}>
                     <Text style={{fontSize:12,fontFamily:"Roboto"}}>
                            Recently Printed Documents
                        </Text>
                        </View>
                        <View style={{width:width(95),height:height(16),alignItems:"center",justifyContent:"center"}}>
                       <ScrollView showsVerticalScrollIndicator={false}>
                           {printedfile.map((file,idx) =>{
                               return(
                                    <FileItem file={file} key={idx}/>
                               )
                           })}
                        </ScrollView>         
                        </View>
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
        userdata: state.userdata,

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserCredentials: Action.setUserCredentials
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
