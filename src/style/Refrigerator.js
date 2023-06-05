const { StyleSheet } = require("react-native");

const  refrigerator =StyleSheet.create({
    contentAll:{
        flex:1,
        marginHorizontal:60,
    },
    outTop:{ //最外層上
        //flex:2,
        height:180,
        paddingHorizontal:15,
        paddingVertical:15,
        marginHorizontal:60,
        backgroundColor:"#D9D9D9",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginBottom:10,
    },
    
    outBotton:{ //最外層下
        //flex:5,
        height:320,
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:"#D9D9D9",
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        marginHorizontal:60,
    },

    //final set only 4 place
    finallOutTop:{ 
        flex:5,
        height:180,
        paddingHorizontal:15,
        paddingVertical:15,
        marginLeft:20,
        marginRight:10,
        backgroundColor:"#D9D9D9",
        borderTopLeftRadius:30,
        //borderTopRightRadius:30,
        marginBottom:10,
    },
    finallOutBotton:{ 
        flex:5,
        height:320,
        paddingHorizontal:15,
        paddingVertical:15,
        marginLeft:20,
        marginRight:10,
        backgroundColor:"#D9D9D9",
        borderBottomLeftRadius:30,
        //borderBottomRightRadius:30,
        
    },
    finallOutDoorTop:{ //最外層門上
        flex:1,
        paddingHorizontal:15,
        paddingVertical:15,
        marginRight:20,
        backgroundColor:"#BFBFBF",
        //borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginBottom:10,
    },
    finallOutDoorBotton:{ //最外層門下    
        flex:1,
        paddingHorizontal:15,
        paddingVertical:15,
        marginRight:20,
        backgroundColor:"#BFBFBF",
        //borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        
    },


    handleup:{ //把手上
        backgroundColor:"#808080",
        width:10,
        height:80,
       //marginLeft:20,
        marginTop:30,
    },
    handledown:{ //把手下
        backgroundColor:"#808080",
        width:10,
        height:200,
        //marginLeft:40,
        marginTop:60,
    },
    topCenterButton:{ //上方分層
        backgroundColor:"#416BFF"

    }

})

export default refrigerator;