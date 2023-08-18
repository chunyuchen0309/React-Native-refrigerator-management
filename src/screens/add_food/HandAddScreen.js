import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, FAB, Input,} from "react-native-elements";
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
import { faBottleWater, faBox, faBoxOpen, faCheck, faChevronDown, faCircleInfo, faDrumstickBite, faLeaf, faLemon, faPizzaSlice, faSeedling, faShrimp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-date-picker';
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
const HandAddScreen=()=>{
    //console.log("UpdateUserPhoneScreen");
    
    const navigation=useNavigation();
    const [foodName,setFoodName]=useState("");
    const [foodDate,setFoodDate]=useState("");
    const [foodCatgory,setFoodCatgory]=useState("");
    const [foodList,setFoodList]=useState([]);
    const [date, setDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [month,setMonth] =useState(["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);
    const [foodCatgoryList, setFoodCatgoryList] = useState([
        { label: '蔬菜類', value: '蔬菜類' ,icon: () => <FontAwesomeIcon icon={faSeedling} color="#777" style={{left:10}} />},
        { label: '肉類', value: '肉類' ,icon: () => <FontAwesomeIcon icon={faDrumstickBite} color="#777" style={{left:10}} />},
        { label: '海鮮', value: '海鮮類' ,icon: () => <FontAwesomeIcon icon={faShrimp} color="#777" style={{left:10}} />},
        { label: '飲品類', value: '飲品類' ,icon: () => <FontAwesomeIcon icon={faBottleWater} color="#777" style={{left:10}} />},
        { label: '水果類', value: '水果類' ,icon: () => <FontAwesomeIcon icon={faLemon} color="#777" style={{left:10}} />},
        { label: '加工食品類', value: '加工食品類',icon: () => <FontAwesomeIcon icon={faPizzaSlice} color="#777" style={{left:10}} />},
        { label: '其他', value: '其他',icon: () => <FontAwesomeIcon icon={faCircleInfo} color="#777" style={{left:10} }/>},
    ]);
    const addFood=()=>{
        //增加項目
        setFoodList([...foodList,{"foodName":foodName,"foodDate":foodDate,"foodCatgory":foodCatgory}]);
    }

    const changeData=(date)=>{
        console.log(date);
        let datelist = date.split(/\s+/);
        console.log(datelist);
        //;
        let tempDate=datelist[3]+"/"+month.indexOf(datelist[1])+"/"+datelist[2];
        setFoodDate(tempDate);
    }

    useEffect(() => {
        setFoodName("");
        setFoodDate("");
        setFoodCatgory("");
        setDate(new Date());
        console.log(foodList);
      }, [foodList]);
    
    //console.log(foodList);
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={{height:moderateScale(100)}}>
                        <FAB 
                            color={foodList.length>0?"#0080D5":"#A7DCFF"}
                            upperCase
                            style={{right:moderateScale(10),
                                backgroundColor:"#A7DCFF",
                                shadowColor:'#10348D',
                                shadowOffset:{
                                    width:0,
                                    height:moderateScale(5),},
                                shadowOpacity:0.5,
                                shadowRadius:3.5,
                                elevation:5,}}
                            visible={true}
                            placement="right"
                            icon={<FontAwesomeIcon icon={foodList.length>0?faBox:faBoxOpen} color="#FFFFFF" size={25}></FontAwesomeIcon>}
                            title={foodList.length}>

                        </FAB>
                    </View>
                    <View style={[Userstyle.greyBg,{marginTop:0}]}>
                    
                        <Input
                        label="食物名稱"
                        labelStyle={[Userstyle.lable1,]}
                        containerStyle={[Userstyle.containerStyle1,{marginTop:moderateScale(30),marginBottom:moderateScale(10)}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        //keyboardType="default"
                        value={foodName}
                        onChangeText={text=>setFoodName(text)}
                        />

                        <Input
                        label="到期日期"
                        labelStyle={Userstyle.lable1}
                        containerStyle={[Userstyle.containerStyle1,{marginTop:moderateScale(0),marginBottom:moderateScale(30)}]}
                        inputContainerStyle={Userstyle.inputContainerStyle1}
                        inputStyle={Userstyle.inputStyle1}
                        errorMessage="如未輸入則系統自行判定有效期限"
                        value={foodDate}
                        //onChangeText={text=>setFoodDate(text)}
                        onPressIn={()=>{setDatePickerOpen(true)}}

                        />
                        <DatePicker
                            //locale="zh"
                            modal
                            mode="date"
                            open={datePickerOpen}
                            date={date}
                            onConfirm={(date) => {
                                setDatePickerOpen(false)
                                changeData(""+date);
                                
                            }}
                            onCancel={() => {
                                setDatePickerOpen(false)
                            }}
                        />
                    
                        <DropDownPicker
                            onPress={Keyboard.dismiss}
                            placeholder="選擇食物種類"
                            style={dropdown.squareBox}
                            containerStyle={dropdown.squareContainer}
                            textStyle={{fontSize:moderateScale(18),color:'#777'}}
                            placeholderStyle={{color:'#777'}}
                            searchable={true}
                            searchPlaceholder="搜尋"
                            searchPlaceholderTextColor="#777"
                            //searchContainerStyle={{alignSelf:'center',justifyContent:'center',flex:1,}}
                            searchTextInputStyle={{color: "#777",borderColor:'transparent',fontSize:moderateScale(17),}}
                            dropDownContainerStyle={{borderRadius:0}}
                            listItemLabelStyle={{paddingTop:moderateScale(5),color: "#777",fontSize:moderateScale(15),height:moderateScale(20),paddingLeft:moderateScale(10),}}
                            selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}}
                            selectedItemContainerStyle={{backgroundColor: "#FFC55A"}}
                            TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />}
                            iconContainerStyle={{marginRight: moderateScale(15)}}
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
                        title="新增食物"
                        titleStyle={{fontSize:moderateScale(20)}}
                        onPress={()=>{addFood()}}
                        />

                        <Button
                        buttonStyle={styles.nextButton}
                        title="下一步"
                        titleStyle={{fontSize:moderateScale(20)}}
                        onPress={()=>{navigation.navigate("HandToRef",{"InvoiceInfo":foodList})}}
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
        marginBottom:moderateScale(50),
        marginHorizontal:moderateScale(20),
        borderRadius:moderateScale(20),
    },
});

export default HandAddScreen;