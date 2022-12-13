
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'expo-linear-gradient'
import { firebase } from '../../firebase/config'
import styles from './styles';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registro')
    }

    const onLoginPress = () => {
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
                    navigation.navigate('MainScreen')
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })

    }

    const onLoginGooglePress = () =>{

    }
    
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
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
            </KeyboardAwareScrollView>
        </View>
    )
}