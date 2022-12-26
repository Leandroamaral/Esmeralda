import * as React from 'react';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import styles from './styles';

const diadehoje = new Date();
const mes = [
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
]

const diasemana = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

const diaformat = diasemana[diadehoje.getDay()] + ', '  + diadehoje.getDate() + ' ' + mes[diadehoje.getMonth()];

export default function Horarios() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={{padding:10, height: 90, alignItems:'center' }}>
              <Text style={{top:50, fontSize: 28, color: '#92a494', fontWeight: 'bold'}}>Proximos Horários </Text>
            </View>
            <View style={{padding:10, height: 90, alignItems:'center' }}>
              <Text style={{top:30, fontSize: 25}}>{mes[diadehoje.getMonth()]}</Text>
            </View>
            <View style={{padding:10, alignItems:'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Entypo name="bookmark" size={20} color="#1d817e" /><Text style={{fontSize: 16}}>{diaformat}</Text>
            </View>
            </View>
              <View style={{flexDirection: 'row', top: 10}}>
                <View style={{borderRightWidth: 1, borderColor: '#92a494', borderStyle:'dotted', height: 120, padding: 20, width: 130, alignItems:'center'}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>09:00</Text>
                  <View style={{flexDirection:'row'}}>
                    <AntDesign name="checkcircle" size={30} color="#1d817e" style={{padding: 10}} />
                    <AntDesign name="closecircle" size={30} color="#92a494" style={{padding: 10}}/>
                  </View>
         
                </View>
                <View style={{left: 20}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>Corte</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                        source={require('../../../assets/esp1.png')}
                        style={{width: 30, height: 30, top: 10, borderRadius: 100}}
                          />
                </View>
            </View>
            <View style={{flexDirection: 'row', top: 10}}>
                <View style={{borderRightWidth: 1, borderColor: '#92a494', borderStyle:'dotted', height: 120, padding: 20, width: 130, alignItems:'center'}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>11:00</Text>
                  <View style={{flexDirection:'row'}}>
                    <AntDesign name="checkcircle" size={30} color="#92a494" style={{padding: 10}} />
                    <AntDesign name="closecircle" size={30} color="#bf0000" style={{padding: 10}}/>
                  </View>
                </View>
                <View style={{left: 20}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>Alisamento</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                        source={require('../../../assets/esp2.png')}
                        style={{width: 30, height: 30, top: 10, borderRadius: 100}}
                          />
                </View>
            </View>
            
            <View style={{padding:10, height: 90, alignItems:'center' }}>
              <Text style={{top:50, fontSize: 25, color: '#92a494', fontWeight: 'bold'}}>Histórico</Text>
            </View>
            <View style={{padding:10, height: 60, alignItems:'center' }}>
              <Text style={{top:20, fontSize: 18}}>Novembro</Text>
            </View>
            <View style={{padding:10, alignItems:'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Entypo name="back-in-time" size={20} color="#1d817e" /><Text style={{fontSize: 16}}> Segunda-Feira, 28 Novembro</Text>
            </View>
            </View>
              <View style={{flexDirection: 'row', top: 10}}>
                <View style={{borderRightWidth: 1, borderColor: '#92a494', borderStyle:'dotted', height: 120, padding: 20, width: 130, alignItems:'center'}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>13:00</Text>
                </View>
                <View style={{left: 20}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>Tintura</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                        source={require('../../../assets/esp3.png')}
                        style={{width: 30, height: 30, top: 10, borderRadius: 100}}
                          />
                </View>
            </View>
            <View style={{flexDirection: 'row', top: 10}}>
                <View style={{borderRightWidth: 1, borderColor: '#92a494', borderStyle:'dotted', height: 120, padding: 20, width: 130, alignItems:'center'}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>15:00</Text>
                </View>
                <View style={{left: 20}}>
                  <Text style={{fontSize: 25, color:"#1d817e"}}>Manicure</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                        source={require('../../../assets/esp1.png')}
                        style={{width: 30, height: 30, top: 10, borderRadius: 100}}
                          />
                </View>
            </View>
  
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }