import React, { Component, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, FAB, Input, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { Alert, Dimensions, Image, PermissionsAndroid, SafeAreaView, ScrollView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faCalendar, faCalendarXmark, faTools, faTrash, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import { scale, moderateScale, verticalScale } from "./ScaleMethod";

import { FlashList } from "@shopify/flash-list";

import ItemBox from "./foodList/FoodList_Home";
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodApi, getFoodInfo, setIsloading } from "../store/foodSlice";
import { getRefInfo } from "../store/refSlice";
import { TouchableWithoutFeedback } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import Modal from "react-native-modal";
import { checkToken } from "../store/userSlice";
const HomeScreen = () => {
    const navigation = useNavigation()
    const [buttonSelect, setButtonSelect] = useState(true);
    const { lookModel } = useContext(AuthContext);
    const [filteredFoodInfo, setFilteredFoodInfo] = useState([]);
    const [seekBar, setSeekBar] = useState(3);
    const [seekBarDate, setSeekBarDate] = useState("即將過期食物");
    const state = useSelector(state => state.userInfo);
    const foodState = useSelector(state => state.foodInfo);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    
    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            const fetchData = async () => {
                console.log("首頁檢查token新方法");
                await dispatch(checkToken());
                // 現在 token 已經更新，可以使用更新後的 token 來獲取其他數據
                await dispatch(getFoodInfo());
                await dispatch(getRefInfo());
            };
    
            fetchData();
        }, [dispatch])
    )

    const onRefresh = useCallback(() => { // 食材料表重新整理
        dispatch(setIsloading());
        dispatch(checkToken());
        dispatch(getFoodInfo());
    }, []);

    useEffect(() => { //有資料且正確載入使組建篩選並重新渲染
        if (foodState.foodList && foodState.foodList.length > 0) {
            filterFoodData();
        }
    }, [buttonSelect, foodState.foodList]);

    // 篩選函式
    const filterFoodData = () => {
        //console.log("篩選食物清單",foodInfo);
        if (foodState.foodList) {
            //console.log("開始篩選食物列表 ",foodState.foodList);
            if (buttonSelect) {
                console.log("篩選一");
                setFilteredFoodInfo(foodState.foodList.filter(item => item.day < 4 && item.day >= 0));
            } else {
                console.log("篩選二");
                setFilteredFoodInfo(foodState.foodList.filter(item => item.day < 0));
            }
        }
    };
    /**
     * 拉動顯示過期日期SeekBar
     * @param {*} val 
     */
    const changeSeekBar = (val) => {
        //console.log("seekbar_value:", val)
        if (foodState.foodList) {
            setSeekBar(val);
            switch (val) {
                case 4.5:
                    setButtonSelect(false);
                    setSeekBarDate("已過期");
                    setFilteredFoodInfo(foodState.foodList.filter(item => item.day < 0));
                    break;
                case 3:
                    setSeekBarDate("今日過期");
                    setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 0));
                    setButtonSelect(true);
                    break;
                case 1.5:
                    setSeekBarDate("1天後過期");
                    setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 1));
                    setButtonSelect(true);
                    break;
                case 0:
                    setSeekBarDate("2-3天後過期");
                    setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 2 || item.day == 3));
                    setButtonSelect(true);
                    break;
            }
        }
    }
    /**
     * 專門點擊組件更改上發拉霸值
     */
    const handClickItemToSeekBar = (val) => {
        //console.log("seekbar_value:", val)
        setSeekBar(val);
        switch (val) {
            case 4.5:
                setSeekBarDate("已過期");
                //setButtonSelect(false);
                break;
            case 3:
                setSeekBarDate("今日過期");
                //setButtonSelect(true);
                break;
            case 1.5:
                setSeekBarDate("1天後過期");

                //setButtonSelect(true);
                break;
            case 0:
                setSeekBarDate("2-3天後過期");
                //setButtonSelect(true);
                break;
        }
    }
    /**
     * 點擊組建回傳
     */
    const handClickItem = (index, item) => {
        //console.log("點擊的食物index：", index);
        console.log("點擊的item：", item);
        const day = item.day;
        switch (day) {
            case 0:
                handClickItemToSeekBar(3);
                break
            case 1:
                handClickItemToSeekBar(1.5);
                break
            case 2:
                handClickItemToSeekBar(0);
                break
            case 3:
                handClickItemToSeekBar(0);
                break
            default:
                //console.log("天數為>1");
                handClickItemToSeekBar(4.5);
        }
    }
    /**
     * 更改按鈕顏色以及顯示列表
     */
    const changeButtonColor = (val) => {
        if (val != buttonSelect) { //有更改選擇點選同一個按鈕執行

            setButtonSelect(!buttonSelect);
            if (val == false) {
                handClickItemToSeekBar(4.5); //更改seekbar value
            } else {
                handClickItemToSeekBar(3); //更改seekbar value
            }
        } else {//未更改選擇點選同一個按鈕執行
            filterFoodData();
        }
    }
    /**
     * 刪除食物
     * @param {*} index 
     */
    const deleteItem = useCallback((index) => {
        Alert.alert(filteredFoodInfo[index].ingredient_orignal_name, "將被刪除，確定要繼續嗎", [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '刪除',
                onPress: () => deleteItemApi(filteredFoodInfo[index].ingredient_id),
                style: 'destructive'
            },
        ]);
        //console.log("刪除：", index)
    }, [filteredFoodInfo]);

    const deleteItemApi = async (id) => {
        await dispatch(deleteFoodApi(id));
        await dispatch(getFoodInfo());
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 2500);
    }



    const deleteMoreItemApi = async () => {
        console.log("要刪除的食物", filteredFoodInfo);

        for (var i = 0; i < filteredFoodInfo.length; i++) {
            await dispatch(deleteFoodApi(filteredFoodInfo[i].ingredient_id));
        }
        setModalVisible(true);
        await dispatch(getFoodInfo());

        setTimeout(() => {
            setModalVisible(false);
        }, 2500);
    }


    return (
        <ScrollView
            contentContainerStyle={{}}
            scrollEnabled={false}
        >
            <Modal
                animationIn={"zoomIn"}
                animationInTiming={900}
                animationOut={"zoomOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.6}
                onBackdropPress={() => { setModalVisible(false) }}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setModalVisible(false) }}
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
                <View style={[styles.topBg, {}]}>
                    <View accessible={true}
                        accessibilityLabel={`名稱為 ${state.info.username}`}
                        accessibilityRole={"none"}>
                        <Input
                            disabled
                            containerStyle={{
                                paddingHorizontal: moderateScale(70),
                                marginTop: Platform.OS === 'android' ? verticalScale(-5) : verticalScale(30)
                            }}
                            inputContainerStyle={{ height: Platform.OS == 'android' ? verticalScale(66) : moderateScale(50), }}
                            disabledInputStyle={{ fontSize: moderateScale(30), marginTop: moderateScale(10, 0.7) }}
                            leftIcon={<FontAwesomeIcon icon={faUser} color="#777" size={moderateScale(23)} style={{ marginTop: moderateScale(10, 0.6) }}></FontAwesomeIcon>}
                        >
                            {state.info.username}
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
                        accessibilityLabel={`即將過期食物數量 ${foodState.Plus}`}
                        accessibilityHint={"顯示即將過期食物列表按鈕"}
                        onPress={() => { changeButtonColor(true) }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == true ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={[styles.dateButtonTitle,]}>
                                <FontAwesomeIcon icon={faCalendar} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>即將過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodState.Plus}</Text>
                            </View>}>
                    </Button>
                    <View style={{ height: moderateScale(10) }}>
                    </View>
                    <Button
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`已過期食物數量 ${foodState.Minus}`}
                        accessibilityHint={"顯示已過期食物列表按鈕"}
                        onPress={() => { changeButtonColor(false) }}
                        buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == false ? "#FFCA7B" : "#BFBFBF" }]}
                        title={
                            <View style={styles.dateButtonTitle}>
                                <FontAwesomeIcon icon={faCalendarXmark} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>已過期食物數量</Text>
                                <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodState.Minus}</Text>
                            </View>}
                    >
                    </Button>
                    <Text style={{ textAlign: 'center', marginTop: moderateScale(10), color: "#777", fontSize: moderateScale(20), fontWeight: '600' }}>
                        {seekBarDate}
                    </Text>
                    <View>
                        <Image
                            source={require('../../Img/SeekBar.png')}
                            resizeMode="contain"
                            style={{ width: moderateScale(300, 1), alignSelf: 'center', top: Platform.OS === 'android' ? moderateScale(10) : moderateScale(10, 0), }}>
                        </Image>
                        {Platform.OS === 'android' ?
                            <Slider
                                style={{ width: moderateScale(280, 0.7), alignSelf: 'center', zIndex: 10, top: moderateScale(-20, -0.7) }}
                                value={seekBar}
                                onValueChange={(val) => { changeSeekBar(val) }}
                                minimumValue={0}
                                maximumValue={4.5}
                                step={1.5}
                                thumbImage={require('../../Img/Dot.png')}
                                maximumTrackTintColor={"transparent"}
                                minimumTrackTintColor="transparent"
                            /> :
                            <Slider
                                style={{ width: moderateScale(280, 0.7), alignSelf: 'center', zIndex: 2, top: moderateScale(-20, -0.7) }}
                                value={seekBar}
                                onValueChange={(val) => { changeSeekBar(val) }}
                                minimumValue={0}
                                maximumValue={4.5}
                                step={1.5}
                                thumbTintColor={"#FFFFFF"}
                                maximumTrackTintColor={"transparent"}
                                minimumTrackTintColor="transparent"
                            />}

                    </View>
                </View>

                {buttonSelect ? <>
                    <View
                        //accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"即將過期食物列表"}
                        style={[styles.homeDateList, { marginTop: moderateScale(-20, -1.5), }]}>
                        <FlashList
                            nestedScrollEnabled
                            refreshControl={
                                <RefreshControl refreshing={foodState.isLoading} onRefresh={onRefresh} style={{}} />
                            }
                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
                            data={filteredFoodInfo}
                            estimatedItemSize={30}
                            renderItem={({ item, index }) => {
                                if (item.day < 4 && item.day >= 0) { // 只渲染符合條件的項目
                                    return (
                                        <ItemBox
                                            data={item}
                                            handleDelete={deleteItem} //由子組件傳值直接調用父組件的方法
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
                    : <>

                        <View
                            style={[styles.homeDateList, { marginTop: moderateScale(-20, -1.5), }]}
                            //accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"已過期食物列表"}
                        >
                            <FlashList
                                refreshControl={
                                    <RefreshControl refreshing={foodState.isLoading} onRefresh={onRefresh} style={{}} />
                                }
                                nestedScrollEnabled
                                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
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

                    </>
                }
            </>
                : <>
                    <View style={styles.topBg}>
                        <View style={[styles.topThreeButton, { marginTop: moderateScale(10), }]}>
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
                            accessibilityLabel={`即將過期食物數量 ${foodState.Plus}`}
                            accessibilityHint={"顯示即將過期食物列表按鈕"}
                            onPress={() => { changeButtonColor(true) }}
                            buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == true ? "#FFCA7B" : "#BFBFBF" }]}
                            title={
                                <View style={[styles.dateButtonTitle,]}>
                                    <FontAwesomeIcon icon={faCalendar} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                    <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>即將過期食物數量</Text>
                                    <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodState.Plus}</Text>
                                </View>}>
                        </Button>
                        <View style={{ height: moderateScale(10) }}>
                        </View>
                        <Button
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={`已過期食物數量 ${foodState.Minus}`}
                            accessibilityHint={"顯示已過期食物列表按鈕"}
                            onPress={() => { changeButtonColor(false) }}
                            buttonStyle={[styles.dateButton, { backgroundColor: buttonSelect == false ? "#FFCA7B" : "#BFBFBF" }]}
                            title={
                                <View style={styles.dateButtonTitle}>
                                    <FontAwesomeIcon icon={faCalendarXmark} color="#FFFFFF" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(10), top: 2 }}></FontAwesomeIcon>
                                    <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777" }}>已過期食物數量</Text>
                                    <Text style={{ fontSize: moderateScale(20), fontWeight: 'bold', color: "#777", textAlign: 'right', flex: 1, marginEnd: moderateScale(5) }}>{foodState.Minus}</Text>
                                </View>}
                        >
                        </Button>
                    </View>

                    {buttonSelect ? <>

                        <View
                            //accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"即將過期食物列表"}
                            style={[styles.homeDateList, { height: verticalScale(450) }]}>
                            <FlashList
                                refreshControl={
                                    <RefreshControl refreshing={foodState.isLoading} onRefresh={onRefresh} style={{}} />
                                }
                                nestedScrollEnabled
                                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
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
                                style={[styles.homeDateList, { height: verticalScale(450), }]}
                                //accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"已過期食物列表"}
                            >
                                <FlashList
                                    refreshControl={
                                        <RefreshControl refreshing={foodState.isLoading} onRefresh={onRefresh} style={{}} />
                                    }
                                    nestedScrollEnabled
                                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
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
                                icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(20)}></FontAwesomeIcon>}
                                color="#C81414"
                                //size="small"
                                placement="right"
                                onPress={() => { deleteMoreItem() }}
                                style={{ zIndex: 10 }}
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
        marginTop: moderateScale(-40),
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
        height: verticalScale(335),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
    },
    modalView: {
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: moderateScale(300),
        height: moderateScale(250),
    },


});

export default HomeScreen;