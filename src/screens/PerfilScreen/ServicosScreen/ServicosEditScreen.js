import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase, db } from '../../../firebase/config';
import { LinearGradient } from 'expo-linear-gradient'
import styles from '../styles';
import { AntDesign } from '@expo/vector-icons';


export default function ServicosEdit ({ route, navigation }) {

  const [imageUri, setImageUri] = useState('../../../assets/notfound.png');
  const [image64, setImage64] = useState('');
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [icone, setIcone] = useState('');
  const [parametros, setParametros] = useState(route.params);
 
  if (parametros.itemId) {
    useEffect(() => {
      db
      .collection('Servico')
      .doc(parametros.itemId)
      .get()
      .then(snapshot => {
        const shotdata = snapshot.data()
        setNome(shotdata.Nome)
        setDescricao(shotdata.Descricao)
        setIcone(shotdata.Icone)
        setImage64(shotdata.Imagem)
        if (shotdata.Imagem) {
          setImageUri(shotdata.Imagem) 
        } else {
          setImageUri('../../../assets/notfound.png')
        }
        
        })
      
    }, []);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 4],
      quality: 1,
      base64: true
    });
    if (!result.canceled) {
      if (result.assets[0].width > 1080) {
        alert('Imagem deve ter largura máxima de 1080px')
      } else {
        setImage64('data:image/png;base64,' + result.assets[0].base64);
        setImageUri(result.assets[0].uri);
      }

    }
  };
  
  function onEditarServicos() {

    if (nome && image64 && descricao && icone ) {
      if (parametros.itemId) {
        db
        .collection('Servico')
        .doc(parametros.itemId)
        .update({
          Nome: nome,
          Imagem: image64,
          Descricao: descricao,
          Icone: icone
        })
        .then(() => {
          alert('Atualização Efetuada');
        })
        .catch(() => {
          console.error(e);
        })
      } else {
        db
        .collection('Servico')
        .doc(uuid.v4())
        .set({
          Nome: nome,
          Imagem: image64,
          Descricao: descricao,
          Icone: icone
        })
        .then(() => {
          alert('Servico Incluído');
        })
        .catch(() => {
          console.error(e);
        })
      }
    } else {
      alert ('Todos os campos são obrigatórios');
    }
  }

  function onDeleteServico () {
    db 
      .collection('Servico')
      .doc(parametros.itemId)
      .delete()
      .then( () => {          
        alert('Campanha apagada')})
      .catch( (e) => console.error(e))
      .finally ( () => navigation.navigate('ServicosView'))
    
  }

  




  return(
    <SafeAreaView>
        <ScrollView>
          <View>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="none">
              
              <View style={{alignSelf:'center', marginTop: 10}}>
                <TouchableOpacity onPress={pickImage}   style={{ width: 300, height:380, backgroundColor:'#BBBBBB' }}>
                  <Image 
                    style={{width: 300, height:380}}
                    source={{uri: imageUri}} />
                </TouchableOpacity>
                <Text style={{position:'absolute', alignSelf:'center', top: 60}}>Clique para carregar uma imagem</Text>
              </View>
              
              <TextInput
                style={styles.input}
                placeholder='Nome'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setNome(text)}
                value={nome}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              
              <TextInput
                style={styles.inputbig}
                placeholder='Descricao'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDescricao(text)}
                value={descricao}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                multiline
                
              />
              <Picker 
                style={styles.input} 
                selectedValue={icone}
                onValueChange={(itemValue, itemIndex) => {
                  setIcone(itemValue)
                }}
              >
                <Picker.Item label='Selecione um Icone' style={{color: "#AAA", fontSize: 15}} />
                <Picker.Item label="Pedicure" value="Pedicure" />
                <Picker.Item label="Cilios" value="Cilios" />
                <Picker.Item label="Alisamento" value="Alisamento" />
                <Picker.Item label="Maquiagem" value="Maquiagem" />
                <Picker.Item label="Tintura" value="Tintura" />
                <Picker.Item label="Manicure" value="Manicure" />
                <Picker.Item label="Hidratacao" value="Hidratacao" />
                <Picker.Item label="Corte" value="Corte" />
              </Picker>

              <View style={{alignSelf:'center', padding: 10, flexDirection: 'row',}}>
                <TouchableOpacity onPress={onEditarServicos}>
                  <LinearGradient
                      // Button Linear Gradient
                      colors={['#1d817e', '#2fa192', '#50c8cc']}
                      start={[0, 0]}
                      end={[1, 1]}
                      location={[0.25, 0.4, 1]}
                      style={styles.botao}>
                      
                      <Text style={styles.botaoTexto}>{(parametros.itemId) ?  'Salvar' : 'Adicionar Serviço'} </Text>
                  
                  </LinearGradient>
                </TouchableOpacity>
                {(parametros.itemId) ? 
                  <TouchableOpacity onPress={onDeleteServico}>
                    <AntDesign name="delete" size={30} color="#92a494" style={{marginLeft: 30, marginTop: 3}}/> 
                  </TouchableOpacity>
                : '' }
    
              </View>

            </KeyboardAwareScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
 
}



