import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Dialog from "react-native-dialog";

import { LinearGradient } from 'expo-linear-gradient'
import { firebase } from '../../firebase/config'

//Authetication Social
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

import styles from './styles';

export default function LoginScreen({navigation}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visibleDL, setvisibleDL] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [mensagem, setMensagem] = useState('');


    //Auth with google
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '125988439077-lp5tcdml4r1p7rlp9pptecv58fvso9ri.apps.googleusercontent.com',
        },
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential);
        }
    }, [response]);
    
    const onLoginGooglePress = () =>{
        promptAsync();
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Registro')
    }

    const onLoginPress = () => {
        setIsDisabled(true)
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    navigation.navigate('Home')
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            setIsDisabled(false)
            alert(error)
        })

    }

    function onChangePassword(){
        setTitulo('Esqueci minha Senha');
        setMensagem('Digite seu email para o envio de uma nova senha ');
        setvisibleDL(true);
    }

    function okChangePassword() {
        firebase.auth().sendPasswordResetEmail(email)
          .then(() => {
            setvisibleDL(false);
          })
          .catch(error => {
            console.error(error);
          });
    };

  
    return (

        <View style={styles.container}>
            <Dialog.Container visible={visibleDL}>
                <Dialog.Title>{titulo}</Dialog.Title>
                <Dialog.Description>{mensagem}</Dialog.Description>
                <Dialog.Input onChangeText={(texto) => setEmail(texto)}/>
                <Dialog.Button label="Cancelar" onPress={() => setvisibleDL(false) }/>
                <Dialog.Button label="Confirmar" onPress={okChangePassword}/>
            </Dialog.Container>

            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="none">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    disabled={isDisabled}
                    onPress={() => onLoginPress()}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#1d817e', '#2fa192', '#50c8cc']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        style={styles.button}>
                        <Text style={styles.buttonTitle}>Entrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onLoginGooglePress()}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#005582', '#0086ad', '#00c2c7']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        style={styles.button} >
                        <Text style={styles.buttonTitle}>Entrar com Google</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Não tem uma conta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Registre-se</Text></Text>
                </View>

                <View style={styles.footerView}>
                    <Text style={styles.footerText}><Text onPress={onChangePassword} style={styles.footerLink}>Esqueceu a senha</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}