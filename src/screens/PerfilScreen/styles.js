import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    userView: {
      marginTop: 40, 
      alignItems: 'center', 
      height: 250, 
      backgroundColor:"#FFF", 
      borderRadius: 20  
    },
    padding10: {
       padding: 10 
    },
    userNome: {
        fontSize: 22, 
        fontWeight: 'bold', 
        top: 10
    },
    userEmail: {
        fontSize: 16, 
        top: 20
    },
    botao: {
        height:40,
        width: 150,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    top40: {
        top: 40
    },
    botaoTexto: {
        color:"#fff"
    },
    menuView: {
        flexDirection: 'row', 
        alignItems:'center'
    },
    menuTexto: {
        fontSize:16, 
        alignContent:'center',
        marginLeft: 10,
        width: 240
    },
    sairView: {
        marginTop: 20, 
        alignItems: 'center',
        height: 50, 
        backgroundColor:"#FFF",
        borderRadius: 20  
    },
    sairTexto: {
        fontSize:16, 
        alignContent:'center',
        marginLeft: 10,
        width: 240,
        fontWeight: 'bold'
    },
    logo: {
        flex: 1,
        height: 200,
        width: 260,
        alignSelf: "center",
        margin: 30
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
        paddingLeft: 16
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    container: {
        alignItems: 'center',
        
    },
    buttonTitleEx: {
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    },

})