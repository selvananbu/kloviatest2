//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';

// create a component
class Folder extends Component {
    render() {
        return (
            <View style={styles.container}>
                

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

//make this component available to the app
export default Folder;
