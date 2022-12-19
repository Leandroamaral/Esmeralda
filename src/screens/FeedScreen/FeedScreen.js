import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
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

export default function Feed({navigation}) {
    return (
      <SafeAreaView style={{flex: 1, padding: 10, flexDirection: "column"}}>
        <ScrollView>
          <View style={{ height: 80, marginTop: 40 }}>
            <Text style={{fontSize: 28}}>Olá, <Text style={{fontSize: 28, fontWeight: 'bold'}}>Leandro</Text></Text>
            <Text>Bem vindo a <Text style={{fontSize: 16}}>Esmeralda Studio</Text></Text>
          </View>

          <ScrollView horizontal={true}>
            <View style={{ height: 200, alignItems: "center"}}>
              <Image
                style={{width: 340 , 
                    height: 180,
                    borderRadius: 10,
                    }}
                source={require('../../../assets/img1.png')}
              />
            </View>
            <View style={{ height: 200, alignItems: "center"}}>
              <Image
                style={{width: 340 , 
                    height: 180,
                    borderRadius: 10,
                    }}
                source={require('../../../assets/img2.png')}
              />
            </View>
          </ScrollView>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'relative', height: 220, flexWrap: 'wrap'}}>
            
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center', marginBottom: 5 }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Corte width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Corte</Text>
            </View>
  
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Alisamento width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Alisamento</Text>
            </View>
  
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Tintura width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Tintura</Text>
            </View>
            
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Manicure width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Manicure</Text>
            </View>
  
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Hidratacao width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Hidratacao</Text>
            </View>
  
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Maquiagem width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Maquiagem</Text>
            </View>
            
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Pedicure width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Pedicure</Text>
            </View>
  
            <View style={{backgroundColor: '#fff', height: 100, width: 80, borderRadius: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderRadius: 10, 
                  margin: 5, 
                  backgroundColor: '#eaeceb', 
                  width: 60, height: 60, 
                  marginTop: 12, 
                  alignItems: 'center',
                  justifyContent: 'center' }}>
                <Cilios width={45} height={45} fill="#92a494" />
              </TouchableOpacity>
              <Text style={{color: "#92a494", fontSize: 12}}>Cilios</Text>
            </View>
  
          </View>
          
          
          <View style={{ height: 300, backgroundColor: "white", borderRadius: 10, alignItems: 'center' }}>
            <MapView 
              style={{width: '95%', height: 180, marginTop: 10    }} 
              showsUserLocation = {true}
              initialRegion = {Region}
              minZoomLevel = {15}
              />
             <Text style={{alignSelf: 'flex-start', padding: 10, fontSize: 16, color: '#1d817e', fontWeight: 'bold' }}> <Entypo name="location-pin" size={24} color="#1d817e" /> Esmeralda Studio de Beleza</Text>
             <Text style={{alignSelf: 'flex-start', marginLeft: 40}}>Endereço completo </Text>
             <Text style={{alignSelf: 'flex-start', marginLeft: 40}}>Riacho Fundo 2 - DF </Text>
          </View>
          <View style={{ height: 50, position: 'absolute', top:700, left: 265 }}>
            <TouchableOpacity>
              <WhatsappIcon width={60} height={60}/>
            </TouchableOpacity>
          </View>
  
          <View style={{ height: 100, alignItems: 'center'}}>
            <Text></Text>
            <Text> Siga em nossas redes sociais</Text>
            <View style={{ height: 100, alignItems: 'center', flex: 1, flexDirection: 'row'}}>
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