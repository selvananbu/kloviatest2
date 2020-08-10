//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Modal,TouchableOpacity,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { height,width } from 'react-native-dimension';
import { TextInput } from 'react-native-gesture-handler';

// create a component
class ClooudPrinter extends Component {
    constructor(props) {
        super(props)
        this.state={
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
    }

    componentDidMount(){
        if(this.props.renderStation !== undefined){
            this.setState({renderStation:this.props.renderStation,bins:this.props.bins,selectedbin:this.props.selectedbin,showPrintDialog:this.props.showPrintDialog})
        }
    }
    // static getDerivedStateFromProps(props, state) {
    //     if (props.renderStation !== state.renderStation) {
    //       return {
    //         renderStation: props.renderStation,bins:this.props.selectedbin,selectedbin:this.props.selectedbin,showPrintDialog:this.props.showPrintDialog
    //       };
    //     }
    
    //     // Return null if the state hasn't changed
    //     return null;
    //   }

    render() {
        console.log("jknbjnjn",this.state);
        return (
            
             <View style={styles.modalViewPrint}>
                 <View style={{width:width(85),height:height(8),alignItems:"center",justifyContent:"center",backgroundColor:"#125DA3",borderRadius:12}}>
                 <Text style={{fontFamily:"Roboto",fontSize:16,fontWeight:"bold",color:"#fff"}}>
                     {this.state.renderStation.Name}
                 </Text>
                 </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                     <View style={{width:width(15),alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Copies
                        </Text>
                        </View>
                       <TextInput style={{width:width(15),borderBottomColor:"#fff",borderBottomWidth:1,color:"#fff",textDecorationColor:"#fff",alignItems:"center",textAlign:"center"}} placeholderTextColor="#fff" placeholder="01"/>
                       <View style={{width:width(18),alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Start Page
                        </Text>
                        </View>
                       <TextInput style={{width:width(15),borderBottomColor:"#fff",borderBottomWidth:1,color:"#fff",textAlign:"center"}} placeholder="01" placeholderTextColor="#fff"/>
                        
                 </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                     
                 <View style={{width:width(18),alignItems:"center",justifyContent:"center"}}>
                        <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            End Page
                        </Text>
                        </View>
                       <TextInput style={{width:width(15),borderBottomColor:"#fff",borderBottomWidth:1,color:"#fff",textDecorationColor:"#fff",alignItems:"center",textAlign:"center"}} placeholderTextColor="#fff" placeholder="01"/>
                       
                       <View style={{width:width(18),alignItems:"center",justifyContent:"center"}}>
                       <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Collate
                        </Text>
                        </View>
                       <TextInput style={{width:width(15),borderBottomColor:"#fff",borderBottomWidth:1,color:"#fff",textAlign:"center"}} placeholder="01" placeholderTextColor="#fff"/>
                        
                 </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                        <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Bins
                        </Text>
                        <DropDownPicker
                                items={this.state.bins}
                                defaultValue={this.state.selectedbin}
                                containerStyle={{height: height(4),width:width(60)}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    selectedbin: item.value
                                })}
                            />
                        
                 </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                        <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Color
                        </Text>
                        <DropDownPicker
                                items={this.state.color}
                                defaultValue={this.state.selectedColor}
                                containerStyle={{height: height(4),width:width(60)}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    selectedColor: item.value
                                })}
                            />
                    
                            
                          
                 </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                 <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Duplex
                        </Text>
                        <DropDownPicker
                                items={this.state.duplex}
                                defaultValue={this.state.selectedduplex}
                                containerStyle={{height: height(4),width:width(60)}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    selectedduplex: item.value
                                })}
                            />
                            </View>
                 <View style={{width:width(80),height:height(8),alignItems:"center",justifyContent:'space-between',flexDirection:"row"}}>
                 <Text style={{color:"#fff",fontFamily:"Roboto",fontSize:16}}>
                            Orientation
                        </Text>
                        <DropDownPicker
                                items={this.state.orientation}
                                defaultValue={this.state.selectedOrientation}
                                containerStyle={{height: height(4),width:width(60)}}
                                style={{backgroundColor: '#fafafa'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item => this.setState({
                                    selectedOrientation: item.value
                                })}
                            />
                            </View>
                            <View style={{width:width(65),alignItems:"flex-end",justifyContent:"flex-end"}}>
                <TouchableOpacity style={{backgroundColor:"#fec300",width:width(15),height:width(15),borderRadius:width(15)/2,alignItems:"center",justifyContent:"center"}}>
                 <Image source={require("../../image/light-print.png")} style={{width:width(8),height:height(8)}} resizeMode="contain"/>
                </TouchableOpacity>
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
        backgroundColor: "#125DA3",
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

//make this component available to the app
export default ClooudPrinter;
