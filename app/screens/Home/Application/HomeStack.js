import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native/Libraries/NewAppScreen';
import * as GoogleAuthentication from 'expo-google-app-auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListingScreen from './ListingScreen'
import MakeListingScreen from './MakeListingScreen';


const Stack = createNativeStackNavigator();
//const Tab = createMaterialBottomTabNavigator();



//This is a stack and all the home pages go under this


// add all pages to the stack
export default function Connector(navigation) {

  const titlepress = () => console.log("Title Pressed")

  return (
    <NavigationContainer independent={true}>


      <Stack.Navigator>

        <Stack.Screen name = "ListingScreen" component = {ListingScreen}/>

        <Stack.Screen name = "MakeListingScreen" component = {MakeListingScreen}/>

      </Stack.Navigator>

    </NavigationContainer>
    
    
  );
}



