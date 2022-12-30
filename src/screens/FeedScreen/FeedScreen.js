import React, { useState } from 'react'
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { Entypo } from '@expo/vector-icons';
import { Corte, Hidratacao, Manicure, Tintura, Maquiagem, Alisamento, Cilios, Pedicure, WhatsappIcon } from './icons';
import { SocialIcon } from 'react-native-elements'
import MapView from 'react-native-maps';

const Region = {
    latitude: -15.916248,
    longitude: -48.099713,
    latitudeDelta: 0.0622,
    longitudeDelta: 0.0121,
  }


function Titulo() {

  const [userName, setUserName] = useState("");

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        const user = JSON.parse(name);
        const firstname = user.fullName.split(' ');
        setUserName(firstname);
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

export default function Feed() {
  
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>

        <Titulo />

        <ScrollView horizontal={true}>
          <View style={styles.viewcampanha}>
            <Image
              style={styles.imagemCampanha}
              source={require('../../../assets/img1.png')}
            />
          </View>
          <View style={styles.viewcampanha}>
            <Image
              style={styles.imagemCampanha}
              source={require('../../../assets/img2.png')}
            />
          </View>
        </ScrollView>

        <View style={styles.servicos}>
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

        </View>
        
        
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