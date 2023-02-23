import React, {useState, useEffect} from 'react';
import {Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SocialIcon} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {createStackNavigator} from '@react-navigation/stack';

import {Entypo} from '@expo/vector-icons';

import styles from './styles';
import {db} from '../../firebase/config';
import {Icones, WhatsappIcon} from './icons';
import DetailServico from './DetailServico';


function ViewServicos({navigation}) {
  const [shotdata, setshotdata] = useState([]);

  useEffect(() => {
    db
        .collection('Servico')
        .get()
        .then((snapshot) => {
          setshotdata(snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          }));
        });
  }, []);

  const listitens = shotdata.map( (a, index) => {
    return (
      <View style={{padding: 3}} key={index}>
        <View style={styles.botaoServico}>
          <TouchableOpacity
            style={styles.iconeServico}
            onPress={() => navigation.navigate('DetailServico', {itemId: a.id})}
          >
            <Icones tipo={a.Icone} width={45} height={45} fill="#92a494" />
          </TouchableOpacity>
          <Text style={styles.textoServico}>{a.Nome}</Text>
        </View>
      </View>
    );
  });

  return (
    <>
      <View style={styles.servicos}>
        {listitens}
      </View>
    </>

  );
}

function Titulo() {
  const [userName, setUserName] = useState('');
  const [nomeEmp, setNomeEmp] = useState('');


  useEffect(() => {
    db
        .collection('Empresa')
        .doc('Main')
        .get()
        .then((snapshot) => {
          const shotdata = snapshot.data();
          setNomeEmp(shotdata.NomeEmp);
        });
  });

  const load = async () => {
    try {
      const name = await AsyncStorage.getItem('@user');
      if (name !== null) {
        const user = JSON.parse(name);
        const firstname = user.fullName.split(' ');
        setUserName(firstname[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!userName) {
    load();
  }

  return (
    <View style={styles.viewtitle}>
      <Text style={styles.texto28}>Olá, <Text style={styles.nome}>{userName}</Text></Text>
      <Text>Bem vindo a <Text style={styles.nomeEstudio}>{nomeEmp}</Text></Text>
    </View>
  );
}

function Campanha() {
  const [shotdata, setshotdata] = useState([]);

  useEffect(() => {
    db
        .collection('Campanha')
        .get()
        .then((snapshot) => {
          setshotdata(snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          }));
        });
  }, []);

  const fitradodata = shotdata
      .filter( (item) => {
        return item.star == true;
      })
      .sort((a, b) => {
        return (a.indice > b.indice) ? 1 : -1;
      });


  return (
    <ScrollView horizontal={true}>

      {fitradodata.map( (a, index) => {
        return (
          <View style={styles.viewcampanha} key={index}>
            <Image
              style={styles.imagemCampanha}
              source={{uri: a.image}}
            />
          </View>
        );
      })}

    </ScrollView>
  );
}

function Mapa() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [nomeEmp, setNomeEmp] = useState('');
  const [endL1, setEndL1] = useState('');
  const [endL2, setEndL2] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [YofMap, setYofMap] = useState(100);
  const [region, setRegion] = useState();

  useEffect(() => {
    db
        .collection('Empresa')
        .doc('Main')
        .get()
        .then((snapshot) => {
          const shotdata = snapshot.data();
          setNomeEmp(shotdata.NomeEmp);
          setEndL1(shotdata.EndL1);
          setEndL2(shotdata.EndL2);
          setLatitude(Number(shotdata.Latitude));
          setLongitude(Number(shotdata.Longitude));
          setWhatsapp(shotdata.Whatsapp);

          const regiao = {
            latitude: Number(shotdata.Latitude),
            longitude: Number(shotdata.Longitude),
            latitudeDelta: Number(shotdata.LatitudeDelta),
            longitudeDelta: Number(shotdata.LongitudeDelta),
          };

          setRegion(regiao);
        });
  }, []);

  const sendWhatsAppMessage = () => {
    const link = `https://api.whatsapp.com/send?phone=${whatsapp}`;
    Linking.canOpenURL(link)
        .then((supported) => {
          if (!supported) {
            Alert.alert(
                'Por favor instale o whatsapp para envio de mensagens',
            );
          } else {
            return Linking.openURL(link);
          }
        })
        .catch((err) => alert(e));
  };

  return (
    <>
      <View
        style={styles.mapaView}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          setYofMap(layout.y + 190);
        }}
      >
        <MapView
          style={styles.mapa}
          showsUserLocation = {true}
          region = {region}
          minZoomLevel = {15}
          provider = {PROVIDER_GOOGLE}
        >
          <Marker coordinate={{latitude: latitude, longitude: longitude}}/>
        </MapView>
        <Text style={styles.mapaTitulo}> <Entypo name="location-pin" size={24} color="#1d817e" />{nomeEmp}</Text>
        <Text style={styles.mapaEndereco}>{endL1} </Text>
        <Text style={styles.mapaEndereco}>{endL2}</Text>
      </View>
      <View style={{
        height: 50,
        position: 'absolute',
        top: YofMap,
        left: 265,
      }}>
        <TouchableOpacity onPress={sendWhatsAppMessage}>
          <WhatsappIcon width={60} height={60}/>
        </TouchableOpacity>
      </View>
    </>
  );
}

