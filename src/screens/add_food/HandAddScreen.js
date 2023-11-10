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
import { addFood, clearList, deleteItem, modifyItem } from "../../store/createFoodSlice";
import { TouchableOpacity } from "react-native";
import RecipeStyle from "../../style/RecipeStyle";
import AutocompleteInput from "react-native-autocomplete-input";
import { FlashList } from "@shopify/flash-list";
const HandAddScreen = () => {
    //console.log("UpdateUserPhoneScreen");
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState("");
    const [foodCatgory, setFoodCatgory] = useState(null);
    const [foodNameModal, setFoodNameModal] = useState("");
    const [foodDateModal, setFoodDateModal] = useState("");
    const [foodCatgoryModal, setFoodCatgoryModal] = useState(null);
    const [clickIndex, setClickIndex] = useState('');
    const [date, setDate] = useState(new Date())
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [datePickerOpenModal, setDatePickerOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [foodListModalVisible, setFoodListModalVisible] = useState(false);
    const [modifyFoodModalVisible, setModifyFoodModalVisible] = useState(false);
    const foodListData = require('../../assets/foodInput.json');
    const [filteredfoodList, setFilteredfoodList] = useState([]);
    const [suggestionList, setSuggestionList] = useState(true);

    const [month, setMonth] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const [foodCatgoryList, setFoodCatgoryList] = useState([
        { label: '蔬菜類', value: '', icon: () => <Image source={require("../../../Img/foodpic/蔬菜.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '肉類', value: '', icon: () => <Image source={require("../../../Img/foodpic/肉類.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '海鮮', value: '', icon: () => <Image source={require("../../../Img/foodpic/海鮮.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '飲品類', value: '', icon: () => <Image source={require("../../../Img/foodpic/飲料.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '水果類', value: '', icon: () => <Image source={require("../../../Img/foodpic/水果.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '加工食品類', value: '', icon: () => <Image source={require("../../../Img/foodpic/加工食品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '冰品', value: '', icon: () => <Image source={require("../../../Img/foodpic/冰品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '甜點', value: '', icon: () => <Image source={require("../../../Img/foodpic/甜點.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '奶製品', value: '', icon: () => <Image source={require("../../../Img/foodpic/奶製品.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '豆類', value: '', icon: () => <Image source={require("../../../Img/foodpic/豆類.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '雞蛋', value: '', icon: () => <Image source={require("../../../Img/foodpic/雞蛋.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
        { label: '剩菜', value: '', icon: () => <Image source={require("../../../Img/foodpic/剩菜.png")} resizeMode={"contain"} style={styles.iconImg}></Image> },
    ]);
    const userState = useSelector(state => state.userInfo);
    //const { token, } = useContext(AuthContext);
    const dispatch = useDispatch();
    const foodstate = useSelector(state => state.createFood);

    const checkAddFood = () => {
        //增加項目 
        if (foodName.length==0 || foodDate.length==0 || foodCatgory.length==0) {
            console.log(foodName,foodDate,foodCatgory);
            Alert.alert("請完成食物資訊輸入");
        } else {

            dispatch(addFood({ "foodName": foodName, "foodDate": foodDate, "foodCatgory": foodCatgory }));
            setFoodName("");
            setFoodDate("");
            setFoodCatgory(null);
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
     * 
     * @param {*} date 
     * 更改日期
     */
    const changeDataModal = (date) => {
        //console.log(date);
        let datelist = date.split(/\s+/);
        //console.log(datelist);
        let tempDate = datelist[3] + "/" + month.indexOf(datelist[1]) + "/" + datelist[2];
        setFoodDateModal(tempDate);
    }

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
                for (let j = 0; j < foodCatgoryList.length; j++){
                    foodCatgoryList[j].value = j;
                }
        }).finally(() => {
            console.log("食物選單", foodCatgoryList);

        });
    }

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

    const changeInput = (query) => {
        // Method called every time when we change the value of the input
        setFoodName(query);
        if (query) {
            // Making a case insensitive regular expression
            try {
                const regex = new RegExp(`${query.trim()}`, 'i');
                // Setting the filtered film array according the query
                setFilteredfoodList(
                    foodListData.filter((item) => item.name.search(regex) >= 0)
                );
            } catch (e) {
                console.log("error", e);
                Alert.alert("請勿輸入符號");
            }
        } else {
            // If the query is null then return blank
            setFilteredfoodList([]);
        }
    };
    const changeInputModal = (query) => {
        // Method called every time when we change the value of the input
        setFoodNameModal(query);
        if (query) {
            // Making a case insensitive regular expression
            try {
                const regex = new RegExp(`${query.trim()}`, 'i');
                // Setting the filtered film array according the query
                setFilteredfoodList(
                    foodListData.filter((item) => item.name.search(regex) >= 0)
                );
            } catch (e) {
                console.log("error", e);
                Alert.alert("請勿輸入符號");
            }
        } else {
            // If the query is null then return blank
            setFilteredfoodList([]);
        }
    };

    const handlePress =(index)=>{
        setClickIndex(index);
        setFoodNameModal(foodstate.info[index].foodName);
        setFoodDateModal(foodstate.info[index].foodDate);
        setFoodCatgoryModal(foodstate.info[index].foodCatgory);
        setModifyFoodModalVisible(true);
    }

    const modifyMethod = () => {
        console.log("更改");
        dispatch(modifyItem({index:clickIndex,foodInfo:{ "foodName": foodNameModal, "foodDate": foodDateModal, "foodCatgory": foodCatgoryModal }}));
    }
    const deleteMethod = () => {
        console.log("刪除");
        dispatch(deleteItem({index:clickIndex}))
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(), setSuggestionList(true) }} accessible={false}>
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
                            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: moderateScale(95, -0.2) }}>
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

                    <Modal
                        animationIn={"fadeIn"}
                        animationInTiming={1000}
                        animationOut={"fadeOut"}
                        animationOutTiming={1000}
                        isVisible={foodListModalVisible}
                        backdropOpacity={0.9}
                        onBackdropPress={() => { setModifyFoodModalVisible(false), setFoodListModalVisible(false) }}
                    >
                        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(), setSuggestionList(true) }} accessible={false}>
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
                                            {Platform.OS === 'android' ?
                                                <>
                                                    <View style={{
                                                        zIndex: 50,
                                                        left: 0,
                                                        position: 'absolute',
                                                        right: 0,
                                                        top: moderateScale(80),

                                                    }}>
                                                        <AutocompleteInput
                                                            hideResults={suggestionList}
                                                            selectionColor='#777'
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            onFocus={() => { setSuggestionList(false) }}
                                                            data={filteredfoodList}
                                                            value={foodDateModal}
                                                            style={[RecipeStyle.inputText, { flex: 1, width: moderateScale(330), backgroundColor: 'transparent', }]}
                                                            onChangeText={(text) => { changeInputModal(text) }}
                                                            returnKeyType="done"
                                                            flatListProps={{
                                                                style: { maxHeight: moderateScale(300) },
                                                                keyboardShouldPersistTaps: 'always',
                                                                renderItem: ({ item }) => (
                                                                    <TouchableOpacity
                                                                        onPress={() => { setFoodNameModal(item.name), setFilteredfoodList([]) }}>
                                                                        <Text style={{
                                                                            color: '#878787',
                                                                            marginHorizontal: moderateScale(10),
                                                                            fontSize: moderateScale(18),
                                                                            lineHeight: moderateScale(26)
                                                                        }}
                                                                        >
                                                                            {item.name}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                ),
                                                            }}
                                                            listContainerStyle={{ marginHorizontal: moderateScale(20, 0.1), zIndex: 1000 }}
                                                            inputContainerStyle={[RecipeStyle.input, { marginHorizontal: moderateScale(20), borderWidth: 0, }]}
                                                        />
                                                    </View>
                                                </> :
                                                <>
                                                    <View style={{ zIndex: 50 }}>
                                                        <AutocompleteInput
                                                            hideResults={suggestionList}
                                                            selectionColor='#777'
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            onFocus={() => { setSuggestionList(false) }}
                                                            data={filteredfoodList}
                                                            value={foodNameModal}
                                                            style={[RecipeStyle.inputText, { flex: 1, width: moderateScale(330), backgroundColor: 'transparent', }]}
                                                            onChangeText={(text) => { changeInputModal(text) }}
                                                            returnKeyType="done"
                                                            flatListProps={{
                                                                style: { maxHeight: moderateScale(300) },
                                                                keyboardShouldPersistTaps: 'always',
                                                                renderItem: ({ item }) => (
                                                                    <TouchableOpacity
                                                                        onPress={() => { setFoodNameModal(item.name), setFilteredfoodList([]) }}>
                                                                        <Text style={{
                                                                            color: '#878787',
                                                                            marginHorizontal: moderateScale(10),
                                                                            fontSize: moderateScale(18),
                                                                            lineHeight: moderateScale(26)
                                                                        }}
                                                                        >
                                                                            {item.name}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                ),
                                                            }}
                                                            listContainerStyle={{ marginHorizontal: moderateScale(20), zIndex: 1000 }}
                                                            inputContainerStyle={[RecipeStyle.input, { marginHorizontal: moderateScale(20), borderWidth: 0, }]}
                                                        />
                                                    </View>
                                                </>
                                            }
                                            <Text style={[Userstyle.textLabel, { marginTop: moderateScale(30, 3) }]}
                                                accessible={false}
                                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                                accessibilityState={{ disabled: true }} >
                                                到期日期
                                            </Text>
                                            <TextInput
                                                accessibilityLabel="到期日期"
                                                accessible={true}
                                                selectionColor='#777'
                                                style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(-25) }]}
                                                value={foodDateModal}
                                                //onChangeText={text=>setFoodDate(text)}
                                                onPressIn={() => { setDatePickerOpenModal(true) }}
                                            />
                                            <DatePicker
                                                title={"選擇食物過期日期"}
                                                modal
                                                mode="date"
                                                open={datePickerOpenModal}
                                                date={date}
                                                onConfirm={(date) => {
                                                    setDatePickerOpenModal(false)
                                                    changeDataModal("" + date);
                                                }}
                                                onCancel={() => {
                                                    setDatePickerOpenModal(false)
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
                                            <View style={{ zIndex: 10 }}>
                                                <DropDownPicker
                                                    //controller={(instance) => dropDownRef.current = instance}
                                                    zIndex={10}
                                                    autoScroll={true}
                                                    onPress={Keyboard.dismiss}
                                                    placeholder="選擇食物種類"
                                                    style={dropdown.squareBox}
                                                    containerStyle={dropdown.squareContainer}
                                                    textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                                                    placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                                    searchable={false}
                                                    dropDownContainerStyle={{ borderRadius: 0, position: Platform.OS === 'android' ? 'relative' : 'absolute', top: Platform.OS == 'android' ? 0 : moderateScale(50) }} //下拉選單外誆
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
                                                    open={openModal}
                                                    setOpen={setOpenModal}
                                                    value={foodCatgoryModal}
                                                    setValue={setFoodCatgoryModal}
                                                    items={foodCatgoryList}
                                                    closeOnBackPressed={true}
                                                    listMode="SCROLLVIEW"
                                                    closeAfterSelecting={true}
                                                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                                                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                                                </DropDownPicker>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(50) }}>
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
                                                        deleteMethod();
                                                        setModifyFoodModalVisible(false);
                                                    }}
                                                />
                                                <Button
                                                    title="修改"
                                                    buttonStyle={{
                                                        backgroundColor: "#A6FCB6",
                                                        borderRadius: moderateScale(10),
                                                    }}
                                                    containerStyle={{
                                                        height: moderateScale(40),
                                                        width: moderateScale(140),
                                                        marginHorizontal: moderateScale(10),
                                                    }}
                                                    titleStyle={{ fontSize: moderateScale(20), color: '#ffffff', fontWeight: "bold" }}
                                                    onPress={() => {  modifyMethod(),setModifyFoodModalVisible(false) }}
                                                />

                                            </View>
                                        </View>
                                    </> :
                                    <>
                                        <FlashList
                                            nestedScrollEnabled
                                            ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>無新增食物資料</Text>}
                                            data={foodstate.info}
                                            estimatedItemSize={30}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        accessible={true}
                                                        accessibilityRole={"none"}
                                                        accessibilityLabel={`點擊食物為${item.foodName}`}
                                                        onPress={() => { handlePress(index) }}
                                                    >
                                                        <View style={[Userstyle.listButton, { height: moderateScale(45), marginHorizontal: moderateScale(20), }]}>
                                                            <Text style={[Userstyle.listTitle, { textAlign: "left", marginStart: moderateScale(10), paddingTop: moderateScale(10), }]}>
                                                                {item.foodName}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }}>
                                        </FlashList>

                                    </>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>

                    <View style={{ height: moderateScale(100) }}>
                        <FAB
                            color={foodstate.info.length > 0 ? "#0080D5" : "#95ECFF"}
                            style={[modal_fab.handAddBox,]}
                            visible={true}
                            //size="small"
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityLabel={`目前加入的食物項目${foodstate.info.length}個`}
                            onPress={() => setFoodListModalVisible(true)}
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
                        {Platform.OS === 'android' ?
                            <>
                                <View style={{
                                    zIndex: 50,
                                    left: 0,
                                    position: 'absolute',
                                    right: 0,
                                    top: moderateScale(80),

                                }}>
                                    <AutocompleteInput
                                        hideResults={suggestionList}
                                        selectionColor='#777'
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => { setSuggestionList(false) }}
                                        data={filteredfoodList}
                                        value={foodName}
                                        style={[RecipeStyle.inputText, { flex: 1, width: moderateScale(330), backgroundColor: 'transparent', }]}
                                        onChangeText={(text) => { changeInput(text) }}
                                        returnKeyType="done"
                                        flatListProps={{
                                            style: { maxHeight: moderateScale(300) },
                                            keyboardShouldPersistTaps: 'always',
                                            renderItem: ({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => { setFoodName(item.name), setFilteredfoodList([]) }}>
                                                    <Text style={{
                                                        color: '#878787',
                                                        marginHorizontal: moderateScale(10),
                                                        fontSize: moderateScale(18),
                                                        lineHeight: moderateScale(26)
                                                    }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ),
                                        }}
                                        listContainerStyle={{ marginHorizontal: moderateScale(20, 0.1), zIndex: 1000 }}
                                        inputContainerStyle={[RecipeStyle.input, { marginHorizontal: moderateScale(20), borderWidth: 0, }]}
                                    />
                                </View>
                            </> :
                            <>
                                <View style={{ zIndex: 50 }}>
                                    <AutocompleteInput
                                        hideResults={suggestionList}
                                        selectionColor='#777'
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => { setSuggestionList(false) }}
                                        data={filteredfoodList}
                                        value={foodName}
                                        style={[RecipeStyle.inputText, { flex: 1, width: moderateScale(330), backgroundColor: 'transparent', }]}
                                        onChangeText={(text) => { changeInput(text) }}
                                        returnKeyType="done"
                                        flatListProps={{
                                            style: { maxHeight: moderateScale(300) },
                                            keyboardShouldPersistTaps: 'always',
                                            renderItem: ({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() => { setFoodName(item.name), setFilteredfoodList([]) }}>
                                                    <Text style={{
                                                        color: '#878787',
                                                        marginHorizontal: moderateScale(10),
                                                        fontSize: moderateScale(18),
                                                        lineHeight: moderateScale(26)
                                                    }}
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ),
                                        }}
                                        listContainerStyle={{ marginHorizontal: moderateScale(20), zIndex: 1000 }}
                                        inputContainerStyle={[RecipeStyle.input, { marginHorizontal: moderateScale(20), borderWidth: 0, }]}
                                    />
                                </View>
                            </>
                        }


                        <Text style={[Userstyle.textLabel, { marginTop: moderateScale(30, 3) }]}
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
                            confirmText={"確定"}
                            cancelText={"取消"}
                            locale="zh-Hant"
                        />
                        <View style={{ zIndex: 10 }}>
                            <DropDownPicker
                                //controller={(instance) => dropDownRef.current = instance}
                                zIndex={10}
                                autoScroll={true}
                                onPress={Keyboard.dismiss}
                                placeholder="選擇食物種類"
                                style={dropdown.squareBox}
                                containerStyle={dropdown.squareContainer}
                                textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                                placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                searchable={false}
                                dropDownContainerStyle={{ borderRadius: 0, position: Platform.OS === 'android' ? 'relative' : 'absolute', top: Platform.OS == 'android' ? 0 : moderateScale(50) }} //下拉選單外誆
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
                                listMode="SCROLLVIEW"
                                ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                                ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                            </DropDownPicker>
                        </View>
                        <Button
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"新增食物"}
                            buttonStyle={[Userstyle.buttonUpdate,]}
                            title="新增食物"
                            titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
                            onPress={() => { checkAddFood() }}
                        />
                        <Button
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往下一步按鈕"}
                            buttonStyle={styles.nextButton}
                            title="下一步"
                            titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
                            onPress={() => { navigation.navigate("HandToRef") }}
                        />

                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: "#27F727",
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
    modifyTitle: {
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        fontWeight: 'bold',
    },
    modifyView: {
        flex: 1,
        justifyContent: 'flex-start',
        //backgroundColor:'yellow',
    },
});

export default HandAddScreen;