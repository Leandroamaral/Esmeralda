import * as React from 'react';
import { Text, View} from 'react-native';
import { Rating } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
import {LinearGradient} from 'expo-linear-gradient'
import Feed from '../FeedScreen/FeedScreen';
import Agendar from '../AgendarScreen/AgendarScreen';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles';
import { color } from 'react-native-elements/dist/helpers';


function Horarios() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

function Perfil() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      
      screenOptions={{
        tabBarActiveTintColor: '#1d817e',
        //headerTitle: (props) => <LogoTitle {...props} />
        headerShown: false
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
        name="Agendar"
        component={Agendar}
        options={{
          tabBarLabel: 'Agendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Horarios"
        component={Horarios}
        options={{
          tabBarLabel: 'Horários',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
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

