import React, { useCallback, useContext, useEffect, useState } from "react";
import { AccessibilityInfo, Alert, Image, Keyboard, RefreshControl, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { moderateScale } from "./ScaleMethod";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../style/Dropdown";
import { faAngleDown, faAngleUp, faCalendarMinus, faCalendarPlus, faCheck, faRotate, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import Userstyle from "../style/UserStyle";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./foodList/FoodList_Search";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodApi, getFoodInfo } from "../store/foodSlice";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { checkToken } from "../store/userSlice";

const SearchScreen = () => {
    const foodState = useSelector(state => state.foodInfo);
    const { lookModel } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [modalDeleteMoreVisible, setModalDeleteMoreVisible] = useState(false);
    const [foodName, setFoodName] = useState("");
    const [foodCatgory, setFoodCatgory] = useState([]);//下拉選單食物選擇
    const [open, setOpen] = useState(false);//下拉選單開關
    const [dateCategory, setDateCategory] = useState('all');
    const [clickItem, setClickItem] = useState({});
    const refState = useSelector(state => state.refInfo);
    const [foodCatgoryList, setFoodCatgoryList] = useState([ //下拉選單食物列表
        { label: '排序方式', value: '排序方式', disabled: true, },
        { label: '距離過期日長', value: 'long', icon: () => <FontAwesomeIcon icon={faCalendarPlus} color="#777" size={moderateScale(18)} />, parent: '排序方式' },
        { label: '距離過期日短', value: 'short', icon: () => <FontAwesomeIcon icon={faCalendarMinus} color="#777" size={moderateScale(18)} />, parent: '排序方式' },
        { label: '食物分類', value: '食物分類', disabled: true },
        { label: '剩菜', value: '剩菜', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/剩菜.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '飲品類', value: '飲品類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/飲料.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '雞蛋', value: '雞蛋', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/雞蛋.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '冰品', value: '冰品', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/冰品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '甜點', value: '甜點', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/甜點.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '奶製品', value: '奶製品', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/奶製品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '加工食品類', value: '加工食品類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/加工食品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '水果類', value: '水果類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/水果.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '海鮮', value: '海鮮', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/海鮮.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '肉類', value: '肉類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/肉類.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '蔬菜類', value: '蔬菜類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/蔬菜.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
    ]);

    const foodImg = {
        '水果類': <Image source={require("../../Img/foodpic/水果.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '加工食品類': <Image source={require("../../Img/foodpic/加工食品.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '奶製品': <Image source={require("../../Img/foodpic/奶製品.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '冰品': <Image source={require("../../Img/foodpic/冰品.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '肉類': <Image source={require("../../Img/foodpic/肉類.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '豆類': <Image source={require("../../Img/foodpic/豆類.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '海鮮': <Image source={require("../../Img/foodpic/海鮮.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '甜點': <Image source={require("../../Img/foodpic/甜點.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '剩菜': <Image source={require("../../Img/foodpic/剩菜.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '飲品類': <Image source={require("../../Img/foodpic/飲料.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '蔬菜類': <Image source={require("../../Img/foodpic/蔬菜.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '雞蛋': <Image source={require("../../Img/foodpic/雞蛋.png")} resizeMode={"contain"} style={[styles.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>
    };
    const NoImgFoodIcon = [ //下拉選單食物列表
        { label: '排序方式', value: '排序方式', disabled: true, },
        { label: '距離過期日長', value: 'long', parent: "排序方式" },
        { label: '距離過期日短', value: 'short', parent: "排序方式" },
        { label: '食物分類', value: '食物分類', disabled: true },
        { label: '蔬菜類', value: '蔬菜', parent: '食物分類', },
        { label: '肉類', value: '肉', parent: '食物分類', },
        { label: '海鮮', value: '海鮮', parent: '食物分類', },
        { label: '飲品類', value: '飲品類', parent: '食物分類', },
        { label: '水果類', value: '水果', parent: '食物分類', },
        { label: '加工食品類', value: '加工食品', parent: '食物分類', },
        { label: '冰品', value: '冰品', parent: '食物分類', },
        { label: '甜點', value: '甜點', parent: '食物分類', },
        { label: '奶製品', value: '奶製品', parent: '食物分類', },
        { label: '豆類', value: '豆類', parent: '食物分類', },
        { label: '雞蛋', value: '雞蛋', parent: '食物分類', },
        { label: '剩菜', value: '剩菜', parent: '食物分類', },
    ]

    const [searchFoodInfo, setSearchFoodInfo] = useState([]);
    const dispatch = useDispatch();

    /**
     * 類別篩選方法
     */
    const DropToList = () => {
        //console.log("篩選",dateCategory);
        const temp = [];
        for (let i = 0; i < foodCatgory.length; i++) {
            for (let j = 0; j < foodState.foodList.length; j++) {
                if (foodCatgory[i] == foodState.foodList[j].category_name) {
                    //console.log("增加");
                    temp.push(foodState.foodList[j]);
                }
            }
        }
        if (foodCatgory.includes('long')) {
            //foodInfo.sort((a,b)=>b.day-a.day);
            temp.sort((a, b) => b.day - a.day);
            setSearchFoodInfo(temp);
            if (foodCatgory.length == 1) {
                console.log("時間長")
                var t = JSON.parse(JSON.stringify(foodState.foodList))
                setSearchFoodInfo(t.sort((a, b) => b.day - a.day));
            }
        }
        if (foodCatgory.includes('short')) {
            //foodInfo.sort((a,b)=>a.day-b.day);
            temp.sort((a, b) => a.day - b.day);
            setSearchFoodInfo(temp);
            if (foodCatgory.length == 1) {
                console.log("時間短")
                var t = JSON.parse(JSON.stringify(foodState.foodList))
                setSearchFoodInfo(t.sort((a, b) => a.day - b.day));
            }
        }
        if (!foodCatgory.includes('short') && !foodCatgory.includes('long')) {
            console.log("都不包含時間長短")
            setSearchFoodInfo(temp);
        }
        if (dateCategory != 'all') {
            if (foodCatgory.length == 0) {
                var tempFoodList1 = foodState.foodList;
                switch (dateCategory) {
                    case -1:
                        tempFoodList1 = tempFoodList1.filter((item, index) => item.day < 0);
                        console.log(tempFoodList1)
                        break;
                    case 0:
                        tempFoodList1 = tempFoodList1.filter((item, index) => item.day == 0);
                        break;
                    case 1:
                        tempFoodList1 = tempFoodList1.filter((item, index) => item.day == 1);
                        break;
                    case 2:
                        tempFoodList1 = tempFoodList1.filter((item, index) => item.day == 2 || item.day == 3);
                }
                setSearchFoodInfo(tempFoodList1);
            } else {
                var tempFoodList2 = [];
                switch (dateCategory) {
                    case -1:
                        tempFoodList2 = temp.filter((item, index) => item.day < 0);
                        console.log(tempFoodList1)
                        break;
                    case 0:
                        tempFoodList2 = temp.filter((item, index) => item.day == 0);
                        break;
                    case 1:
                        tempFoodList2 = temp.filter((item, index) => item.day == 1);
                        break;
                    case 2:
                        tempFoodList2 = temp.filter((item, index) => item.day == 2 || item.day == 3);
                }
                setSearchFoodInfo(tempFoodList2);
            }
            console.log("日期篩選", dateCategory);
        }

        if (foodCatgory.length == 0 && dateCategory == 'all') {
            console.log("未篩選");
            setSearchFoodInfo(foodState.foodList);
        }

        if (foodName.length > 0) {
            let tempListName = [];
            if (temp.length > 0) {
                for (let i = 0; i < temp.length; i++) {
                    var str = "" + temp[i].ingredient_orignal_name;
                    console.log("搜尋字串",);
                    if (str.includes(foodName)) {
                        tempListName.push(temp[i]);
                    }
                }
            } else {
                for (let i = 0; i < foodState.foodList.length; i++) {
                    var str = "" + foodState.foodList[i].ingredient_orignal_name;
                    console.log("搜尋字串",);
                    if (str.includes(foodName)) {
                        tempListName.push(foodState.foodList[i]);
                    }
                }
            }
            setSearchFoodInfo(tempListName);
        }
        //console.log("篩選列表",searchFoodInfo);
    }

    useEffect(() => {
        // 检查是否同时选择了 "short" 和 "long"
        if (foodCatgory.includes("short") && foodCatgory.includes("long")) {
            if (foodCatgory.indexOf("short") < foodCatgory.indexOf("long")) {
                setFoodCatgory((prevCatgory) => prevCatgory.filter((item) => item !== "short"));
                //filter保留是true
                //特別注意 這樣可以避免刪除到食物類別
            } else {

                setFoodCatgory((prevCatgory) => prevCatgory.filter((item) => item !== "long"));
            }
        }
        //console.log("點選的",foodCatgory);
        setTimeout(() => {
            if (foodState.foodList) {
                DropToList();
            } //解決ui無法即時更新，使用排程強制此方法立即執行
        }, 0);
    }, [foodCatgory, foodName, dateCategory, foodState.foodList]);

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            setFoodCatgory([]);
            dispatch(checkToken());
            setDateCategory('all');
            setOpen(false);
        }, [])
    );

    const deleteItem = () => {
        Alert.alert(clickItem.ingredient_orignal_name, "將被刪除，確定要繼續嗎", [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '刪除',
                onPress: () => deleteItemApi(clickItem.ingredient_id),
                style: 'destructive'
            },
        ]);
        //console.log("刪除：", index)
    }

    const deleteItemApi = async (id) => {
        await dispatch(deleteFoodApi(id));
        setModalDeleteVisible(true);
        await dispatch(getFoodInfo());
        setTimeout(() => {
            setModalDeleteVisible(false);
            setModalVisible(false);
        }, 2500);
    }

    const changeSaveContainer = ({ foodInfo, clickRef }) => {
        var tempFoodInfo = Object.assign({}, foodInfo);
        console.log("changeSaveContainer 傳入", tempFoodInfo);
        const combinedValue = `${foodInfo.container_col}_${foodInfo.container_row}`;
        console.log("combinedValue ：", combinedValue);
        switch (foodInfo.saveName) {
            case "冷凍":
                switch (clickRef.freezerContainer) {
                    case 4:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                    case 6:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "中上";
                                break;
                            case "3_1":
                                tempFoodInfo.saveContainer = "右上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "中下";
                                break;
                            case "3_2":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                    case 9:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "中上";
                                break;
                            case "3_1":
                                tempFoodInfo.saveContainer = "右上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "中左";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "正中";
                                break;
                            case "3_2":
                                tempFoodInfo.saveContainer = "中右";
                                break;
                            case "1_3":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_3":
                                tempFoodInfo.saveContainer = "中下";
                                break;
                            case "3_3":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                }
                break;
            case "冷藏":
                switch (clickRef.coolerContainer) {
                    case 4:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                    case 6:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "中上";
                                break;
                            case "3_1":
                                tempFoodInfo.saveContainer = "右上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "中下";
                                break;
                            case "3_2":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                    case 9:
                        switch (combinedValue) {
                            case "1_1":
                                tempFoodInfo.saveContainer = "左上";
                                break;
                            case "2_1":
                                tempFoodInfo.saveContainer = "中上";
                                break;
                            case "3_1":
                                tempFoodInfo.saveContainer = "右上";
                                break;
                            case "1_2":
                                tempFoodInfo.saveContainer = "中左";
                                break;
                            case "2_2":
                                tempFoodInfo.saveContainer = "正中";
                                break;
                            case "3_2":
                                tempFoodInfo.saveContainer = "中右";
                                break;
                            case "1_3":
                                tempFoodInfo.saveContainer = "左下";
                                break;
                            case "2_3":
                                tempFoodInfo.saveContainer = "中下";
                                break;
                            case "3_3":
                                tempFoodInfo.saveContainer = "右下";
                                break;
                        }
                        break;
                }
                break;
        }
        return tempFoodInfo;
    }
    /**
     * 子組件點擊食材回傳
     * @param {*} index 
     * @param {*} item 
     */
    const handClickItem = (index, item) => {
        var foodInfo = Object.assign({}, item);

        setModalVisible(true);
        var clickRef = {};
        for (var i = 0; i < refState.refList.length; i++) {
            if (refState.refList[i].refrigerator_name == item.refrigerator_name) {
                clickRef = refState.refList[i];
            }
        }

        switch (clickRef.firstType) {
            case "freezer":
                if (foodInfo.door) {//是門
                    if (clickRef.freezerDoorCount - parseInt(foodInfo.refrigerator_row) < 0) {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row) - clickRef.freezerDoorCount;
                        foodInfo.saveName = "冷藏門";
                        foodInfo.saveContainer = 0;
                    } else {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row);
                        foodInfo.saveName = "冷凍門";
                        foodInfo.saveContainer = 0;
                    }
                } else {//不是門
                    if (clickRef.freezerCount - parseInt(foodInfo.refrigerator_row) < 0) {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row) - clickRef.freezerCount;
                        foodInfo.saveName = "冷藏";
                        foodInfo = changeSaveContainer({ foodInfo, clickRef });
                    } else {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row);
                        foodInfo.saveName = "冷凍";
                        foodInfo = changeSaveContainer({ foodInfo, clickRef });
                    }
                }
                break;
            case "cooler":
                if (foodInfo.door) {//是門

                    if (clickRef.coolerDoorCount - parseInt(foodInfo.refrigerator_row) < 0) {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row) - clickRef.coolerDoorCount;
                        foodInfo.saveName = "冷藏門";
                        foodInfo.saveContainer = 0;
                    } else {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row);
                        foodInfo.saveName = "冷凍門";
                        foodInfo.saveContainer = 0;
                    }

                } else {//不是門
                    if (clickRef.coolerCount - parseInt(foodInfo.refrigerator_row) < 0) {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row) - clickRef.coolerCount;
                        foodInfo.saveName = "冷凍";
                        foodInfo = changeSaveContainer({ foodInfo, clickRef });
                    } else {
                        foodInfo.saveNumber = parseInt(foodInfo.refrigerator_row);
                        foodInfo.saveName = "冷藏";
                        foodInfo = changeSaveContainer({ foodInfo, clickRef });
                    }
                }
                break;
        }
        setClickItem(foodInfo);
        console.log("食物存放的冰箱：", clickRef);
        console.log("計算後的", foodInfo);
    }

    const deleteMoreItem = useCallback(() => {
        Alert.alert("是否刪除全部過期食物", "", [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '刪除',
                onPress: () => deleteMoreItemApi(),
                style: 'destructive'
            },
        ]);
        //console.log("刪除：", index)
    }, [searchFoodInfo]);

    const deleteMoreItemApi = async () => {
        console.log("要刪除的食物", searchFoodInfo);

        for (var i = 0; i < searchFoodInfo.length; i++) {
            await dispatch(deleteFoodApi(searchFoodInfo[i].ingredient_id));
        }

        setModalDeleteMoreVisible(true);
        await dispatch(getFoodInfo());
        setTimeout(() => {
            setModalDeleteMoreVisible(false);
        }, 2500);
    }

    DropDownPicker.setMode("BADGE");

    return (
        <>
            {/* 點擊item顯示詳細存放位置 */}
            <Modal
                animationIn={"fadeIn"}
                animationInTiming={800}
                animationOut={"fadeOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.9}
                onBackdropPress={() => setModalVisible(false)}
            >

                <View style={styles.foodDetailView}>
                    {modalDeleteVisible ?
                        <>
                            <TouchableWithoutFeedback
                                onPress={() => { setModalDeleteVisible(false) }}
                            >
                                <View style={styles.modalView}>
                                    <AnimatedLottieView
                                        style={{ width: moderateScale(500), alignSelf: 'center', paddingEnd: moderateScale(6), justifyContent: 'center' }}
                                        source={require('../assets/trash.json')}
                                        autoPlay
                                        speed={0.5}
                                        loop={false}>
                                    </AnimatedLottieView>

                                </View>
                            </TouchableWithoutFeedback>
                        </> :
                        <>
                            <Text style={[Userstyle.textLabel, { marginTop: moderateScale(40) }]}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }} >
                                食物名稱
                            </Text>
                            <Text
                                accessibilityLabel="食物名稱"
                                accessible={true}
                                style={styles.detailText}>
                                {clickItem.ingredient_orignal_name}
                            </Text>
                            <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20) }]}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }} >
                                存放冰箱
                            </Text>
                            <Text
                                accessibilityLabel="食物名稱"
                                accessible={true}
                                style={styles.detailText}>
                                {clickItem.refrigerator_name}
                            </Text>

                            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', }}>
                                <View style={{ flexDirection: 'column', flex: 3, }}>
                                    <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20), }]}
                                        accessible={false}
                                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                        accessibilityState={{ disabled: true }} >
                                        過期日期
                                    </Text>
                                    <Text
                                        accessibilityLabel="過期日期"
                                        accessible={true}
                                        style={[styles.foodDateText, {
                                            color: clickItem.day < 0 ? '#990A0A' : clickItem.day < 1 ? "#FF0700" : clickItem.day < 2 ? "#FF9900" : clickItem.day < 4 ? "#FFF000" : "#27F727"
                                        }]}>
                                        {clickItem.expired_date}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 4, }}>
                                    <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20) }]}
                                        accessible={false}
                                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                        accessibilityState={{ disabled: true }} >
                                        食物類別
                                    </Text>
                                    <View style={[styles.foodCatgoryText, { flexDirection: 'row', flexWrap: 'nowrap' }]}>
                                        {foodImg[clickItem.category_name]}
                                        <Text
                                            accessibilityLabel="食物類別"
                                            accessible={true}
                                            style={{
                                                color: '#6D6D6D',
                                                fontSize: moderateScale(20),
                                                fontWeight: '500',
                                                lineHeight: moderateScale(45),
                                                textAlign: 'center',
                                            }}
                                        >
                                            {clickItem.category_name}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', }}>
                                <View style={{ flexDirection: 'column', flex: 3, }}>
                                    <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20), color: 'transparent' }]}
                                        accessible={false}
                                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                        accessibilityState={{ disabled: true }} >
                                        test
                                    </Text>
                                    <Button buttonStyle={[styles.saveButtton, { backgroundColor: clickItem.saveName == "冷凍" ? "#416BFF" : clickItem.saveName == "冷藏" ? "#95ECFF" : "#CDCFFF" }]}>
                                    </Button>
                                </View>
                                <View style={{ flexDirection: 'column', flex: 4, }}>
                                    <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20) }]}
                                        accessible={false}
                                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                        accessibilityState={{ disabled: true }} >
                                        外層分層
                                    </Text>
                                    <Text
                                        accessibilityLabel="外層分層"
                                        accessible={true}
                                        style={styles.containerText}>
                                        {`${clickItem.saveName}第${clickItem.saveNumber}層`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', }}>

                                {clickItem.saveContainer == 0 ?
                                    <>
                                        <View style={{ height: moderateScale(20) }}>

                                        </View>
                                    </> :
                                    <>
                                        <View style={{ flex: 3, alignItems: 'center', }}>

                                            <Image
                                                resizeMode="contain"
                                                source={require('../../Img/分層.png')}
                                                style={{
                                                    width: moderateScale(95),
                                                    height: moderateScale(90),
                                                    marginTop: moderateScale(10, 0.9),
                                                }}>

                                            </Image>
                                        </View>
                                        <View style={{ flexDirection: 'column', flex: 4, }}>
                                            <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20) }]}
                                                accessible={false}
                                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                                accessibilityState={{ disabled: true }} >
                                                內部分層
                                            </Text>
                                            <Text
                                                accessibilityLabel="內層分層"
                                                accessible={true}
                                                style={styles.containerText}>
                                                {`${clickItem.saveContainer}`}
                                            </Text>
                                        </View>
                                    </>}

                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(20) }}>
                                <Button
                                    title="刪除"
                                    buttonStyle={{
                                        backgroundColor: "#FF0000",
                                        borderRadius: moderateScale(10),
                                    }}
                                    containerStyle={{
                                        height: moderateScale(40),
                                        width: moderateScale(140),
                                        marginHorizontal: moderateScale(10),
                                    }}
                                    titleStyle={{ fontSize: moderateScale(20), color: '#ffffff', fontWeight: "bold", }}
                                    onPress={() => {
                                        deleteItem();

                                    }}
                                />
                                <Button
                                    title="完成"
                                    buttonStyle={{
                                        backgroundColor: "#8C9090",
                                        borderRadius: moderateScale(10),
                                    }}
                                    containerStyle={{
                                        height: moderateScale(40),
                                        width: moderateScale(140),
                                        marginHorizontal: moderateScale(10),
                                    }}
                                    titleStyle={{ fontSize: moderateScale(20), color: '#ffffff', fontWeight: "bold" }}
                                    onPress={() => { setModalVisible(false) }}//to RegisterScreen
                                />
                            </View>
                        </>}

                </View>


            </Modal>

            {/* 右上方提示組件 */}
            <Modal
                animationIn={"zoomIn"}
                animationInTiming={900}
                animationOut={"zoomOut"}
                animationOutTiming={800}
                isVisible={modalDeleteMoreVisible}
                backdropOpacity={0.6}
                onBackdropPress={() => { setModalDeleteMoreVisible(false) }}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setModalDeleteMoreVisible(false) }}
                >
                    <View style={styles.modalView}>
                        <AnimatedLottieView
                            style={{ width: moderateScale(500), alignSelf: 'center', paddingEnd: moderateScale(6) }}
                            source={require('../assets/trash.json')}
                            autoPlay
                            speed={0.5}
                            loop={false}>
                        </AnimatedLottieView>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {lookModel ?
                <>
                    <View style={[styles.topBg, { paddingTop: moderateScale(60, 0), }]}>

                        <DropDownPicker
                            zIndex={9000}
                            onPress={() => { Keyboard.dismiss }}
                            placeholder={"選擇食物種類"}
                            style={dropdown.squareBox}
                            containerStyle={dropdown.squareContainer}
                            textStyle={{ fontSize: moderateScale(18), color: '#777' }}
                            placeholderStyle={{ color: '#777', fontWeight: '500' }}
                            searchable={false}
                            dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                            listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5) }} //下方item內容文字
                            listItemContainerStyle={{ height: moderateScale(35) }} //下方item高度 
                            selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
                            selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
                            TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                            listParentContainerStyle={{ backgroundColor: '#C1E6FF' }}
                            listParentLabelStyle={{ fontWeight: "bold" }}
                            listChildContainerStyle={{ paddingLeft: moderateScale(20) }}
                            dropDownDirection="BOTTOM"
                            iconContainerStyle={{
                                paddingBottom: moderateScale(5),
                            }}
                            multiple={true}
                            mode="BADGE"
                            showBadgeDot={true}
                            //extendableBadgeContainer={true} //換行
                            badgeColors={["#D9D9D9"]} //多選背景顏色
                            badgeDotColors={["red", "blue", "orange", "green", "yellow", "black"]} //多選點點顏色
                            badgeTextStyle={{ fontWeight: '500', color: "#616666" }} //多選文字
                            maxHeight={moderateScale(400, 1.3)}
                            open={open}
                            setOpen={setOpen}
                            value={foodCatgory}
                            setValue={setFoodCatgory}
                            items={foodCatgoryList}
                            closeOnBackPressed={true}
                            ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                            ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}
                        >
                        </DropDownPicker>

                        <Input
                            returnKeyType='search'
                            selectionColor='#777'
                            //accessibilityHint={"篩選食物種類的下拉式選單"}
                            containerStyle={[Userstyle.containerStyle1, { paddingHorizontal: moderateScale(40), marginTop: (10), marginBottom: (0) }]}
                            inputContainerStyle={Userstyle.inputContainerStyle1}
                            inputStyle={Userstyle.inputStyle1}
                            value={foodName}
                            onChangeText={setFoodName}
                            clearButtonMode="while-editing"
                            leftIcon={() => <FontAwesomeIcon icon={faSearch} size={moderateScale(20)} color="#777" style={{ marginStart: moderateScale(10) }}></FontAwesomeIcon>}
                        />
                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(40) }}>
                            <View style={styles.dateCategoryBg}>
                                <TouchableOpacity
                                    style={[styles.dataButton, { backgroundColor: '#FFF000', marginRight: moderateScale(15) }]}
                                    onPress={() => { setDateCategory(2) }}>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.dataButton, { backgroundColor: '#FF9900' }]}
                                    onPress={() => { setDateCategory(1) }}>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.dataButton, { backgroundColor: '#FF0700' }]}
                                    onPress={() => { setDateCategory(0) }}>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.dataButton, { backgroundColor: '#990A0A', marginLeft: moderateScale(15) }]}
                                    onPress={() => { setDateCategory(-1) }}>

                                </TouchableOpacity>


                            </View>
                            <View style={{
                                marginTop: moderateScale(-10),
                                marginBottom: moderateScale(15),
                                paddingVertical: moderateScale(8),
                                paddingHorizontal: moderateScale(5)
                            }}>
                                <TouchableOpacity onPress={() => {
                                    setFoodCatgory([]);
                                    setDateCategory('all')
                                }}
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`重新選擇篩選`}>
                                    <FontAwesomeIcon icon={faRotate} size={moderateScale(28)} color="#2E3E5C" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[styles.SearchDateList, {
                            borderColor: dateCategory == 'all' ? '#ECEAEA' : dateCategory == '-1' ? "#990A0A" : dateCategory == '0' ? "#FF0700" : dateCategory == '1' ? '#FF9900' : '#FFF000'
                        }]}
                        onTouchStart={() => { setOpen(false) }}>
                        <FlashList
                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(25), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
                            data={searchFoodInfo}
                            estimatedItemSize={30}
                            renderItem={({ item, index }) => {
                                if (true) {
                                    return (
                                        <ItemBox
                                            data={item}
                                            handleDelete={() => deleteItem(index, item)}
                                            handleClick={() => handClickItem(index, item)}
                                            index={index}
                                        />);
                                }
                            }}>
                        </FlashList>
                        {dateCategory == -1 ? <FAB
                            icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(20)}></FontAwesomeIcon>}
                            color="#C81414"
                            //size="small"
                            placement="right"
                            onPress={() => { deleteMoreItem() }}
                            style={{ zIndex: 100 }}
                        /> : <></>}
                    </View>

                </> :
                <>
                    <View style={[styles.topBg, { paddingBottom: moderateScale(0) }]}>
                        <View
                            accessible={true}
                            accessibilityLabel={"搜尋食物名稱"}
                            accessibilityHint={"文字欄位點擊進入編輯"}>
                            <Input
                                returnKeyType='search'
                                selectionColor='#777'
                                multiline={false}
                                placeholder="搜尋食物名稱"

                                //labelStyle={[Userstyle.lable1,{}]}
                                containerStyle={[Userstyle.containerStyle1, { paddingHorizontal: moderateScale(20), marginTop: moderateScale(0), marginBottom: (0) }]}
                                inputContainerStyle={[Userstyle.inputContainerStyle1, {}]}
                                inputStyle={Userstyle.inputStyle1}
                                value={foodName}
                                onChangeText={setFoodName}
                                //clearButtonMode="while-editing"
                                placeholderTextColor="#777"
                                rightIcon={() => <FontAwesomeIcon icon={faSearch} size={moderateScale(20)} color="#777" style={{ marginEnd: moderateScale(5) }}></FontAwesomeIcon>}
                            ></Input>
                        </View>
                        <View
                            style={{ zIndex: 9000 }}
                            accessible={true}
                            accessibilityLabel={"選擇食物種類"}
                            accessibilityHint='點擊開啟下拉選單'>
                            <DropDownPicker
                                //renderListItem={(props) => {<View {...props} ></View>}}
                                zIndex={9000}
                                onPress={() => { Keyboard.dismiss }}
                                placeholder={"選擇食物種類"}
                                style={dropdown.squareBox}
                                containerStyle={[dropdown.squareContainer, { width: moderateScale(350, 1.05) }]}
                                textStyle={{ fontSize: moderateScale(18), color: '#777' }}
                                placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                searchable={false}
                                dropDownContainerStyle={{ borderRadius: 0, position: Platform.OS === 'android' ? 'relative' : 'absolute', top: Platform.OS == 'android' ? 0 : moderateScale(50) }} //下拉選單外誆
                                listItemLabelStyle={{ color: "#777", fontSize: moderateScale(20, 0.5) }} //下方item內容文字
                                listItemContainerStyle={{ height: moderateScale(35) }} //下方item高度 
                                selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
                                selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
                                TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                                listParentContainerStyle={{ backgroundColor: '#C1E6FF' }}
                                listParentLabelStyle={{ fontWeight: "bold" }}
                                listChildContainerStyle={{ paddingLeft: moderateScale(40) }}
                                multiple={true}
                                dropDownDirection="BOTTOM"
                                mode="BADGE"
                                listMode="SCROLLVIEW"
                                showBadgeDot={true}
                                //extendableBadgeContainer={true} //換行
                                badgeColors={["#D9D9D9"]} //多選背景顏色
                                badgeDotColors={["red", "blue", "orange", "green", "yellow", "black"]} //多選點點顏色
                                badgeTextStyle={{ fontWeight: '500', color: "#616666" }} //多選文字
                                maxHeight={moderateScale(400, 1)}
                                open={open}
                                setOpen={setOpen}
                                value={foodCatgory}
                                setValue={setFoodCatgory}
                                items={NoImgFoodIcon}
                                closeOnBackPressed={true}
                                ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                                ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}
                            >
                            </DropDownPicker>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(20) }}>
                            <View style={[styles.dateCategoryBg, { marginTop: moderateScale(20), }]}>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`只顯示在二天或者三天過期食材篩選按鈕`}
                                    style={[styles.dataButton, { backgroundColor: '#FFF000', marginRight: moderateScale(15) }]}
                                    onPress={() => { setDateCategory(2) }}>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`只顯示在一天過期食材篩選按鈕`}
                                    style={[styles.dataButton, { backgroundColor: '#FF9900' }]}
                                    onPress={() => { setDateCategory(1) }}>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`只顯示當日過期食材篩選按鈕`}
                                    style={[styles.dataButton, { backgroundColor: '#FF0700' }]}
                                    onPress={() => { setDateCategory(0) }}>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`只顯示已過期食材篩選按鈕`}
                                    style={[styles.dataButton, { backgroundColor: '#990A0A', marginLeft: moderateScale(15) }]}
                                    onPress={() => { setDateCategory(-1) }}>

                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginTop: moderateScale(20),
                                marginBottom: moderateScale(15),
                                paddingVertical: moderateScale(8),
                                paddingHorizontal: moderateScale(5)
                            }}>
                                <TouchableOpacity onPress={() => {
                                    setFoodCatgory([]);
                                    setDateCategory('all')
                                }}
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`重新選擇篩選`}>
                                    <FontAwesomeIcon icon={faRotate} size={moderateScale(28)} color="#2E3E5C" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <View
                        style={[styles.SearchDateList, {
                            borderColor: dateCategory == 'all' ? '#ECEAEA' : dateCategory == '-1' ? "#990A0A" : dateCategory == '0' ? "#FF0700" : dateCategory == '1' ? '#FF9900' : '#FFF000'
                        }]}
                        onTouchStart={() => { setOpen(false) }}>
                        {open ?
                            <></>
                            :
                            <>
                                <FlashList
                                    data={searchFoodInfo}
                                    estimatedItemSize={30}
                                    renderItem={({ item, index }) => {
                                        if (true) {
                                            return (
                                                <ItemBox
                                                    data={item}
                                                    handleDelete={() => deleteItem(index, item)}
                                                    handleClick={() => handClickItem(index, item)}
                                                    index={index}
                                                />);
                                        }
                                    }}>
                                </FlashList>
                            </>
                        }
                        {dateCategory == -1 ? <FAB
                            icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(20)}></FontAwesomeIcon>}
                            color="#C81414"
                            //size="small"
                            placement="right"
                            onPress={() => { deleteMoreItem() }}
                            style={{ zIndex: 100 }}
                        /> : <></>}

                    </View>
                </>}
        </>
    );
};

