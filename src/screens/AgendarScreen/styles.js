import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tituloView: {
        padding:10, 
        height: 90, 
        backgroundColor:'#1d817e', 
        alignItems:'center'
    },
    tituloTexto: {
        top:30, 
        fontSize: 28, 
        color: '#fff', 
        fontWeight: 'bold'
    },
    calendario: {
        height: 105, 
        backgroundColor:'#1d817e' 
    },
    calendarioTitulo: {
        color:'#fff', 
        fontSize: 16, 
        fontWeight: 'normal' 
    },
    calendarioLabel: {
        color:'#fff'
    },
    subTituloView: {
        padding:10
    },
    subTituloTexto: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    espMainView : {
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'relative', 
        height: 160
    },
    espView: {
        backgroundColor: '#fff', 
        height: 150, 
        width: 130, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginBottom: 5, 
        marginRight: 10 
    },
    espViewChecked :{
        backgroundColor: '#fff', 
        height: 150, 
        width: 130, 
        borderRadius: 10, 
        borderColor:"#000",
        borderWidth:1,
        borderSize:10,
        alignItems: 'center', 
        marginBottom: 5, 
        marginRight: 10 
    },
    espImg : {
        width: 100, 
        height: 100, 
        top: 10, 
        borderRadius: 50
    },
    
    espTexto: {
        fontSize: 13, 
        fontWeight: 'bold', 
        top: 15
    },
    horarioView: {
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        position: 'relative', 
        flexWrap: 'wrap', 
        marginRight:10
    },
    horarioBotao: {
        marginRight: 10, 
        marginBottom: 10, 
        width: 100, 
        height: 35, 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        alignItems:'center', 
        justifyContent:'center'
    },
    horariosTexto: {
        fontWeight: 'bold', 
        fontSize:15
    },
    reservarView: {
        alignItems:'center'
    },
    reservarBotao: {
        height: 50, 
        width: 300, 
        alignItems:'center', 
        justifyContent:'center', 
        borderRadius:10,
        backgroundColor:'#1d817e'  
    },
    reservarTexto: {
        color:'#fff', 
        fontWeight: 'bold',
        fontSize: 15
    }



})