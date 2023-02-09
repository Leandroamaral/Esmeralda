import React, { useEffect, useState, useRef } from 'react'
import { Text, View, Image, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Entypo } from '@expo/vector-icons';

import styles from './styles';
import { db } from '../../firebase/config';

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



function diaformat(data) {
  let xDate = new Date(data)
  xDate.setHours(0,0,0,0)
  return (diasemana[xDate.getDay() + 1] + ', '  + (xDate.getDate() + 1) + ' de ' + mes[xDate.getMonth()])
} 

export default function Horarios({navigation}) {

  const [eventoF, setEventoF] = useState([]);
  const [eventoP, setEventoP] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const scrollViewRef = useRef();

  useEffect(() => {
    loadUser();
  }, []);

  const setDataHora = (data, horario) => {
    let datax = new Date(data)
    const hora = horario.split(':')
    datax.setUTCHours(Number(hora[0]) + 3,Number(hora[1]))
    return(Date.parse(datax))
  }

  const loadUser = async () => {
    try {
      const aStorage = await AsyncStorage.getItem('@user')
      if (aStorage !== null) {
        db
        .collection('users')
        .doc(JSON.parse(aStorage).id)
        .get()
        .then((snapshot) => {
          const dados = snapshot.data()
          if (typeof(dados.Agenda) != 'undefined') {
            setEventoF(dados.Agenda.filter((itemf) => {
            const datay = setDataHora(itemf.Data, itemf.Horario)
            return(datay >= Date.parse(diadehoje) )
            }))
            
            setEventoP(dados.Agenda.filter((itemf) => {
              const data = setDataHora(itemf.Data, itemf.Horario)
              return(data < Date.parse(diadehoje) )
            }))
          }
        })
        .catch((e) => {
          console.error(e)
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  function ProximosHorarios () {
    const eventoSorted = eventoF.sort((a,b) => {
      let dataA = setDataHora(a.Data, a.Horario)
      let dataB = setDataHora(b.Data, b.Horario)
      return (dataA - dataB)
    } ) 

    const horarios = eventoSorted.map((item, index) => (
      <View style={styles.horarioMainView} key={index}>
        <View style={styles.dataView}>
          <View style={styles.flexrow}>
            <Entypo name="bookmark" size={20} color="#1d817e" /><Text style={styles.texto16}>{diaformat(item.Data)}</Text>
          </View>
        </View>
        <View style={styles.flexrow}>
          <View style={styles.horarioAView}>
            <Text style={styles.horarioATexto}>{item.Horario}</Text>
          </View>
          <View style={styles.horarioSubView}>
            <Text style={styles.horarioATexto}>{item.NomeServico}</Text>
            <Text>Duração: {item.Duracao}</Text>
            <Image
              source={{uri: item.FotoEspecialista}}
              style={styles.horarioAImage}
            />
          </View>
        </View>
      </View>
    ))
    if (eventoF.length > 0) {
      return(
        <View>
          <View style={styles.tituloView}>
            <Text style={styles.tituloTexto}>Proximos Horários </Text>
          </View>
          {horarios}
        </View>
        )
      } else {
        return (null)
      }
  }

  function Historico () {
    const eventoSorted = eventoP.sort((a,b) => {
      let dataA = setDataHora(a.Data, a.Horario)
      let dataB = setDataHora(b.Data, b.Horario)
      return (dataA - dataB)
    } ) 
    const horarios = eventoSorted.map((item, index) => (
      <View style={styles.horarioMainView} key={index}>
        <View style={styles.dataView}>
          <View style={styles.flexrow}>
            <Entypo name="back-in-time" size={20} color="#1d817e" /><Text style={styles.texto16}> {diaformat(item.Data)} </Text>
          </View>
        </View>
        <View style={styles.flexrow}>
          <View style={styles.horarioAView}>
            <Text style={styles.horarioATexto}>{item.Horario}</Text>
          </View>
          <View style={styles.horarioSubView}>
            <Text style={styles.horarioATexto}>{item.NomeServico}</Text>
            <Text>Duração: {item.Duracao}</Text>
            <Image
              source={{uri: item.FotoEspecialista}}
              style={styles.horarioAImage}
            />
          </View>
        </View>
      </View>
    ))
    if (eventoP.length > 0) {
      return(
        <View>
          <View style={styles.tituloView}>
            <Text style={styles.tituloTexto}>Histórico</Text>
          </View>
          {horarios}
        </View>
        )
    } else {
      return(null)
    }
  }


    return (
      <SafeAreaView>
        {refreshing ? <ActivityIndicator /> : null}
        <ScrollView 
         horizontal={false}
         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUser} />}
         ref={scrollViewRef}>
            
            {(eventoF.length > 0 || eventoP > 0) ?
              <>
              <ProximosHorarios />
              <Historico />
              </>
            :
              <View style={{height: 400, alignSelf:'center', top: 100}}>
                <Text style={{textAlign:'center', fontSize: 30}}>Não existem horários marcados</Text>
              </View>
              }
          
        </ScrollView>
      </SafeAreaView>
    );
  }