import * as React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaView } from 'react-native-safe-area-context';
import Chat from './src/screens/Chat';
import Test from './src/screens/Test';


import { width, height, totalSize } from 'react-native-dimension';
import WizardScreens from './src/screens/WizardScreens';
import Login from './src/screens/Login/Login';
import Home from './src/screens/Home/Home';
import Folder from './src/screens/Folder/Folder';
import VPQ from './src/screens/VPQ/VPQ';
import Printer from './src/screens/Printer/Printer';

function getTabIcon(label,isFocused) {
  return(
    label === "Home"
    ?
    <Image source={require("./src/image/light-home.png")} style={{width:width(8),height:height(8),opacity:isFocused ? 1 : 0.5}} resizeMode="contain"/>
    :
    label === "Folder"
    ?

    <Image source={require("./src/image/folder.png")} style={{width:width(8),height:height(8),opacity:isFocused ? 1 : 0.5}} resizeMode="contain"/>
    :
    label === "VPQ"
    ?
    <Image source={require("./src/image/light-queue.png")} style={{width:width(8),height:height(8),opacity:isFocused ? 1 : 0.5}} resizeMode="contain"/>
    :
    label === "Printer"
    ?
    <Image source={require("./src/image/light-print.png")} style={{width:width(8),height:height(8),opacity:isFocused ? 1 : 0.5}} resizeMode="contain"/>
    :
    <Image source={require("./src/image/qr-code.png")} style={{width:width(8),height:height(8),opacity:isFocused ? 1 : 0.5}} resizeMode="contain"/>
    
  )
}
function MyTabBar({ state, descriptors, navigation }) {
  
  return (
    <SafeAreaView style={{ flexDirection: 'row',height:height(8),backgroundColor:"#125DA3"}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onTabPress = () => {
          console.log("klmkmlkmkl");
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => { 
              console.log('onpress');
              onTabPress()
           }}
            onLongPress={onLongPress}
            style={{ flex:1,width:width(20),zIndex:1,alignItems:"center",justifyContent:"center"}}
            key={index}
          >
          
           {getTabIcon(label,isFocused)}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function ChatStack(){
  return(
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  )
}
 
const Tab = createBottomTabNavigator();

function HomeTabs(){
  return(
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} tabBarOptions={style={height:height(5)}} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Folder" component={Folder} />
      <Tab.Screen name="VPQ" component={VPQ} />
      <Tab.Screen name="Printer" component={Printer} />
      <Tab.Screen name="Scan" component={ChatStack} />
    </Tab.Navigator>
  )
}

export default function Root() {
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}  options={{headerShown:false}} type="reset"/>
          <Stack.Screen name="Home" component={HomeTabs} options={{title:"Klovia",headerLeft:null}} type="reset"/>
          <Stack.Screen name="WizardScreens" component={WizardScreens}  options={{headerShown:false}} type="reset"/>
          
    </Stack.Navigator>
    </NavigationContainer>
  );
}
