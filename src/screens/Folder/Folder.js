//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { width, height } from 'react-native-dimension';

import RNFetchBlob from 'rn-fetch-blob'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LocalFiles from './LocalFiles';

// create a component
class Folder extends Component {

    constructor(props){
        super(props);
        this.state ={
            recentFiles:[],
            accounts:[{index:0,tittle:"Local Storage",subtittle:"Total files",fileCount:0}],
            currentIndex:-1
        }
    }

    componentDidMount(){
        const dirs = RNFetchBlob.fs.dirs
// console.log(dirs.DocumentDir)
// console.log(dirs.CacheDir)
// console.log(dirs.DCIMDir)
// console.log(dirs.DownloadDir)

RNFetchBlob.fs.ls(dirs.DCIMDir)
    // files will an array contains filenames
    .then((files) => {
        console.log(files)
    })
    }
    getIcon(index){
        switch(index){
            case 0:
                return require("../../image/foldericon.png");
                break;
            default:
                return;
        }
    }
    getAccountDetails(account,idx){
        return(
            <TouchableOpacity key={idx} style={{width:width(90),height:height(8),alignItems:"center",justifyContent:"center",borderWidth:1,borderRadius:8,borderColor:"rgba(14, 70, 121, 0.1)",flexDirection:"row"}} onPress={() => this.setState({currentIndex:account.index})}>
                <View style={{width:width(15),height:height(8),alignItems:"center",justifyContent:"center"}}>
                <Image source={this.getIcon(account.index)} style={{width:width(8),height:height(6)}} resizeMode="contain"/>
                </View>
                <View style={{width:width(60),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
                    <Text style={{fontSize:16,fontFamily:"Roboto"}}>
                        {account.tittle}
                    </Text>
                    <Text style={{fontSize:12,fontFamily:"Roboto"}}>
                        {account.subtittle}
                    </Text>
                </View>
                <View style={{width:width(15),height:height(8),alignItems:"center",justifyContent:"center"}}>
                <Image source={require("../../image/right.png")} style={{width:width(3),height:height(3)}} resizeMode="contain"/>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{width:width(99),height:height(20),alignItems:"center",justifyContent:"center"}}>
                    <View style={{width:width(85),height:height(4),alignItems:"flex-start",justifyContent:"center"}}>
                    <Text style={{fontSize:18,fontFamily:"Roboto"}}>            
                    Recent Files
                    </Text>
                    </View>
                    {this.state.recentFiles.length === 0
                    ?
                        <View style={{height:height(15),width:width(95),alignItems:"center",justifyContent:"center"}}>
                      <Text style={{fontSize:18,fontFamily:"Roboto"}}>            
                            No Recent Files Avaialble...
                      </Text>
                      </View>
                    :
                    <ScrollView>
                        {this.state.recentFiles.map((filex,idx) =>{
                            return(<TouchableOpacity>

                            </TouchableOpacity>)
                        })}
                    </ScrollView>
                    }
                </View>

                <View style={{width:width(99),height:height(45),alignItems:"center",justifyContent:"center"}}>
                <View style={{width:width(85),height:height(8),alignItems:"flex-start",justifyContent:"center"}}>
                    <Text style={{fontSize:18,fontFamily:"Roboto"}}>            
                    My Accounts
                    </Text>
                    </View>
                    <View style={{width:width(99),height:height(35),alignItems:"center",justifyContent:"center"}}>
                    {this.state.currentIndex === -1
                    ?
                    <ScrollView>
                        {this.state.accounts.map((filex,idx) =>{
                            return(this.getAccountDetails(filex,idx))
                        })}
                    </ScrollView>
                    :
                    <LocalFiles/>
                    }
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
        height:height(95),
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default Folder;
