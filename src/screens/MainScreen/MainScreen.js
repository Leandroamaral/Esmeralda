import * as React from 'react';
import { Image, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getHeaderTitle } from '@react-navigation/elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';
import { firebase } from '../../firebase/config'


function Feed() {
  return (
    <View style={{ flex: 1,  marginTop: 25, marginLeft: 20 }}>
      <Text style={{fontSize: 28}}>Olá, <Text style={{fontSize: 28, fontWeight: 'bold'}}>Leandro</Text></Text>
      <Text>Bem vindo a <Text style={{fontSize: 16}}>Esmeralda Studio</Text></Text>
      <Text></Text>
      <Image
        style={{width: 320 , 
            height: 180,
            borderRadius: 10,
            }}
        source={require('../../../assets/img1.png')}
      />
     
    </View>
    
  );
}

function Agendar() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

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

function LogoTitle() {
    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#117C6F', '#2FC4B2']}

            style={{height: 100,
                    width: 400,
                    flex: 1,
                    marginLeft: -30,
                    marginTop: -30

            }}>
        <Image
        style={{ 
            width: 130, 
            height: 45,
            marginTop: 35,
            alignSelf: "center"
        }}
        source={require('../../../assets/logobwb.png')}
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
        //headerTitle: (props) => <LogoTitle {...props} />
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
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

