import React, { useState } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { Rating } from 'react-native-elements';
import { Corte, Hidratacao, Manicure, Tintura, Maquiagem, Alisamento, Cilios, Pedicure, WhatsappIcon } from '../FeedScreen/icons';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function Agendar({navigation}) {

  //Setting type of states 
  //arrays
  const [specialists,setSpecialists] = useState([])
  const [times,setTimes] = useState([])
  //Visibility boolean
  const [visibilityTime,setVisibilityTime] = useState()
  const [disabledSend,setDisabledSend] = useState()
  //Text
  const [specialist,setSpecialist] = useState('')
  const [date,setDate] = useState('')
  const [time,setTime] = useState('');

  function updateDate(date){
    setDate(date)
    updateSpecialists()
  }
  
  function updateSpecialists(){
    setSpecialists([
      {
        name:"Regina Caze",
        dayAvailable:["monday","thursday"],
        services:[{title:"corte",icon:"icon-name"},{title:"alisamento",icon:"icon-name"}],
        timeAvailable:["08:00","09:00","10:00","18:00","19:00","20:00"]},
      
      {
        name:"Julio Alberto",
        dayAvailable:["monday","thursday"],
        services:[{title:"corte",icon:"icon-name"},{title:"alisamento",icon:"icon-name"}],
        timeAvailable:["12:00","13:00","14:00"]
    }])
  }
  function updateSpecialist(key){
    setSpecialist(key)
    const specialist = specialists[key]
    setTimes(specialist.timeAvailable)
  }
  function updateTime(key){
    setTime(key)
  }

  //On Init Update selected date specialists
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
          <TouchableOpacity 
          key={key} 
          style={key === time ? styles.horarioBotaoChecked : styles.horarioBotao}
          onPress= {() => updateTime(key)}
          >
           <Text style={styles.horariosTexto}>{item}</Text>
        </TouchableOpacity>
        ))}
        
      </View>

      <View style={styles.serviceView}>
        <View style={styles.subTituloView} enable>
          <Text style={styles.subTituloTexto}>Selecione o Serviço</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>

          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Alisamento width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Alisamento</Text>
          </View>

          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Tintura width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Tintura</Text>
          </View>
          
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Manicure width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Manicure</Text>
          </View>

          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Hidratacao width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Hidratacao</Text>
          </View>

          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Maquiagem width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Maquiagem</Text>
          </View>
          
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Pedicure width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Pedicure</Text>
          </View>

          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Cilios width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Cilios</Text>
          </View>
        </ScrollView>
        
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