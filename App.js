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
      <Tab.Navigator  
      tabBarOptions={{
        activeTintColor: 'orange',
      }} 
            screenOptions={
              ({ route }) => ({
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
        





      <Tab.Screen 
        name = "LoginScreen" 
        component = {LoginScreen}
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
        name = "HomeStack" 
        component = {HomeStack}
        options={{ title: "Home", 
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size}/>),
        headerShown: false

        }} />

      
        <Tab.Screen 
        name = "MessageScreen" 
        component = {MessageScreen}
        options={{ title: "Messages", 
        tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="message" color={color} size={size}/>),
        headerShown: false

        }} />

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



