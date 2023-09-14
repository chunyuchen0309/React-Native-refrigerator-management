const { StyleSheet } = require("react-native");

import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const modal_fab =StyleSheet.create({
    /**
     * Modal白底背景
     */
    modalView:{
        opacity:1,
        borderRadius:moderateScale(10),
        alignSelf:'center',
        //justifyContent:'center',
        backgroundColor:'#FFFFFF',
        width:moderateScale(280),
        height:moderateScale(200),
    },
    creatRefModalView:{
        //opacity:1,
        borderRadius:moderateScale(10),
        alignSelf:'center',
        justifyContent:'flex-start',
        backgroundColor:'transparent',
        flex:1,
        //width:moderateScale(280),
        //height:moderateScale(200),
    },
    /**
     * Modal置中標題
     */
    modalTitle:{
        marginVertical:moderateScale(40),
        marginHorizontal:moderateScale(20),
        fontSize:moderateScale(20),
        color:'#FFFFFF',
        textAlign:'center',
        fontWeight:'600',
    },
    /**
     * Modal內容文字
     */
    modalContent:{
        marginHorizontal:moderateScale(40),
        flex:1,
        flexDirection:'row',
        flexWrap:'nowrap',
    },
    /**
     * FAB右上位置  
     * 白色燈泡＿淺藍底
     */
    fabRight:{
        zIndex:2,
        right:moderateScale(20),
        bottom:moderateScale(20),
        backgroundColor:"#A7DCFF",
        shadowColor:'#10348D',
        shadowOffset:{
            width:0,
            height:moderateScale(5)},
        shadowOpacity:0.5,
        shadowRadius:moderateScale(3.5),
        elevation:moderateScale(5),
    },
    headerfab:{
        zIndex:5,
        //right:moderateScale(20),
        bottom:moderateScale(-27,0.2),
        backgroundColor:"#A7DCFF",
        shadowColor:'#10348D',
        shadowOffset:{
            width:0,
            height:moderateScale(5)},
        shadowOpacity:0.5,
        shadowRadius:moderateScale(3.5),
        elevation:moderateScale(5),
    },
})

export default modal_fab;