const styles = StyleSheet.create({
    topBg: {
        backgroundColor: '#E4E4E4',
        borderBottomRightRadius: moderateScale(20),
        borderBottomStartRadius: moderateScale(20),
        paddingTop: moderateScale(60),
        //paddingBottom:moderateScale(0),
        zIndex: 2
    },
    iconImg: { //食物iocn
        width: moderateScale(20),
        height: moderateScale(20),
    },
    SearchDateList: {
        flex: 1,
        //zIndex:2,
        backgroundColor: '#ECEAEA',
        //height:verticalScale(300),
        borderWidth: moderateScale(1.5),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(110, 0),
    },
    dateCategoryBg: {
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        flex: 1,
        marginTop: moderateScale(-10),
        marginBottom: moderateScale(18),
        paddingVertical: moderateScale(10),
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        zIndex: 3,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1.5),
        //paddingBottom:20,
    },
    dataButton:
    {
        //height: moderateScale(20),
        //width: moderateScale(60),
        flex: 1,
        borderRadius: 20,
        paddingVertical: moderateScale(10),
        marginHorizontal: moderateScale(5),
    },
    foodDetailView: {
        flex: 1,
        zIndex: 2,
        backgroundColor: '#ECEAEA',
        marginHorizontal: moderateScale(0),
        borderRadius: moderateScale(20),
        marginVertical: moderateScale(100, 0.2),
        //padding: moderateScale(20),
        justifyContent: 'flex-start',
    },
    detailText: {
        paddingHorizontal: moderateScale(20),
        height: moderateScale(45),
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1.5),
        color: '#6D6D6D',
        marginHorizontal: moderateScale(20),
        fontSize: moderateScale(20),
        lineHeight: moderateScale(45),
        fontWeight: '500',
    },
    iconImg: {
        width: moderateScale(30),
        height: moderateScale(30),
        marginTop: moderateScale(7),
        marginStart: moderateScale(5),
        marginEnd: moderateScale(5),
    },
    foodCatgoryText: {
        //paddingVertical:moderateScale(5),
        height: moderateScale(45),
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1.5),
        color: '#6D6D6D',
        marginStart: moderateScale(20),
        marginEnd: moderateScale(20),
        fontSize: moderateScale(20),
        lineHeight: moderateScale(45),
        fontWeight: '500',

    },
    foodDateText: {
        paddingHorizontal: moderateScale(10),
        height: moderateScale(45),
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1.5),
        color: '#6D6D6D',
        marginStart: moderateScale(20),
        //marginEnd: moderateScale(20),
        fontSize: moderateScale(20),
        lineHeight: moderateScale(45),
        fontWeight: '500',
    },
    containerText: {
        paddingHorizontal: moderateScale(20),
        height: moderateScale(45),
        backgroundColor: '#FAFAFA',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: moderateScale(3) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(1.5),
        elevation: moderateScale(1.5),
        color: '#6D6D6D',
        marginStart: moderateScale(20),
        marginEnd: moderateScale(20),
        fontSize: moderateScale(20),
        lineHeight: moderateScale(45),
        fontWeight: '500',
    },
    saveButtton: {

        height: moderateScale(45),
        //width:moderateScale(135),
        backgroundColor: '#416BFF',
        borderRadius: 10,
        marginStart: moderateScale(20),
    },
    modalView: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

})

export default SearchScreen;