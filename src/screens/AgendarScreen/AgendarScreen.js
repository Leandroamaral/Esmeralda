import React, { useEffect, useState, useRef } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

import styles from './styles';
import { db } from '../../firebase/config';
import { Icones } from '../FeedScreen/icons';

export default function Agendar({navigation}) {

  const diadasemana = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sabado']

  const diadehoje = new Date();
  const scrollViewRef = useRef();
  diadehoje.setUTCHours(0,0,0,0)

  //Setting type of states 
  //arrays
  const [specialists,setSpecialists] = useState([]);
  const [times,setTimes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [disabledSend,setDisabledSend] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  //Text
  const [specialist,setSpecialist] = useState('')
  const [date,setDate] = useState(diadehoje)
  const [time,setTime] = useState('');
  const [servico, setServico] = useState(null);

  const [allEspecialistas, setAllEspecialistas] = useState([]);
  const [allServicos, setAllServicos] = useState([]);
  const [allTimes,setAllTimes] = useState([]);

  useEffect(() => {
    loadEspecialista();
  }, [navigation]);

  function loadEspecialista() {

    setSpecialist('')
    setServico(null);
    setServicos([]);
    setTimes([]);
    setTime('');

    db
    .collection('Especialista')
    .get()
    .then(snapshot => {
      const shotdata =  (snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      }))
      setSpecialists(shotdata.filter((itemf) => itemf.Timetable.some((subElement) => subElement.Semana === diadasemana[date.getDay()])))
      setAllEspecialistas(shotdata);
    })
  
    db
    .collection('Servico')
    .get()
    .then(snapshot => {
      setAllServicos (snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      }))
    })

  }

  function updateDate(data){
    setTimes([]);
    setServicos([]);

    setSpecialist('');
    setServico(null);
    setTime('');

    var dtData = new Date(data)
     
    if (typeof(data) =='undefined') {
      dtData = diadehoje
      setDate(diadehoje);
    } else {
      dtData.setUTCHours(0,0,0,0)
      setDate(dtData);
    }

    setSpecialists(allEspecialistas.filter((itemf) => itemf.Timetable.some((subElement) => subElement.Semana === diadasemana[dtData.getDay()])))

  }

  function updateServico(key){
    
    setSpecialist(key)
    setServico(null);
    setTimes([]);
    setTime('');

    var toremove = []
   
    const specialist = specialists[key]
    const alltimetable = specialist.Timetable.filter((itemf) => (itemf.Semana == diadasemana[date.getDay()] ))
    let final = alltimetable[0].Times

    if (typeof(specialist.Agenda) != 'undefined') {
      toremove = specialist.Agenda.filter((itemf) => (Date.parse(itemf.Data) === Date.parse(date)))
    }
      
    if (toremove.length > 0) { 
      final = alltimetable[0].Times.filter((itemf) => (!toremove[0].Times.includes(itemf)))
    }

    setServicos(specialist.Servicos.map((item) => ({...item, ...allServicos.find(itemf => item.idServicos == itemf.id) })));
    setAllTimes(final)

    setDisabledSend(true);
  }

  function updateTime(key){

    let timesarray = [];
    
    //Setar o serviço (pintar da borda)
    setServico(key)
    setTime('')
    setDisabledSend(true)

    //clasificar o array de tempo do especialista
    const timeespecialista = allTimes.sort((a,b) => { return(
      Date.parse("2019-01-01T"+a+":00") - Date.parse("2019-01-01T"+b+":00")
    )})
    
    //verificar quantos blocos de 30 minutos o serviço possui
    var timeParts = servicos[key].Tempo.split(":");
    const convertido =  ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1 ;

    //Verificar se existe espaço de tempo disponível (matemática braba)
    if (convertido > 0) {
      let ok = false;
      for (let i = 0; i < timeespecialista.length;i++){
        let x = Date.parse("2019-01-01T"+timeespecialista[i]+":00");
        let z = 1
        for (let ii = i+1; ii <= convertido+i; ii++){
          let y = Date.parse("2019-01-01T"+timeespecialista[ii]+":00");
          let dif1 = y-x;
          if (dif1 == (1800000*z)) {
            ok = true;
            //console.log(dif1 + 'true')
          } else {
            ok = false;
            break;
            //console.log(dif1 + 'false')
          }
          z = z + 1;
        }
        if (ok) {
          timesarray.push(timeespecialista[i]);
        }
      } 
    } else {
      timesarray = allTimes
    }

    //setar os horários disponíveis 
    setTimes(timesarray)

  }

  function addMinutesToTime(time, minsAdd) {
    function z(n){ return (n<10? '0':'') + n;};
    var bits = time.split(':');
    var mins = bits[0]*60 + +bits[1] + +minsAdd;
    return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);
  }

  function selectTime(key) {
    setTime(key);
    setDisabledSend(false);

  }

  function converteData(data) {
    const mes =  Number(data.getUTCMonth()) + 1
    const fulldate = data.getFullYear() + '-' + ("0" + mes.toString()).slice(-2) + '-' + ("0" + data.getUTCDate()).slice(-2)
    return(fulldate)
    
  }

  function reservarTime(){
    
    var tempespecialista =  {
      Data: converteData(date),
      Times: []
    }

    var especialista = []
    var especialistaindex = 0

    if (typeof(specialists[specialist].Agenda) != 'undefined') {
      especialista = specialists[specialist].Agenda
      especialistaindex = specialists[specialist].Agenda.findIndex((itemf) => (Date.parse(itemf.Data) === Date.parse(date)))
      if (especialistaindex < 0) {
        especialista.push(tempespecialista)
        especialistaindex = especialista.length - 1
      }
    } else {
      especialista.push(tempespecialista)
    }

    var timeParts = servicos[servico].Tempo.split(":");
    const convertido =  ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1 ;
    
    for (var i = 0; i <= convertido; i++){
      especialista[especialistaindex].Times.push(addMinutesToTime(times[time],i*30))
    }

    db
    .collection('Especialista')
    .doc(specialists[specialist].id)
    .update({
        Agenda: especialista
    })
    .then(() => {
        alert('Horário Reservado');
    })
    .catch(() => {
        console.error(e);
    })

    loadEspecialista()
  }

  function Especialista() {
     const tempEsp = specialists.map((item, key) => (
        <View key={key} style={specialist === key ? styles.espViewChecked : styles.espView}>
        <TouchableOpacity
            onPress={() => updateServico(key)}
            >
          <Image
            source={{uri: item.Imagem }}
            style={styles.espImg}
              />
          <Text style={styles.espTexto}>{item.Nome}</Text>
        </TouchableOpacity>
      </View>
      ))

    return(

      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione a especialista</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
            <View style={styles.espMainView}>
              {tempEsp}
            </View>
          </ScrollView>
      </View>

    )
  }

  function Servico() {

    const mapServico = servicos.map((item,key) => (
      <View style={{padding:5}} key={key}>
        <View  style={key === servico ? styles.botaoServicoChecked : styles.botaoServico}>
          <TouchableOpacity 
            
            style={styles.iconeServico}
            onPress={() => updateTime(key)}
                >
            <Icones tipo={item.Icone} width={45} height={45} fill="#92a494" />
          </TouchableOpacity>
          <Text style={styles.textoServico}>{item.Nome}</Text>
        </View>
      </View>
    ))

    const tempServico = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o serviço</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
        {mapServico}  
        </ScrollView>
      </View>
    )

    return((servicos.length > 0) ? tempServico : null)
  }

  function Horarios() {

    const mapHorario = times.map((item,key) => (
      <TouchableOpacity 
        key={key} 
        style={key === time ? styles.horarioBotaoChecked : styles.horarioBotao}
        onPress= {() => selectTime(key)}
        >
        <Text style={styles.horariosTexto}>{item}</Text>
      </TouchableOpacity>
      ))

    const comHorario = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
        <View style={styles.horarioView}>
          {mapHorario}
        </View>
      </View>
    )

    const semHorario = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
        <Text style={styles.alertaTexto}>Não existe horário disponível para o serviço</Text> 
      </View>
    )

    return((servico != null && times.length <= 0) ? semHorario : comHorario)

  }

  return (
    <SafeAreaView>
      
      {refreshing ? <ActivityIndicator /> : null}

      <ScrollView 
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadEspecialista} />}
        ref={scrollViewRef}
      > 

        <View style={styles.tituloView}>
          <Text style={styles.tituloTexto}>Agendar</Text>
        </View>

        <View>
          <WeeklyCalendar style={styles.calendario}
            startWeekday={7}
            locale = 'pt-br'
            titleStyle = {styles.calendarioTitulo}
            dayLabelStyle = {styles.calendarioLabel}
            themeColor = '#357066'
            onDayPress={(data) => updateDate(data)}
          
          />
        </View>

        {(date >= diadehoje && specialists.length > 0) ? 
          <View>
          
            <Especialista />

            <Servico />
    
            <Horarios />
  
            <View 
              style={styles.reservarView}
            >
              <TouchableOpacity 
                disabled={disabledSend}
                style={(disabledSend) ? styles.reservarBotaoDisabled : styles.reservarBotao }
                onPress={reservarTime}>
                  <Text style={styles.reservarTexto}>Reservar Horário</Text>
              </TouchableOpacity>
            </View>
          
           </View>
           
        : <Text style={styles.alertaTexto}>Não existe horário disponível</Text> 
      }

        </ScrollView>
      </SafeAreaView>

  );
}