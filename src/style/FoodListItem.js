const { StyleSheet } = require("react-native");

import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const foodListItem =StyleSheet.create({
    /**
     * 最外層Item
     */
    listButton:{
        marginHorizontal:moderateScale(15),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        height:moderateScale(45), 
        flexWrap:'nowrap',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    /**
     * 左側(食物名稱)
     */
    listTitleLeft:{
        color:'#878787',
        fontSize:moderateScale(20),
        //backgroundColor:'yellow',
        flex:3,
        textAlign:'left',
        //width:moderateScale(140,1.7),
        paddingTop:moderateScale(10),
    },
    /**
     * 右側(過期日期)
     */
    listTitleRight:{
        flexWrap:'nowrap',
        flexDirection:'row',
        color:'#878787',
        fontSize:moderateScale(20),
        //textAlign:"right",
        justifyContent:'flex-end',
        marginEnd:moderateScale(5),
        paddingTop:moderateScale(10),
        //backgroundColor:'blue',
        flex:3,
        //width:moderateScale(110,0.6),
    },
    /**
     * 過期日期文字
     */
    dateText:{
        color:'#878787',
        fontSize:moderateScale(20),
        textAlign:"right",
        marginRight:moderateScale(5),
        width:moderateScale(102,0.9),
        //paddingTop:moderateScale(10),
    },
    /**
     * 滑動刪除組件
     */
    deleteBox:{
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



})

export default foodListItem;