const { StyleSheet } = require("react-native");
import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod"
const Userstyle =StyleSheet.create({

    safeAreaView:{
        flex:1, 
        justifyContent:'flex-start',
        //alignItems:'center'
    },

    greyBg:{ //background
        backgroundColor:'#ECEAEA',
        marginHorizontal:moderateScale(20),
        borderRadius:moderateScale(20),
        marginTop:moderateScale(100),

    },
    lable1:{ //title
        fontSize:moderateScale(18),
        marginBottom:moderateScale(10),
    },
    containerStyle1:{ //all for title &input
        paddingHorizontal:moderateScale(20),
        marginTop:moderateScale(50),
        marginBottom:moderateScale(100),
        
    },
    inputContainerStyle1:{ //input
        height:moderateScale(45),
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation:1.5,
    },
    inputStyle1:{ //inside font
        color:'#878787',
        marginHorizontal:moderateScale(20),
        fontSize:moderateScale(20),
    },

    buttonUpdate:{
        marginHorizontal:moderateScale(20),
        marginVertical:moderateScale(40),
        marginBottom:moderateScale(20),
        borderRadius:moderateScale(15),
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
    homeDateList:{
        //flex:1,
        backgroundColor:'#ECEAEA',
        height:verticalScale(320),
        marginHorizontal:moderateScale(20),
        borderRadius:moderateScale(20),
        paddingVertical:moderateScale(20),
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
        fontSize:moderateScale(25),
        textAlign:'center',
        marginTop:moderateScale(60),
        marginBottom:5,
        color:"#777",
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
    deleteInvoicebox:{
        flex:1,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:2.5,
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
    },
    checkBoxView:{
        marginHorizontal:50,
        marginVertical:45,
        flexDirection:'row',
    },
    whitebg:{
        backgroundColor:'#FFFFFF',
        marginHorizontal:15,
        borderRadius:20,
        marginTop:-60,
        paddingVertical:30,
    },
    PasswordcontainerStyle:{ //all for title &input
        paddingHorizontal:20,
    },
});

export default Userstyle;