import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    tituloView: {
        padding:10,
        height: 80, 
        alignItems:'center'
    },
    tituloTexto: {
        top:40, 
        fontSize: 28, 
        color: '#92a494', 
        fontWeight: 'bold'
    },
    mesTexto: {
        top:30,
        fontSize: 25
    },
    dataView: {
        padding:10, 
        alignItems:'center',
        top: 10,
    },
    texto16: {
        fontSize: 16
    },
    flexrow: {
        flexDirection: 'row',
    },
    horarioMainView: {
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    horarioAView: {
        borderRightWidth: 1, 
        borderColor: '#92a494', 
        borderStyle:'dotted', 
        padding: 20, 
        width: 130, 
        alignItems:'center',
        top: 10,
        
    },
    horarioATexto: {
       fontSize: 25, 
       color:"#1d817e",

    },
    padding10: {
       padding: 10 
    },
    horarioAImage: {
        width: 30, 
        height: 30, 
        top: 10, 
        borderRadius: 100
    },
    left20: {
        left: 20 
    },
    horarioSubView: {
        left: 20, 
        top: 10
    }


})