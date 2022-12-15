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
      <Text>Feed!</Text>
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
            colors={['#1d817e', '#2fa192', '#50c8cc']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={{borderRadius: 30}}>
        <Image
        style={{ width: 200, height: 200 }}
        source={require('../../../assets/logo.png')}
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
        tabBarActiveTintColor: '#1d817e',
        tabBarStyle: { borderRadius: 30 },
        header: (props) => <LogoTitle {...props} />, 
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
  return (
      <MyTabs />
  );
}

