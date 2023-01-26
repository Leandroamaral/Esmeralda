import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { db } from '../../../firebase/config';
import styles from './styles';

export default function TimetableScreen ({ route, navigation }) {
    const [parametros, setParametros] = useState(route.params);
    const [tempKey, setTempKey] = useState(0);
    const [timetableselected, setTimetableSelected] = useState([]);

    const timetable = [{
        Semana: 'Segunda-Feira',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Terça-Feira',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Quarta-Feira',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Quinta-Feira',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Sexta-Feira',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Sabado',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
        {
        Semana: 'Domingo',
        Times:["06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","21:30","22:00","22:30","23:00","23:30"]},
            
    ]

    if (parametros.itemId) {
        useEffect(() => {
          db
            .collection('Especialista')
            .doc(parametros.itemId)
            .get()
            .then(snapshot => {
                const shotdata = snapshot.data();
                if(typeof(shotdata.Timetable) !== 'undefined') {
                    setTimetableSelected(shotdata.Timetable)
                }
            })
            .catch((e) => console.error)
        }, []);
    } 

    function pintarHorario(semana,tempo) {
        const check = timetableselected.find((el) => el.Semana == semana)
        if (typeof(check) !== 'undefined') {
            const check2 = check.Times.some((el2) => el2 === tempo)
                if (check2) {
                    return(styles.horarioBotaoChecked)
                } else {
                    return(styles.horarioBotao)
                }
        } else {
            return(styles.horarioBotao) 
        }
    } 

    function onCheckHorario(semana,tempo) {
        const check = timetableselected.findIndex((el) => el.Semana == semana);
        if (check > -1) {
            const check2 = timetableselected[check].Times.some((el2) => el2 === tempo);
            if (check2){
                const index = timetableselected[check].Times.indexOf(tempo) ;
                const x = timetableselected[check].Times.splice(index,1);
                if (timetableselected[check].Times.length == 0) {
                    const y = timetableselected.splice(check,1)
                }
                setTimetableSelected(timetableselected);
                setTempKey(tempKey+1);
            } else {
                timetableselected[check].Times.push(tempo);
                setTempKey(tempKey+1);
            };

        } else {
            const tempArray = [{
                Semana: semana,
                Times: [tempo]
            }]
            const x = timetableselected.concat(tempArray);
            setTimetableSelected(x);
            setTempKey(tempKey+1);
        };
    };

    function onSalvarTimestamp() {
        db
            .collection('Especialista')
            .doc(parametros.itemId)
            .update({
               Timetable: timetableselected
            })
            .then(() => {
                alert('Atualização Efetuada');
            })
            .catch(() => {
                console.error(e);
            })
            .finally(() => {
                setTempKey(tempKey+1);
            })
    }



    return (

    <SafeAreaView>
      <ScrollView>
        <View key={'main'+tempKey.toString()}>
            { timetable.map((item,key) => { return(
            <View key={key}> 
                <View style={{alignItems: 'center', padding:10}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.Semana}</Text>
                </View>
                <View style={{padding:10, flexWrap:'wrap', flexDirection: 'row'}}>
                    { item.Times.map((itemb,keyb) => { 
                        return(
                        <TouchableOpacity key={'b'+keyb}
                            style={pintarHorario(item.Semana,itemb)}
                            onPress={() => onCheckHorario(item.Semana,itemb)}
                        >
                            <Text style={styles.horariosTexto}>{itemb}</Text>
                        </TouchableOpacity>
                    )})}
                </View>
            </View>
            )})}
            <View key='xxx' style={{alignSelf:'center', padding: 10, flexDirection: 'row',}}>
                <TouchableOpacity onPress={onSalvarTimestamp}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#1d817e', '#2fa192', '#50c8cc']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        style={styles.botao}>
                        
                        <Text style={styles.botaoTexto}>Salvar</Text>
                    
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    )
}