import {StyleSheet, Dimensions} from 'react-native';

const largura = Dimensions.get('window').width - 25;

export default StyleSheet.create({
  userView: {
    marginTop: 40,
    alignItems: 'center',
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  padding10: {
    padding: 10,
  },
  userNome: {
    fontSize: 22,
    fontWeight: 'bold',
    top: 10,
  },
  userEmail: {
    fontSize: 16,
    top: 20,
  },
  botao: {
    height: 40,
    width: 180,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top40: {
    top: 40,
  },
  botaoTexto: {
    color: '#fff',
  },
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTexto: {
    fontSize: 16,
    alignContent: 'center',
    marginLeft: 10,
    width: 240,
  },
  sairView: {
    marginTop: 20,
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  sairTexto: {
    fontSize: 16,
    alignContent: 'center',
    marginLeft: 10,
    width: 240,
    fontWeight: 'bold',
  },
  logo: {
    flex: 1,
    height: 200,
    width: 260,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',

  },
  buttonTitleEx: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewcampanha: {
    height: 280,
    alignItems: 'center',
    flex: 1,
    padding: 10,

  },
  imagemCampanha: {
    width: 340,
    height: 180,
    borderRadius: 10,
  },
  subTituloView: {
    padding: 5,
  },
  subTituloTexto: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botaoServico: {
    backgroundColor: '#fff',
    height: 105,
    width: (largura/4) - 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,

  },
  iconeServico: {
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#eaeceb',
    width: 60,
    height: 60,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoServico: {
    color: '#92a494',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  servicos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    flexWrap: 'wrap',
    padding: 5,
  },
  userCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 10,
    padding: 20,
  },
  userActions: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  editButton: {
    padding: 10,
    backgroundColor: '#ccc',
    color: '#ccc',
    borderRadius: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 15,
  },
  inputbig: {
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  inputRS: {
    height: 48,
    width: 200,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
});
