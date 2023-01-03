import React, { useState } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { Rating } from 'react-native-elements';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function Agendar({navigation}) {

  //toview 
  const [specialists,setSpecialists] = useState([])
  const [visibilityTime,setVisibilityTime] = useState()
  const [disabledSend,setDisabledSend] = useState()
  // to form
  const [specialist,setSpecialist] = useState('')
  const [date,setDate] = useState('')
  const [times,setTimes] = useState([])
  
  function updateDate(date){
    setDate(date)
    updateSpecialists()
  }
  
  function updateSpecialists(){
    setSpecialists([{name:"Regina Caze",timeAvailable:["08:00","09:00","10:00","18:00","19:00","20:00"]},{name:"Julio Alberto",timeAvailable:["12:00","13:00","14:00"]}])
  }
  function updateSpecialist(key){
    setSpecialist(key)
    const specialist = specialists[key]
    setTimes(specialist.timeAvailable)
  }
  React.useEffect(()=>{
    updateSpecialists();
    setDisabledSend(true)
	}, [])

  return (
    <View>
      <View style={styles.tituloView}>
        <Text style={styles.tituloTexto}>Agendar</Text>
      </View>
      <View>
        <WeeklyCalendar style={styles.calendario}
          startWeekday={7}
          locale = 'pt-br'
          titleStyle = {styles.calendarioTitulo}
          dayLabelStyle = {styles.calendarioLabel}
          onDayPress = { (date) => updateDate(date)}
         />
      </View>
      
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione a especialista</Text>
        <SafeAreaView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator="false">
            <View style={styles.espMainView}>
              {specialists.map((item, key) => (
                 <View key={key} style={specialist === key ? styles.espViewChecked : styles.espView}>
                 <TouchableOpacity
                     onPress={() => updateSpecialist(key)}
                     >
                   <Image
                     source={require('../../../assets/esp1.png')}
                     style={styles.espImg}
                       />
                   <Text style={styles.espTexto}>{item.name}</Text>
                 </TouchableOpacity>
               </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={styles.subTituloView} enable>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
      </View>

      <View style={styles.horarioView}>
        {times.map((item,key) => (
          <TouchableOpacity style={styles.horarioBotao}>
           <Text style={styles.horariosTexto}>{item}</Text>
        </TouchableOpacity>
        ))}
        
      </View>
      
      <View 
        style={styles.reservarView}
      >
        <TouchableOpacity 
        disabled={disabledSend}
        style={styles.reservarBotao}>
              <Text style={styles.reservarTexto}>Reservar Horário</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
}