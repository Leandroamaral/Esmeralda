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
  const [servico, setServico] = useState('');

  const [allEspecialistas, setAllEspecialistas] = useState([]);
  const [allServicos, setAllServicos] = useState([]);
  const [allTimes,setAllTimes] = useState([]);

  useEffect(() => {
    loadEspecialista();
  }, [navigation]);

  function loadEspecialista() {
    console.log(diadehoje + 'load ')
    setDate(diadehoje)
    db
    .collection('Especialista')
    .get()
    .then(snapshot => {
      setAllEspecialistas (snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      }))
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
    setServico('');
    setTime('');

    var dtData = new Date(data)
     
    if (typeof(data) =='undefined') {
      dtData = diadehoje
      setDate(diadehoje);
    } else {
      setDate(dtData);
    }
    setSpecialists(allEspecialistas.filter((itemf) => itemf.Timetable.some((subElement) => subElement.Semana === diadasemana[dtData.getDay()])))

  }

  function updateServico(key){
    setSpecialist(key)
    const specialist = specialists[key]
    setServicos(specialist.Servicos.map((item) => ({...item, ...allServicos.find(itemf => item.idServicos == itemf.id) })));
    setAllTimes(specialist.Timetable.filter((itemf) => (itemf.Semana == diadasemana[date.getDay()] )))
    setServico('');
    setTimes([]);
    setTime('');
    setDisabledSend(true);
  }

  function updateTime(key){

    let timesarray = [];

    //Setar o serviço (pintar da borda)
    setServico(key)
    setTime('')
    setDisabledSend(true)

    
    //clasificar o array de tempo do especialista
    const timeespecialista = allTimes[0].Times.sort((a,b) => { return(
      Date.parse("2019-01-01T"+a+":00") - Date.parse("2019-01-01T"+b+":00")
    )})
    //console.log(timeespecialista + 'xx')
    //console.log(JSON.stringify(servicos[key].Tempo) + 'yy')
    
    //verificar quantos blocos de 30 minutos o serviço possui
    var timeParts = servicos[key].Tempo.split(":");
    const convertido =  ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1 ;
    //console.log(convertido + 'zzz')

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
      timesarray = allTimes[0].Times
    }

    //setar os horários disponíveis 
    setTimes(timesarray)
    //console.log(JSON.stringify(times) + 'kkk')
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
    const mes =  Number(data.getMonth()) + 1
    const fulldate = data.getFullYear() + '-' + ("0" + mes.toString()).slice(-2) + '-' + ("0" + data.getDate()).slice(-2)
    return(fulldate)
    
  }

  function reservarTime(){
    var temparray = {
      'Data' : converteData(date),
      'Times' : []
    };

    var temparray3 = [];
    var timeParts = servicos[servico].Tempo.split(":");
    const convertido =  ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1 ;

    for (var i = 0; i <= convertido; i++){
      temparray.Times.push(addMinutesToTime(times[time],i*30))
    }

    var temparray2 = specialists[specialist].Agenda
    if (typeof(specialists[specialist].Agenda) == 'undefined') {
      temparray3.push(temparray)
    } else {
      temparray3=temparray2.concat(temparray)
    }
    
    //console.log(JSON.stringify(specialists[specialist].Agenda) + ' AA')
    //console.log(JSON.stringify(temparray) + ' BB')
    //console.log(JSON.stringify(temparray2) + ' CC')
    //console.log(JSON.stringify(temparray3) + ' DD')

    db
    .collection('Especialista')
    .doc(specialists[specialist].id)
    .update({
        Agenda: temparray3
    })
    .then(() => {
        alert('Horário Reservado');
        //loadUserData();
    })
    .catch(() => {
        console.error(e);
    })

    loadEspecialista()
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
            onDayPress={(data,i) => updateDate(data,i)}
          
          />
        </View>
        

          <View style={styles.subTituloView}>
            <Text style={styles.subTituloTexto}>Selecione a especialista</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
                <View style={styles.espMainView}>
                  {specialists.map((item, key) => (
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
                  ))}
                </View>
              </ScrollView>
          </View>
          <View style={styles.subTituloView} enable>
            {(servicos.length > 0) ? 
              <Text style={styles.subTituloTexto}>Selecione o serviço</Text>
            : null }
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
                { servicos.map((item,key) => (
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
              ))}
            </ScrollView>
          </View>

          <View style={styles.subTituloView} enable>
          {(times.length > 0) ? 
            <Text style={styles.subTituloTexto}>Selecione o horário</Text>
          : null }
            <View style={styles.horarioView}>
              {times.map((item,key) => (
                <TouchableOpacity 
                key={key} 
                style={key === time ? styles.horarioBotaoChecked : styles.horarioBotao}
                onPress= {() => selectTime(key)}
                >
                <Text style={styles.horariosTexto}>{item}</Text>
              </TouchableOpacity>
              ))}
            </View>
          </View>

          <View 
            style={styles.reservarView}
          >
            <TouchableOpacity 
              disabled={disabledSend}
              style={styles.reservarBotao}
              onPress={reservarTime}>
                <Text style={styles.reservarTexto}>Reservar Horário</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>

  );
}