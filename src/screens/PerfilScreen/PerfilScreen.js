import React, {useState, useRef} from 'react';
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {LinearGradient} from 'expo-linear-gradient';
import * as Updates from 'expo-updates';
import {AntDesign} from '@expo/vector-icons';

import {firebase, db} from '../../firebase/config';
import styles from './styles';


export default function Perfil({navigation}) {
  const [refreshing] = useState(false);
  const scrollViewRef = useRef();
  const [userName, setUserName] = useState('');

  const onLogoutPress = () =>{
    firebase.auth().signOut()
        .then(() => {
          AsyncStorage.removeItem('@user')
              .catch((error) => {
                console.error(error);
              });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          Updates.reloadAsync();
        });
  };

  const load = async () => {
    try {
      const aStorage = await AsyncStorage.getItem('@user');
      if (aStorage !== null) {
        db
            .collection('users')
            .doc(JSON.parse(aStorage).id)
            .get()
            .then((snapshot) => {
              setUserName(snapshot.data());
            })
            .catch((e) => {
              console.error(e);
            });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!userName) {
    load();
  }

  return (
    <SafeAreaView>
      {refreshing ? <ActivityIndicator /> : null}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        ref={scrollViewRef}
      >
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
        {(userName.administrator == 2 || userName.administrator == 1 ) ?
        <View style={styles.userView}>
          {(userName.administrator == 2 || userName.administrator == 1 ) ?
            <TouchableOpacity onPress={() => navigation.navigate('EspecialistasMain')}>
              <View style={styles.menuView}>
                <AntDesign name="smileo" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Especialistas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity> : null }
          {( userName.administrator == 1 ) ?
            <>
              <TouchableOpacity onPress={() => navigation.navigate('ServicoView')}>
                <View style={styles.menuView}>
                  <AntDesign name="carryout" size={26} color="#92a494" style={styles.padding10} />
                  <Text style={styles.menuTexto}>Editar Serviços</Text>
                  <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Visualizar Usuarios')}>
                <View style={styles.menuView}>
                  <AntDesign name="addusergroup" size={26} color="#92a494" style={styles.padding10} />
                  <Text style={styles.menuTexto}>Visualizar Usuários</Text>
                  <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
                </View>
              </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('InfEmpresa')}>
                <View style={styles.menuView}>
                  <AntDesign name="earth" size={26} color="#92a494" style={styles.padding10} />
                  <Text style={styles.menuTexto}>Editar Informações Empresariais</Text>
                  <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
                </View>
              </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('Criar Campanha')}>
                <View style={styles.menuView}>
                  <AntDesign name="staro" size={26} color="#92a494" style={styles.padding10} />
                  <Text style={styles.menuTexto}>Criar Campanhas</Text>
                  <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
                </View>
              </TouchableOpacity>
            </> : null }
        </View> : null }
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
  );
}


