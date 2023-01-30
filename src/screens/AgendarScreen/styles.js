import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tituloView: {
        padding:10, 
        height: 90, 
        alignItems:'center',
        backgroundColor: '#fff'
    },
    tituloTexto: {
        top:30, 
        fontSize: 28, 
        color: '#000', 
        fontWeight: 'bold'
    },
    calendario: {
        height: 105, 
        backgroundColor:'#FFF', 
        borderColor: '#fff'
    },
    calendarioTitulo: {
        color:'#000', 
        fontSize: 16, 
        fontWeight: 'normal' 
    },
    calendarioLabel: {
        color:'#000'
    },
    subTituloView: {
        padding:10
    },
    subTituloTexto: {
        fontSize: 20, 
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    espMainView : {
        padding: 5, 
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
        textAlign:'center',
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
        width: 90, 
        height: 35, 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        alignItems:'center', 
        justifyContent:'center'
    },
    horarioBotaoChecked:{
        marginRight: 10, 
        marginBottom: 10, 
        width: 90, 
        height: 35, 
        borderRadius: 10, 
        backgroundColor: '#fff', 
        alignItems:'center', 
        justifyContent:'center',
        borderWidth:1,
        borderColor:"#000"
    },
    horariosTexto: {
        fontWeight: 'bold', 
        fontSize:15
    },
    serviceView:{
        marginTop:30,
        marginBottom:30
    },
    botaoServico:{
        marginLeft:1
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
    },
    botaoServico: {
        backgroundColor: '#fff', 
        height: 100, 
        width: 80, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginBottom: 5, 
       
    },
    botaoServicoChecked: {
        backgroundColor: '#fff', 
        height: 100, 
        width: 80, 
        borderRadius: 10, 
        alignItems: 'center', 
        marginBottom: 5, 
        borderWidth:1,
        borderColor:"#000"
       
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
        color: "#92a494", 
        fontSize: 12
    },



})