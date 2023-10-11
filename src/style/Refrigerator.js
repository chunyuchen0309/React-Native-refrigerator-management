const { StyleSheet } = require("react-native");
import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod"

const  refrigerator =StyleSheet.create({
    contentAll:{
        flex:1,
        marginHorizontal:60,
    },
    outTop:{ //最外層上
        flex:2,
        //height:180,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        marginHorizontal:moderateScale(60),
        backgroundColor:"#D9D9D9",
        borderTopLeftRadius:moderateScale(30),
        borderTopRightRadius:moderateScale(30),
        marginBottom:moderateScale(10),
    },
    outBotton:{ //最外層下
        flex:5,
        //height:320,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        backgroundColor:"#D9D9D9",
        borderBottomLeftRadius:moderateScale(30),
        borderBottomRightRadius:moderateScale(30),
        marginHorizontal:moderateScale(60),
    },

    //final set only 4 place
    finallOutTop:{ 
        flex:8,
        //height:180,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        marginLeft:moderateScale(20),
        marginRight:moderateScale(10),
        backgroundColor:"#D9D9D9",
        borderTopLeftRadius:moderateScale(30),
        //borderTopRightRadius:30,
        marginBottom:moderateScale(10),
    },
    finallOutBotton:{ 
        flex:8,
        //height:320,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        marginLeft:moderateScale(20),
        marginRight:moderateScale(10),
        backgroundColor:"#D9D9D9",
        borderBottomLeftRadius:moderateScale(30),
        //borderBottomRightRadius:30,
        
    },
    finallOutDoorTop:{ //最外層門上
        flex:2,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        marginRight:moderateScale(20),
        backgroundColor:"#BFBFBF",
        //borderTopLeftRadius:30,
        borderTopRightRadius:moderateScale(30),
        marginBottom:moderateScale(10),
    },
    finallOutDoorBotton:{ //最外層門下    
        flex:2,
        paddingHorizontal:moderateScale(15),
        paddingVertical:moderateScale(15),
        marginRight:moderateScale(20),
        backgroundColor:"#BFBFBF",
        //borderBottomLeftRadius:30,
        borderBottomRightRadius:moderateScale(30),
    },
    handleup:{ //把手上
        backgroundColor:"#808080",
        width:moderateScale(10),
        flex:1,
        marginVertical:moderateScale(30),
    },
    handledown:{ //把手下
        backgroundColor:"#808080",
        width:moderateScale(10),
        flex:1,
        marginVertical:moderateScale(40),
    },
    topCenterButton:{ //上方分層
        backgroundColor:"#416BFF"
    },
    


})

export default refrigerator;