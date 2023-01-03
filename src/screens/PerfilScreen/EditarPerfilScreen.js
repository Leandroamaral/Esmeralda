import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase, db } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";
import styles from './styles';
import { getAuth, deleteUser } from "firebase/auth";
import * as Updates from 'expo-updates';

export default function EditarPerfil({ navigation }) {

    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const [oldpass, setOldPass] = useState('');
    const [id, setID] = useState();
    const [visibleDL, setvisibleDL] = useState(false);
    const [visibleDL2, setvisibleDL2] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
  
    const load = async () => {
      try {
        const name = await AsyncStorage.getItem('@user')
        if (name !== null) {
          setUserName(JSON.parse(name));
          const parser = JSON.parse(name);
          setFullName(parser.fullName);
          setTelefone(parser.telefone);
          setEmail(parser.email);
          setID(parser.id);
        }
      } catch (e) {
        console.error(e)
      }
    }
    
    if (!userName) {
      load();
    }
  
    function onChangeUserData() {
      db
      .collection('users')
      .doc(id)
      .update({
        fullName: fullName,
        telefone: telefone
      })
      .then(() => {
        setTitulo('Editar Perfil');
        setMensagem('Perfil atualizado com sucesso');
        setvisibleDL(true);
        setIsDisabled(true);
      })
      .catch(error => {
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
        .catch(error => {
          setTitulo('Error: ');
          setMensagem(error);
          console.error(error);
        });
    };
  
    function onDeleteUser() {
      setTitulo('Excluir Minha Conta');
      setMensagem('Digite sua senha para excluir permanentemente sua conta')
      setvisibleDL2(true);
    }
  
    function OKDeleteUser() {
      console.log('aqui' + oldpass);
      const auth = getAuth();
      const user = auth.currentUser;
      const emailCred  = firebase.auth.EmailAuthProvider.credential(email, oldpass);
      firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
      .then (() => {
        db.collection('users').doc(id).delete()
        deleteUser(user)
        AsyncStorage.removeItem('@user')
        setvisibleDL2(false)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        Updates.reloadAsync();
      })
  
    }
  
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
  
      <Dialog.Container visible={visibleDL2}>
        <Dialog.Title>{titulo}</Dialog.Title>
        <Dialog.Description>{mensagem}</Dialog.Description>
        <Dialog.Input onChangeText={(texto) => setOldPass(texto)}/>
        <Dialog.Button label="Cancelar" onPress={() => setvisibleDL2(false) }/>
        <Dialog.Button label="Confirmar" onPress={OKDeleteUser}/>
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
                autoCapitalize="none"
            />
              <TextInput
                style={styles.input}
                placeholder={telefone}
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => {
                    setTelefone(text);
                    setIsDisabled(false);
                }}
                value={telefone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
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
            <TouchableOpacity onPress={onDeleteUser}>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#BBB', '#DDD', '#EEE']}
                    start={[0, 0]}
                    end={[1, 1]}
                    location={[0.25, 0.4, 1]}
                    style={styles.button}>
                    <Text style={styles.buttonTitleEx}>Excluir Minha Conta</Text>
                </LinearGradient>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }