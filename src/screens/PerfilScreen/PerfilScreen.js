import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import styles from './styles';
import * as Updates from 'expo-updates';

export default function Perfil ({ navigation }) {

  const onLogoutPress = () =>{
    firebase.auth().signOut()
    .then(() => {
      AsyncStorage.removeItem('@user')
        .catch ((error) => {
          console.error(error);
        });
      })
    .catch ((error) => {
      console.error(error);
    })
    .finally(() => {
      Updates.reloadAsync();
    })
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
                  
                  <Text style={styles.botaoTexto}>Editar Minha Conta</Text>
              
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
  const [oldpass, setOldPass] = useState('');
  const [id, setID] = useState();
  const [visibleDL, setvisibleDL] = useState(false);
  const [visibleDL2, setvisibleDL2] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user')
      if (name !== null) {
        setUserName(JSON.parse(name));
        const parser = JSON.parse(name);
        setFullName(parser.fullName);
        setTelefone(parser.telefone);
        setEmail(parser.email);
        setID(parser.id);
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  if (!userName) {
    load();
  }

  function onChangeUserData() {
    db
    .collection('users')
    .doc(id)
    .update({
      fullName: fullName,
      telefone: telefone
    })
    .then(() => {
      setTitulo('Editar Perfil');
      setMensagem('Perfil atualizado com sucesso');
      setvisibleDL(true);
    })
    .catch(error => {
      setTitulo('Error: ');
      setMensagem(error);
      setvisibleDL(true);
      console.error(error);
    });
    };


  function onChangePassword() {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        setTitulo('Alterar a senha');
        setMensagem('Um link para troca de senha foi encaminhada para o email ' + email);
        setvisibleDL(true);
      })
      .catch(error => {
        setTitulo('Error: ');
        setMensagem(error);
        console.error(error);
      });
  };

  function onDeleteUser() {
    setTitulo('Excluir Minha Conta');
    setMensagem('Digite sua senha para excluir permanentemente sua conta')
    setvisibleDL2(true);
  }

  function OKDeleteUser() {
    console.log('aqui' + oldpass);
    const auth = getAuth();
    const user = auth.currentUser;
    const emailCred  = firebase.auth.EmailAuthProvider.credential(email, oldpass);
    firebase.auth().currentUser.reauthenticateWithCredential(emailCred)
    .then (() => {
      db.collection('users').doc(id).delete()
      deleteUser(user)
      AsyncStorage.removeItem('@user')
      setvisibleDL2(false)
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      Updates.reloadAsync();
    })

  }

  function OKDL() {
    setvisibleDL(false);
  };

 

  return (
    <View>

    <Dialog.Container visible={visibleDL}>
      <Dialog.Title>{titulo}</Dialog.Title>
      <Dialog.Description>{mensagem}</Dialog.Description>
      <Dialog.Button label="OK" onPress={OKDL}/>
    </Dialog.Container>

    <Dialog.Container visible={visibleDL2}>
      <Dialog.Title>{titulo}</Dialog.Title>
      <Dialog.Description>{mensagem}</Dialog.Description>
      <Dialog.Input onChangeText={(texto) => setOldPass(texto)}/>
      <Dialog.Button label="Cancelar" onPress={() => setvisibleDL2(false) }/>
      <Dialog.Button label="Confirmar" onPress={OKDeleteUser}/>
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
          <TouchableOpacity onPress={onChangeUserData}>
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
                  colors={['#005582', '#0086ad', '#00c2c7']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.button}>
                  <Text style={styles.buttonTitle}>Alterar Senha</Text>
              </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteUser}>
              <LinearGradient
                  // Button Linear Gradient
                  colors={['#BBB', '#DDD', '#EEE']}
                  start={[0, 0]}
                  end={[1, 1]}
                  location={[0.25, 0.4, 1]}
                  style={styles.button}>
                  <Text style={styles.buttonTitleEx}>Excluir Minha Conta</Text>
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
        <RootStack.Screen 
          name="Editar Perfil" 
          component={EditarPerfil}
          options={{headerTitle: 'Editar Minha Conta'}}  
        />
      </RootStack.Group>
    </RootStack.Navigator>
      
    );
  }