const { StyleSheet } = require("react-native");

const Userstyle =StyleSheet.create({

    safeAreaView:{
        flex:1, 
        justifyContent:'flex-start',
        //alignItems:'center'
    },

    greyBg:{ //background
        backgroundColor:'#ECEAEA',
        marginHorizontal:20,
        borderRadius:20,
        marginTop:100,

    },
    containerStyle1:{ //all for title &input
        paddingHorizontal:20,
        marginTop:50,
        marginBottom:100,
    },
    lable1:{ //title
        fontSize:18,
        marginBottom:10,
    },
    inputContainerStyle1:{ //input
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
    },
    inputStyle1:{ //inside font
        color:'#878787',
        marginHorizontal:20,
    },

    buttonUpdate:{
        marginHorizontal:20,
        marginVertical:40,
        marginBottom:20,
        borderRadius:15,
        backgroundColor:'#8c9090',
    },
    towList:{
        //flex:1,
        backgroundColor:'#ECEAEA',
        height:200,
        marginHorizontal:20,
        borderRadius:20,
        paddingVertical:20,
    },
    listButton:{
        height:35,
        marginHorizontal:20,
        marginBottom:2.5,
        borderRadius:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
    },
    listTitle:{
        paddingTop:5,
        textAlign:'center',
        color:'#878787',
        fontSize:20,
    },
    list_outTitle:{
        fontSize:25,
        textAlign:'center',
        marginTop:60,
        marginBottom:5,
    },
    deletebox:{
        height:35,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:20,
        marginBottom:2.5,
        marginLeft:-20,
        borderRadius:0,
        backgroundColor:'#FF3F3F',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
    },
    deletetext:{
        color:"#FFFFFF",
        fontSize:15,
    }
});

export default Userstyle;