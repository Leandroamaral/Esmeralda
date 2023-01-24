import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView,Image,TextInput , TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import { auth,db } from '../../../firebase/config';



function onDeleteEspecialista (itemId,navigation) {
  db 
    .collection('Especialista')
    .doc(itemId)
    .delete()
    .then( () => {          
      alert('Especialista apagado')})
    .catch( (e) => console.error(e))
}

//Componente para um card de pessoa
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
            onPress={() => navigation.navigate('EditarEspecialista', {itemId: dados.id})}
          >
            <AntDesign name="clockcircleo" size={26} color='#1d817e' style={styles.padding10}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditarEspecialista', {itemId: dados.id})}
          >
            <AntDesign name="solution1" size={26} color='#1d817e' style={styles.padding10}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => onDeleteEspecialista(dados.id,navigation)}
          >
            <AntDesign name="delete" size={26} color='#1d817e' style={styles.padding10}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>  
    )
};
//Tela principal
export default function EspecialistasViewScreen ({ navigation }) {


  const [users,setUsers] = useState([]);

 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      db.collection('Especialista')
      .get()
      .then(snapshot => {
        setUsers(snapshot.docs.map(doc =>{
          const data = doc.data();
          const id = doc.id;
          return {id,...data};
        }));
      });
    });
    return unsubscribe;
  }, [navigation]);


  
  return(
    <SafeAreaView>
      <ScrollView>
        {users.map((item,key)=>(
            <PersonCard 
              key={key}
              navigation={navigation}
              dados={item}

            />
        ))}
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



