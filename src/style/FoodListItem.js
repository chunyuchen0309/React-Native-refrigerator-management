const { StyleSheet } = require("react-native");

import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const foodListItem =StyleSheet.create({
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
    listTitleLeft:{
        color:'#878787',
        fontSize:moderateScale(20),
        //backgroundColor:'blue',
        flex:1,
        textAlign:'left',
        width:moderateScale(140,1.7),
        paddingTop:moderateScale(10),
    },
    listTitleRight:{
        flexWrap:'nowrap',
        flexDirection:'row',
        color:'#878787',
        fontSize:moderateScale(20),
        //textAlign:"right",
        justifyContent:'space-between',
        marginEnd:moderateScale(10),
        paddingTop:moderateScale(10),
        //backgroundColor:'blue',
        width:moderateScale(110),
    },
    dateText:{
        color:'#878787',
        fontSize:moderateScale(20),
        textAlign:"right",
        marginEnd:moderateScale(5),
        //paddingTop:moderateScale(10),
    }



})

export default foodListItem;