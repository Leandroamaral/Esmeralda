import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';
import * as Updates from 'expo-updates';


export default function EditarServico ({ navigation }) {

  const [imageUri, setImageUri] = useState('../../../assets/notfound.png');
  const [image64, setImage64] = useState('../../../assets/notfound.png');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 2.5],
      quality: 1,
      base64: true
    });
    if (!result.canceled) {
      console.log (result.assets[0].width)
      if (result.assets[0].width > 1080) {
        alert('Imagem deve ter largura máxima de 1080px')
      } else {
        setImage64('data:image/png;base64,' + result.assets[0].base64);
        setImageUri(result.assets[0].uri);
      }

    }
  };
  
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

    return(
    <SafeAreaView>
        <ScrollView>
          <View>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="none">
              
              <View style={{alignSelf:'center', marginTop: 10}}>
                <TouchableOpacity onPress={pickImage}   style={{ width: 300, height:150, backgroundColor:'#BBBBBB' }}>
                  <Image 
                    style={{width: 300, height:150}}
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
              />


            </KeyboardAwareScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
 
}



