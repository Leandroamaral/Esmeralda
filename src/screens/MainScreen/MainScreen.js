import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
import Feed from '../FeedScreen/FeedScreen';
import Agendar from '../AgendarScreen/AgendarScreen';
import Horarios from '../HorariosScreen/HorariosScreen';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';

const Stack = createStackNavigator();

function Perfil() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Agendar"
        component={Agendar}
        options={{
          title: 'Awesome app',
        }}
      />
      <Stack.Screen
        name="Horarios"
        component={Horarios}
        options={{
          title: 'My profile',
        }}
      />
      
    </Stack.Navigator>
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

