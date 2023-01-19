import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { Icones } from '../FeedScreen/icons';


export default function EditarServicoView ({ navigation }) {

  return(
    <SafeAreaView>
      <ScrollView style={{width:'100%'}}>
        <View style={styles.userCard}>
          <Text>Juliano Alvares Barbosa</Text>
          <Text>julianoalvares@gmail.com</Text>
          </View>
        <View style={styles.userCard} >
          <Text>Juliano Alvares Barbosa</Text>
          <Text>julianoalvares@gmail.com</Text>
          </View>
        <View style={styles.userCard}>
          <Text>Juliano Alvares Barbosa</Text>
          <Text>julianoalvares@gmail.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
 
}



