const { StyleSheet } = require("react-native");

const dropdown =StyleSheet.create({
    box:{
        marginHorizontal:60,
    },
    dropdown:{
        marginHorizontal:60,
        backgroundColor:"#C6C6C6",
    },
    boxTwo:{
        marginHorizontal:10,
        width:180,
    },
    dropdownTwo:{
        width:180,
        marginHorizontal:10,
        backgroundColor:"#C6C6C6",
        height:150,
    },
    squareDropdown:{
        backgroundColor:'#FAFAFA',
        height:200,
        zIndex:1,
        borderRadius:0,
        marginHorizontal:20,
    },
    squareBox:{
        //height:20,
        width:310,
        alignSelf:'center',
        zIndex:1,
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
    },
    squareContainer:{
        //height:20,
        width:310,
        alignSelf:'center',
        zIndex:1,
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
    },
    squareDropdownText:{
        color: '#777',
    },
})

export default dropdown;