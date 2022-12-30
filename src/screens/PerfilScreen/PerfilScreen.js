import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase, auth } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";
import styles from './styles';


function PerfilMain ({ navigation }) {

  const onLogoutPress = () =>{
    firebase.auth().signOut();
  }

  const [userName, setUserName] = useState("");

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        setUserName(JSON.parse(name));
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!userName) {
    load();
  }

  return(
    <SafeAreaView>
        <ScrollView>
          <View style={styles.userView}>
            <AntDesign name="user" size={80} color="#92a494" style={styles.padding10} />
            <Text style={styles.userNome}>{userName.fullName}</Text>
            <Text style={styles.userEmail}>{userName.email}</Text>
            <TouchableOpacity style={styles.top40} onPress={() => navigation.navigate('Editar Perfil') }>
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
  )
 
}



function EditarPerfil({ navigation }) {

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [oldPass, setOldPass] = useState('');
  const [newPass1, setnewPass1] = useState('');
  const [newPass2, setnewPass2] = useState('');
  const [visiblePassDL, setVisiblePassDL] = useState(false);
  const [visiblePassDL2, setVisiblePassDL2] = useState(false);
  const [visiblePassDL3, setVisiblePassDL3] = useState(false);

  

  function onChangePassword() {
    setVisiblePassDL(true);

  };

  function handleCancel() {
    setVisiblePassDL(false);
    setVisiblePassDL2(false);
    setVisiblePassDL3(false);

  };

 

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        setUserName(JSON.parse(name));
        const parser = JSON.parse(name);
        setFullName(parser.fullName);
        setTelefone(parser.telefone);
        setEmail(parser.email);
      }
    } catch (e) {
      console.error(e)
    }
  }

  if (!userName) {
    load();
  }

  function OKOldPass(){
    
    const emailCred  = firebase.auth.EmailAuthProvider.credential(email, oldPass);
    firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
    .then(() => {
      setVisiblePassDL(false);
      setVisiblePassDL2(true);
    })
    .catch(error => {
      console.error(error)
    });

  }

  return (
    <View>

    <Dialog.Container visible={visiblePassDL}>
      <Dialog.Title>Alterar Senha</Dialog.Title>
      <Dialog.Description>
        Digite sua senha atual
      </Dialog.Description>
      <Dialog.Input onChangeText={(texto) => setOldPass(texto)}/>
      <Dialog.Button label="Cancelar" onPress={handleCancel} />
      <Dialog.Button label="OK" onPress={OKOldPass}/>
    </Dialog.Container>

    <AntDesign name="user" size={80} color="#92a494" style={{alignSelf: 'center', padding: 20}} />
      <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always">
          <TextInput
              style={styles.input}
              placeholder={fullName}
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
            <TextInput
              style={styles.input}
              placeholder={telefone}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTelefone(text)}
              value={telefone}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TouchableOpacity onClick={() => setCount(count + 2)}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>Alterar</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={onChangePassword}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>Alterar Senha</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onClick={() => setCount(count + 2)}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#1d817e', '#2fa192', '#50c8cc']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>Excluir Minha Conta</Text>
              </LinearGradient>
          </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default function Perfil() {

  const RootStack = createStackNavigator();
    
    return (
      <RootStack.Navigator>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="PerfilMain" component={PerfilMain} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="Editar Perfil" component={EditarPerfil} />
      </RootStack.Group>
    </RootStack.Navigator>
      
    );
  }