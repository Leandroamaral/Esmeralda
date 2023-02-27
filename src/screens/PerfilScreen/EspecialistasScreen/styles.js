import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  userCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  userCard2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    color: '#000',
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  userCardDescription: {
    paddingVertical: 5,
  },
  userActions: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5,
    alignItems: 'center',

  },
  editButton: {
    padding: 10,
    backgroundColor: '#EEE',
    color: '#ccc',
    borderRadius: 10,
    margin: 3,
  },
  searchBar: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,

  },
  searchInput: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    fontSize: 15,
    placeholderTextColor: '#aaaaaa',
    underlineColorAndroid: 'transparent',

  },
  input: {
    height: 48,
    width: 300,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 15,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  botaoServico: {
    backgroundColor: '#fff',
    height: 100,
    width: 80,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,

  },
  botao: {
    height: 40,
    width: 180,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#fff',
  },
  sairTexto: {
    fontSize: 16,
    alignContent: 'center',
    marginLeft: 10,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
  },
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 30,
    width: '95%',
    borderRadius: 10,
  },
  horarioBotao: {
    marginRight: 10,
    marginBottom: 10,
    width: '22%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horarioBotaoChecked: {
    marginRight: 10,
    marginBottom: 10,
    width: '22%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#92a494',
    alignItems: 'center',
    justifyContent: 'center',
  },

  horariosTexto: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  horarioAView: {
    borderRightWidth: 1,
    borderColor: '#92a494',
    borderStyle: 'dotted',
    padding: 20,
    width: 130,
    alignItems: 'center',

  },
  horarioATexto: {
    fontSize: 25,
    color: '#1d817e',
  },
  horarioBTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d817e',
  },
  horarioMainView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 185,
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  horarioSubView: {
    left: 20,

  },
  flexrow: {
    flexDirection: 'row',
  },
  dataView: {
    padding: 10,
    alignItems: 'center',

  },
  tituloTexto: {
    top: 20,
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
  },
  tituloView: {
    padding: 10,
    height: 80,
    alignItems: 'center',
    marginBottom: 20,
  },
});
