import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import {AntDesign} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import styles from './styles';
import {db} from '../../../firebase/config';

export default function UserEditScreen({route, navigation}) {
  const [parametros] = useState(route.params);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  // const [imagem, setImagem] = useState('');
  const [administrator, setAdministrator] = useState(false);
  const [contaGoogle, setContaGoogle] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    db
        .collection('users')
        .doc(parametros.itemId)
        .get()
        .then((snapshot) => {
          const shotdata = snapshot.data();
          setNome(shotdata.fullName);
          // setImagem(shotdata.Imagem);
          setWhatsapp(shotdata.telefone);
          setEmail(shotdata.email);
          if (typeof(shotdata.administrator) != 'undefined') {
            setAdministrator(shotdata.administrator);
          }
          if (typeof(shotdata.ContaGoogle) != 'undefined') {
            setContaGoogle(shotdata.ContaGoogle);
          };
        });
  }, []);

  function onSaveEditUser() {
    if (nome && whatsapp) {
      db
          .collection('users')
          .doc(parametros.itemId)
          .update({
            fullName: nome,
            telefone: whatsapp,
            administrator: administrator,
            ContaGoogle: contaGoogle,
          })
          .then(() => {
            alert('Atualização Efetuada');
          })
          .catch(() => {
            console.error(e);
          });
    } else {
      alert('Todos os campos são obrigatórios');
    }
  }


  return (
    <View style={styles.userCard2}>

      <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />

      <View style={styles.userCardDescription}>
        <Text style={{alignSelf: 'center', margin: 10, fontSize: 18, fontWeight: 'bold'}}>{email}</Text>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          placeholderTextColor="#aaaaaa"
          value={nome}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Whatsapp'
          placeholderTextColor="#aaaaaa"
          value={whatsapp}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setWhatsapp(text)}
        />
        <View style={styles.check}>
          <Checkbox
            style={{alignSelf: 'center'}}
            value={administrator}
            onValueChange={setAdministrator}
          />
          <Text style={{padding: 10, alignSelf: 'center'}}>Administrador</Text>
        </View>
        {(administrator) ?
        <TextInput
          style={styles.input}
          placeholder='Conta Google'
          placeholderTextColor="#aaaaaa"
          value={contaGoogle}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setContaGoogle(text)}
        /> :
        null }
        <View style={{alignSelf: 'center', padding: 10, flexDirection: 'row'}}>
          <TouchableOpacity onPress={onSaveEditUser}>
            <LinearGradient
              // Button Linear Gradient
              colors={['#1d817e', '#2fa192', '#50c8cc']}
              start={[0, 0]}
              end={[1, 1]}
              location={[0.25, 0.4, 1]}
              style={styles.botao}>

              <Text style={styles.botaoTexto}>Salvar</Text>

            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}
