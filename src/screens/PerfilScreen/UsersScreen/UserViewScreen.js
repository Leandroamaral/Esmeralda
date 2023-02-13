import React, { useState, useEffect, useRef } from 'react'
import { Text, View, SafeAreaView, ScrollView,Image,TextInput , TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import styles from './styles';
import { auth,db, firebase } from '../../../firebase/config';
import { AntDesign } from '@expo/vector-icons';



//Tela principal
export default function UsuariosViewScreen ({ navigation }) {
  const [page, setPage] = useState(1);
  const [users,setUsers] = useState([]);
  const [allUsers, setAllusers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    loadUser();   
  }, []);

  const loadUser = async () => {
    db.collection('users')
    .get()
    .then(snapshot => {
      const users = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        return {id,...data};
      });
      setUsers(users);
      setAllusers(users);
    });
  }
 
  function filterUser(text) {
    if (text) {
      setUsers(users.filter((itemf) => (itemf.fullName.includes(text))))
    } else {
      setUsers(allUsers);
    }
    
  }
  
  //Componente para um card de pessoa
  const PersonCard = ({id,picture,name,email,whatsapp,navigation}) => {
    return (
      <View style={styles.userCard}>
        {(picture) ? 
        <Image
          source={{ uri: picture }}
          style={{borderRadius:50, width: 50, height:50}}
        />
        : <AntDesign name="user" size={50} color="#92a494" style={styles.padding10} />
        }
        <View style={styles.userCardDescription}>
          <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{name}</Text>
          <Text style={{ marginLeft: 10}}>{email}</Text>
          <Text style={{ marginLeft: 10}}>{whatsapp}</Text>
          <View style={styles.userActions}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate('EditarUsuario', {itemId: id})}
            >
              <AntDesign name="form" size={26} color='#1d817e'style={styles.padding10}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>  
      )
  };

  return(
    <SafeAreaView>
      {refreshing ? <ActivityIndicator /> : null}
      <ScrollView
      horizontal={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadUser} />}
      ref={scrollViewRef}>
        <Text style={{fontSize:18,marginLeft:20,marginTop:10,paddingHorizontal:10}}>Pesquisar:</Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder='Nome'
            onChangeText={(text) => filterUser(text)}
          ></TextInput>
        </View>
        {users.map((item,key)=>(
            <PersonCard 
              key={key}
              id={item.id}
              name={item.fullName}
              navigation={navigation}
              email={item.email}
              whatsapp={item.telefone}

            />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
 
}



