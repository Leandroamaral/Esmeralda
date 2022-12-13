
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {LinearGradient} from 'expo-linear-gradient'
import styles from './styles';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registro')
    }

    const onLoginPress = () => {
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
                    source={require('../../../assets/icon.png')}
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
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#93C6F9', '#97B4FA', '#A768FE']}
                    start={[0, 0]}
                    end={[1, 1]}
                    location={[0.25, 0.4, 1]}
                    style={styles.button}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Entrar</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity
                    style={[styles.button, styles.orangeButton]}
                    onPress={() => onLoginGooglePress()}>
                    <Text style={styles.buttonTitle}>Entrar com Google</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Não tem uma conta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Registrar-se</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}