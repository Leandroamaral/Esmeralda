import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';

import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

import {db} from '../../../firebase/config';
import styles from '../styles';
import {Notfound} from '../../FeedScreen/icons.js';

export default function ServicosEdit({route, navigation}) {
  const [image64, setImage64] = useState(Notfound);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [icone, setIcone] = useState('');
  const [parametros] = useState(route.params);

  if (parametros.itemId) {
    useEffect(() => {
      db
          .collection('Servico')
          .doc(parametros.itemId)
          .get()
          .then((snapshot) => {
            const shotdata = snapshot.data();
            setNome(shotdata.Nome);
            setIcone(shotdata.Icone);
          });
      db
          .collection('Servico')
          .doc(parametros.itemId + '/Imagem/1')
          .get()
          .then( (snapshot) => {
            const shotdata = snapshot.data();
            setDescricao(shotdata.Descricao);
            if (shotdata.Imagem) {
              setImage64(shotdata.Imagem);
            } else {
              setImage64(Notfound);
            }
          });
    }, []);
  };

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
      if (result.assets[0].width > 1080) {
        alert('Imagem deve ter largura máxima de 1080px');
      } else {
        setImage64('data:image/png;base64,' + result.assets[0].base64);
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
              Icone: icone,
            })
            .catch((e) => {
              alert(e);
            });
        db
            .collection('Servico')
            .doc(parametros.itemId + '/Imagem/1')
            .update({
              Imagem: image64,
              Descricao: descricao,
            })
            .then(() => {
              alert('Serviço Atualizado');
            })
            .catch((e) => {
              alert(e);
            });
      } else {
        const uid = uuid.v4();
        db
            .collection('Servico')
            .doc(uid)
            .set({
              Nome: nome,
              Icone: icone,
            })
            .catch(() => {
              alert(e);
            });

        db
            .collection('Servico')
            .doc(uid + '/Imagem/1')
            .set({
              Imagem: image64,
              Descricao: descricao,
            })
            .then(() => {
              alert('Serviço Incluído');
            })
            .catch((e) => {
              alert(e);
            });
      }
    } else {
      alert('Todos os campos são obrigatórios');
    }
  }

  function onDeleteServico() {
    db
        .collection('Servico')
        .doc(parametros.itemId)
        .delete()
        .then( () => {
          alert('Serviço apagado');
        })
        .catch( (e) => console.error(e))
        .finally( () => navigation.navigate('ServicosView'));
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <KeyboardAwareScrollView
            style={{flex: 1, width: '100%'}}
            keyboardShouldPersistTaps="none">

            <View style={{alignSelf: 'center', marginTop: 10}}>
              <TouchableOpacity onPress={pickImage} style={{width: 300, height: 380, backgroundColor: '#BBBBBB'}}>
                <Image
                  style={{width: 300, height: 380}}
                  source={{uri: image64}} />
              </TouchableOpacity>
              <Text style={{position: 'absolute', alignSelf: 'center', top: 60}}>Clique para carregar uma imagem</Text>
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
                setIcone(itemValue);
              }}
            >
              <Picker.Item label='Selecione um Icone' style={{color: '#AAA', fontSize: 15}} />
              <Picker.Item label="Pedicure" value="Pedicure" />
              <Picker.Item label="Cilios" value="Cilios" />
              <Picker.Item label="Maquiagem" value="Maquiagem" />
              <Picker.Item label="Tintura" value="Tintura" />
              <Picker.Item label="Manicure" value="Manicure" />
              <Picker.Item label="Hidratacao" value="Hidratacao" />
              <Picker.Item label="Corte" value="Corte" />
              <Picker.Item label="Escova" value="Escova" />
              <Picker.Item label="Botox" value="Botox" />
              <Picker.Item label="Selagem" value="Selagem" />
              <Picker.Item label="Cauterização" value="Cauterizacao" />
              <Picker.Item label="Progressiva" value="Progressiva" />
              <Picker.Item label="Cronograma" value="Cronograma" />
              <Picker.Item label="Spa" value="Spa" />
              <Picker.Item label="Esmaltacao" value="Esmaltacao" />
              <Picker.Item label="Unha1" value="Unha1" />
              <Picker.Item label="Unha2" value="Unha2" />
              <Picker.Item label="Unha3" value="Unha3" />
            </Picker>

            <View style={{alignSelf: 'center', padding: 10, flexDirection: 'row'}}>
              <TouchableOpacity onPress={onEditarServicos}>
                <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.botao}>

                  <Text style={styles.botaoTexto}>{(parametros.itemId) ? 'Salvar' : 'Adicionar Serviço'} </Text>

                </LinearGradient>
              </TouchableOpacity>
              {(parametros.itemId) ?
                  <TouchableOpacity onPress={onDeleteServico}>
                    <AntDesign name="delete" size={30} color="#92a494" style={{marginLeft: 30, marginTop: 3}}/>
                  </TouchableOpacity> :
                '' }

            </View>

          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


