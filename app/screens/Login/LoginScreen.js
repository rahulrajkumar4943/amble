import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth} from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';



const LoginScreen = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigation = useNavigation()


//if user exists then go to homestack
//if user doesnt exist then wait for displayname to change
//if displayname changes then go to homestack

global.fromlogin = true

useEffect(() => {

    //the moment displayname changes, go to homestack
    //displayname starts at null
  
   const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      if (fromlogin == true){
        //console.log('fromlogin')
        navigation.navigate('HomeStack')
      } else {
        //console.log('notfromlogin')
        signOut(auth)
        navigation.navigate('LoginScreen')


      }
    }
  })
  return unsubscribe
}, []) 


const handleSignup = () => {
  navigation.navigate('RegisterScreen')
}



const handleLogin = () => {
  global.fromlogin = true
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredentials => {
    const user = userCredentials.user;
    console.log('Logged in with: ',user.email);
  })
  .catch(error => alert(error.message))
}

  return(
    <KeyboardAvoidingView
    style = {styles.container}
    //behavior = "padding"
    >
      <Image 
      source = {require('../../assets/icon.png')}
      style = {{ width: 200, height: 200,}}
      />

      <View style = {styles.inputContainer}>
      <TextInput
        placeholder = "Email"
        value = {email}
        onChangeText = {text => setEmail(text)}
        style = {styles.input}
        />

        <TextInput
        placeholder = "Password"
        value = {password}
        onChangeText = {text => setPassword(text)}
        style = {styles.input}
        secureTextEntry
        />

      </View>

      <View style = {styles.buttonContainer}>

        <TouchableOpacity onPress = {handleLogin}
        style = {styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {handleSignup}
        style = {[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>
            Register Instead
          </Text>
        </TouchableOpacity>
      </View>
      <View style = {{height: 150}}/>



    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },



    inputContainer: {
      width: '80%'
    },

    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,

    },

    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },

    button: {
      backgroundColor: '#facc19',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center'

    },

    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#facc19',
      borderWidth: 2,
    },

    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },

    buttonOutlineText: {
      color: '#facc19',
      fontWeight: '700',
      fontSize: 16,
    }

})