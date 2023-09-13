import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './app/screens/Home/Application/HomeStack';
import LoginScreen from './app/screens/Login/LoginScreen'
import MessageScreen from './app/screens/Home/MessageScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegisterScreen from './app/screens/Login/RegisterScreen'
import ProfileStack from './app/screens/Home/ProfileStack/ProfileStack'
import { LogBox } from 'react-native';
//LogBox.ignoreAllLogs();//Ignore all log notifications
LogBox.ignoreLogs(['Setting a timer']);


//const Stack = createNativeStackNavigator();
//const Tab = createMaterialBottomTabNavigator();

const Tab = createBottomTabNavigator();


 


// add all pages to the stack
export default function Connector(navigation) {

  const titlepress = () => console.log("Title Pressed")

  return (
    <NavigationContainer independent={true}>

      //add a navbar
      <Tab.Navigator  
      tabBarOptions={{
        activeTintColor: 'orange',
      }} 
            screenOptions={
              ({ route }) => ({
               //navbar buttons
                tabBarButton: [
                  "LoginScreen",
                  "RegisterScreen",
                  "ConnectorScreen",
                ].includes(route.name)
                  ? () => {
                      return null;
                    }
                  : undefined,
              })
              
            }
            


       >
        




      //initialize each screen under a seperate Tab.Screen tag
      <Tab.Screen 
        name = "LoginScreen" 
        component = {LoginScreen}
        //no navbar icon because the log in and register screen isnt shown on the nav bar
        //they shouldnt be accessible while using the app
        options={{ title: 'Login' ,
        tabBarStyle: { display: 'none'},
        tabBarIconStyle: {display: 'none'},
        headerShown: false

        }}/>

        <Tab.Screen 
        name = "RegisterScreen" 
        component = {RegisterScreen}
        options={{ title: 'Login' ,
        tabBarStyle: { display: 'none'},
        tabBarIconStyle: {display: 'none'},
        headerShown: false

        }}/>





        <Tab.Screen 
        //named homestack because there are pages under the home page (like a tree system)
        name = "HomeStack" 
        component = {HomeStack}
        options={{ title: "Home", 
        //state the icon and properties of the icon that leads to the home page from the navbar
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size}/>),
        headerShown: false

        }} />


        // commented out following tab because the page doesnt exist yet
        // add a screen for messages
        // <Tab.Screen 
        // name = "MessageScreen" 
        // component = {MessageScreen}
        // options={{ title: "Messages", 
        // tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="message" color={color} size={size}/>),
        // headerShown: false

        // }} />

        <Tab.Screen 
        name = "ProfileStack" 
        component = {ProfileStack}
        options={{title: "Profile",
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size}/>),
        headerShown: false


        }}/>

      </Tab.Navigator>



    </NavigationContainer>
    
    
  );
}



