import React, {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView, ScrollView, Dimensions} from 'react-native';

import {db} from '../../firebase/config';
import {Notfound} from './icons';

export default function DetailServico({route, navigation}) {
  const [image64, setImage64] = useState(Notfound);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const largura = Dimensions.get('window').width - 25;
  const parametros = route.params;

  if (parametros.itemId) {
    useEffect(() => {
      db
          .collection('Servico')
          .doc(parametros.itemId)
          .get()
          .then((snapshot) => {
            const shotdata = snapshot.data();
            setNome(shotdata.Nome);
          });

      db
          .collection('Servico')
          .doc(parametros.itemId + '/Imagem/1')
          .get()
          .then((snapshot) => {
            const shotdata = snapshot.data();
            setDescricao(shotdata.Descricao);
            if (shotdata.Imagem) {
              setImage64(shotdata.Imagem);
            } else {
              setImage64(Notfound);
            }
          });
    }, []);
  }

  return (

    <SafeAreaView>
      <ScrollView >
        <View>
          <View style={{height: largura, backgroundColor: '#FFF'}}>
            <Image
              style={{height: largura}}
              source={{uri: image64}}
              resizeMode='stretch'/>
          </View>


          <View style={{backgroundColor: '#fff', minHeight: 250, alignContent: 'center', padding: 20}}>
            <Text style={{fontSize: 30, alignSelf: 'center', color: '#92a494', fontFamily: 'sans-serif-light', padding: 10}}>{nome}</Text>
            <Text style={{fontSize: 15, fontFamily: 'sans-serif-condensed', color: '#5c635d'}}>{descricao}</Text>

          </View>


        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
