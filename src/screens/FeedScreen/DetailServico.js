import React, { useState, useEffect } from 'react'
import { View, Text, Image, SafeAreaView, ScrollView  } from 'react-native';
import { db } from '../../firebase/config';
import styles from './styles';

export default function DetailServico({route, navigation}){

    const [imageUri, setImageUri] = useState('../../../assets/notfound.png');
    const [image64, setImage64] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [icone, setIcone] = useState('');

    const parametros = route.params

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
    }

    return (
        
        <SafeAreaView>
            <ScrollView >
            <View>
                <View style={{height: 380, backgroundColor: '#FFF' }}>
                    <Image 
                        style={{height: 380, borderTopLeftRadius: 30, borderTopRightRadius: 30}}
                        source={{uri: imageUri}} 
                        resizeMode='stretch'/>
                </View>
         
            
            <View style={{backgroundColor: '#fff', minHeight: 250, alignContent:'center', padding: 20}}>
                <Text style={{fontSize:30, alignSelf:'center', color:'#92a494', fontFamily:'sans-serif-light', padding:10}}>{nome}</Text>
                <Text style={{fontSize:15, fontFamily:'sans-serif-condensed', color:'#5c635d'}}> {descricao}</Text>

            </View>
            
            
        </View>
        </ScrollView>
        </SafeAreaView>
    
    )
}