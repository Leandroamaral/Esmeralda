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
            <View style={styles.tituloView}>
              <Text style={styles.tituloTexto}>Proximos Horários </Text>
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.mesTexto}>{mes[diadehoje.getMonth()]}</Text>
            </View>
            <View style={styles.horarioMainView}>
              <View style={styles.dataView}>
                <View style={styles.flexrow}>
                  <Entypo name="bookmark" size={20} color="#1d817e" /><Text style={styles.texto16}>{diaformat}</Text>
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={styles.horarioAView}>
                  <Text style={styles.horarioATexto}>09:00</Text>
                  <View style={styles.flexrow}>
                    <AntDesign name="checkcircle" size={30} color="#1d817e" style={styles.padding10} />
                    <AntDesign name="closecircle" size={30} color="#92a494" style={styles.padding10}/>
                  </View>
                </View>
                <View style={styles.horarioSubView}>
                  <Text style={styles.horarioATexto}>Alisamento</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                    source={require('../../../assets/esp1.png')}
                    style={styles.horarioAImage}
                  />
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={styles.horarioAView}>
                  <Text style={styles.horarioATexto}>11:00</Text>
                  <View style={styles.flexrow}>
                    <AntDesign name="checkcircle" size={30} color="#1d817e" style={styles.padding10} />
                    <AntDesign name="closecircle" size={30} color="#92a494" style={styles.padding10}/>
                  </View>
                </View>
                <View style={{left: 20}}>
                  <Text style={styles.horarioATexto}>Corte</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                    source={require('../../../assets/esp2.png')}
                    style={styles.horarioAImage}
                  />
                </View>
              </View>
             <Text></Text>
            </View>

            <View style={styles.tituloView}>
              <Text style={styles.tituloTexto}>Histórico</Text>
            </View>
            <View style={styles.tituloView}>
              <Text style={styles.mesTexto}>Novembro</Text>
            </View>
            <View style={styles.horarioMainView}>
              <View style={styles.dataView}>
                <View style={styles.flexrow}>
                  <Entypo name="back-in-time" size={20} color="#1d817e" /><Text style={styles.texto16}> Segunda-feira, 28 de Novembro </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', height: 120}}>
                <View style={styles.horarioAView}>
                  <Text style={styles.horarioATexto}>13:00</Text>
                </View>
                <View style={styles.horarioSubView}>
                  <Text style={styles.horarioATexto}>Alisamento</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                    source={require('../../../assets/esp1.png')}
                    style={styles.horarioAImage}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', height: 120}}>
                <View style={styles.horarioAView}>
                  <Text style={styles.horarioATexto}>14:00</Text>
                </View>
                <View style={{left: 20}}>
                  <Text style={styles.horarioATexto}>Corte</Text>
                  <Text>Duração: 1 hora</Text>
                  <Image
                    source={require('../../../assets/esp2.png')}
                    style={styles.horarioAImage}
                  />
                </View>
              </View>
             <Text></Text>
            </View>

          
        </ScrollView>
      </SafeAreaView>
    );
  }