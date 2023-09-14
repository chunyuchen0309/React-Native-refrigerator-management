import React, { Component, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, FAB, Input, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { Alert, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faCalendar, faCalendarXmark, faTools, faTrash, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import Userstyle from "../style/UserStyle";
import { BASE_URL } from "../config";
import { scale, moderateScale, verticalScale } from "./ScaleMethod";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { FlashList } from "@shopify/flash-list";
import { Swipeable } from "react-native-gesture-handler";
import ItemBox from "./foodList/FoodList_Home";
import { ScreenWidth } from "@rneui/base";
import Slider from '@react-native-community/slider';
const HomeScreen = () => {

    const navigation = useNavigation()
    const [buttonSelect, setButtonSelect] = useState(true);
    const { token, getFoodInfoMethod, foodInfo, isLoading, setIsLoading, userInfo, getRefInfoMethod, foodInfoExpire, lookModel } = useContext(AuthContext);
    const [filteredFoodInfo, setFilteredFoodInfo] = useState([]);
    const [seekBar, setSeekBar] = useState(3);
    const [seekBarDate, setSeekBarDate] = useState("今日過期");

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            getFoodListApi();
            //getRefInfoMethod();
        }, [])
    );

    const onRefresh = useCallback(() => { // 避免不必要的渲染使用
        setIsLoading(true);
        getFoodListApi();
    }, []);

    useEffect(() => {
        if (foodInfo && foodInfo.length > 0) { //有資料且正確載入使組建篩選並重新渲染
            filterFoodData();
        }
    }, [buttonSelect,foodInfo]);

    // 篩選函式
    const filterFoodData = () => {
        //console.log("篩選食物清單",foodInfo);
        if (foodInfo) {
            //console.log("開始篩選");
            if (buttonSelect) {
                console.log("篩選一");
                setFilteredFoodInfo(foodInfo.filter(item => item.day < 4 && item.day >= 0));
            } else {
                console.log("篩選二");
                setFilteredFoodInfo(foodInfo.filter(item => item.day < 0));
            }
        }
    };
    /**
     * 拉動顯示過期日期SeekBar
     * @param {*} val 
     */
    const changeSeekBar = (val) => {
        console.log("seekbar_value:",val)
        setSeekBar(val);
        switch (val) {
            case 4.5:
                setSeekBarDate("已過期");
                break;
            case 3:
                setSeekBarDate("今日過期");
                break;
            case 1.5:
                setSeekBarDate("1天後過期");
                break;
            case 0:
                setSeekBarDate("2-3天後過期");
                break;
        }
    }
    /**
     * 點擊組建回傳並顯示過期天數
     */
    const handClickItem = (index, item) => {
        console.log("點擊的食物index：", index);
        console.log("點擊的item：", item);
        const day = item.day;
        switch (day) {
            case 0:
                changeSeekBar(moderateScale(3));
                break
            case 1:
                changeSeekBar(moderateScale(1.5));

                break
            case 2:
                changeSeekBar(moderateScale(0));

                break
            case 3:
                changeSeekBar(0);

                break
            default:
                //console.log("天數為>1");
                changeSeekBar(moderateScale(4.5));
        }
    }
    /**
     * 更改按鈕顏色以及顯示列表
     */
    const changeButtonColor = () => {
        setButtonSelect(!buttonSelect);
    }
    /**
     * 取得食物列表
     */
    const getFoodListApi = () => {
        getFoodInfoMethod();
    }
    /**
     * 刪除食物
     * @param {*} index 
     */
    const deleteItem = (index) => {
        console.log("刪除：", index)
    }
    console.log("當前視圖模式", lookModel);

    return (
        <ScrollView
            contentContainerStyle={{}}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh} style={{ backgroundColor: '#E4E4E4' }} />
            }>
            {lookModel ? <>
                <View style={styles.topBg}>
                    <View accessible={true}
                        accessibilityLabel={`名稱為 ${userInfo.username}`}
                        accessibilityRole={"none"}>
                        <Input
                            disabled
                            containerStyle={{ paddingHorizontal: moderateScale(65), marginTop: verticalScale(50)}}
                            inputContainerStyle={{ height: moderateScale(30),}}
                            disabledInputStyle={{fontSize: moderateScale(30),}}
                            leftIcon={<FontAwesomeIcon icon={faUser} color="#777" size={moderateScale(18)}></FontAwesomeIcon>}
                        >
                            <Text style={{ fontSize: moderateScale(25), textAlign: 'left', }}
                                accessible={false} >
                                {userInfo.username}
                            </Text>
                        </Input>
                    </View>
                    <View style={styles.topThreeButton}>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往冰箱配置按鈕"}>
                            <Text style={styles.topButtonText}>
                                冰箱配置
                            </Text>
                            <Button
                                onPress={() => { navigation.navigate("Step1") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faTools} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往NFC功能按鈕"}
                        >
                            <Text style={styles.topButtonText}>
                                NFC
                            </Text>
                            <Button
                                onPress={() => { navigation.navigate("Nfc") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faNfcSymbol} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往冰箱分層功能按鈕"}>
                            <Text style={styles.topButtonText}>
                                冰箱分層
                            </Text>
                            <Button
                                accessible={false}
                                //accessibilityRole={"none"}
                                onPress={() => { navigation.navigate("Refrigerator") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faBars} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>

                    </View>
                </View>

                <View style={styles.dateView}>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`即將過期食物數量 ${foodInfoExpire.Plus}`}
                        accessibilityHint={"顯示即將過期食物列表按鈕"}
                        onPress={() => { changeButtonColor() }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == true ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={[styles.dateButtonTitle,]}>
                                <FontAwesomeIcon icon={faCalendar} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>即將過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodInfoExpire.Plus}</Text>
                            </View>}>
                    </Button>
                    <View style={{ height: moderateScale(10) }}>
                    </View>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`已過期食物數量 ${foodInfoExpire.Minus}`}
                        accessibilityHint={"顯示已過期食物列表按鈕"}
                        onPress={() => { changeButtonColor() }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == false ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={styles.dateButtonTitle}>
                                <FontAwesomeIcon icon={faCalendarXmark} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>已過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodInfoExpire.Minus}</Text>
                            </View>}
                    >
                    </Button>
                    <Text style={{ textAlign: 'center', marginTop: moderateScale(10), color: "#777", fontSize: moderateScale(20), fontWeight: '600' }}>
                        {seekBarDate}
                    </Text>
                    <Image
                        source={require('../../Img/SeekBar.png')}
                        resizeMode="contain"
                        style={{ width: moderateScale(300, 1.2), alignSelf: 'center', top: moderateScale(10,0), }}>
                    </Image>
                    <Slider
                        style={{ width: moderateScale(250, 1), alignSelf: 'center', zIndex: 2, top: moderateScale(-20,0.1) }}
                        value={seekBar}
                        onValueChange={(val) => { changeSeekBar(val) }}
                        minimumValue={0}
                        maximumValue={4.5}
                        step={1.5}
                        maximumTrackTintColor={"transparent"}
                        minimumTrackTintColor="transparent"
                    />
                </View>

                {buttonSelect ? <>
                    
                        <View
                            //accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"即將過期食物列表"}
                            style={[styles.homeDateList,{marginTop: moderateScale(-20,0),}]}>
                            <FlashList
                                data={filteredFoodInfo}
                                estimatedItemSize={30}
                                renderItem={({ item, index }) => {
                                    if (item.day < 4 && item.day >= 0) { // 只渲染符合條件的項目
                                        return (
                                            <ItemBox
                                                data={item}
                                                handleDelete={() => deleteItem(index, item)}
                                                handleClick={() => handClickItem(index, item)}
                                                index={index}
                                            />);
                                    } else {
                                        return null; // 不渲染不符合條件的項目
                                    }
                                }}>
                            </FlashList>
                        </View>
                    
                </>
                :<>
                    
                        <View
                            style={[styles.homeDateList,{marginTop: moderateScale(-20,0),}]}
                            //accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"已過期食物列表"}
                        >
                            <FlashList
                                data={filteredFoodInfo}
                                estimatedItemSize={30}
                                renderItem={({ item, index }) => {
                                    if (item.day < 0) { // 只渲染符合條件的項目
                                        return (
                                            <ItemBox
                                                data={item}
                                                handleDelete={() => deleteItem(index, item)}
                                                handleClick={() => handClickItem(index, item)}
                                                index={index}
                                            />
                                        );
                                    } else {
                                        return null; // 不渲染不符合條件的項目
                                    }
                                }}>
                            </FlashList>
                        </View>
                    
                    <FAB
                        icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(15)}></FontAwesomeIcon>}
                        color="#C81414"
                        size="small"
                        placement="right"
                        style={{ top: moderateScale(-35), zIndex: 6 }}
                    >
                    </FAB>
                </>
                }
            </>
            :<>
                <View style={styles.topBg}>
                    <View style={[styles.topThreeButton,{marginTop: moderateScale(10),}]}>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往冰箱配置按鈕"}>
                            <Text style={styles.topButtonText}>
                                冰箱配置
                            </Text>
                            <Button
                                onPress={() => { navigation.navigate("Step1") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faTools} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往NFC功能按鈕"}
                        >
                            <Text style={styles.topButtonText}>
                                NFC
                            </Text>
                            <Button
                                onPress={() => { navigation.navigate("Nfc") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faNfcSymbol} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View
                            accessible={true}
                            accessibilityLabel={"前往冰箱分層功能按鈕"}>
                            <Text style={styles.topButtonText}>
                                冰箱分層
                            </Text>
                            <Button
                                accessible={false}
                                //accessibilityRole={"none"}
                                onPress={() => { navigation.navigate("Refrigerator") }}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faBars} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>

                    </View>
                </View>

                <View style={styles.dateView}>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`即將過期食物數量 ${foodInfoExpire.Plus}`}
                        accessibilityHint={"顯示即將過期食物列表按鈕"}
                        onPress={() => { changeButtonColor() }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == true ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={[styles.dateButtonTitle,]}>
                                <FontAwesomeIcon icon={faCalendar} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>即將過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodInfoExpire.Plus}</Text>
                            </View>}>
                    </Button>
                    <View style={{ height: moderateScale(10) }}>
                    </View>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`已過期食物數量 ${foodInfoExpire.Minus}`}
                        accessibilityHint={"顯示已過期食物列表按鈕"}
                        onPress={() => { changeButtonColor() }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == false ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={styles.dateButtonTitle}>
                                <FontAwesomeIcon icon={faCalendarXmark} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>已過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodInfoExpire.Minus}</Text>
                            </View>}
                    >
                    </Button>
                </View>

                {buttonSelect ? <>
                    
                        <View
                            //accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"即將過期食物列表"}
                            style={[styles.homeDateList,{height:verticalScale(450)}]}>
                            <FlashList
                                data={filteredFoodInfo}
                                estimatedItemSize={30}
                                renderItem={({ item, index }) => {
                                    if (item.day < 4 && item.day >= 0) { // 只渲染符合條件的項目
                                        return (
                                            <ItemBox
                                                data={item}
                                                handleDelete={() => deleteItem(index, item)}
                                                handleClick={() => handClickItem(index, item)}
                                                index={index}
                                            />);
                                    } else {
                                        return null; // 不渲染不符合條件的項目
                                    }
                                }}>
                            </FlashList>
                        </View>
                    
                </>
                    :
                    <>
                        
                            <View
                                style={[styles.homeDateList,{height: verticalScale(450),}]}
                                //accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"已過期食物列表"}
                            >
                                <FlashList
                                    data={filteredFoodInfo}
                                    estimatedItemSize={30}
                                    renderItem={({ item, index }) => {
                                        if (item.day < 0) { // 只渲染符合條件的項目
                                            return (
                                                <ItemBox
                                                    data={item}
                                                    handleDelete={() => deleteItem(index, item)}
                                                    handleClick={() => handClickItem(index, item)}
                                                    index={index}
                                                />
                                            );
                                        } else {
                                            return null; // 不渲染不符合條件的項目
                                        }
                                    }}>
                                </FlashList>
                            </View>
                
                        <FAB
                            icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(15)}></FontAwesomeIcon>}
                            color="#C81414"
                            //size="small"
                            placement="right"
                            style={{zIndex: 10 }}
                        >
                        </FAB>
                    </>}
                </>
            }
        </ScrollView>

    );
};
const styles = StyleSheet.create({

    sa: {
        flex: 1,
    },
    topBg: { //上方灰色背景
        backgroundColor: '#E4E4E4',
        borderBottomRightRadius: moderateScale(20),
        borderBottomStartRadius: moderateScale(20),
    },
    dateView: { //日期切換顯示按鈕
        justifyContent: 'flex-end',
        marginTop: moderateScale(50),
    },
    dateListView: { //下方list外框
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: moderateScale(1, 25),
    },
    topThreeButton: { //三個按鈕群組
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(-30),
        top: moderateScale(35),
    },
    topButton: { //三個按鈕的單個按鈕
        marginTop: moderateScale(5),
        backgroundColor: '#A7DCFF',
        padding: moderateScale(23),
        borderRadius: moderateScale(50),
    },
    topButtonText: { //三個按鈕的單個文字
        textAlign: 'center',
        fontWeight: "bold",
        color: "#777",
        fontSize: moderateScale(14),
    },
    dateButton: { //切換日期按鈕
        marginHorizontal: moderateScale(40),
        borderRadius: moderateScale(20, 0.2),
        backgroundColor: "#BFBFBF",
    },
    dateButtonTitle: { //切換日期按鈕標題
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: moderateScale(3),
        //backgroundColor:'blue',
    },
    homeDateList: {
        flex: 1,
        zIndex: 2,
        backgroundColor: '#ECEAEA',
        height: verticalScale(320),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
    },

});

export default HomeScreen;