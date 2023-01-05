import React, {useState} from 'react'
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { getStorage, ref,  } from "firebase/storage";
import * as FileSystem from 'expo-file-system';


export default function EditarCampanha(){

    const [nomeCampanha, setNomeCampanha] = useState("");
    const [image, setImage] = useState(null);
    const [imageenc, setImageenc] = useState('');
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 2.5],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        
      }
    };

    function onAddCampanha() {
      const imagemStr = async () => {
        let base64 = await FileSystem.readAsStringAsync(image, {encoding: 'base64'})
        setImageenc('data:image/png;base64,' + base64);
        //console.log(base64);
      }
      imagemStr();
      /*const storage = getStorage();
      const reference = ref(storage, 'teste.jpg');
      console.log(image);
      (reference, image)
        .then((snapshot) => {
          console.log('aqui');
        }) 
      firebase
          .storage()
          .ref(nomeCampanha)
          .putFile(image)
          .then(() => console.log('ok'))
          .catch((e) => {
            console.error(e);
          });*/
    }
  
  
    return (
      <SafeAreaView>
      <ScrollView>
        <ScrollView 
          horizontal={true} 
          style={{backgroundColor: '#FFF'}}
        >
            <View style={styles.viewcampanha}>
              <Text style={{height: 40, padding: 5, fontSize: 16 }}>Campanha de Lançamento</Text>
              <Image
                style={styles.imagemCampanha}
                source={{uri: imageenc }}
              />
              <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                <AntDesign name="star" size={25} color="#1d817e" style={styles.padding10} />
                <AntDesign name="delete" size={25} color="#1d817e" style={styles.padding10} />
              </View>
            </View>
            <View style={styles.viewcampanha}>
              <Text style={{height: 40, padding: 5, fontSize: 16 }}>Cílios mais 10</Text>
              <Image
                style={styles.imagemCampanha}
                source={require('../../../assets/img2.png')}
              />
              <View style={{flexDirection: 'row', alignSelf:'flex-end'}}>
                <AntDesign name="star" size={25} color="#1d817e" style={styles.padding10} />
                <AntDesign name="delete" size={25} color="#1d817e" style={styles.padding10} />
              </View>
            </View>
          </ScrollView>
        
        <View style={styles.subTituloView}>
          <Text style={styles.subTituloTexto}>Criar nova Campanha</Text>
        </View>
        
        <View>
          <TextInput
            style={styles.input}
            placeholder='Nome da Campanha'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setNomeCampanha(text)}
            value={nomeCampanha}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </View>
        <View  style={{alignSelf:'center'}}>
          <TouchableOpacity onPress={pickImage}   style={{ width: 300, height:150, backgroundColor:'#BBBBBB', padding: 10 }}>
                <Image source={{ uri: image }} />
          </TouchableOpacity>
          <Text style={{position:'absolute', alignSelf:'center', top: 60}}>Clique para carregar uma imagem</Text>
        </View>
        <View style={{alignSelf:'center', padding: 10}}>
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
    )
  }