const { StyleSheet } = require("react-native");
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const dropdown =StyleSheet.create({
    /**
     * 方形下拉選單box
     */
    squareBox:{ 
        height:moderateScale(50,0.45),
        paddingLeft:moderateScale(10),
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    /**
     * 方形下拉選單droplist
     */
    squareContainer:{    
        width:moderateScale(310,1.1),
        alignSelf:'center',
        zIndex:10000,
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
    },
    squareDropdownText:{
        color: '#777',
    },
    /**
     * 兩個方形下拉選單box
     */
    squareBoxTwo:{ 
        height:moderateScale(50,0.45),
        paddingLeft:moderateScale(10),
        //justifyContent:'space-between',
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    /**
     * 兩個方形下拉選單droplist
     */
    squareContainerTwo:{ //
        //paddingHorizontal:moderateScale(20),
        width:moderateScale(160,1.1),
        marginHorizontal:moderateScale(10),
        alignSelf:'center',
        //zIndex:10000,
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
    },
})

export default dropdown;