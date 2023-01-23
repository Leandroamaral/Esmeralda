import React, { useState, useEffect } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { db } from '../../firebase/config';
import { Entypo } from '@expo/vector-icons';
import { Icones, WhatsappIcon } from './icons';
import { SocialIcon } from 'react-native-elements'
import MapView from 'react-native-maps';

const Region = {
  latitude: -15.916248,
  longitude: -48.099713,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
}

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
          <TouchableOpacity 
            style={styles.iconeServico}
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



function Titulo() {

  const [userName, setUserName] = useState("");

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        const user = JSON.parse(name);
        const firstname = user.fullName.split(' ');
        setUserName(firstname[0]);
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!userName) {
    load();
  }

  return (
    <View style={styles.viewtitle}>
      <Text style={styles.texto28}>Olá, <Text style={styles.nome}>{userName}</Text></Text>
      <Text>Bem vindo a <Text style={styles.nomeEstudio}>Esmeralda Studio</Text></Text>
    </View>
  )


}  

function Campanha() {
  const [shotdata, setshotdata] = useState([]);
      
  useEffect(() => {
    db
    .collection('Campanha')
    .get()
    .then(snapshot => {
      setshotdata (snapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data }
      }))
    })
  }, []);

  return (
    <ScrollView horizontal={true}>

    {shotdata.map( (a, index) => {

      return(
        <View style={styles.viewcampanha} key={index}>
              <Image
                style={styles.imagemCampanha}
                source={{uri: a.image }}
              />
            </View>
      )
    })}
    </ScrollView>
  );
}

function Mapa() {
  return (
    <>
    <View style={styles.mapaView}>
        <MapView 
          style={styles.mapa} 
          showsUserLocation = {true}
          initialRegion = {Region}
          minZoomLevel = {15}
          />
          <Text style={styles.mapaTitulo}> <Entypo name="location-pin" size={24} color="#1d817e" /> Esmeralda Studio de Beleza</Text>
          <Text style={styles.mapaEndereco}>Endereço completo </Text>
          <Text style={styles.mapaEndereco}>Riacho Fundo 2 - DF </Text>
      </View>
      <View style={styles.mapaZap}>
        <TouchableOpacity>
          <WhatsappIcon width={60} height={60}/>
        </TouchableOpacity>
      </View>
    </>
  )

}

export default function Feed() {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>

        <Titulo />

        <Campanha />

        <ViewServicos />

        <Mapa />
        
        

        <View style={styles.rsMainView}>
          <Text></Text>
          <Text> Siga em nossas redes sociais</Text>
          <View style={styles.rsView}>
            <SocialIcon type='instagram'  />
            <SocialIcon type='youtube'  />
            <SocialIcon type='facebook'  />
            <SocialIcon type='pinterest'  />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  
  );
}