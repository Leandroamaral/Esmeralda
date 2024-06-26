import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from '@expo/vector-icons';

import styles from './styles';
import {db} from '../../../firebase/config';
import {Notfound} from '../../FeedScreen/icons.js';

export default function EditarCampanha() {
  const [nomeCampanha, setNomeCampanha] = useState('');
  const [indice, setIndice] = useState('');
  const [image64, setImage64] = useState(Notfound);
  const [tempKey, setTempKey] = useState(0);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 2.5],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      if (result.assets[0].width > 1080) {
        alert('Imagem deve ter largura máxima de 740px');
      } else {
        setImage64('data:image/png;base64,' + result.assets[0].base64);
      }
    }
  };


  function onAddCampanha() {
    if ( !nomeCampanha || !image64 ) {
      alert('Necessário o nome da campanha e uma imagem');
    } else {
      db
          .collection('Campanha')
          .doc(uuid.v4())
          .set({
            nomeCampanha: nomeCampanha,
            image: image64,
            star: false,
            indice: indice,
          })
          .then(() => {
            alert('Campanha Adicionada com Sucesso');
            setTempKey(tempKey+1);
            setNomeCampanha('');
            setImage64(Notfound);
          })
          .catch((e) => {
            console.error(e);
          });
    }
  }

  function deleteCampanha(id) {
    setTempKey(tempKey+1);
    db
        .collection('Campanha')
        .doc(id)
        .delete()
        .then( () => {
          setTempKey(tempKey+1);
          alert('Campanha apagada');
        })
        .catch( (e) => console.error(e));
  }

  function putStar(id, estado) {
    setTempKey(tempKey+1);
    db
        .collection('Campanha')
        .doc(id)
        .update({
          star: !estado,
        })
        .then(() => {
          setTempKey(tempKey+1);
          alert('Star atualizado');
        })
        .catch((e) => console.error(e));
  }

  function changeOrdem(id, valor) {
    setTempKey(tempKey+1);
    db
        .collection('Campanha')
        .doc(id)
        .update( {
          indice: valor,
        })
        .then( () => {
          setTempKey(tempKey+1);
          alert('Indice Atualizado');
        })
        .catch( (e) => {
          console.error(e);
        });
  }

  const [shotdata, setshotdata] = useState([]);

  useEffect(() => {
    loadCampanha();
  }, []);


  function loadCampanha() {
    db
        .collection('Campanha')
        .get()
        .then((snapshot) => {
          const dados = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          dados.sort((a, b) => {
            return (a.indice > b.indice) ? 1 : -1;
          });
          setshotdata(dados);
        });
  }


  function NovaCampanha() {
    return (
      <ScrollView
        horizontal={true}
        style={{backgroundColor: '#FFF'}}
      >
        {shotdata.map( (a, index) => {
          return (
            <View style={styles.viewcampanha} key={index}>
              <Text style={{height: 40, padding: 5, fontSize: 16}}>{a.nomeCampanha}</Text>
              <Image
                style={styles.imagemCampanha}
                source={{uri: a.image}}
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Picker style={{width: 90, borderStyle: 'solid'}}
                  mode="dropdown"
                  selectedValue={a.indice.toString()}
                  onValueChange={(itemValue, itemIndex) => {
                    changeOrdem(a.id, itemValue);
                  }}
                >
                  <Picker.Item label='1' value='1' />
                  <Picker.Item label='2' value='2' />
                  <Picker.Item label='3' value='3' />
                  <Picker.Item label='4' value='4' />
                  <Picker.Item label='5' value='5' />
                  <Picker.Item label='6' value='6' />
                  <Picker.Item label='7' value='7' />
                  <Picker.Item label='8' value='8' />
                  <Picker.Item label='9' value='9' />
                  <Picker.Item label='10' value='10' />
                </Picker>
                <AntDesign name={ (a.star) ? 'star' : 'staro'} size={25} color="#1d817e" style={styles.padding10} onPress={() => {
                  putStar(a.id, a.star);
                }} key={tempKey.toString()}/>
                <AntDesign name="delete" size={25} color="#1d817e" style={styles.padding10} onPress={() => deleteCampanha(a.id) } />
              </View>
            </View>

          );
        })}
      </ScrollView>

    );
  }

  return (
    <SafeAreaView>

      <ScrollView>

        <NovaCampanha/>

        <View style={styles.subTituloView}>
          <Text style={styles.subTituloTexto}>Criar nova Campanha</Text>
        </View>

        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder='Nome da Campanha'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setNomeCampanha(text)}
            value={nomeCampanha}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Picker style={{width: 90, height: 0, top: 10, borderStyle: 'solid', backgroundColor: '#fff'}}
            mode="dropdown"
            onValueChange={(valor) => setIndice(valor) }
            selectedValue={indice.toString()}
          >
            <Picker.Item label='1' value='1' />
            <Picker.Item label='2' value='2' />
            <Picker.Item label='3' value='3' />
            <Picker.Item label='4' value='4' />
            <Picker.Item label='5' value='5' />
            <Picker.Item label='6' value='6' />
            <Picker.Item label='7' value='7' />
            <Picker.Item label='8' value='8' />
            <Picker.Item label='9' value='9' />
            <Picker.Item label='10' value='10' />
          </Picker>
        </View>
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={pickImage} style={{width: 300, height: 150, backgroundColor: '#BBBBBB'}}>
            <Image
              style={{width: 300, height: 150}}
              source={{uri: image64}} />
          </TouchableOpacity>
          <Text style={{position: 'absolute', alignSelf: 'center', top: 60}}>Clique para carregar uma imagem</Text>
        </View>
        <View style={{alignSelf: 'center', padding: 10}}>

          <TouchableOpacity onPress={onAddCampanha}>
            <LinearGradient
              // Button Linear Gradient
              colors={['#1d817e', '#2fa192', '#50c8cc']}
              start={[0, 0]}
              end={[1, 1]}
              location={[0.25, 0.4, 1]}
              style={styles.botao}>

              <Text style={styles.botaoTexto}>Adicionar Campanha </Text>

            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
