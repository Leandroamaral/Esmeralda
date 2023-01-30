import React, { useEffect, useState } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles';
import { db } from '../../firebase/config';
import { Icones } from '../FeedScreen/icons';

export default function Agendar({navigation}) {

  const diadasemana = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sabado']
  const diadehoje = new Date();
 

  //Setting type of states 
  //arrays
  const [specialists,setSpecialists] = useState([]);
  const [times,setTimes] = useState([]);
  const [servicos, setServicos] = useState([]);

  //Visibility boolean
  const [visibilityTime,setVisibilityTime] = useState()
  const [disabledSend,setDisabledSend] = useState()

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
    updateDate()
  }, []);

  function loadEspecialista() {

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
    updateDate(diadehoje,diadehoje.getDay())
  }

  function updateDate(){
    setSpecialists(allEspecialistas.filter((itemf) => itemf.Timetable.some((subElement) => subElement.Semana === diadasemana[date.getDay()])))
    setTimes([]);
    setServicos([]);
    setSpecialist('');
    setServico('');
    
  }

  function updateSpecialist(key){
    setSpecialist(key)
    const specialist = specialists[key]
    setServicos(specialist.Servicos.map((item) => ({...item, ...allServicos.find(itemf => item.idServicos == itemf.id) })));
    setAllTimes(specialist.Timetable.filter((itemf) => (itemf.Semana == diadasemana[date.getDay()] )))
    setServico('');
    setTimes([]);
  }

  function updateTime(key){

    let timesarray = [];

    //Setar o serviço (pintar da borda)
    setServico(key)
    
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
      let z = 1;
      let ok = false;
      for (let i = 0; i < timeespecialista.length;i++){
        let x = Date.parse("2019-01-01T"+timeespecialista[i]+":00");
        let cont = 1
        for (let ii = i+1; ii <= convertido+i; ii++){
          let y = Date.parse("2019-01-01T"+timeespecialista[ii]+":00");
          let dif1 = y-x;
          if (dif1 == (1800000*cont)) {
            ok = true;
            //console.log(dif1 + 'true')
          } else {
            ok = false
            //console.log(dif1 + 'false')
          }
          cont = cont + 1;
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

  return (
    <SafeAreaView>
    <ScrollView horizontal={false}> 

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
                        onPress={() => updateSpecialist(key)}
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
                onPress= {() => updateTime(key)}
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
            style={styles.reservarBotao}>
                  <Text style={styles.reservarTexto}>Reservar Horário</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>

  );
}