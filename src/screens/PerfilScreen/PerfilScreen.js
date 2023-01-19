import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';
import * as Updates from 'expo-updates';

export default function Perfil ({ navigation }) {

  const onLogoutPress = () =>{
    firebase.auth().signOut()
    .then(() => {
      AsyncStorage.removeItem('@user')
        .catch ((error) => {
          console.error(error);
        });
      })
    .catch ((error) => {
      console.error(error);
    })
    .finally(() => {
      Updates.reloadAsync();
    })
  }

  const [userName, setUserName] = useState("");

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        setUserName(JSON.parse(name));
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!userName) {
    load();
  }

  return(
    <SafeAreaView>
        <ScrollView>
          <View style={styles.userView}>
            <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />
            <Text style={styles.userNome}>{userName.fullName}</Text>
            <Text style={styles.userEmail}>{userName.email}</Text>
            <TouchableOpacity style={styles.top40} onPress={() => navigation.navigate('Editar Perfil') }>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.botao}>
                  
                  <Text style={styles.botaoTexto}>Editar Minha Conta</Text>
              
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <TouchableOpacity onPress={() => navigation.navigate('Editar Servico') }>
              <View style={styles.menuView}>
                <AntDesign name="carryout" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Serviços</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="smileo" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Especialistas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Visualizar Usuarios')}>
              <View style={styles.menuView}>
                <AntDesign name="addusergroup" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Visualizar Usuários</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="earth" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Informações Empresariais</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Criar Campanha')}>
              <View style={styles.menuView}>
                <AntDesign name="staro" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Criar Campanhas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sairView}>
            <TouchableOpacity onPress={onLogoutPress}>
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



