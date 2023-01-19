import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';
import { Corte, Hidratacao, Manicure, Tintura, Maquiagem, Alisamento, Cilios, Pedicure, WhatsappIcon } from '../FeedScreen/icons';


export default function EditarServicoView ({ navigation }) {



    return(
    <SafeAreaView>
        <ScrollView>
        <View style={styles.servicos}>
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>
        </View>
        <View style={styles.servicos}>
          <View style={styles.botaoServico}>
            <TouchableOpacity style={styles.iconeServico}>
              <Corte width={45} height={45} fill="#92a494" />
            </TouchableOpacity>
            <Text style={styles.textoServico}>Corte</Text>
          </View>
        </View>

          <View style={styles.sairView}>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="logout" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.sairTexto}>Sair</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
 
}



