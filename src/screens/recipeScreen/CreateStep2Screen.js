import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecipeStyle from "../../style/RecipeStyle";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { faBookmark, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { moderateScale } from "../ScaleMethod";
import { FlashList } from "@shopify/flash-list";
import IngredientsList from "../recipeList/IngredientsList";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../../store/createRecipeSlice";

const CreateStep2Screen=()=>{
    const navigation = useNavigation();
    const [ingredients,setIngredients]=useState();
    const [unit,setUnit]=useState();
    const [ingredientsList,setIngredientsList]=useState([]);
    const state = useSelector(state => state.createRecipe);
    const dispatch =useDispatch();
    
    /**
     * 判斷是否完整輸入食材資訊
     */
    const addIngredients =()=>{
        if(ingredients && unit){
            setIngredientsList([...ingredientsList,{"ingredientsName":ingredients,"ingredientsUnit":unit}]);
        }else{
            Alert.alert("請完整輸入食材資訊");
        }
    }
    /**
     * 食材列表刪除回傳
     * @param {*} index 
     * @param {*} item 
     */
    const handleDeleteItem=(index,item)=>{
        console.log("刪除的index: ",index);
        const updatedData=ingredientsList.filter((item, i) => i !== index); 
        //filter 方法接受一個回調函數，這個回調函數對陣列中的每個元素執行判斷，如果回傳 true，該元素將被保留，否則將被移除
        setIngredientsList(updatedData);
    }

    useEffect(() => {
        setIngredients("");
        setUnit("");
        //console.log("新增食材列表: ",ingredientsList);
    }, [ingredientsList]);
    /**
     * 前往下一頁
     */
    const nextPage=()=>{
        if(ingredientsList.length == 0){
            Alert.alert("請完成所有選項輸入");
            //navigation.navigate('createStep3'); //測試時暫時開啟
        }else{
            dispatch(
                setInfo(
                {
                    ingredients:ingredientsList
                })
            );
            navigation.navigate('createStep3');
            
        }
    }
    return (
        <SafeAreaView style={{flex:1}}>
                <View style={{flexDirection:'row',flexWrap:'nowrap',marginTop:moderateScale(20),justifyContent:'space-between',marginBottom:moderateScale(10),}}>
                    <Text 
                        style={[RecipeStyle.inputLabel,{paddingBottom:0,paddingTop:moderateScale(2)}]}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                        食材名稱及單位
                    </Text>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"新增食材按鈕"}
                        title={"＋新增食材"}
                        titleStyle={{fontSize:moderateScale(12),fontWeight:'bold',color:'#404496',height:moderateScale(17)}}
                        buttonStyle={RecipeStyle.addButton}
                        onPress={()=>addIngredients()}>

                    </Button>
                </View>       
                <Input
                    accessible={true}
                    accessibilityLabel="食材名稱"
                    accessibilityRole="none"
                    returnKeyType='done'
                    selectionColor='#777'
                    inputContainerStyle={RecipeStyle.input}
                    inputStyle={RecipeStyle.inputText}
                    value={ingredients}
                    onChangeText={(text)=>{setIngredients(text)}}
                    clearButtonMode="while-editing"
                    leftIcon={()=><FontAwesomeIcon icon={faBookmark} size={moderateScale(20)} color="#FF9900" style={{marginStart:moderateScale(10)}}></FontAwesomeIcon>}
                />
                <Input
                    accessible={true}
                    accessibilityLabel="單位"
                    accessibilityRole="none"
                    returnKeyType='done'
                    selectionColor='#777'
                    containerStyle={{marginTop:moderateScale(-10),}}
                    inputContainerStyle={RecipeStyle.input}
                    inputStyle={RecipeStyle.inputText}
                    value={unit}
                    onChangeText={(text)=>{setUnit(text)}}
                    clearButtonMode="while-editing"
                    leftIcon={()=><FontAwesomeIcon icon={faScaleBalanced} size={moderateScale(20)} color="#777" style={{marginStart:moderateScale(10)}}></FontAwesomeIcon>}
                />
                <View style={styles.ingredients}>
                    <FlashList
                        accessibilityRole={"none"}
                        accessibilityLabel={"食材清單列表"}
                        ListEmptyComponent={
                            <Text style={{
                                flex:1,
                                textAlign:'center',
                                color:'#6D6D6D',
                                fontWeight:'bold',
                                fontSize:moderateScale(20),}}>
                                食材清單
                            </Text>
                            }
                        data={ingredientsList}
                        estimatedItemSize={60}
                        renderItem={({item,index})=>{
                            return (
                                <IngredientsList
                                data={item}
                                handleDelete={() => handleDeleteItem(index, item)}
                                index={index}
                                >
                                </IngredientsList>
                            )
                        }}
                    />

                </View>
                <Button
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={"前往下一步按鈕"}
                    buttonStyle={[RecipeStyle.nextButton,{marginVertical:moderateScale(10),}]}
                    titleStyle={{fontSize:moderateScale(20),fontWeight:'bold',}}
                    title={"下一步"}
                    onPress={()=>nextPage()}>
                </Button>

            
        </SafeAreaView>
    );
};

const styles=StyleSheet.create({
    ingredients:{
        flex: 1,  
        backgroundColor: '#ECEAEA',
        //height: verticalScale(320),
        marginHorizontal: moderateScale(30),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
    }
})

export default CreateStep2Screen;