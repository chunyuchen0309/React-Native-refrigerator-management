const { StyleSheet } = require("react-native");

import { scale, moderateScale, verticalScale } from "../screens/ScaleMethod";
const RecipeStyle = StyleSheet.create({

    /**
     * 食譜步驟1/3＿圖片
     */
    imgView: {
        borderStyle: 'dashed',
        borderColor: '#D0DBEA',
        height: moderateScale(150),
        
        borderWidth: moderateScale(2),
        margin: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    /**
     * 輸入框
     */
    input: {
        height: moderateScale(45),
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1,5),
        marginHorizontal: moderateScale(20),
    },
    /**
     * 輸入框文字
     */
    inputText: {
        color: '#878787',
        marginHorizontal: moderateScale(10),
        fontSize: moderateScale(20),
        textAlignVertical: 'top',
        alignSelf: 'flex-start',
    },
    /**
     * 輸入框標題
     */
    inputLabel: {
        marginHorizontal: moderateScale(30),
        color: '#878787',
        fontWeight: 'bold',
        fontSize: moderateScale(18),
        paddingBottom: moderateScale(5),
        //backgroundColor:'#A6FCB6',
    },
    /**
     * 下一步案紐
     */
    nextButton: {
        //flex:1,
        marginHorizontal: moderateScale(30),
        marginVertical: moderateScale(40),
        marginBottom: moderateScale(20),
        borderRadius: moderateScale(15),
        backgroundColor: '#A6FCB6',
    },
    /**
     * 新增列表欄位按鈕
     */
    addButton: {
        borderRadius: moderateScale(10),
        backgroundColor: '#A7DCFF',
        height: moderateScale(25),
        marginBottom: moderateScale(0),
        alignItems: 'center',
        marginEnd: moderateScale(30),
    },
    /**
     * 食譜名稱
     */
    recipelName: {
        color: '#231815',
        marginHorizontal: moderateScale(30),
        marginTop:moderateScale(20),
        fontSize: moderateScale(24),
        fontWeight:'500',
        
        alignSelf: 'flex-start',
    },
    /**
     * 食譜資訊標題
     */
    recipelTitle: {
        color: '#231815',
        marginHorizontal: moderateScale(30),
        marginTop:moderateScale(20),
        fontSize: moderateScale(20),
        fontWeight:'bold',
        alignSelf: 'flex-start',
    },

});

export default RecipeStyle;