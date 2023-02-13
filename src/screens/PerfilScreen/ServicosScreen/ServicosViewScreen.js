import React, { useState, useEffect, useRef } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { db } from '../../../firebase/config';
import styles from './styles';
import { Icones } from '../../FeedScreen/icons';


export default function ServicosView ({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();

  const [shotdata, setshotdata] = useState([]);
      
  useEffect(() => {
    loadServico();
  }, []);

  const loadServico = async () => {
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
  }

  function ViewServicos() {
    const listitens = shotdata.map( (a, index) => { 
      return(
        <View style={{padding:3}} key={index}>
          <View style={styles.botaoServico}>
            <TouchableOpacity 
              style={styles.iconeServico}
              onPress={() => navigation.navigate('ServicosEdit', {itemId: a.id})}
              >
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
      {refreshing ? <ActivityIndicator /> : null}
      <ScrollView
        horizontal={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadServico} />}
        ref={scrollViewRef}>

        <ViewServicos />

        <View style={styles.sairView}>
          <TouchableOpacity onPress={() => navigation.navigate('ServicosEdit', {itemId: null})}>
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



