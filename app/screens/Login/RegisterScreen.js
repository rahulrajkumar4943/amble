import React, { useState } from 'react';
import {Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth} from '../../../firebase';
import { createUserWithEmailAndPassword, updateProfile, getIdToken } from 'firebase/auth';


const RegisterScreen = () => {
const [email, setEmail] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const navigation = useNavigation()





const handleSignup = () => {
  global.fromlogin = false
  createUserWithEmailAndPassword(auth, email, password)
  .then(function(result) {
    return updateProfile(result.user, {
      displayName: username
    })
  })
  .catch(function(error) {
    alert(error);
  })
  .then(console.log('nameset'))
}



  




const handleLogin = () => {
  navigation.navigate('LoginScreen')
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
        placeholder = "Username"
        value = {username}
        onChangeText = {text => setUsername(text)}
        style = {styles.input}
        />

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

        <TouchableOpacity onPress = {handleSignup}
        style = {styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {handleLogin}
        style = {[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>
            Login Instead
          </Text>
        </TouchableOpacity>
      </View>
      <View style = {{height: 150}}/>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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