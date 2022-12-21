import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { Rating } from 'react-native-elements';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function Agendar({navigation}) {
  return (

    <View>
      <View style={{padding:10, height: 90, backgroundColor:'#1d817e', alignItems:'center' }}>
        <Text style={{top:30, fontSize: 28, color: '#fff', fontWeight: 'bold'}}>Agendar </Text>
      </View>
      <View>
       
          <WeeklyCalendar style={{ height: 105, backgroundColor:'#1d817e' }}
          startWeekday={7}
          locale = 'pt-br'
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
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>09:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>10:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>11:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>13:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>14:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>15:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>16:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>17:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10, marginBottom: 10, width: 100, height: 35, borderRadius: 10, backgroundColor: '#fff', alignItems:'center', justifyContent:'center'}}>
           <Text style={{fontWeight: 'bold', fontSize:15}}>18:00</Text>
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