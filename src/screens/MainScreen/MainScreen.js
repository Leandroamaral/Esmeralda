import * as React from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Rating } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
import {LinearGradient} from 'expo-linear-gradient'
import Feed from '../FeedScreen/FeedScreen';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles';
import { color } from 'react-native-elements/dist/helpers';
//import { Calendar, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';
//import { LocaleConfig } from 'react-native-calendars';


/*LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov.', 'Dez'],
  dayNames: ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';
StyleSheet.create({
knobContainer: {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 24,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent'// normally it is  appStyle.calendarBackground
},
knob: {
  width: 40,
  height: 4,
  borderRadius: 3,
  backgroundColor: 'transparent'    //normally it is e8ecf0
}});

function renderKnob()  {
  // TODO: turn to TouchableOpacity with onPress that closes it
  return (
    <View style={this.style.knobContainer} pointerEvents={'none'}>
      <View style={this.style.knob} testID={CALENDAR_KNOB}/>
    </View>
  );
}

const CustomHeaderTitle = (
  <TouchableOpacity>
    <Text> aqui </Text>
  </TouchableOpacity>
);
*/

function Agendar() {
  return (

    <View>
      <View style={{padding:10, height: 100, backgroundColor:'#1d817e', alignItems:'center' }}>
        <Text style={{top:30, fontSize: 28, color: '#fff', fontWeight: 'bold'}}>Agendar </Text>
      </View>
      <View>
       
          <WeeklyCalendar style={{ height: 120, backgroundColor:'#1d817e' }}
          startWeekday={7}
          locale = 'pt-br'
          renderDay={() => {
              return (
                <Text></Text>
              )
            }}
          titleStyle = {{color:'#fff', fontSize: 16, fontWeight: 'normal' }}
          dayLabelStyle = {{color:'#fff'}}


           />
      </View>
      <View style={{ padding:10, }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Selecione a especialista</Text>
      </View>

      <SafeAreaView>
        <ScrollView horizontal={true}>
      
          <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', height: 160,}}>
            <View style={{backgroundColor: '#fff', height: 150, width: 130, borderRadius: 10, alignItems: 'center', marginBottom: 5, marginRight: 10 }}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp1.png')}
                  style={{width: 100, height: 90, top: 10, borderRadius: 10}}
                    />
              </TouchableOpacity>
              
              <Text style={{fontSize: 13, fontWeight: 'bold', top: 15}}>Regiane Liberato</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={4.5}
                style={{color: '1d817e', padding: 5, top: 10}}
              />
            </View>
            <View style={{backgroundColor: '#fff', height: 150, width: 130, borderRadius: 10, alignItems: 'center', marginBottom: 5, marginRight: 10 }}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp2.png')}
                  style={{width: 100, height: 90, top: 10, borderRadius: 10}}
                    />
              </TouchableOpacity>
              
              <Text style={{fontSize: 13, fontWeight: 'bold', top: 15}}>Nome Especialista</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={3}
                style={{color: '1d817e', padding: 5, top: 10}}
              />
            </View>
            <View style={{backgroundColor: '#fff', height: 150, width: 130, borderRadius: 10, alignItems: 'center', marginBottom: 5, marginRight: 10 }}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/esp3.png')}
                  style={{width: 100, height: 90, top: 10, borderRadius: 10}}
                    />
              </TouchableOpacity>
              
              <Text style={{fontSize: 13, fontWeight: 'bold', top: 15}}>Nome Especialista</Text>
              <Rating
                imageSize={13}
                readonly
                startingValue={4}
                style={{color: '1d817e', padding: 5, top: 10}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={{ padding:10, }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Selecione o horário</Text>
      </View>

      <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', marginRight:10}}>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10 }}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>09:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>10:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>11:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>13:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>14:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>15:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 30, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>16:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>17:00</Text>
            </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={{height: 50, width: 80, marginRight: 10, marginBottom: 10}}>
            <LinearGradient
                // Button Linear Gradient
                colors={['#1d817e', '#2fa192', '#50c8cc']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4, 1]}
                style={{height: 30, width: 100, alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>18:00</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
      
      <View style={{ alignItems:'center' }}>
        <TouchableOpacity style={{height: 50, width: 300, alignItems:'center', justifyContent:'center', borderRadius:10, backgroundColor:'#1d817e'}}>
              <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 15}}>Reservar Horário</Text>
        </TouchableOpacity>
      
      </View>



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

