//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { width } from 'react-native-dimension';

import RNFetchBlob from 'rn-fetch-blob'

// create a component
class LocalFiles extends Component {

    componentDidMount(){
        this.getAllFiles();
    }
     getAllFiles = async () => {
        const path = RNFetchBlob.fs.dirs.DownloadDir;
        // console.log(dirs,"jbhbjhbjhb");
        try {
            let files = await RNFetchBlob.fs.ls(path);
            console.log(files);
          } catch (error) {
            console.log(error);
          }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>LocalFiles</Text>
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
        width:width(95)
    },
});

//make this component available to the app
export default LocalFiles;
