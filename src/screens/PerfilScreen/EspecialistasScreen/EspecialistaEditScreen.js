import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView,Image,TextInput , TouchableOpacity  } from 'react-native';
import uuid from 'react-native-uuid';

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import { auth,db } from '../../../firebase/config';

export default function EspecialistasEditScreen ({ route, navigation }) {

    const [parametros, setParametros] = useState(route.params);
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
            .then(snapshot => {
                const shotdata = snapshot.data();
                setNome(shotdata.Nome);
                setEmail(shotdata.Email);
                setImagem(shotdata.Imagem);
                setWhatsapp(shotdata.Whatsapp);
                setContaGoogle(shotdata.ContaGoogle);
            })
        }, []);
    }

    function onEditarEspecialista() {
        if (nome && whatsapp && email && contaGoogle) {
            if(parametros.itemId) {
                db
                .collection('Especialista')
                .doc(parametros.itemId)
                .update({
                  Nome: nome,
                  Imagem: imagem,
                  Email: email,
                  Whatsapp: whatsapp,
                  ContaGoogle: contaGoogle
                })
                .then(() => {
                  alert('Atualização Efetuada');
                })
                .catch(() => {
                  console.error(e);
                })
            } else {
                db
                .collection('Especialista')
                .doc(uuid.v4())
                .set({
                    Nome: nome,
                    Imagem: imagem,
                    Email: email,
                    Whatsapp: whatsapp,
                    ContaGoogle: contaGoogle
                })
                .then(() => {
                  alert('Especialista Incluído');
                })
                .catch(() => {
                  console.error(e);
                })
            }
        } else {
            alert ('Todos os campos são obrigatórios');
        }
    }
    

    return (
    <View style={styles.userCard2}>
     { (imagem) ? 
      <Image
        source={{uri: imagem}}
        style={{borderRadius:50, width: 80, height:80}}
      />
     :
     <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />
     }
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
        <TextInput
            style={styles.input}
            placeholder='Whatsapp'
            placeholderTextColor="#aaaaaa"
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
         <View style={{alignSelf:'center', padding: 10, flexDirection: 'row',}}>
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

    )
}