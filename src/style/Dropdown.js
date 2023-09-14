const { StyleSheet } = require("react-native");
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const dropdown =StyleSheet.create({
    box:{
        marginHorizontal:moderateScale(60),
        fontSize:moderateScale(30),
        
    },
    dropdown:{
        marginHorizontal:moderateScale(60),
        backgroundColor:"#C6C6C6",
        
    },
    boxTwo:{
        marginHorizontal:moderateScale(10),
        width:moderateScale(180),
        fontSize:moderateScale(30),
        
    },
    dropdownTwo:{
        width:moderateScale(180),
        marginHorizontal:moderateScale(10),
        backgroundColor:"#C6C6C6",
        height:moderateScale(150),
        
    },
    squareDropdown:{
        backgroundColor:'#FAFAFA',
        height:moderateScale(200),
        zIndex:1,
        borderRadius:0,
        marginHorizontal:moderateScale(20),
    },
    squareBox:{ //方形下拉選單box
        height:moderateScale(50,0.45),
        paddingLeft:moderateScale(10),
        alignSelf:'center',
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
    },
    squareContainer:{ //方形下拉選單droplist
        //paddingHorizontal:moderateScale(20),
        width:moderateScale(310,1.1),
        //height:500,
        //marginHorizontal:moderateScale(20),
        alignSelf:'center',
        zIndex:10000,
        borderRadius:0,
        borderWidth:0,
        backgroundColor:'#FAFAFA',
    },
    squareDropdownText:{
        color: '#777',
    },
    squareBoxTwo:{ //方形下拉選單box
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
    squareContainerTwo:{ //方形下拉選單droplist
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