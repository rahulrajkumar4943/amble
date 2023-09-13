import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {ScrollView, RefreshControl, StyleSheet, SafeAreaView, Text, StatusBar, View, Button, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {auth} from '../../../../firebase'
import LoginScreen from '../../Login/LoginScreen';
import * as Updates from 'expo-updates';
import { TouchableOpacity } from 'react-native';

function ProfileScreen(props) {

    
    const navigation = useNavigation(); 
    const handleSignout = () => {
      auth
      .signOut()
      .then(Updates.reloadAsync())
      .catch(error => alert(error.message))
    }
    

    return (
      <SafeAreaView style = {{flex: 1}}>
           //style the data from googles oauth login session nicely
            //auth has all the data about the currently logged in user (stored in firebase)

          {/* Profile pic and username top 20 percent */}
          <View style = {styles.header}>
            <Image 
            source = {{uri: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-6.jpg'}} //default profile pic icon. update to use google pfp
            style = {styles.profilepic} 
            />
            <View style = {styles.usernamebox}>
            <Text numberOfLines={1} style = {styles.username}>{auth.currentUser?.displayName}</Text>
            <Text style = {styles.email}>{auth.currentUser?.email}</Text>
            </View>

          </View>

        //logout button
        <View style = {styles.buttonContainer}>

        <TouchableOpacity onPress = {handleSignout}
        style = {[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>
            Log Out
          </Text>
        </TouchableOpacity>

        // for testing purposes. logs name when the name is clicked. used jic the app is being goofy and doesnt update the profile page after logging into a new acc
        // <Text>
        //   <Button title = "checkname" onPress={console.log('name: ', auth.currentUser?.displayName)}/>
        // </Text>
        // </View>
        
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  header: {
    //backgroundColor: 'turquoise',
    width: '90%',
    height: '20%',
    left: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  usernamebox: {
    //backgroundColor: 'green',
    justifyContent: 'center',
    width: '65%',
  },

  username: {
    fontSize: 35,
    fontWeight: "bold",
    top: '0%',
    left: '15%',
    //flex: 0.9,
  },

  email: {
    left: '15%',
    top: '2%'
  },

  profilepic: {
    height: 80,
    width: 80,
    top: '0%',
    borderRadius: 70,

  },

  buttonOutline: {
    backgroundColor: '#ffeded',
    marginTop: 5,
    borderColor: 'red',
    borderWidth: 2,
  },

  button: {
    backgroundColor: '#facc19',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'

  },

  buttonOutlineText: {
    color: 'red',
    fontWeight: '700',
    fontSize: 16,
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },



})

export default ProfileScreen;
