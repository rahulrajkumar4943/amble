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
import ProfileScreen from './ProfileScreen';


const Stack = createNativeStackNavigator();
//const Tab = createMaterialBottomTabNavigator();



 


// add all pages to the stack
export default function Connector(navigation) {

  const titlepress = () => console.log("Title Pressed")

  return (
    <NavigationContainer independent={true}>


      <Stack.Navigator screenOptions={{headerShown: false}}>

        <Stack.Screen name = "ProfileScreen" component = {ProfileScreen}/>


      </Stack.Navigator>

    </NavigationContainer>
    
    
  );
}



