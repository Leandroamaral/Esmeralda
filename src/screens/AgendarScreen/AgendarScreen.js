import React, {useEffect, useState, useRef} from 'react';
import {Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {AntDesign} from '@expo/vector-icons';

import styles from './styles';
import {db} from '../../firebase/config';
import {Icones} from '../FeedScreen/icons';

export default function Agendar({navigation}) {
  const diadasemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];

  const diadehoje = new Date();
  const horariodehoje = () => {
    const diax = new Date();
    function z(n) {
      return (n<10? '0':'') + n;
    };
    return (z(diax.getHours()) + ':' + z(diax.getMinutes()));
  };
  const scrollViewRef = useRef();
  diadehoje.setUTCHours(0, 0, 0, 0);

  // Setting type of states
  // arrays
  const [specialists, setSpecialists] = useState([]);
  const [times, setTimes] = useState([]);
  const [servicos, setServicos] = useState([]);

  const [disabledSend, setDisabledSend] = useState(true);
  const [refreshing] = useState(false);

  // Text
  const [specialist, setSpecialist] = useState(null);
  const [date, setDate] = useState(diadehoje);
  const [time, setTime] = useState('');
  const [servico, setServico] = useState(null);

  // const [allEspecialistas, setAllEspecialistas] = useState([]);
  const [allServicos, setAllServicos] = useState([]);
  const [allTimes, setAllTimes] = useState([]);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    loadUserId();
    loadEspecialista();
  }, []);

  function addMinutesToTime(time, minsAdd) {
    function z(n) {
      return (n<10? '0':'') + n;
    };
    const bits = time.split(':');
    const mins = bits[0]*60 + +bits[1] + +minsAdd;
    return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);
  }

  const loadUserId = async () => {
    try {
      const aStorage = await AsyncStorage.getItem('@user');
      if (aStorage !== null) {
        db
            .collection('users')
            .doc(JSON.parse(aStorage).id)
            .get()
            .then((snapshot) => {
              setUsuario(snapshot.data());
            })
            .catch((e) => {
              console.error(e);
            });
      }
    } catch (error) {
      console.error(error);
    }
  };

  function loadEspecialista() {
    setSpecialist(null);
    setServico(null);
    setServicos([]);
    setTimes([]);
    setTime('');

    loadUserId();

    db
        .collection('Especialista')
        .get()
        .then((snapshot) => {
          const shotdata = (snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          }));
          setSpecialists(shotdata);
          // setAllEspecialistas(shotdata);
        });

    db
        .collection('Servico')
        .get()
        .then((snapshot) => {
          setAllServicos(snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          }));
        });
  }

  function updateDate(data) {
    setTimes([]);
    setServicos([]);

    setSpecialist(null);
    setServico(null);
    setTime('');

    let dtData = new Date(data);

    if (typeof(data) =='undefined') {
      dtData = diadehoje;
      setDate(diadehoje);
    } else {
      dtData.setUTCHours(0, 0, 0, 0);
      setDate(dtData);
    }

    // setSpecialists(allEspecialistas.filter((itemf) => itemf.Timetable.some((subElement) => subElement.Semana === diadasemana[dtData.getUTCDay()])))
  }

  function updateServico(key) {
    setSpecialist(key);
    setServico(null);
    setTimes([]);
    setTime('');

    let toremove = [];
    let toremoveuser = [];
    let final = [];
    let alltimetable = [];
    let serv = [];

    const specialist = specialists[key];
    if (typeof(specialist.Timetable) != 'undefined') {
      alltimetable = specialist.Timetable.filter((itemf) => (itemf.Semana == diadasemana[date.getUTCDay()] ));
    };

    if (alltimetable.length > 0 && (Date.parse(diadehoje) === Date.parse(date))) {
      final = alltimetable[0].Times.filter((itemf) => (Date.parse('2019-01-01T'+itemf) > Date.parse('2019-01-01T'+horariodehoje())));
    }

    if (alltimetable.length > 0 && !(Date.parse(diadehoje) === Date.parse(date))) {
      final = alltimetable[0].Times;
    }

    if (typeof(usuario.Agenda) != 'undefined') {
      const toRemoveFilter = usuario.Agenda.filter((itemf) => (Date.parse(itemf.Data) === Date.parse(date) && itemf.idEspecialista == specialist.id ));
      const toRemoveUser = toRemoveFilter.map((item) => {
        let horaservico = [];
        const temp = [];

        if (typeof(specialist.Servicos) != 'undefined') {
          horaservico = specialist.Servicos.filter((itemf) => (itemf.idServicos == item.idServico ));
        }
        if (horaservico.length > 0) {
          const timeParts = horaservico[0].Tempo.split(':');
          const convertido = ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1;

          for (let i = 0; i <= convertido; i++) {
            temp.push(addMinutesToTime(item.Horario, i*30));
          }
        }
        return (temp);
      });
      toremoveuser = toRemoveUser.flat();
    }

    if (typeof(specialist.Agenda) != 'undefined') {
      toremove = specialist.Agenda.filter((itemf) => (Date.parse(itemf.Data) === Date.parse(date)));
    }

    if (toremove.length > 0) {
      final = final.filter((itemf) => (!toremove[0].Times.includes(itemf)));
    }

    if (toremoveuser.length > 0) {
      final = final.filter((itemf) => (!toremoveuser.includes(itemf)));
    }

    if (typeof(specialist.Servicos) != 'undefined') {
      serv = specialist.Servicos.map((item) => ({...item, ...allServicos.find((itemf) => item.idServicos == itemf.id)}));
    }
    setServicos(serv);
    setAllTimes(final);
    setDisabledSend(true);
  }

  function updateTime(key) {
    let timesarray = [];

    // Setar o serviço (pintar da borda)
    setServico(key);
    setTime('');
    setDisabledSend(true);

    // clasificar o array de tempo do especialista
    const timeespecialista = allTimes.sort((a, b) => {
      return (
        Date.parse('2019-01-01T'+a+':00') - Date.parse('2019-01-01T'+b+':00')
      );
    });

    // verificar quantos blocos de 30 minutos o serviço possui
    const timeParts = servicos[key].Tempo.split(':');
    const convertido = ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1;

    // Verificar se existe espaço de tempo disponível (matemática braba)
    if (convertido > 0) {
      let ok = false;
      for (let i = 0; i < timeespecialista.length; i++) {
        const x = Date.parse('2019-01-01T'+timeespecialista[i]+':00');
        let z = 1;
        for (let ii = i+1; ii <= convertido+i; ii++) {
          const y = Date.parse('2019-01-01T'+timeespecialista[ii]+':00');
          const dif1 = y-x;
          if (dif1 == (1800000*z)) {
            ok = true;
          } else {
            ok = false;
            break;
          }
          z = z + 1;
        }
        if (ok) {
          timesarray.push(timeespecialista[i]);
        }
      }
    } else {
      timesarray = allTimes;
    }

    // setar os horários disponíveis
    setTimes(timesarray);
  }

  function selectTime(key) {
    setTime(key);
    setDisabledSend(false);
  }

  function reservarTime() {
    function converteData(data) {
      const mes = Number(data.getUTCMonth()) + 1;
      const fulldate = data.getFullYear() + '-' + ('0' + mes.toString()).slice(-2) + '-' + ('0' + data.getUTCDate()).slice(-2);
      return (fulldate);
    }

    const tempespecialista = {
      Data: converteData(date),
      Times: [],
    };

    const tempAgenda = {
      FotoEspecialista: specialists[specialist].Imagem,
      idEspecialista: specialists[specialist].id,
      NomeServico: servicos[servico].Nome,
      Duracao: servicos[servico].Tempo,
      Data: converteData(date),
      Horario: times[time],
      id: uuid.v4(),
    };

    let especialista = [];
    let especialistaindex = 0;
    let userAgenda = [];

    if (typeof(specialists[specialist].Agenda) != 'undefined') {
      especialista = specialists[specialist].Agenda;
      especialistaindex = specialists[specialist].Agenda.findIndex((itemf) => (Date.parse(itemf.Data) === Date.parse(date)));
      if (especialistaindex < 0) {
        especialista.push(tempespecialista);
        especialistaindex = especialista.length - 1;
      }
    } else {
      especialista.push(tempespecialista);
    }

    const timeParts = servicos[servico].Tempo.split(':');
    const convertido = ((Number(timeParts[0]) * 60 + Number(timeParts[1]))/30) -1;

    for (let i = 0; i <= convertido; i++) {
      especialista[especialistaindex].Times.push(addMinutesToTime(times[time], i*30));
    }

    if (typeof(usuario.Agenda) != 'undefined') {
      userAgenda = usuario.Agenda;
    }
    userAgenda.push(tempAgenda);

    db
        .collection('users')
        .doc(usuario.id)
        .update({
          Agenda: userAgenda,
        })
        .catch((e) => {
          console.error(e);
        });

    db
        .collection('Especialista')
        .doc(specialists[specialist].id)
        .update({
          Agenda: especialista,
        })
        .then(() => {
          alert('Horário Reservado');
        })
        .catch((e) => {
          console.error(e);
        });

    loadEspecialista();
    setDisabledSend(true);
    setSpecialists([]);
    setTimes([]);
    setServicos([]);
    setSpecialist(null);
    setTime('');
    setAllServicos([]);
    setAllTimes([]);
    setUsuario('');
  }

  function Especialista() {
    const tempEsp = specialists.map((item, key) => (
      <View key={key} style={specialist === key ? styles.espViewChecked : styles.espView}>
        <TouchableOpacity
          onPress={() => updateServico(key)}
        >
          { (item.Imagem) ?
          <Image
            source={{uri: item.Imagem}}
            style={styles.espImg}
          /> :
          <AntDesign name="user" size={60} color="#92a494" style={styles.espImg2} />
          }
          <Text style={styles.espTexto}>{item.Nome}</Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione a especialista</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.espMainView}>
            {tempEsp}
          </View>
        </ScrollView>
      </View>
    );
  }

  function Servico() {
    const mapServico = servicos.map((item, key) => (
      <View style={{padding: 5}} key={key}>
        <View style={key === servico ? styles.botaoServicoChecked : styles.botaoServico}>
          <TouchableOpacity
            style={styles.iconeServico}
            onPress={() => updateTime(key)}
          >
            <Icones tipo={item.Icone} width={45} height={45} fill="#92a494" />
          </TouchableOpacity>
          <Text style={styles.textoServico}>{item.Nome}</Text>
        </View>
      </View>
    ));

    const tempServico = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o serviço</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {mapServico}
        </ScrollView>
      </View>
    );

    const semHorario = (
      <View style={styles.subTituloView}>
        <Text style={styles.alertaTexto}>Não existe horário disponível para o Especialista</Text>
      </View>
    );

    if (specialist == null ) {
      return (null);
    } else {
      if (allTimes.length > 0 && servicos.length > 0) {
        return (tempServico);
      } else {
        return (semHorario);
      }
    }
  }

  function Horarios() {
    const mapHorario = times.map((item, key) => (
      <TouchableOpacity
        key={key}
        style={key === time ? styles.horarioBotaoChecked : styles.horarioBotao}
        onPress= {() => selectTime(key)}
      >
        <Text style={styles.horariosTexto}>{item}</Text>
      </TouchableOpacity>
    ));

    const comHorario = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
        <View style={styles.horarioView}>
          {mapHorario}
        </View>
      </View>
    );

    const semHorario = (
      <View style={styles.subTituloView}>
        <Text style={styles.subTituloTexto}>Selecione o horário</Text>
        <Text style={styles.alertaTexto}>Não existe horário disponível para o serviço</Text>
      </View>
    );
    if (servico == null) {
      return (null);
    } else {
      if (times.length > 0) {
        return (comHorario);
      } else {
        return (semHorario);
      }
    }
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

          </View> :

        <Text style={styles.alertaTexto}>Não existe horário disponível</Text>
        }

      </ScrollView>
    </SafeAreaView>

  );
}
