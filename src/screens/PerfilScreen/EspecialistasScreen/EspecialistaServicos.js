import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import { db } from '../../../firebase/config';
import { Icones } from '../../FeedScreen/icons';

const PersonCard = ({dados, navigation}) => {
  
  return (
    <View style={styles.userCard}>
      <Icones tipo={dados.Icone} width={45} height={45} fill="#92a494"  />
        <View style={styles.userCardDescription}>
        <Text style={{ marginLeft: 40, fontWeight: 'bold' }}>Serviço: {dados.Nome}</Text>
        <View style={{marginLeft: 30, flexDirection: 'row' }}><Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Tempo:</Text><Text style={{ marginLeft: 10}}>{dados.Tempo}</Text></View>
        <View style={{marginLeft: 30,flexDirection: 'row'}}><Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Valor:</Text><Text style={{ marginLeft: 20}}>{dados.Valor}</Text></View>
        <View style={styles.userActions}>
          <TouchableOpacity 
            style={styles.editButton}
          >
            <AntDesign name="form" size={26} color='#1d817e'style={styles.padding10}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
          >
            <AntDesign name="delete" size={26} color='#1d817e' style={styles.padding10}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>  
    )
};


export default function EspecialistaServicos ({ route, navigation }) {

  const [servicos,setServicos] = useState([]);
  const [parametros, setParametros] = useState(route.params);
  const [tempKey, setTempKey] = useState(0);
  const [allServicos, setAllServicos] = useState([]);

  const [idservicos,setIdServicos] = useState();
  const [tempo,setTempo] = useState();
  const [valor,setValor] = useState();

  useEffect(() => {
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

        if (parametros.itemId) {
          db
            .collection('Especialista')
            .doc(parametros.itemId)
            .get()
            .then(snapshot => {
                const shotdata = snapshot.data();
                if(typeof(shotdata.Servicos) !== 'undefined') {
                  setServicos(shotdata.Servicos)
                  
                  
                }
            })
            .catch((e) => console.error)
        }

  }, []);

 
  function onSalvarServico() {
    const temp1 = [{
      idServicos: idservicos,
      Valor: valor,
      Tempo: tempo
    }]

    const temp2 = temp1.concat(servicos)

    db
      .collection('Especialista')
      .doc(parametros.itemId)
      .update({
        Servicos: temp2
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

  const servicofinal = servicos.map((item) => ({...item, ...allServicos.find(itemf => item.idServicos == itemf.id) }))
  
  return(
    <SafeAreaView>
      <ScrollView>
        <View key={tempKey.toString}>
        {servicofinal.map((item,key)=>(
            <PersonCard 
              key={key}
              navigation={navigation}
              dados={item}

            />
        ))}
        </View>
        <View style={{alignItems: 'center', padding:10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Adicionar Novo Serviço</Text>
          <Picker style={styles.input} 
            mode="dropdown"
            selectedValue={idservicos}
            onValueChange={(item) => setIdServicos(item)}
          >
            <Picker.Item label="Selecione um serviço" style={{color:'#AAA'}} />
            {allServicos.map((item,index) => { return(
              <Picker.Item label={item.Nome} value={item.id} key={index} />
            )})}
          </Picker>
          <Picker style={styles.input} 
            mode="dropdown"
            selectedValue={tempo}
            onValueChange={(item) => setTempo(item)}
          >
            <Picker.Item label="Selecione um tempo" style={{color:'#AAA'}} />
            <Picker.Item label='00:30' value='00:30' />
            <Picker.Item label='01:00' value='01:00' />
            <Picker.Item label='01:30' value='01:30' />
            <Picker.Item label='02:00' value='02:00' />
            <Picker.Item label='02:30' value='02:30' />
            <Picker.Item label='03:00' value='03:00' />
            <Picker.Item label='03:30' value='03:30' />
            <Picker.Item label='04:00' value='04:00' />
            <Picker.Item label='04:30' value='04:30' />
            <Picker.Item label='05:00' value='05:00' />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder='Valor'
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            value={valor}
            onChangeText={(item) => setValor(item)}
          />
          <View style={{alignSelf:'center', padding: 10, flexDirection: 'row',}}>
            <TouchableOpacity onPress={onSalvarServico}>
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