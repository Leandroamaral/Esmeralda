import React, {useState, useEffect} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import uuid from 'react-native-uuid';
import {MaskedTextInput} from 'react-native-mask-text';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';

import styles from './styles';
import {db} from '../../../firebase/config';

export default function EspecialistasEditScreen({route, navigation}) {
  const [parametros] = useState(route.params);
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [imagem, setImagem] = useState('');
  const [email, setEmail] = useState('');
  const [contaGoogle, setContaGoogle] = useState('');

  if (parametros.itemId) {
    useEffect(() => {
      db
          .collection('Especialista')
          .doc(parametros.itemId)
          .get()
          .then((snapshot) => {
            const shotdata = snapshot.data();
            setNome(shotdata.Nome);
            setEmail(shotdata.Email);
            setImagem(shotdata.Imagem);
            setWhatsapp(shotdata.Whatsapp);
            setContaGoogle(shotdata.ContaGoogle);
          });
    }, []);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      if (result.assets[0].width > 480) {
        alert('Imagem deve ter largura máxima de 480px');
      } else {
        setImagem('data:image/png;base64,' + result.assets[0].base64);
      }
    }
  };

  function onEditarEspecialista() {
    if (nome && whatsapp && email && contaGoogle) {
      if (parametros.itemId) {
        db
            .collection('Especialista')
            .doc(parametros.itemId)
            .update({
              Nome: nome,
              Imagem: imagem,
              Email: email,
              Whatsapp: whatsapp,
              ContaGoogle: contaGoogle,
            })
            .then(() => {
              alert('Atualização Efetuada');
            })
            .catch(() => {
              console.error(e);
            });
      } else {
        db
            .collection('Especialista')
            .doc(uuid.v4())
            .set({
              Nome: nome,
              Imagem: imagem,
              Email: email,
              Whatsapp: whatsapp,
              ContaGoogle: contaGoogle,
            })
            .then(() => {
              alert('Especialista Incluído');
            })
            .catch(() => {
              console.error(e);
            });
      }
    } else {
      alert('Todos os campos são obrigatórios');
    }
  }


  return (
    <View style={styles.userCard2}>
      <TouchableOpacity onPress={pickImage}>
        { (imagem) ?
        <Image
          source={{uri: imagem}}
          style={{borderRadius: 50, width: 80, height: 80}}
        /> :
     <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />
        }
      </TouchableOpacity>
      <Text>Clique na imagem para trocar </Text>

      <View style={styles.userCardDescription}>
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
          placeholder='Email'
          placeholderTextColor="#aaaaaa"
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <MaskedTextInput
          style={styles.input}
          placeholder='Whatsapp'
          placeholderTextColor="#aaaaaa"
          mask="(99) 99999-9999"
          value={whatsapp}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setWhatsapp(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Conta Google'
          placeholderTextColor="#aaaaaa"
          value={contaGoogle}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => setContaGoogle(text)}
        />
        <View style={{alignSelf: 'center', padding: 10, flexDirection: 'row'}}>
          <TouchableOpacity onPress={onEditarEspecialista}>
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
