import { faAngleDoubleDown, faAngleDown, faAngleUp, faCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, Keyboard, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, FAB, Text } from "react-native-elements";
import modal_fab from "../style/Modal&FAB";
import { moderateScale } from "./ScaleMethod";
import { ScreenWidth } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import refrigerator from "../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import axios, { all } from "axios";
import { FlashList } from "@shopify/flash-list";
import RefFlashList from "./RefFlashList";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import Userstyle from "../style/UserStyle";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../assets/swipeColor";
import { useDispatch, useSelector } from "react-redux";
import { getRefInfo, queryRefPlace } from "../store/refSlice";
import { BASE_URL } from "../config";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import BoxContainer from "./add_food/BoxContainer";
import { addQuery, clearQuery, getRefQueryInfo, getRefQueryInfo_compartment } from "../store/refQuerySlice";
import ItemBox from "./foodList/FoodList_Ref";
import { Alert } from "react-native";
import { TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../style/Dropdown";

const RefrigeratorScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [foodListModalVisible, setFoodListModalVisible] = useState(false);
    const [modifyFoodModalVisible, setModifyFoodModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [clickSelect, setClickSelect] = useState();
    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState("");
    const [foodCatgory, setFoodCatgory] = useState(null);
    const [date, setDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [month, setMonth] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const userState = useSelector(state => state.userInfo);
    const refState = useSelector(state => state.refInfo);
    const refQueryState = useSelector(state => state.refQuery);
    const dispatch = useDispatch();
    const bottomSheetRef = React.useRef(null);
    const [containerBoxCount, setContainerBoxCount] = useState()//平面分層數量

    const [foodCatgoryList, setFoodCatgoryList] = useState([
        { label: '蔬菜類', value: '', icon: () => <Image source={require("../../Img/foodpic/蔬菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '肉類', value: '', icon: () => <Image source={require("../../Img/foodpic/肉類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '海鮮', value: '', icon: () => <Image source={require("../../Img/foodpic/海鮮.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '飲品類', value: '', icon: () => <Image source={require("../../Img/foodpic/飲料.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '水果類', value: '', icon: () => <Image source={require("../../Img/foodpic/水果.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '加工食品類', value: '', icon: () => <Image source={require("../../Img/foodpic/加工食品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '冰品', value: '', icon: () => <Image source={require("../../Img/foodpic/冰品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '甜點', value: '', icon: () => <Image source={require("../../Img/foodpic/甜點.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '奶製品', value: '', icon: () => <Image source={require("../../Img/foodpic/奶製品.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '豆類', value: '', icon: () => <Image source={require("../../Img/foodpic/豆類.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '雞蛋', value: '', icon: () => <Image source={require("../../Img/foodpic/雞蛋.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
        { label: '剩菜', value: '', icon: () => <Image source={require("../../Img/foodpic/剩菜.png")} resizeMode={"cover"} style={styles.iconImg}></Image> },
    ]);

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            dispatch(getRefInfo());
        }, [])
    );
    useEffect(() => { //設置標題右側按鈕
        getFoodCatgoryList();
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

    /**
     * 取得食物分類ID
     */
    const getFoodCatgoryList = () => {
        axios.get(`${BASE_URL}/storage/category`, {
            headers: {
                'Authorization': userState.token
            }
        }).then(res => {
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
                for (let j = 0; j < foodCatgoryList.length; j++)
                    if (res.data[i].category_name == foodCatgoryList[j].label) {
                        foodCatgoryList[j].value = res.data[i].category_id
                    }
            }
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            console.log("食物選單", foodCatgoryList);

        });
    }
    /**
     * 子組件分層點擊回傳
     * @param {*} index 
     * @param {*} name 
     * @param {*} type 
     */
    const clickItem = (index, name, type) => {
        console.log("分層點擊= ", index, "冰箱名稱= ", name, "種類= ", type);

        //dispatch(queryRefPlace());
        if (type == "freezerDoor" || type == "coolerDoor") {
            dispatch(addQuery({ "refName": name, "compartment_row": index, "category": type, container_col: "0", container_row: '0' }));
        } else {
            dispatch(addQuery({ "refName": name, "compartment_row": index, "category": type }));
        }
        dispatch(getRefQueryInfo_compartment());
        setFoodListModalVisible(true);

    }
    /**
     * 子組件長按點擊回傳
     * @param {*} index 
     * @param {*} name 
     * @param {*} type 
     * @param {*} refIndex 
     */
    const longClickItem = (index, name, type, refIndex) => {
        //console.log("分層點擊= ", index, "冰箱名稱= ", name, "種類= ", type ,"冰箱index=",refIndex);
        if (type == "freezerDoor" || type == "coolerDoor") {
            dispatch(addQuery({ "refName": name, "container_row": index, "category": type }));
            setFoodListModalVisible(true)
        } else {
            dispatch(addQuery({ "refName": name, "compartment_row": index, "category": type }));
            setContainerBoxCount(refState.refList[refIndex][type]);
            bottomSheetRef.current.expand();
        }
        //dispatch(queryRefPlace());
        //setFoodListModalVisible(true)
    }
    /**
     * 子組件平面立體圖點擊回傳
     * @param {*} Boxcol 
     * @param {*} Boxrow 
     */
    const containerClickItem = (Boxcol, Boxrow) => {
        console.log("col: ", Boxcol, "row: ", Boxrow);
        dispatch(addQuery({ "container_col": Boxcol, "container_row": Boxrow, }));
        bottomSheetRef.current.forceClose();
        setFoodListModalVisible(true);
        dispatch(getRefQueryInfo());
    }
    useEffect(() => {
        if (clickSelect) {
            Alert.alert(
                `${clickSelect.ingredient_custom_name ? clickSelect.ingredient_custom_name : clickSelect.ingredient_orignal_name}`, "",
                [
                    { text: "修改", onPress: () => { setModifyFoodModalVisible(true) }, style: "cancel" },
                    {
                        text: "刪除", onPress: () => {
                            Alert.alert("確認刪除", "", [
                                { text: "取消", style: "cancel" },
                                { text: "刪除", onPress: () => { deleteMethod() }, style: 'destructive' }
                            ])
                        }, style: 'destructive'
                    }
                ]
            )
        }

    }, [clickSelect]);
    /**
     * 查詢後的時候列表點擊
     * @param {*} index 
     * @param {*} item 
     */
    const listItemClick = async (index, item) => {
        console.log("選擇的值", item);
        const setValuesWithDelay = async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    setClickSelect(item);
                    setFoodName(item.ingredient_custom_name ? item.ingredient_custom_name : item.ingredient_orignal_name);
                    setFoodCatgory(item.category_id);
                    setFoodDate(item.expired_date);
                    resolve();
                }, 0);
            })
        };
        await setValuesWithDelay();
    }
    /**
     * 刪除食物資料
     */
    const deleteMethod = () => {
        console.log("刪除id", clickSelect.ingredient_id);
        
        axios({
            method: "DELETE",
            url: `${BASE_URL}/storage/item`,
            headers: { 'Authorization': userState.token },
            data: { "ingredient_id": clickSelect.ingredient_id },
        }).then(res => {
            console.log(res.data);
            //setFoodListModalVisible(false);
            setModalDeleteVisible(true);
            setTimeout(() => {
            setFoodListModalVisible(false);
            setModalDeleteVisible(false);
        }, 2500);
        }).catch(function (error) {
            setModalDeleteVisible(true);
            setTimeout(() => {
            setFoodListModalVisible(false);
            setModalDeleteVisible(false);
        }, 2500);
            console.log(`deleteFood error ${error.response.data}`);
        }).finally(() => {
        });
        
    }
    /**
     * 上傳修改資料
     */
    const modifyMethod = () => {
        console.log("上傳");
        const cCategory = foodCatgoryList.findIndex(item => item.value == foodCatgory);
        var temp = {
            ...clickSelect,
            ingredient_orignal_name: foodName,
            category_id: foodCatgory,
            expired_date: foodDate,
            category_name: foodCatgoryList[cCategory].label,
            calculator_expired_date: foodDate,
            refrigerator_name: refQueryState.refName,
        };
        const { day, ...upData } = temp;
        console.log("更改值", upData);

        axios({
            method: "PUT",
            url: `${BASE_URL}/storage/ingredient`,
            headers: { 'Authorization': userState.token },
            data: upData
        }).then(res => {
            console.log("修改成功", res.data);
            setFoodListModalVisible(false);
        }).catch(function (error) {
            console.log(`modify error ${error.response.data}`);
        }).finally(() => {
        });
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* 右上方提示組件 */}
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

                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                            <TouchableOpacity
                                disabled
                                style={{
                                    backgroundColor: "#416BFF",
                                    marginLeft: moderateScale(20,0.1),
                                    marginTop: moderateScale(150,0.1),
                                    borderRadius: moderateScale(10),
                                    justifyContent: 'flex-start',
                                    height: moderateScale(70),
                                    width: moderateScale(220,1.2)
                                }}
                            >
                                <AnimatedLottieView
                                    style={{ height: moderateScale(120), alignSelf: 'flex-start' }}
                                    source={require('../assets/click.json')}
                                    speed={0.5}
                                    autoPlay
                                    loop={false}
                                    autoSize={true} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginHorizontal: moderateScale(10) }}>

                                <Text style={[modal_fab.modalTitle, { marginRight: moderateScale(10) }]}>點擊查看該分層儲存食材，長按則會跳出平面分層圖，再進行區塊選擇</Text>
                            </View>

                        </View>
                        <View>
                            <AnimatedLottieView
                                style={{ width: moderateScale(200), alignSelf: 'center', }}
                                source={require('../assets/swipeLeft.json')}
                                speed={0.9}
                                autoPlay
                                loop={false}
                                colorFilters={ChangeColor}
                                autoSize={true} />
                            <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(30) }}>
                                <Text style={[modal_fab.modalTitle, { marginTop: 0 }]}>左右滑動頁面查看不同冰箱</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 查詢的食物資料 */}
            <View style={{ flex: 1, width: ScreenWidth, justifyContent: 'flex-start', marginTop: moderateScale(20) }}>
                {/* 查詢的食物資料 */}
                <Modal
                    animationIn={"fadeIn"}
                    animationInTiming={1000}
                    animationOut={"fadeOut"}
                    animationOutTiming={1000}
                    isVisible={foodListModalVisible}
                    backdropOpacity={0.9}
                    onBackdropPress={() => { setModifyFoodModalVisible(false), setFoodListModalVisible(false), dispatch(clearQuery()) }}
                >
                    <View
                        //accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"即將過期食物列表"}
                        style={[styles.foodListView, { marginVertical: modifyFoodModalVisible ? moderateScale(150,0.2) : moderateScale(200) }]}>
                        {modifyFoodModalVisible ?
                            <>
                                <View style={styles.modifyView}>
                                    <Text style={styles.modifyTitle}>修改食物資訊</Text>
                                    <Text style={[Userstyle.textLabel, { marginTop: moderateScale(20) }]}
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
                                        style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(-25) }]}
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
                                        confirmText={"確定"}
                                        cancelText={"取消"}
                                        locale="zh-Hant"
                                    />
                                    <Text style={Userstyle.textLabel}
                                        accessible={false}
                                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                        accessibilityState={{ disabled: true }} >
                                        食材種類
                                    </Text>
                                    <DropDownPicker
                                        //controller={(instance) => dropDownRef.current = instance}
                                        zIndex={9000}
                                        autoScroll={true}
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(50) }}>
                                        <Button
                                            title="取消"
                                            buttonStyle={{
                                                backgroundColor: "#919191",
                                                borderRadius: moderateScale(10),
                                            }}
                                            containerStyle={{
                                                height: moderateScale(40),
                                                width: moderateScale(140),
                                                marginHorizontal: moderateScale(10),
                                            }}
                                            titleStyle={{ fontSize: moderateScale(20), color: '#ffffff', fontWeight: "bold", }}
                                            onPress={() => {
                                                setModifyFoodModalVisible(false);
                                            }}
                                        />
                                        <Button
                                            title="修改"
                                            buttonStyle={{
                                                backgroundColor: "#27F727",
                                                borderRadius: moderateScale(10),
                                            }}
                                            containerStyle={{
                                                height: moderateScale(40),
                                                width: moderateScale(140),
                                                marginHorizontal: moderateScale(10),
                                            }}
                                            titleStyle={{ fontSize: moderateScale(20), color: '#ffffff', fontWeight: "bold" }}
                                            onPress={() => { modifyMethod(), setModifyFoodModalVisible(false) }}//to RegisterScreen
                                        />
                                    </View>
                                </View>

                            </> :
                            <>

                                {modalDeleteVisible ?
                                    <>

                                        <View style={styles.deleteModalView}>
                                            <AnimatedLottieView
                                                style={{ width: moderateScale(500), alignSelf: 'center', paddingEnd: moderateScale(6), justifyContent: 'center' }}
                                                source={require('../assets/trash.json')}
                                                autoPlay
                                                speed={0.5}
                                                loop={false}>
                                            </AnimatedLottieView>

                                        </View>

                                    </>
                                    :
                                    <>
                                        <FlashList
                                            nestedScrollEnabled
                                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無食物資料</Text>}
                                            data={refQueryState.foodList}
                                            estimatedItemSize={30}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <ItemBox data={item}
                                                        //handleDelete={deleteItem} //由子組件傳值直接調用父組件的方法
                                                        handleClick={() => listItemClick(index, item)}
                                                        index={index}>
                                                    </ItemBox>
                                                )
                                            }}>
                                        </FlashList>
                                    </>}
                            </>
                        }
                    </View>
                </Modal>

                {/* 冰箱列表顯示 */}
                {refState.refList.length > 0 ?
                    <FlashList
                        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>請建立冰箱配置</Text>}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={refState.refList}
                        horizontal={true}
                        estimatedItemSize={800}
                        renderItem={({ item, index }) => (
                            <RefFlashList
                                data={item}
                                handleClick={clickItem}
                                longHandleClick={longClickItem}
                                index={index}
                            />)}>
                    </FlashList>
                    :
                    <>
                        <Text style={styles.noRefText}>無冰箱列表資訊</Text>
                        <Button
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往建立冰箱頁面"}
                            onPress={() => { navigation.navigate("Step1") }}
                            buttonStyle={[
                                {
                                    marginVertical: moderateScale(0),
                                    backgroundColor: '#8C9090',
                                    marginHorizontal: moderateScale(40),
                                    borderRadius: moderateScale(10),
                                }
                            ]}
                            titleStyle={{ fontSize: moderateScale(17), fontWeight: 'bold' }}
                            title="前往建立冰箱">

                        </Button>
                    </>
                }
                {/* 底部平面立體圖 */}
                <BottomSheet
                    backdropComponent={props => (<BottomSheetBackdrop {...props}
                        opacity={0.8}
                        enableTouchThrough={false}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}
                    handleStyle={styles.bottomSheetHandle}
                    handleIndicatorStyle={{ backgroundColor: "#FFAA00", height: moderateScale(5), width: moderateScale(50), }}
                    index={-1}
                    snapPoints={['60%']}
                    enablePanDownToClose={true}
                    ref={bottomSheetRef}
                >
                    <Text style={styles.addText}>選擇平面存放區域</Text>
                    <ImageBackground source={require('../../Img/Under.png')} style={{ height: moderateScale(200), marginVertical: moderateScale(80), }}>
                        <BoxContainer number={containerBoxCount} clickIndex={containerClickItem}>
                        </BoxContainer>
                    </ImageBackground>
                </BottomSheet>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        //backgroundColor:"yellow",
    },
    title: {
        textAlign: 'center',
        fontSize: moderateScale(25),
        marginVertical: moderateScale(20),
        color: '#777',
        width: ScreenWidth,
    },
    modalView: {
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        //justifyContent:'center',
        backgroundColor: '#FFFFFF',
        height: moderateScale(400),
        //flex:1,
        marginVertical: moderateScale(200),
    },
    modalTitle: {
        marginTop: moderateScale(20),
        marginBottom: moderateScale(20),
        fontSize: moderateScale(30),
        textAlign: 'center',
        color: "#777"
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 50,
    },
    finalTop: {
        flexDirection: 'row',
        flex: 5,
    },
    finalDown: {
        flexDirection: 'row',
        flex: 10,
    },
    foodListView: {
        flex: 1,
        zIndex: 2,
        backgroundColor: '#ECEAEA',
        marginHorizontal: moderateScale(0),
        borderRadius: moderateScale(20),
        marginVertical: moderateScale(200),
        //padding: moderateScale(20),
        paddingVertical: moderateScale(20),
        justifyContent: 'center',
    },
    addText: {
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        marginVertical: moderateScale(10),
    },
    bottomSheetHandle: {
        height: moderateScale(30),
    },
    noRefText: {
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        marginVertical: moderateScale(10),
        fontWeight: 'bold'
    },
    modifyView: {
        flex: 1,
        justifyContent: 'flex-start',
        //backgroundColor:'yellow',
    },
    iconImg: {
        //flex:1,
        width: moderateScale(20),
        height: moderateScale(20),
    },
    modifyTitle: {
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        fontWeight: 'bold',
    },
    deleteModalView: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

})

export default RefrigeratorScreen;