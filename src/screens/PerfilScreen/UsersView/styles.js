import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    
    userCard:{
        backgroundColor:"#fff",
        flexDirection: 'row', 
        alignItems: 'center',
        color:"#000",
        width:'90%',
        alignSelf:'center',
        marginTop:5,
        borderRadius:10,
        padding:20
    },
    userActions:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:5,
        alignItems:'center',
    }, 
    editButton:{
        padding:10,
        backgroundColor:'#ccc',
        color:'#ccc',
        borderRadius:10,
    },
    searchBar:{
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
        fontSize: 15
    },
})