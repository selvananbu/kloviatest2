//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Welcome from './Wizards/Welcome';
import InstallPlugin from './Wizards/InstallPlugin';
import { width, height } from 'react-native-dimension';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

// create a component
class WizardScreens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index:0
        };
      }

      handleScroll(event) {
        // console.log(event.nativeEvent.contentOffset.x);


       }
    render() {
        console.log('sadasdasd', this.props)
        var index = this.state.index;
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onScroll={this.handleScroll} >
                    <Welcome navigation={this.props.navigation}/>
                    <InstallPlugin/>
                </ScrollView>
                <View style={{width:width(100),height:height(10),alignItems:"center",justifyContent:"center"}}>
                    <View style={{width:width(20),height:height(10),alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                        <View style={{width:width(6)}}>
                        <TouchableOpacity style={{width:width(3),height:width(3),borderRadius:width(3)/2,backgroundColor: index === 0 ? "#A2A2A2" : "#D8D8D8"}}/>
                        </View>
                        <View style={{width:width(6)}}>
                        <TouchableOpacity style={{width:width(3),height:width(3),borderRadius:width(3)/2,backgroundColor: index === 1 ? "#A2A2A2" :"#D8D8D8"}}/>
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

//make this component available to the app
export default WizardScreens;
