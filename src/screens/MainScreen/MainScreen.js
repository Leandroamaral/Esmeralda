import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient'
import styles from './styles';
import { firebase } from '../../firebase/config'

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
            style={{width: 400 , 
                height: 500,
                marginLeft: -30}}
            source={require('../../../assets/img1.png')}
        />
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function LogoTitle() {
    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#21816d', '#3dab93', '#3debc5']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={{borderRadius: 30,
                    height: 200 
            }}>
        <Image
        style={{ 
            width: 222, 
            height: 65,
            marginTop: 50,
            alignSelf: "center"
        }}
        source={require('../../../assets/logobw.png')}
      />
      </LinearGradient>
     
    );
  }

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: { 
            height: 250,
            backgroundColor: '#21816d'
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainScreen({navigation}) {

    const onLogoutPress = () =>{
        firebase.auth().signOut();
        navigation.navigate("Login");
    }
    return (
        <MyTabs />
    );
}

