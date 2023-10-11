const { StyleSheet } = require("react-native");
import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod"
const Userstyle =StyleSheet.create({

    safeAreaView:{
        flex:1, 
        justifyContent:'flex-start',
        //alignItems:'center'
    },
    /**
     * 灰色背景
     */
    greyBg:{ 
        backgroundColor:'#ECEAEA',
        marginHorizontal:moderateScale(20),
        borderRadius:moderateScale(20),
        marginTop:moderateScale(100),
    },
    searchInput:{
        height:moderateScale(45),
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(3)},
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation:moderateScale(1.5),
        marginHorizontal:moderateScale(20),
    },
    /**
     * 輸入匡的text
     */
    textLabel:{
        marginHorizontal:moderateScale(20),
        color:'#878787',
        fontWeight:'bold',
        fontSize:moderateScale(18),
        paddingBottom:moderateScale(5),
        marginTop:moderateScale(50),
    },
    textContainerStyle:{
        paddingHorizontal:moderateScale(20),
        marginBottom:moderateScale(100),
        height:moderateScale(45),
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(3)},
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation:moderateScale(1.5),
        color:'#878787',
        marginHorizontal:moderateScale(20),
        fontSize:moderateScale(20),
    },
    textLabelTwo:{
        marginHorizontal:moderateScale(20),
        color:'#878787',
        fontWeight:'bold',
        fontSize:moderateScale(18),
        paddingBottom:moderateScale(5),
        marginTop:moderateScale(20),
    },
    textContainerStyleTwo:{
        paddingHorizontal:moderateScale(20),
        marginBottom:moderateScale(0),
        height:moderateScale(45),
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(3)},
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation:moderateScale(1.5),
        color:'#878787',
        marginHorizontal:moderateScale(20),
        fontSize:moderateScale(20),
    },
    /**
     * 輸入欄位標題
     */
    lable1:{ //title
        fontSize:moderateScale(18),
        marginBottom:moderateScale(10),
    },
    containerStyle1:{ //all for title &input
        paddingHorizontal:moderateScale(20),
        marginTop:moderateScale(50),
        marginBottom:moderateScale(100),
    },
    containerStyle2:{ //all for title &input
        paddingHorizontal:moderateScale(20),
    },
    inputContainerStyle1:{ //input
        height:moderateScale(45),
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation:moderateScale(1.5),
    },
    inputStyle1:{ //inside font
        color:'#878787',
        marginHorizontal:moderateScale(10),
        fontSize:moderateScale(20),   
    },
    /**
     * 上傳按鈕
     */
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
        height:moderateScale(200),
        marginHorizontal:moderateScale(20),
        borderRadius:moderateScale(20),
        paddingVertical:moderateScale(20),
    },
    listButton:{
        height:moderateScale(35),
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    listTitle:{
        paddingTop:moderateScale(5),
        textAlign:'center',
        color:'#878787',
        fontSize:moderateScale(20),
    },
    list_outTitle:{
        fontSize:moderateScale(25),
        textAlign:'center',
        marginTop:moderateScale(60),
        marginBottom:moderateScale(5),
        color:"#777",
    },
    deletebox:{
        height:moderateScale(35),
        width:moderateScale(50),
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(2.5),
        marginLeft:moderateScale(-20),
        borderRadius:0,
        backgroundColor:'#FF3F3F',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    deleteInvoicebox:{
        flex:1,
        height:moderateScale(50),
        alignItems:'center',
        justifyContent:'center',
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#FF3F3F',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    deletetext:{
        color:"#FFFFFF",
        fontSize:moderateScale(15),
    },
    checkBoxView:{
        marginHorizontal:moderateScale(50),
        marginVertical:moderateScale(45),
        flexDirection:'row',
    },
    whitebg:{
        backgroundColor:'#FFFFFF',
        marginHorizontal:moderateScale(15),
        borderRadius:moderateScale(20),
        marginTop:moderateScale(-60),
        paddingVertical:moderateScale(30),
    },
    PasswordcontainerStyle:{ //all for title &input
        paddingHorizontal:moderateScale(20),
    },
});

export default Userstyle;