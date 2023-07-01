import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { text } from "@fortawesome/fontawesome-svg-core";
import { SelectList } from "react-native-dropdown-select-list";
import dropdown from "../../style/Dropdown";
import { faBottleWater, faCheck, faChevronDown, faCircleInfo, faDrumstickBite, faLeaf, faLemon, faPizzaSlice, faShrimp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropDownPicker from "react-native-dropdown-picker";

const HandAddScreen=()=>{
    //console.log("UpdateUserPhoneScreen");
    
    const navigation=useNavigation();
    const [foodName,setFoodName]=useState("");
    const [foodDate,setFoodDate]=useState("");
    const [foodCatgory,setFoodCatgory]=useState("");
    const [foodList,setFoodList]=useState([]);

    const [open, setOpen] = useState(false);
    const [foodCatgoryList, setFoodCatgoryList] = useState([
        { label: '蔬菜類', value: '蔬菜類' ,icon: () => <FontAwesomeIcon icon={faLeaf} color="#777" style={{left:10}} />},
        { label: '肉類', value: '肉類' ,icon: () => <FontAwesomeIcon icon={faDrumstickBite} color="#777" style={{left:10}} />},
        { label: '海鮮', value: '海鮮' ,icon: () => <FontAwesomeIcon icon={faShrimp} color="#777" style={{left:10}} />},
        { label: '飲品類', value: '飲品類' ,icon: () => <FontAwesomeIcon icon={faBottleWater} color="#777" style={{left:10}} />},
        { label: '水果類', value: '水果類' ,icon: () => <FontAwesomeIcon icon={faLemon} color="#777" style={{left:10}} />},
        { label: '加工食品類', value: '加工食品類',icon: () => <FontAwesomeIcon icon={faPizzaSlice} color="#777" style={{left:10}} /> },
        { label: '其他', value: '其他',icon: () => <FontAwesomeIcon icon={faCircleInfo} color="#777" style={{left:10} }/>},
    ]);
    const addFood=()=>{
        setFoodList([...foodList,{"foodName":foodName,"foodDate":foodDate,"foodCatgory":foodCatgory}]);
    }

    useEffect(() => {
        setFoodName("");
        setFoodDate("");
        setFoodCatgory("");
        console.log(foodList);
      }, [foodList]);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={Userstyle.greyBg}>
                    
                        <Input
                        label="食物名稱"
                        labelStyle={Userstyle.lable1}
                        containerStyle={[Userstyle.containerStyle1,{marginTop:30,marginBottom:10}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        //keyboardType="default"
                        value={foodName}
                        onChangeText={text=>setFoodName(text)}
                        />

                        <Input
                        label="有效日期/天"
                        labelStyle={Userstyle.lable1}
                        containerStyle={[Userstyle.containerStyle1,{marginTop:0,marginBottom:30}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        keyboardType="numeric"
                        errorMessage="如未輸入則系統自行判定有效期限"
                        value={foodDate}
                        onChangeText={text=>setFoodDate(text)}
                        />
                    
                        <DropDownPicker
                            onPress={Keyboard.dismiss}
                            placeholder="選擇食物種類"
                            style={dropdown.squareBox}
                            containerStyle={dropdown.squareContainer}
                            textStyle={{fontSize:15,color:'#777'}}
                            placeholderStyle={{color:'#777'}}
                            searchable={true}
                            searchPlaceholder="搜尋"
                            searchPlaceholderTextColor="#777"
                            searchContainerStyle={{alignSelf:'center',justifyContent:'center',flex:1,}}
                            searchTextInputStyle={{color: "#777",borderColor:'transparent',fontSize:17,}}
                            dropDownContainerStyle={{borderRadius:0}}
                            listItemLabelStyle={{paddingTop:5,color: "#777",fontSize:15,height:25,paddingLeft:10,}}
                            selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}}
                            selectedItemContainerStyle={{backgroundColor: "#FFC55A"}}
                            TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />}
                            iconContainerStyle={{marginRight: 15}}
                            open={open}
                            setOpen={setOpen}
                            value={foodCatgory}
                            setValue={setFoodCatgory}
                            items={foodCatgoryList}    
                            //setItems={setFoodCatgoryList}
                        >
                        </DropDownPicker>
                          
                        <Button
                        buttonStyle={[Userstyle.buttonUpdate,]}
                        title="新增其他食物"
                        onPress={()=>{addFood()}}
                        />

                        <Button
                        buttonStyle={styles.nextButton}
                        title="下一步"
                        onPress={()=>{navigation.navigate("InvoiceToRef")}}
                        />

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};


const styles=StyleSheet.create({
    nextButton:{
        backgroundColor:"#A9FF3C",
        marginBottom:50,
        marginHorizontal:20,
        borderRadius:20,
    },
});

export default HandAddScreen;