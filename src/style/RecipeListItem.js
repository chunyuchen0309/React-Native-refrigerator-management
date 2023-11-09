const { StyleSheet } = require("react-native");

import { scale, moderateScale, verticalScale} from "../screens/ScaleMethod";
const RecipeListItem =StyleSheet.create({
    /**
     * 食譜最外層Item
     */
    listButton:{
        marginHorizontal:moderateScale(15),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#F7F7F7',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        height:moderateScale(85), 
        flexWrap:'nowrap',
        flexDirection:'row',
    },
    /**
     * 食譜照片
     */
    recipeImg:{
        height:moderateScale(68),
        width:moderateScale(100),
        alignSelf:'center',
        borderRadius:moderateScale(10),
        marginHorizontal:moderateScale(10),
    },
    /**
     * 不包含圖片內層群組
     */
    containerGroup:{
        //backgroundColor:'gray',
        flexDirection:'column',
        flex:1,
        marginHorizontal:moderateScale(5),
        marginEnd:moderateScale(10),
    },
    /**
     * 食譜名稱以及喜愛Icon群組
     */
    title_like:{
        flex:1,
        //backgroundColor:'yellow',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:moderateScale(5),
    },
    /**
     * 食譜Text
     */
    recipeTitle:{
        fontSize:moderateScale(20),
        fontWeight:'500',
        //backgroundColor:'#FFE8AE',
        color:'#777',
        flex:1,
        lineHeight:moderateScale(30),
    },
    /**
     * 分類及烹飪時間及難易度群組
     */
    category_time_difficult:{
        //flex:1,
        //backgroundColor:'#AEFFCA',
        flexDirection:'row',
        alignItems:'flex-end',
        paddingTop:moderateScale(5),
        marginBottom:moderateScale(10),
    },
    /**
     * 分類Text
     */
    categoryTitle:{
        fontSize:moderateScale(13),
        fontWeight:'bold',
        //backgroundColor:'#FFE8AE',
        flex:1,
        color:'#404496',
        //lineHeight:moderateScale(30),   
    },
    /**
     * 難易度Text
     */
    difficult:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    /**
     * 食譜滑動刪除Box
     */
    deleteBox:{
        flex:1,
        height:moderateScale(70),
        alignItems:'center',
        justifyContent:'center',
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#FF3F3F',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(1)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:moderateScale(1.5),
        marginHorizontal:moderateScale(15),
    },
    /**
     * 食材最外層Item
     */
    ingredientsListButton:{
        marginHorizontal:moderateScale(15),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#CECECE',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        height:moderateScale(85), 
    },
    /**
     * 食材名稱及單位Group
     */
    ingredientsView:{
        flexDirection:'row',
        flexWrap:'nowrap',
        flex:1,
        alignItems:'center',
        marginHorizontal:moderateScale(10),
        backgroundColor:'#FFFFFF',
        borderRadius:moderateScale(10),
    },
    /**
     * 食材名稱及單位Text
     */
    ingredientsViewText:{
        //backgroundColor:'gray',
        fontSize:moderateScale(15),
        fontWeight:'500',
        color:'#6D6D6D'
    },
    /**
     * 烹飪步驟最外層Item
     */
    ProcedureListButton:{
        marginHorizontal:moderateScale(15),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#F7F7F7',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        height:moderateScale(100), 
        paddingHorizontal:moderateScale(10),
        paddingBottom:moderateScale(5),
    },
    ModifyProcedureListButton:{
        marginHorizontal:moderateScale(10),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#F7F7F7',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        height:moderateScale(100), 
        paddingHorizontal:moderateScale(10),
        paddingBottom:moderateScale(5),
        flex:1,
    },
    RecipeIngredientsButton:{
        marginHorizontal:moderateScale(0),
        marginBottom:moderateScale(2.5),
        borderRadius:0,
        backgroundColor:'#F7F7F7',
        shadowColor:'black',
        shadowOffset:{width:0,height:moderateScale(2)},
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation:1.5,
        
        height:moderateScale(60), 
        flexDirection:'row',
        flexWrap:'nowrap',
    },
    recipeIngredientsView:{
        flexDirection:'row',
        flexWrap:'nowrap',
        flex:1,
        alignItems:'center',
        marginHorizontal:moderateScale(10),
        backgroundColor:'#FFFFFF',
        borderRadius:moderateScale(10),
        marginVertical:moderateScale(10),
    }



})

export default RecipeListItem;