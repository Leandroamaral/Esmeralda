import React, { useState, useEffect, useRef } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import { db } from '../../../firebase/config';


//Tela principal
export default function EspecialistasViewScreen ({ navigation }) {

  

  const [users,setUsers] = useState([]);
  const [tempKey, setTempKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();

    const PersonCard = ({dados, navigation}) => {

    return (
      <View style={styles.userCard}>
        { (dados.Imagem) ? 
        <Image
          source={{uri: dados.Imagem }}
          style={{borderRadius:50, width: 60, height:60}}
        />
       :
       <AntDesign name="user" size={60} color="#92a494" style={styles.padding10} />
       }
          <View style={styles.userCardDescription}>
          <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{dados.Nome}</Text>
          <Text style={{ marginLeft: 10}}>{dados.Email}</Text>
          <Text style={{ marginLeft: 10}}>{dados.Whatsapp}</Text>
          <View style={styles.userActions}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('EditarEspecialista', {itemId: dados.id})}
            >
              <AntDesign name="form" size={26} color='#1d817e'style={styles.padding10}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('Timetable', {itemId: dados.id})}
            >
              <AntDesign name="clockcircleo" size={26} color='#1d817e' style={styles.padding10}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('EspecialistaServicos', {itemId: dados.id})}
            >
              <AntDesign name="solution1" size={26} color='#1d817e' style={styles.padding10}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onDeleteEspecialista(dados.id,navigation)}
            >
              <AntDesign name="delete" size={26} color='#1d817e' style={styles.padding10}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => onLoginGoogle()}
            >
              <AntDesign name="login" size={26} color='#1d817e' style={styles.padding10}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>  
      )
  };

  function onDeleteEspecialista (itemId,navigation) {
    db 
      .collection('Especialista')
      .doc(itemId)
      .delete()
      .then( () => {          
        alert('Especialista apagado');
        setTempKey(tempKey+1);
      })
      .catch( (e) => console.error(e))
  }

  useEffect(() => {
    loadEspecialista();
  }, []);

  const loadEspecialista = async () => {
    db.collection('Especialista')
    .get()
    .then(snapshot => {
      setUsers(snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        return {id,...data};
      }));
    });
  }
  
  return(
    <SafeAreaView>
      {refreshing ? <ActivityIndicator /> : null}
      <ScrollView
      horizontal={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadEspecialista} />}
      ref={scrollViewRef}>
        <View key={tempKey.toString}>
        {users.map((item,key)=>(
            <PersonCard 
              key={key}
              navigation={navigation}
              dados={item}

            />
        ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditarEspecialista', {itemId: null})}>
          <View style={styles.menuView}>
            <Text style={styles.sairTexto}>Adicionar Novo Especialista</Text>
            <AntDesign name="rightcircleo" size={22} color="#1d817e" style={{padding:10}} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
 
}



