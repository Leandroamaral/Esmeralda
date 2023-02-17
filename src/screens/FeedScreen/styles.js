import {StyleSheet, Dimensions} from 'react-native';

const largura = Dimensions.get('window').width - 25;
const altura = Dimensions.get('window').height/4;

export default StyleSheet.create({
  safeareaview: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
  },
  viewtitle: {
    height: 80,
    marginTop: 40,
  },
  texto28: {
    fontSize: 28,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  nomeEstudio: {
    fontSize: 16,
  },
  viewcampanha: {
    height: 190,
    alignContent: 'center',

  },
  imagemCampanha: {
    width: largura,
    height: altura,
    borderRadius: 10,
    marginRight: 5,

  },
  servicos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    flexWrap: 'wrap',
  },
  botaoServico: {
    backgroundColor: '#fff',
    height: 100,
    width: 75,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  iconeServico: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#eaeceb',
    width: 60, height: 60,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoServico: {
    color: '#92a494',
    fontSize: 12,
  },
  mapaView: {
    height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  mapa: {
    width: '95%',
    height: 180,
    marginTop: 10,
  },
  mapaTitulo: {
    alignSelf: 'flex-start',
    padding: 10,
    fontSize: 16,
    color: '#1d817e',
    fontWeight: 'bold',
  },
  mapaEndereco: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  mapaZap: {
    height: 50,
    position: 'absolute',
    top: 700,
    left: 265,
  },
  rsMainView: {
    height: 100,
    alignItems: 'center',
  },
  rsView: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },


});
