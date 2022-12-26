import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Perfil() {

    const navigation = useNavigation();
    const onLogoutPress = () =>{
      firebase.auth().signOut();
      navigation.navigate("Login");
    }
  
    return (
      <SafeAreaView style={{flex: 1, top:10, padding: 10, flexDirection: "column"}}>
        <ScrollView>
          <View style={{ marginTop: 20, alignItems: 'center', height: 250, backgroundColor:"#FFF", borderRadius: 20  }}>
            <AntDesign name="user" size={80} color="#92a494" style={{padding: 10}} />
            <Text style={{fontSize: 22, fontWeight: 'bold', top: 10}}>Leandro Amaral</Text>
            <Text style={{fontSize: 16, top: 20}}>leobsb@yahoo.com</Text>
            <TouchableOpacity style={{top: 40}}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={{ height:40,
                    width: 150,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'}}>
                  
                  <Text style={{color:"#fff"}}>Editar Perfil</Text>
              
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, alignItems: 'stretch', height: 250, backgroundColor:"#FFF", borderRadius: 20  }}>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="carryout" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240}}>Editar Serviços</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="smileo" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240}}>Editar Especialistas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="addusergroup" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240}}>Visualizar Usuários</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="earth" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240}}>Editar Informações Empresariais</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="staro" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240}}>Criar Campanhas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, alignItems: 'center', height: 50, backgroundColor:"#FFF", borderRadius: 20  }}>
            <TouchableOpacity onPress={onLogoutPress}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                <AntDesign name="logout" size={26} color="#92a494" style={{padding: 10}}/>
                <Text style={{fontSize:16, alignContent:'center', marginLeft: 10, width: 240, fontWeight:'bold'}}>Sair</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={{padding: 10, alignContent:'flex-end'}} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }