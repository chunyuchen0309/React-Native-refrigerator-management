import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Button, FAB, Input, } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import dropdown from "../../style/Dropdown";
import { faAngleDown, faAngleUp, faBottleWater, faBox, faBoxOpen, faCheck, faChevronDown, faCircleInfo, faDrumstickBite, faLeaf, faLemon, faLightbulb, faPizzaSlice, faSeedling, faShrimp, faTruckPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-date-picker';
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import Modal from "react-native-modal";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFood, clearList } from "../../store/createFoodSlice";
import { TouchableOpacity } from "react-native";
const HandAddScreen = () => {
    //console.log("UpdateUserPhoneScreen");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState("");
    const [foodCatgory, setFoodCatgory] = useState("");
    const [foodList, setFoodList] = useState([]);
    const [date, setDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const [foodCatgoryList, setFoodCatgoryList] = useState([
        { label: '蔬菜類', value: 'b9db4f16-8eb5-4de7-b028-739df646e9af', icon: () => <Image source={require("../../../Img/foodpic/蔬菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '肉類', value: '50164000-6332-4b8e-bda4-50a7d0392e1b', icon: () => <Image source={require("../../../Img/foodpic/肉類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '海鮮', value: 'cc1b00f1-d6c1-47dd-954d-c5d8613ec288', icon: () => <Image source={require("../../../Img/foodpic/海鮮.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '飲品類', value: 'e2eec36b-7ac9-445e-ae35-04cba2c615e9', icon: () => <Image source={require("../../../Img/foodpic/飲料.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '水果類', value: '3ec0a82a-2661-4e6b-a2ff-3412c2407307', icon: () => <Image source={require("../../../Img/foodpic/水果.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '加工食品類', value: 'b014bd14-6f5e-46d0-a166-80dbf0a15740', icon: () => <Image source={require("../../../Img/foodpic/加工食品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '冰品', value: 'f30cb1da-9482-4f74-a8d6-756158468a7f', icon: () => <Image source={require("../../../Img/foodpic/冰品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '甜點', value: 'fbc120bc-0192-41f3-b996-f3df43ba1122', icon: () => <Image source={require("../../../Img/foodpic/甜點.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '奶製品', value: '9b7491dd-8ff7-4da5-9b7d-3b1a53d6d4f1', icon: () => <Image source={require("../../../Img/foodpic/奶製品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '豆類', value: '34d184a7-c6d8-469e-b6be-9d76c0496ac2', icon: () => <Image source={require("../../../Img/foodpic/豆類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '雞蛋', value: '6c1f58ac-2925-4423-8db5-d5277da6a0e2', icon: () => <Image source={require("../../../Img/foodpic/雞蛋.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '剩菜', value: '35eed315-948e-4439-8980-cb030d1b2d81', icon: () => <Image source={require("../../../Img/foodpic/剩菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
    ]);

    const { token, } = useContext(AuthContext);
    const dispatch =useDispatch();
    const foodstate = useSelector(state => state.createFood);

    const checkAddFood = () => {
        //增加項目
        if(!foodName ||!foodDate ||!foodCatgory){
            Alert.alert("請完成食物資訊輸入");
        }else{
        
            dispatch(addFood({ "foodName": foodName, "foodDate": foodDate, "foodCatgory": foodCatgory }));
            setFoodName("");
            setFoodDate("");
            setFoodCatgory("");
            setDate(new Date());
            //console.log("redux新增食物資訊 :",foodstate.info);
        }
        
    }
    /**
     * 
     * @param {*} date 
     * 更改日期
     */
    const changeData = (date) => {
        //console.log(date);
        let datelist = date.split(/\s+/);
        //console.log(datelist);
        let tempDate = datelist[3] + "/" + month.indexOf(datelist[1]) + "/" + datelist[2];
        setFoodDate(tempDate);
    }

    /**
     * 取得食物分類ID
     */
    const getFoodCatgoryList = () => {
        axios.get(`${BASE_URL}/storage/category`, {
            headers: {
                'Authorization': token.token
            }
        }).then(async res => {
            console.log(res.data);
        }).catch(async e => {
        });
    }

    useEffect(() => { //設置標題右側按鈕
        navigation.setOptions(
            {
                headerRight: () => (
                    <View style={modal_fab.headerfab}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>
                        </TouchableOpacity>
                    </View>
                ),
            }
        );
    }, []);



    useEffect(() => {
        //getFoodCatgoryList();
        
    }, []);

    //console.log(foodList);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <Modal
                        animationIn={"fadeIn"}
                        animationInTiming={800}
                        animationOut={"fadeOut"}
                        animationOutTiming={800}
                        isVisible={modalVisible}
                        backdropOpacity={0.9}
                        onBackdropPress={() => setModalVisible(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: moderateScale(95, -0.6) }}>
                                <Button
                                    buttonStyle={[Userstyle.buttonUpdate, { marginVertical: 0 }]}
                                    title="新增食物"
                                    titleStyle={{ fontSize: moderateScale(20) }}
                                    onPress={() => { addFood() }}
                                />
                                <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(30) }}>
                                    <Image source={require('../../../Img/arrow.png')}></Image>
                                    <Text style={modal_fab.modalTitle}>完成輸入後按下新增按鈕即可新增該食物資訊</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <View style={{ height: moderateScale(100) }}>
                        <FAB
                            color={foodstate.info.length > 0 ? "#0080D5" : "#A7DCFF"}
                            style={[modal_fab.handAddBox,]}
                            visible={true}
                            //size="small"
                            placement="right"
                            icon={<FontAwesomeIcon icon={foodstate.info.length > 0 ? faBox : faBoxOpen} color="#FFFFFF" size={25}></FontAwesomeIcon>}
                            title={foodstate.info.length}>
                        </FAB>
                    </View>
                    <View style={[Userstyle.greyBg, { marginTop: 0 }]}>

                        <Text style={Userstyle.textLabel}
                            accessible={false}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityState={{ disabled: true }} >
                            食物名稱
                        </Text>
                        <TextInput
                            returnKeyType='done'
                            selectionColor='#777'
                            accessibilityLabel="食物名稱"
                            accessible={true}
                            style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(-25) }]}
                            value={foodName}
                            onChangeText={text => setFoodName(text)}
                        />

                        <Text style={Userstyle.textLabel}
                            accessible={false}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityState={{ disabled: true }} >
                            到期日期
                        </Text>
                        <TextInput
                            accessibilityLabel="到期日期"
                            accessible={true}
                            style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(40) }]}
                            value={foodDate}
                            //onChangeText={text=>setFoodDate(text)}
                            onPressIn={() => { setDatePickerOpen(true) }}
                        />

                        <DatePicker
                            title={"選擇食物過期日期"}
                            modal
                            mode="date"
                            open={datePickerOpen}
                            date={date}
                            onConfirm={(date) => {
                                setDatePickerOpen(false)
                                changeData("" + date);
                            }}
                            onCancel={() => {
                                setDatePickerOpen(false)
                            }}
                        />

                        <DropDownPicker
                            //controller={(instance) => dropDownRef.current = instance}
                            zIndex={9000}
                            onPress={Keyboard.dismiss}
                            placeholder="選擇食物種類"
                            style={dropdown.squareBox}
                            containerStyle={dropdown.squareContainer}
                            textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                            placeholderStyle={{ color: '#777', fontWeight: '500' }}
                            searchable={false}
                            dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                            listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5) }} //下方item內容文字
                            listItemContainerStyle={{ height: moderateScale(35) }} //下方item高度 
                            selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
                            selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
                            TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                            listParentContainerStyle={{ paddingLeft: moderateScale(20) }}
                            listParentLabelStyle={{ fontWeight: "bold" }}
                            listChildContainerStyle={{}}
                            //iconContainerStyle={{paddingLeft:moderateScale(0)}} //item左方icon設定
                            maxHeight={moderateScale(250)}
                            open={open}
                            setOpen={setOpen}
                            value={foodCatgory}
                            setValue={setFoodCatgory}
                            items={foodCatgoryList}
                            closeOnBackPressed={true}
                            closeAfterSelecting={true}
                            
                            ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                            ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                        </DropDownPicker>
                        <Button
                            buttonStyle={[Userstyle.buttonUpdate,]}
                            title="新增食物"
                            titleStyle={{ fontSize: moderateScale(20) }}
                            onPress={() => { checkAddFood() }}
                        />
                        <Button
                            buttonStyle={styles.nextButton}
                            title="下一步"
                            titleStyle={{ fontSize: moderateScale(20) }}
                            onPress={() => { navigation.navigate("HandToRef")}}
                        />

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: "#A6FCB6",
        marginBottom: moderateScale(50),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
    },
    iconImg: {
        //flex:1,
        //backgroundColor:"black",
        width: moderateScale(20),
        height: moderateScale(20),
        //marginVertical:moderateScale(),
    },
});

export default HandAddScreen;