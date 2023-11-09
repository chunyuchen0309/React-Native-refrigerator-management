import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecipeStyle from "../../style/RecipeStyle";
import { Button, Input } from "react-native-elements";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FlashList } from "@shopify/flash-list";
import ProcedureList from "../recipeList/ProcedureList";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setInfo, setObjectProcedure, upRecipeApi } from "../../store/createRecipeSlice";

const CreateStep3Screen=()=>{
    const navigation = useNavigation();
    const [procedureList,setProcedureList]=useState([]);
    const [procedure,setProcedure]=useState('');

    const state = useSelector(state => state.createRecipe);
    const dispatch =useDispatch();

    const arrayToObject_Procedure=()=>{
        //console.log("新增食材array: ",state.info.ingredients);
        let tempProcedure=procedureList;
        let objProcedure={};
        tempProcedure.forEach((item, index) => {
            objProcedure[index] = item;
            });
        console.log("precedure : ",objProcedure);
        dispatch(setObjectProcedure(objProcedure));
    }
    
    
    /**
     * 判斷是否完成步驟輸入
     */
    const addProcedure =()=>{
        if(procedure){
            setProcedureList([...procedureList,procedure]);
        }else{
            Alert.alert("請完整輸入步驟資訊");
        }
    }
    /**
     * 步驟列表刪除回傳
     * @param {*} index 
     * @param {*} item 
     */
    const handleDeleteItem=(index,item)=>{
        console.log("刪除的index: ",index);
        const updatedData=procedureList.filter((item, i) => i !== index); 
        //filter 方法接受一個回調函數，這個回調函數對陣列中的每個元素執行判斷，如果回傳 true，該元素將被保留，否則將被移除
        setProcedureList(updatedData);
    }
    /**
     * 前往下一頁
     */
    const nextPage=async ()=>{
        if(procedureList.length == 0){
            Alert.alert("請完成所有選項輸入");
            //navigation.navigate('List'); //測試時暫時開啟
        }else{
            await arrayToObject_Procedure();
            await dispatch(
                setInfo(
                {
                    procedure:procedureList
                })
            );
            await dispatch(upRecipeApi());
            navigation.navigate('List');
        }
    }

    useEffect(() => {
        setProcedure("");
        
        //console.log("新增步驟列表: ",procedureList);
        
    }, [procedureList]);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flexDirection:'row',flexWrap:'nowrap',marginTop:moderateScale(20),justifyContent:'space-between',marginBottom:moderateScale(10),}}>
                <View style={{flexDirection:'row',flexWrap:'nowrap',marginHorizontal:moderateScale(30),}}>
                    <View style={{
                        backgroundColor:'#3E5481',
                        width:moderateScale(30),
                        height:moderateScale(30),
                        borderRadius:moderateScale(50),
                        }}>
                        <Text style={{
                            color:'#FFFFFF',
                            textAlign:'center',
                            alignItems:'center',
                            fontWeight:'bold',
                            lineHeight:moderateScale(30)}}>
                        {procedureList.length+1}
                        </Text>
                    </View>
                    <Text 
                        style={[RecipeStyle.inputLabel,{marginHorizontal:moderateScale(5),paddingBottom:moderateScale(0),lineHeight:moderateScale(30)}]}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                        烹飪步驟
                    </Text>
                    
                </View>
                <Button
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={"新增步驟按鈕"}
                    title={"＋新增步驟"}
                    titleStyle={{fontSize:moderateScale(12),fontWeight:'bold',color:'#404496',height:moderateScale(17)}}
                    buttonStyle={RecipeStyle.addButton}
                    onPress={()=>addProcedure()}>
                </Button>
            </View>   
            <Input
                accessible={true}
                accessibilityRole={"none"}
                accessibilityLabel={"烹飪步驟輸入欄位"}
                returnKeyType='done'
                selectionColor='#777'
                inputContainerStyle={[RecipeStyle.input,{height:moderateScale(100),paddingTop:moderateScale(10)}]}
                inputStyle={[RecipeStyle.inputText,{padding:moderateScale(10)}]}
                multiline={true}
                value={procedure}
                onChangeText={(text)=>{setProcedure(text)}}
                clearButtonMode="while-editing"
                textAlignVertical='top'
            />
            <View style={styles.ingredients}>
                <FlashList
                    accessibilityRole={"none"}
                    accessibilityLabel={"烹飪步驟列表"}
                    ListEmptyComponent={
                        <Text style={{
                            flex:1,
                            textAlign:'center',
                            color:'#6D6D6D',
                            fontWeight:'bold',
                            fontSize:moderateScale(20),}}>
                            烹飪步驟
                        </Text>
                        }
                    data={procedureList}
                    estimatedItemSize={60}
                    renderItem={({item,index})=>{
                        return (
                            <ProcedureList
                            data={item}
                            handleDelete={() => handleDeleteItem(index, item)}
                            index={index}
                            >
                            </ProcedureList>
                        )
                    }}
                />
            </View>
            <Button
                buttonStyle={[RecipeStyle.nextButton,{marginVertical:moderateScale(10),}]}
                titleStyle={{fontSize:moderateScale(20),fontWeight:'bold',}}
                title={"完成建立"}
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
export default CreateStep3Screen;