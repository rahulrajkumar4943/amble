import React, { useEffect, useState } from 'react';
import {Image, Platform, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView, TextInput, Alert, RefreshControl} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {auth, db, storage, ref, getDownloadURL} from '../../../../firebase'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { collection, addDoc, snapshotEqual } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { utils } from 'firebase/app';
import { uploadBytes } from 'firebase/storage';


//Imports above this line

const MakeListingScreen = () => {
  const navigation = useNavigation()

  //sets image url to no image initially
  const [imageurl, setImageurl] = useState('https://firebasestorage.googleapis.com/v0/b/amble-ec1e2.appspot.com/o/noimage.jpg?alt=media&token=84f24d18-048e-4ef6-99f3-c0145c941d39') //no profile pic image link
  //set all these states as empty. they will be updated when the user submits the form
  const [dogName, setDogName] = useState('')
  const [breed, setBreed] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail ] = useState('')

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('datetime');
  const [show, setShow] = useState(false);
  const [isForWalk, setIsForWalk] = useState('first');
  const [imageuri, setImageuri] = useState('')

  //do not remove
  useEffect(() => {
      if (Platform.OS === 'ios') {
        setShow(true)
      }
      setOwnerName(auth.currentUser?.displayName)
      setOwnerEmail(auth.currentUser?.email)
      setImageuri('')
  })


  //use ios specific datepicker for ios devices because it includes both the date and time
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //
  const showDatepicker = () => {
    //console.log('datepicker shown')
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const logdata = () => {
    const isForWalkBool = (isForWalk === 'true')
    console.log(' ')
    console.log('Dog name: ', dogName)
    console.log('breed: ', breed)
    console.log('date: ', date)
    console.log('isForWalk: ', isForWalkBool)
    console.log('ownername: ', ownerName)
    console.log('owner email: ', ownerEmail)
    uploaddata();
  }


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //for uploading the image
  //https://docs.expo.dev/versions/latest/sdk/imagepicker
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);


    }
  };


  //uploading the image
  //const reference = storage().ref(image.split("/").pop())
  const uploadimagetostorage = (imageuri) => {
    
    //upload an image and return the url
    const imagefilename = imageuri.split("/").pop();
    const dogref = ref(storage, imagefilename);
    const dogimagesref = ref(storage, '/dogimages/' + imagefilename); //stores in this storage location
    
    uploadBytes(dogimagesref, imageuri).then((snapshot) => {
      console.log('Uploaded blob or file!');
    }, 

  )};







  





  const uploaddata = () => {
    const collectionconst = collection(db, 'Listings');
    const isForWalkBool = (isForWalk === 'true')


    //get url of uploaded image and add to data
    uploadimagetostorage(image);


    const data = {
      Breed: breed,
      DogName: dogName,
      OwnerEmail: ownerEmail,
      OwnerName: ownerName,
      isForWalk: isForWalkBool,
      starttime: date,
      imageurl: imageurl,
    }


    addDoc(collectionconst, data);

    successalert();

  }




 
  const successalert = () => {
    Alert.alert(
      "Success!",
      "Your listing was successfully added!",
      [
        { text: "OK", onPress: () =>  navigation.navigate('ListingScreen')}
      ]
    );
  }

  var filename = ''


  return(
    <ScrollView>
    <KeyboardAvoidingView
    style = {styles.container}
    //behavior = "padding"
    >
      <Image 
      source = {require('../../../assets/icon.png')}
      style = {{ width: 200, height: 200,}}
      />

      <View style = {styles.inputContainer}>

      <TextInput
        placeholder = "Dog Name"
        value = {dogName}
        onChangeText = {text => setDogName(text)}
        style = {styles.input}
        />

      <TextInput
        placeholder = "Breed"
        value = {breed}
        onChangeText = {text => setBreed(text)}
        style = {styles.input}
        
        />


      <View style = {{flexDirection: 'row', width: '50%'}}>

      <TouchableOpacity onPress={showDatepicker}
        style = {[styles.buttondatetime, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>
            Pick Date
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showTimepicker}
        style = {[styles.buttondatetime, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>
            Pick Time
          </Text>
        </TouchableOpacity>
        
        </View>


      </View>
      {show && (
        <DateTimePicker 
          style = {{width: '50%', marginTop:10, right: 5}}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}


   

    <View style = {{width: '50%', paddingTop: 20}}>

      <TouchableOpacity style = {styles.radiobuttonview} onPress={() => setIsForWalk('true')}>
        <View style = {styles.radiobuttontext}>
          <Text>Walk</Text>
        </View>
        <View style = {styles.radiobuttonbutton}>
          <RadioButton
            value="true"
            status={ isForWalk === 'true' ? 'checked' : 'unchecked' }
            onPress={() => setIsForWalk('true')}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.radiobuttonview} onPress={() => setIsForWalk('false')}>
        <View style = {styles.radiobuttontext}>
          <Text>Dogsit</Text>
        </View>
        <View style = {styles.radiobuttonbutton}>
          <RadioButton
            value="false"
            status={ isForWalk === 'false' ? 'checked' : 'unchecked' }
            onPress={() => setIsForWalk('false')}
          />
        </View>
      </TouchableOpacity>
    </View>


    <View style = {styles.buttonContainer}>

      <TouchableOpacity onPress={pickImage}>
        {!image ? <Image source={require('../../../assets/uploadimageicon.png')} style={{ width: 200, height: 200 }} onPress = {pickImage}/> : null}
      </TouchableOpacity>

    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}  />}
    {image && console.log(image.split("/").pop())}
    {console.log(image )}

    


  


    </View>


      <View style = {styles.buttonContainer}>

        <TouchableOpacity onPress={logdata}
        style = {[styles.button, styles.buttonOutlinesubmit]}>
          <Text style={styles.buttonOutlineTextsubmit}>
            Submit
          </Text>
        </TouchableOpacity>

      </View>
      <View style = {{height: 150}}/>



    </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default MakeListingScreen

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
      alignItems: 'center',

    },

    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#facc19',
      borderWidth: 2,
    },

    buttonOutlinesubmit: {
      backgroundColor: '#e6ffe6',
      marginTop: 5,
      borderColor: '#88dd88',
      borderWidth: 2,
    },

    buttonOutlineupload: {
      //display: 'none',
      backgroundColor: '#F5D9B5',
      marginTop: 5,
      borderColor: 'orange',
      borderWidth: 2,
    },



    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },

    buttonOutlineTextsubmit: {
      color: '#88dd88',
      fontWeight: '700',
      fontSize: 16,
    },

    buttonOutlineTextupload: {
      color: 'orange',
      fontWeight: '700',
      fontSize: 16,
      flex: 1,
      flexDirection: 'row'
    },





    buttonOutlineText: {
      color: '#facc19',
      fontWeight: '700',
      fontSize: 16,
    },

    radiobuttonview: {
      flexDirection: 'row',
      alignItems: 'center'
    },

    radiobuttontext: {
      flex: 4
    },

    radiobuttonbutton: {
      flex: 1
    },

    buttondatetime: {
      backgroundColor: '#facc19',
      width: '80%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      margin: '3%',
      left: '40%',
      //dont show these buttons on ios
      //because ios already shows buttons for
      //date and time
      ...Platform.select({
        ios: {
          display: 'none',
        }
      })

    },

})


