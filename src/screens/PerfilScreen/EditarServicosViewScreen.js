import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { Icones } from '../FeedScreen/icons';


export default function EditarServicoView ({ navigation }) {

  function ViewServicos() {
    const [shotdata, setshotdata] = useState([]);
      
      useEffect(() => {
        db
        .collection('Servico')
        .get()
        .then(snapshot => {
          setshotdata (snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
          }))
        })
      }, []);

      const listitens = shotdata.map( (a, index) => { 
        return(
          <View style={{padding:3}} key={index}>
            <View style={styles.botaoServico}>
              <TouchableOpacity style={styles.iconeServico}>
                <Icones tipo={a.Icone} width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={styles.textoServico}>{a.Nome}</Text>
            </View>
          </View>
        )
        });
      
      return (
        <View style={styles.servicos}>
          {listitens}
        </View>
      )



  }


    return(
    <SafeAreaView>
        <ScrollView>
          <ViewServicos />
          <View style={styles.sairView}>
            <TouchableOpacity onPress={() => navigation.navigate('EditarServico')}>
              <View style={styles.menuView}>
                <Text style={styles.sairTexto}>Adicionar Novo Serviço</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
 
}



