import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../../firebase';
import { collection, doc, getDocs } from 'firebase/firestore';
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useState } from 'react';

//wait for reload
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const ListingScreen = () => {

  //refreshing and onrefresh is to refresh the flatlist
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    console.log('refreshing')
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const navigation = useNavigation()

  //https://rnfirebase.io/firestore/usage-with-flatlists

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [listingarray, setListingarray] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = getDocs(collection(db, 'Listings')).then(querySnapshot => {
        const listingarray = [];
  
        querySnapshot.forEach(documentSnapshot => {
          listingarray.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        //why is listingarray still empty here?
        console.log('arrayupdated')
        setListingarray(listingarray);
        setLoading(false);
      });
  
    // Unsubscribe from events when no longer in use
    //return () => subscriber();
  }, [refreshing]);

  

  if (loading) {
    return <ActivityIndicator />;
  }


  return (

      

    <View>


      <Text>Listings Page</Text>
      <Text>
        <Button title = "Make listing" onPress={() => navigation.navigate('MakeListingScreen')}/>
      </Text>

      




      <FlatList style = {{height: '90%',}}
      data={listingarray}
      renderItem={({ item }) => (

        <View style={styles.listingitem}>

          <View style = {styles.listingtextcontainer}> 
            <Text style = {styles.listingdogname}>{item.DogName}</Text>
            <Text>{item.Breed}</Text>
            <Text>{item.OwnerName}</Text>
          </View>

        </View>

      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
    

    </View>
  )
}
export default ListingScreen;


//stylesheet
const styles = StyleSheet.create({

  listingitem: {
    //backgroundColor: 'yellow',
    //left: '5%',
    width: '100%',
    //height: '90%',
    borderWidth: 3,
    marginVertical: 10,
  },

  listingdogname: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  listingtextcontainer: {
    //flexDirection: 'row',
    alignItems: 'baseline'
  },


}) 