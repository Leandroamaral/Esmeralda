import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { Tile } from 'react-native-elements';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { Corte, Hidratacao, Manicure, Tintura, Maquiagem, Alisamento, Cilios, Pedicure } from './icons';




function Feed() {
  return (
    <SafeAreaView style={{flex: 1, padding: 10, flexDirection: "column"}}>
      <ScrollView>
        <View style={{ height: 80, marginTop: 40 }}>
          <Text style={{fontSize: 28}}>Olá, <Text style={{fontSize: 28, fontWeight: 'bold'}}>Leandro</Text></Text>
          <Text>Bem vindo a <Text style={{fontSize: 16}}>Esmeralda Studio</Text></Text>
        </View>
        <View style={{ height: 200, alignItems: "center"}}>
          <Image
            style={{width: 340 , 
                height: 180,
                borderRadius: 10,
                }}
            source={require('../../../assets/img1.png')}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', height: 220, flexWrap: 'wrap'}}>
          
          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center', marginBottom: 5 }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Corte</Text>
          </View>

          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Alisamento width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Alisamento</Text>
          </View>

          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Tintura width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Tintura</Text>
          </View>
          
          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Manicure width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Manicure</Text>
          </View>

          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Hidratacao width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Hidratacao</Text>
          </View>

          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Maquiagem width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Maquiagem</Text>
          </View>
          
          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Pedicure width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Pedicure</Text>
          </View>

          <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{ 
                borderRadius: 10, 
                margin: 5, 
                backgroundColor: '#eaeceb', 
                width: 60, height: 60, 
                marginTop: 12, 
                alignItems: 'center',
                justifyContent: 'center' }}>
              <Cilios width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={{color: "#92a494", fontSize: 12}}>Cilios</Text>
          </View>

        </View>
        
        
        <View style={{ height: 300, backgroundColor: "green"}}>
          <Text> Aqui </Text>
        </View>
        <View style={{ height: 100, backgroundColor: "blue"}}>
          <Text> Aqui </Text>
        </View>
      </ScrollView>
    </SafeAreaView>


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

