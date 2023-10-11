import React, { useContext, useEffect, useState } from "react";
import { AccessibilityInfo, Alert, Image, Keyboard, RefreshControl, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { moderateScale } from "./ScaleMethod";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../style/Dropdown";
import { faAngleDown, faAngleUp, faCalendarMinus, faCalendarPlus, faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useFocusEffect } from "@react-navigation/native";
import Userstyle from "../style/UserStyle";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./foodList/FoodList_Search";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodApi, getFoodInfo } from "../store/foodSlice";


const SearchScreen = () => {
    const foodState = useSelector(state => state.foodInfo);
    const { lookModel } = useContext(AuthContext);
    const [foodName, setFoodName] = useState("");
    const [foodCatgory, setFoodCatgory] = useState([]);//下拉選單食物選擇
    const [open, setOpen] = useState(false);//下拉選單開關
    const [foodCatgoryList, setFoodCatgoryList] = useState([ //下拉選單食物列表
        { label: '排序方式', value: '排序方式', disabled: true, },
        { label: '距離過期日長', value: 'long', icon: () => <FontAwesomeIcon icon={faCalendarPlus} color="#777" size={moderateScale(18)} />, parent: '排序方式' },
        { label: '距離過期日短', value: 'short', icon: () => <FontAwesomeIcon icon={faCalendarMinus} color="#777" size={moderateScale(18)} />, parent: '排序方式' },
        { label: '食物分類', value: '食物分類', disabled: true },
        { label: '蔬菜類', value: '蔬菜', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/蔬菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '肉類', value: '肉', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/肉類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '海鮮', value: '海鮮', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/海鮮.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '飲品類', value: '飲品類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/飲料.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '水果類', value: '水果', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/水果.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '加工食品類', value: '加工食品', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/加工食品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '冰品', value: '冰品', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/冰品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '甜點', value: '甜點', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/甜點.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '奶製品', value: '奶製品', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/奶製品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '豆類', value: '豆類', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/豆類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '雞蛋', value: '雞蛋', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/雞蛋.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '剩菜', value: '剩菜', parent: '食物分類', icon: () => <Image source={require("../../Img/foodpic/剩菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
    ]);

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
        //console.log("篩選");
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

        if (foodCatgory.length == 0) {
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
    }, [foodCatgory, foodName]);

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            setFoodCatgory([]);
            setOpen(false);
        }, [])
    );

    const deleteItem = (index) => {
        Alert.alert(searchFoodInfo[index].ingredient_orignal_name, "將被刪除，確定要繼續嗎", [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '刪除',
                onPress: () => deleteItemApi(searchFoodInfo[index].ingredient_id),
                style: 'destructive'
            },
        ]);
        //console.log("刪除：", index)
    }

    const deleteItemApi =async (id)=>{
        await dispatch(deleteFoodApi(id));
        await dispatch(getFoodInfo());
    }

    const handClickItem = (index, item) => {
        console.log("點擊的組件", item);
    }
    DropDownPicker.setMode("BADGE");
    return (
        <>
            {lookModel ?
                <>
                    <View style={styles.topBg}>
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
                            listChildContainerStyle={{ paddingLeft: moderateScale(40) }}
                            multiple={true}
                            mode="BADGE"
                            showBadgeDot={true}
                            //extendableBadgeContainer={true} //換行
                            badgeColors={["#D9D9D9"]} //多選背景顏色
                            badgeDotColors={["red", "blue", "orange", "green", "yellow", "black"]} //多選點點顏色
                            badgeTextStyle={{ fontWeight: '500', color: "#616666" }} //多選文字
                            maxHeight={moderateScale(400)}
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

                    </View>
                    <View style={styles.SearchDateList} onTouchStart={() => { setOpen(false) }}>
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
                    </View>
                </> :
                <>
                    <View style={[styles.topBg, { paddingBottom: moderateScale(20) }]}>
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
                                dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                                listItemLabelStyle={{ color: "#777", fontSize: moderateScale(20, 0.5) }} //下方item內容文字
                                listItemContainerStyle={{ height: moderateScale(35) }} //下方item高度 
                                selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
                                selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
                                TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                                listParentContainerStyle={{ backgroundColor: '#C1E6FF' }}
                                listParentLabelStyle={{ fontWeight: "bold" }}
                                listChildContainerStyle={{ paddingLeft: moderateScale(40) }}
                                multiple={true}
                                mode="BADGE"
                                showBadgeDot={true}
                                //extendableBadgeContainer={true} //換行
                                badgeColors={["#D9D9D9"]} //多選背景顏色
                                badgeDotColors={["red", "blue", "orange", "green", "yellow", "black"]} //多選點點顏色
                                badgeTextStyle={{ fontWeight: '500', color: "#616666" }} //多選文字
                                maxHeight={moderateScale(600, 0.2)}
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

                    </View>
                    <View style={styles.SearchDateList}>
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
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(25),
        marginBottom: moderateScale(110, 0),
    },
})

export default SearchScreen;