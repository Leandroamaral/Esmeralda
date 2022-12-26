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
      <SafeAreaView>
        <ScrollView>
          <View style={styles.userView}>
            <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />
            <Text style={styles.userNome}>Leandro Amaral</Text>
            <Text style={styles.userEmail}>leobsb@yahoo.com</Text>
            <TouchableOpacity style={styles.top40}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.botao}>
                  
                  <Text style={styles.botaoTexto}>Editar Perfil</Text>
              
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="carryout" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Serviços</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="smileo" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Especialistas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="addusergroup" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Visualizar Usuários</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="earth" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Editar Informações Empresariais</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuView}>
                <AntDesign name="staro" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.menuTexto}>Criar Campanhas</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sairView}>
            <TouchableOpacity onPress={onLogoutPress}>
              <View style={styles.menuView}>
                <AntDesign name="logout" size={26} color="#92a494" style={styles.padding10}/>
                <Text style={styles.sairTexto}>Sair</Text>
                <AntDesign name="rightcircleo" size={22} color="#92a494" style={styles.padding10} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }