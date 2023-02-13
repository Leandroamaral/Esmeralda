import React, { useState } from 'react'
import { auth, db } from '../../firebase/config'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient'
import  { MaskedTextInput } from 'react-native-mask-text'
import styles from './styles';

export default function RegistrationScreen({navigation}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [telefone, setTelefone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        setIsDisabled(true)
        if (password !== confirmPassword) {
            //Need change to UI designer
            alert("As senhas não combinam!")
            setIsDisabled(false)
            return
        }
        auth.createUserWithEmailAndPassword(email, password).then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
                telefone
            };
            const usersRef = db.collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Home', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        }).catch((error) => {
            console.log(error.code)
            switch (error.code) {
                case 'auth/email-already-in-use':
                  alert(`O endereço de e-mail ${email} já está em uso`);
                  navigation.navigate('Login')
                  break;
                case 'auth/invalid-email':
                  alert(`O e-mail ${email} é inválido.`);
                  break;
                case 'auth/operation-not-allowed':
                  alert('Erro na criação do usuário.');
                  break;
                case 'auth/weak-password':
                  alert('A senha digitada não apresenta os requisitos mínimos. Favor incluir ao menos um caractere maiúsculo, minúsculo e um número ');
                  break;
                default:
                  alert(error.message);
                  break;
              }
        }).finally(() => {
            setIsDisabled(false)
        });
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
                    placeholder='Nome Completo'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    autoCapitalize="words"
                    value={fullName}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                />
                <MaskedTextInput
                    style={styles.input}
                    placeholder='Telefone'
                    mask="(99) 99999-9999"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTelefone(text)}
                    value={telefone}
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Senha'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirmar senha'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity
                    disabled={isDisabled}
                    onPress={() => onRegisterPress()}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#1d817e', '#2fa192', '#50c8cc']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        style={styles.button}>
                        <Text style={styles.buttonTitle}>Criar Conta</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Já tem uma conta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Entrar</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}