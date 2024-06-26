import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feed from '../FeedScreen/FeedScreen';
import Agendar from '../AgendarScreen/AgendarScreen';
import Horarios from '../HorariosScreen/HorariosScreen';
import PerfilMain from '../PerfilScreen/PerfilMainScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"

      screenOptions={{
        tabBarActiveTintColor: '#357066',
        // headerTitle: (props) => <LogoTitle {...props} />
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Agendar"
        component={Agendar}
        options={{
          tabBarLabel: 'Agendar',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="calendar-clock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Horarios"
        component={Horarios}
        options={{
          tabBarLabel: 'Horários',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="book-account-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PerfilMain"
        component={PerfilMain}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const saveUser = async (params) => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(params));
  } catch (e) {
    console.error(e);
  }
};

export default function MainScreen({route, navigation}) {
  saveUser(route.params);
  return (
    <MyTabs />
  );
}

