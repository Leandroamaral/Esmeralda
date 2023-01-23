import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';

import { firebase, db } from '../../firebase/config';
import styles from './styles';

export default function InfEmpresa(){

    const [nomeEmp, setNomeEmp] = useState('');
    const [endL1, setEndL1] = useState('');
    const [endL2, setEndL2] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitudeDelta, setLatitudeDelta] = useState('');
    const [longitudeDelta, setLongitudeDelta] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [flicker, setFlicker] = useState('');
    const [foursquare, setFoursquare] = useState('');
    const [instagram, setInstagram] = useState('');
    const [pinterest, setPinterest] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [reddit, setReddit] = useState('');
    const [twitch, setTwitch] = useState('');
    const [twitter, setTwitter] = useState('');
    const [google, setGoogle] = useState('');
    const [youtube, setYoutube] = useState('');
    const [facebookA, setFacebookA] = useState('');
    const [flickerA, setFlickerA] = useState('');
    const [foursquareA, setFoursquareA] = useState('');
    const [instagramA, setInstagramA] = useState('');
    const [pinterestA, setPinterestA] = useState('');
    const [linkedinA, setLinkedinA] = useState('');
    const [redditA, setRedditA] = useState('');
    const [twitchA, setTwitchA] = useState('');
    const [twitterA, setTwitterA] = useState('');
    const [googleA, setGoogleA] = useState('');
    const [youtubeA, setYoutubeA] = useState('');

    useEffect(() => {
        db
        .collection('Empresa')
        .doc('Main')
        .get()
        .then(snapshot => {
          const shotdata = snapshot.data()
          setNomeEmp(shotdata.NomeEmp)
          setEndL1(shotdata.EndL1)
          setEndL2(shotdata.EndL2)
          setLatitude(shotdata.Latitude)
          setLongitude(shotdata.Longitude)
          setLatitudeDelta(shotdata.LatitudeDelta)
          setLongitudeDelta(shotdata.LongitudeDelta)
          setWhatsapp(shotdata.Whatsapp)
          setFacebook(shotdata.Facebook.End)
          setFlicker(shotdata.Flicker.End)
          setFoursquare(shotdata.Foursquare.End)
          setInstagram(shotdata.Instagram.End)
          setPinterest(shotdata.Pinterest.End)
          setLinkedin(shotdata.Linkedin.End)
          setReddit(shotdata.Reddit.End)
          setTwitch(shotdata.Twitch.End)
          setTwitter(shotdata.Twitter.End)
          setGoogle(shotdata.Google.End)
          setYoutube(shotdata.Youtube.End)
          setFacebookA(shotdata.Facebook.Ativo)
          setFlickerA(shotdata.Flicker.Ativo)
          setFoursquareA(shotdata.Foursquare.Ativo)
          setInstagramA(shotdata.Instagram.Ativo)
          setPinterestA(shotdata.Pinterest.Ativo)
          setLinkedinA(shotdata.Linkedin.Ativo)
          setRedditA(shotdata.Reddit.Ativo)
          setTwitchA(shotdata.Twitch.Ativo)
          setTwitterA(shotdata.Twitter.Ativo)
          setGoogleA(shotdata.Google.Ativo)
          setYoutubeA(shotdata.Youtube.Ativo)
        })
        .catch ((e) => {
            console.error(e)
        })
        
      }, []);

      function onSalvarInfEmpr() {

        db
        .collection('Empresa')
        .doc('Main')
        .update({
          NomeEmp: nomeEmp,
          EndL1: endL1,
          EndL2: endL2,
          Latitude: latitude,
          Longitude: longitude,
          LatitudeDelta: latitudeDelta,
          LongitudeDelta: longitudeDelta,
          Whatsapp: whatsapp,
          Facebook: {
            End: facebook,
            Ativo: facebookA
          },
          Facebook: {
            End: facebook,
            Ativo: facebookA
          },
          Flicker: {
            End: flicker,
            Ativo: flickerA
          },
          Foursquare: {
            End: foursquare,
            Ativo: foursquareA
          },
          Instagram: {
            End: instagram,
            Ativo: instagramA
          },
          Pinterest: {
            End: pinterest,
            Ativo: pinterestA
          },
          Linkedin: {
            End: linkedin,
            Ativo: linkedinA
          },
          Reddit: {
            End: reddit,
            Ativo: redditA
          },
          Twitch: {
            End: twitch,
            Ativo: twitchA
          },
          Twitter: {
            End: twitter,
            Ativo: twitterA
          },
          Google: {
            End: google,
            Ativo: googleA
          },
          Youtube: {
            End: youtube,
            Ativo: youtubeA
          }
        })
        .then(() => {
          alert('Atualização Efetuada');
        })
        .catch(() => {
          console.error(e);
        })
      }

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardShouldPersistTaps="none">
                        
                    </KeyboardAwareScrollView>
                    <Text style={{alignSelf: 'center'}}>Informações Básicas</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome Empresarial'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setNomeEmp(text)}
                        value={nomeEmp}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Endereço Linha 1'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEndL1(text)}
                        value={endL1}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Endereço Linha 2'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEndL2(text)}
                        value={endL2}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={{alignSelf: 'center'}}> Geolocalização </Text> 
                    <TextInput
                        style={styles.input}
                        placeholder='Latitude'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setLatitude(text)}
                        value={latitude}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Longitude'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setLongitude(text)}
                        value={longitude}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Latitude Delta'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setLatitudeDelta(text)}
                        value={latitudeDelta}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Longitude Delta'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setLongitudeDelta(text)}
                        value={longitudeDelta}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={{alignSelf: 'center'}}>Redes Sociais</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Whatsapp'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setWhatsapp(text)}
                        value={whatsapp}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Facebook'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFacebook(text)}
                            value={facebook}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={facebookA}
                            onValueChange={setFacebookA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Flickr'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFlicker(text)}
                            value={flicker}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={flickerA}
                            onValueChange={setFlickerA}    
                        /> 
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Foursquare'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFoursquare(text)}
                            value={foursquare}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={foursquareA}
                            onValueChange={setFoursquareA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Instagram'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setInstagram(text)}
                            value={instagram}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={instagramA}
                            onValueChange={setInstagramA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Pinterest'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setPinterest(text)}
                            value={pinterest}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={pinterestA}
                            onValueChange={setPinterestA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Linkedin'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setLinkedin(text)}
                            value={linkedin}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={linkedinA}
                            onValueChange={setLinkedinA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Reddit'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setReddit(text)}
                            value={reddit}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={redditA}
                            onValueChange={setRedditA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Twitch'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setTwitch(text)}
                            value={twitch}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={twitchA}
                            onValueChange={setTwitchA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Twitter'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setTwitter(text)}
                            value={twitter}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={twitterA}
                            onValueChange={setTwitterA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Google'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setGoogle(text)}
                            value={google}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={googleA}
                            onValueChange={setGoogleA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            style={styles.inputRS}
                            placeholder='Youtube'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setYoutube(text)}
                            value={youtube}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <Checkbox 
                            style={{ alignSelf:'center'}} 
                            value={youtubeA}
                            onValueChange={setYoutubeA}    
                        />
                        <Text style={{padding:10, alignSelf:'center'}}>Ativar?</Text>
                    </View>
                </View>
                <View style={{alignSelf:'center', padding: 10, flexDirection: 'row',}}>
                    <TouchableOpacity onPress={onSalvarInfEmpr}>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#1d817e', '#2fa192', '#50c8cc']}
                        start={[0, 0]}
                        end={[1, 1]}
                        location={[0.25, 0.4, 1]}
                        style={styles.botao}>
                        
                        <Text style={styles.botaoTexto}>Salvar</Text>
                    
                    </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}