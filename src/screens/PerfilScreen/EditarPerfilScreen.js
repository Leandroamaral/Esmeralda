import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {MaskedTextInput} from 'react-native-mask-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AntDesign} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

import {firebase, db} from '../../firebase/config';
import styles from './styles';

export default function EditarPerfil({navigation}) {
  const [fullName, setFullName] = useState();
  const [telefone, setTelefone] = useState();
  const [dtnascimento, setDtNascimento] = useState();
  const [email, setEmail] = useState();
  const [id, setID] = useState();
  const [visibleDL, setvisibleDL] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user');
      if (name !== null) {
        const parser = JSON.parse(name);
        db
            .collection('users')
            .doc(parser.id)
            .get()
            .then((snapshot) => {
              const shotdata = snapshot.data();
              setFullName(shotdata.fullName);
              setTelefone(shotdata.telefone);
              setDtNascimento(shotdata.dtnascimento);
              setEmail(shotdata.email);
              setID(parser.id);
            });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!email) {
      load();
    }
  }, []);

  function onChangeUserData() {
    db
        .collection('users')
        .doc(id)
        .update({
          fullName: fullName,
          telefone: telefone,
          dtnascimento: dtnascimento,
        })
        .then(() => {
          setTitulo('Editar Perfil');
          setMensagem('Perfil atualizado com sucesso');
          setvisibleDL(true);
          setIsDisabled(true);
        })
        .catch((error) => {
          setTitulo('Error: ');
          setMensagem(error);
          setvisibleDL(true);
          setIsDisabled(false);
          console.error(error);
        });
  };


  function onChangePassword() {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          setTitulo('Alterar a senha');
          setMensagem('Um link para troca de senha foi encaminhada para o email ' + email);
          setvisibleDL(true);
        })
        .catch((error) => {
          alert(error);
          console.error(error);
        });
  };

  function OKDL() {
    setvisibleDL(false);
  };


  return (
    <View>

      <Dialog.Container visible={visibleDL}>
        <Dialog.Title>{titulo}</Dialog.Title>
        <Dialog.Description>{mensagem}</Dialog.Description>
        <Dialog.Button label="OK" onPress={OKDL}/>
      </Dialog.Container>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always">
        <AntDesign name="user" size={80} color="#92a494" style={{alignSelf: 'center', padding: 20}} />
        <TextInput
          style={styles.input}
          placeholder={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setIsDisabled(false);
          }}
          value={fullName}
          underlineColorAndroid="transparent"
        />
        <MaskedTextInput
          style={styles.input}
          placeholder={telefone}
          placeholderTextColor="#aaaaaa"
          mask="(99) 99999-9999"
          onChangeText={(text) => {
            setTelefone(text);
            setIsDisabled(false);
          }}
          value={telefone}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
        <MaskedTextInput
          style={styles.input}
          placeholder={dtnascimento}
          placeholderTextColor="#aaaaaa"
          mask="99/99/9999"
          onChangeText={(text) => {
            setDtNascimento(text);
            setIsDisabled(false);
          }}
          value={dtnascimento}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
        <TouchableOpacity
          disabled={isDisabled}
          onPress={onChangeUserData}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#1d817e', '#2fa192', '#50c8cc']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={styles.button}>
            <Text style={styles.buttonTitle}>Alterar</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangePassword}>
          <LinearGradient
            // Button Linear Gradient
            colors={['#005582', '#0086ad', '#00c2c7']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={styles.button}>
            <Text style={styles.buttonTitle}>Alterar Senha</Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