function RedesSociais() {
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
        .then((snapshot) => {
          const shotdata = snapshot.data();
          setFacebook(shotdata.Facebook.End);
          setFlicker(shotdata.Flicker.End);
          setFoursquare(shotdata.Foursquare.End);
          setInstagram(shotdata.Instagram.End);
          setPinterest(shotdata.Pinterest.End);
          setLinkedin(shotdata.Linkedin.End);
          setReddit(shotdata.Reddit.End);
          setTwitch(shotdata.Twitch.End);
          setTwitter(shotdata.Twitter.End);
          setGoogle(shotdata.Google.End);
          setYoutube(shotdata.Youtube.End);
          setFacebookA(shotdata.Facebook.Ativo);
          setFlickerA(shotdata.Flicker.Ativo);
          setFoursquareA(shotdata.Foursquare.Ativo);
          setInstagramA(shotdata.Instagram.Ativo);
          setPinterestA(shotdata.Pinterest.Ativo);
          setLinkedinA(shotdata.Linkedin.Ativo);
          setRedditA(shotdata.Reddit.Ativo);
          setTwitchA(shotdata.Twitch.Ativo);
          setTwitterA(shotdata.Twitter.Ativo);
          setGoogleA(shotdata.Google.Ativo);
          setYoutubeA(shotdata.Youtube.Ativo);
        });
  });

  const redes = (
    <View style={styles.rsMainView}>
      <Text></Text>
      <Text> Siga em nossas redes sociais</Text>
      <View style={styles.rsView}>
        {instagramA ? <SocialIcon type='instagram' onPress={() => Linking.openURL(instagram)} /> : null }
        {facebookA ? <SocialIcon type='facebook' onPress={() => Linking.openURL(facebook)} /> : null }
        {flickerA ? <SocialIcon type='flicker' onPress={() => Linking.openURL(flicker)} /> : null }
        {foursquareA ? <SocialIcon type='foursquare' onPress={() => Linking.openURL(foursquare)} /> : null }
        {pinterestA ? <SocialIcon type='pinterest' onPress={() => Linking.openURL(pinterest)} /> : null }
        {linkedinA ? <SocialIcon type='linkedin' onPress={() => Linking.openURL(linkedin)} /> : null }
        {redditA ? <SocialIcon type='reddit-alien' onPress={() => Linking.openURL(reddit)} /> : null }
        {twitchA ? <SocialIcon type='twitch' onPress={() => Linking.openURL(twitch)} /> : null }
        {twitterA ? <SocialIcon type='twitter' onPress={() => Linking.openURL(twitter)} /> : null }
        {googleA ? <SocialIcon type='google' onPress={() => Linking.openURL(google)} /> : null }
        {youtubeA ? <SocialIcon type='youtube' onPress={() => Linking.openURL(youtube)} /> : null }
      </View>
    </View>
  );

  if (instagramA || facebookA || flickerA || foursquareA || pinterestA || linkedinA || redditA || twitchA || twitterA || googleA || youtubeA) {
    return (redes);
  } else {
    return (null);
  }
}

function DetailFeed({navigation}) {
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>

        <Titulo />

        <Campanha />

        <ViewServicos navigation={navigation}/>

        <Mapa />

        <RedesSociais />

      </ScrollView>
    </SafeAreaView>
  );
}

export default function Feed({navigation}) {
  const RootStack = createStackNavigator();

  return (
    <>
      <RootStack.Navigator>
        <RootStack.Group screenOptions={{headerShown: false}}>
          <RootStack.Screen name="DetailFeed" component={DetailFeed} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen name="DetailServico" component={DetailServico} options={{headerTitle: 'Especialidades'}} />
        </RootStack.Group>
      </RootStack.Navigator>
    </>
  );
}
