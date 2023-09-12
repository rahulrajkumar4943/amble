import React from 'react';
import {StyleSheet, SafeAreaView, Text, StatusBar} from "react-native";


function MessageScreen(props) {

    const messagepress = () => console.log("Message Pressed");

    return (
        <SafeAreaView style={styles.headerview}>
        <Text style={styles.headertext} onPress = {messagepress}>Messages</Text>
        <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerview: {
      //flex: 1,
      backgroundColor: 'turquoise',
      width: '90%',
      height: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      top: '10%',
      left: '5%',
      borderRadius: 15,
      //borderWidth: 2
      
    },
  
    headertext: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 34,
  
    },
  });
  

export default MessageScreen;