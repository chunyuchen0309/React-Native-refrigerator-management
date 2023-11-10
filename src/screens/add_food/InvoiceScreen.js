import { faBookmark, faCalendar, faCalendarDays, faCheck, faLightbulb, faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./InvoiceItemBox";
import Modal from "react-native-modal";
import { Image } from "react-native";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import { ScreenWidth } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFood, addFoodInv } from "../../store/createFoodSlice";
import axios from "axios";
import { BASE_URL } from "../../config";
const InvoiceScreen = () => {
    //const [invoiceList,setInvoiceList]=useState([]);
    const route = useRoute();
    const [invoiceInfo, setInvoiceInfo] = useState({});
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [foodCategory, setFoodCategory] = useState("");
    const [foodDate, setFoodDate] = useState("");
    const [open, setOpen] = useState(false);
    const animationRef = useRef(null);
    
    const [foodCategoryList, setFoodCategoryList] = useState([
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
    const dispatch =useDispatch();
    const foodState = useSelector(state => state.createFood);
    const userState = useSelector(state => state.userInfo);
    const getFoodCategoryList = () => {
        axios.get(`${BASE_URL}/storage/category`, {
            headers: {
                'Authorization': userState.token
            }
        }).then( res => {
            console.log(res.data);
            for(let i=0;i<res.data.length;i++){
                for(let j=0;j<foodCategoryList.length;j++)
                if(res.data[i].category_name==foodCategoryList[j].label){
                    foodCategoryList[j].value=res.data[i].category_id
                }
            }
        }).catch(e => {
            console.log(e);
        }).finally(()=>{
            console.log("食物選單",foodCategoryList);
            
        });
    }

    useEffect(() => {
        getFoodCategoryList();
        setInvoiceInfo(foodState.info);
        /*setInvoiceInfo({
            "Number": "A1234567",
            "Date": "1130601",
            "Data": [
                { "OldData": "統一糙米漿", "NewData": "", "Category": "e2eec36b-7ac9-445e-ae35-04cba2c615e9", "Date": "2023/9/20" },
                { "OldData": "高麗菜", "NewData": "", "Category": "b9db4f16-8eb5-4de7-b028-739df646e9af", "Date": "2023/9/17" },
                { "OldData": "豆干", "NewData": "", "Category": "", "Date": "" }
            ]
        });*/
        
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
        console.log("傳入值：",foodState.info)
    }, []);

    const goNextPage = () => {
        var temp = true;
        for (let i = 0; i < invoiceInfo.Data.length; i++) { // 注意此行修正
            if (invoiceInfo.Data[i].Category === "" || invoiceInfo.Data[i].Date === "") {
                Alert.alert("請完成輸入");
                temp = false;
                break;
            }
        }
        if (temp) {
            //console.log("發票存入：",invoiceInfo.Data);
            dispatch(addFoodInv(invoiceInfo.Data));
            navigation.navigate("InvoiceToRef");
        }
    }
    /**
     * 刪除發票項目
     * @param {*} index 
     */
    const deleteItem = (index) => { //回調函數
        console.log("刪除call")
        const updatedData = invoiceInfo.Data.filter((item, i) => i != index);
        //filter 方法接受一個回調函數，這個回調函數對陣列中的每個元素執行判斷，如果回傳 true，該元素將被保留，否則將被移除
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //console.log("刪除的陣列 : "+invoiceInfo.Data);
    };

    /**
     * 子組建回傳更改名稱
     * @param {*} index 
     * @param {*} changeData 更改值
     */
    const changeNameItem = (index, changeData) => {
        console.log("改名call")
        const updatedData = JSON.parse(JSON.stringify(invoiceInfo.Data));//深拷貝
        updatedData[index].OldData = changeData;
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //展開運算子 複製原來的結構，並改寫其中的Data內容
    }
    /**
     * 子組建回傳更改類別
     * @param {*} index 
     * @param {*} changeData 更改值
     */
    const changeCategoryItem = (index, changeData) => {
        console.log("改類別call")
        const updatedData = JSON.parse(JSON.stringify(invoiceInfo.Data));//深拷貝
        updatedData[index].Category = changeData;
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //展開運算子 複製原來的結構，並改寫其中的Data內容
    }
    /**
     * 子組建回傳更改日期
     * @param {*} index 
     * @param {*} changeData 更改值
     */
    const changeDateItem = (index, changeData) => {
        const updatedData = JSON.parse(JSON.stringify(invoiceInfo.Data));//深拷貝
        updatedData[index].Date = changeData;
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //展開運算子 複製原來的結構，並改寫其中的Data內容
    }
    /**
     * 計算發票購買日期
     * @returns  yyy/mm/dd
     */
    const addDate = () => {
        var date = "" + invoiceInfo.Date
        var result = date.slice(0, 3) + "/" + date.slice(3, 5) + "/" + date.slice(5, 7);
        return (
            result
        )
    }
    const lookAddDate = () => {
        var date = "" + invoiceInfo.Date
        var result = date.slice(0, 3) + "年" + date.slice(3, 5) + "月" + date.slice(5, 7)+"日";
        return (
            result
        )
    }
    //console.log(invoiceInfo);

    const handleOpenModal = () => {
        setModalVisible(true);
        const pauseTime = 4; // 暂停的时间，单位为秒
        const resumeTime = 0; // 恢复播放的时间，单位为秒
        const pauseAnimationTimeout = setTimeout(() => {
            animationRef.current.pause();
        }, pauseTime * 1000);
        const resumeAnimationTimeout = setTimeout(() => {
            animationRef.current.resume();
        }, resumeTime * 1000);

        return () => {
            clearTimeout(pauseAnimationTimeout);
            clearTimeout(resumeAnimationTimeout);
        };
    };

    return (

        <SafeAreaView style={styles.safeAreaView}>
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
                    <View style={[modal_fab.creatRefModalView, { marginTop: moderateScale(150) }]}>
                        <View style={[Userstyle.towList, { height: moderateScale(240), marginVertical: moderateScale(20), paddingHorizontal: moderateScale(20), width: moderateScale(350) }]}>
                            <View style={[Userstyle.listButton, { height: moderateScale(80), marginHorizontal: 0, backgroundColor: '#CECECE' }]}>
                                <Input
                                    disabled
                                    selectionColor='#777'
                                    leftIcon={<FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(15)}></FontAwesomeIcon>}
                                    containerStyle={{ paddingHorizontal: moderateScale(10), paddingTop: moderateScale(5), height: moderateScale(40) }}
                                    inputContainerStyle={{ height: moderateScale(30), borderBottomWidth: 0, backgroundColor: 'white', borderRadius: moderateScale(10), paddingLeft: moderateScale(10) }}
                                    inputStyle={{ lineHeight: moderateScale(20), fontSize: moderateScale(16), color: '#777', fontWeight: '500' }}
                                    value={"高麗菜"}>
                                </Input>
                                <View style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: 'white', borderRadius: moderateScale(10), marginHorizontal: moderateScale(10), marginVertical: moderateScale(2), height: moderateScale(30) }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', marginLeft: moderateScale(10) }} disabled>
                                        <FontAwesomeIcon icon={faList} color="#BFBFBF" size={moderateScale(15)}></FontAwesomeIcon>
                                    </TouchableOpacity>
                                    <DropDownPicker
                                        disabled
                                        zIndex={9000}
                                        itemKey="value"
                                        placeholder="選擇種類"
                                        style={{ borderWidth: 0, backgroundColor: 'transparent', paddingBottom: moderateScale(22), paddingLeft: moderateScale(3) }}
                                        containerStyle={{ backgroundColor: 'transparent', flex: 1, alignSelf: 'flex-start' }}
                                        textStyle={{ fontSize: moderateScale(15), color: '#777', fontWeight: '500' }}
                                        placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                        searchable={false}
                                        listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5), zIndex: 100 }} //下方item內容文字
                                        listItemContainerStyle={{ height: moderateScale(50), zIndex: 100 }} //下方item高度 
                                        selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
                                        selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
                                        TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                                        listParentContainerStyle={{ paddingLeft: moderateScale(20) }}
                                        listParentLabelStyle={{ fontWeight: "bold" }}
                                        listMode="MODAL"
                                        modalProps={{ animationType: "slide" }}
                                        open={false}
                                        setOpen={setOpen}
                                        value={foodCategory}
                                        setValue={(text) => { setFoodCategory(text) }}
                                        items={foodCategoryList}
                                        showArrowIcon={false}>
                                    </DropDownPicker>
                                    <Input
                                        disabled
                                        leftIcon={<FontAwesomeIcon icon={faCalendar} color="#BFBFBF" size={moderateScale(15)}></FontAwesomeIcon>}
                                        containerStyle={{ height: moderateScale(40), flex: 1, alignItems: 'flex-end' }}
                                        inputContainerStyle={{ height: moderateScale(30), borderBottomWidth: 0 }}
                                        inputStyle={{ lineHeight: moderateScale(20), fontSize: moderateScale(16), color: '#777', fontWeight: '500' }}
                                        value={foodDate}
                                        placeholder="有效日期"
                                        placeholderTextColor="#777"
                                    >
                                    </Input>
                                </View>
                            </View>

                            <View style={[Userstyle.listButton, { height: moderateScale(80), marginHorizontal: 0, backgroundColor: '#CECECE' }]}>
                                <TouchableOpacity style={{ flex: 1, }}>
                                    <View style={Userstyle.deleteInvoicebox}>
                                        <FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF"></FontAwesomeIcon>
                                    </View>
                                </TouchableOpacity>


                            </View>
                            <AnimatedLottieView
                                ref={animationRef}
                                style={{ height: moderateScale(60), alignSelf: 'flex-end', top: moderateScale(-3) }}
                                source={require('../../assets/swipeLeft.json')}
                                speed={0.5}
                                autoSize={true} />
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(30) }}>
                            <Image source={require('../../../Img/arrow.png')}></Image>
                            <Text style={modal_fab.modalTitle}>點選即可更改資訊，向左滑動刪除項目</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Button
                accessible={true}
                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                accessibilityLabel={`購買日期為${lookAddDate()}`}
                disabled
                disabledStyle={styles.dateButton}
                icon={<FontAwesomeIcon icon={faCalendarDays} color="#FFFFFF" size={moderateScale(23)}></FontAwesomeIcon>}
                title={<>
                    <Text style={styles.dateTitle}>購買日期</Text>
                    <Text style={styles.dateTitleLeft}>{addDate()}</Text>
                </>}>
            </Button>

            <View style={[Userstyle.towList, { height: moderateScale(400), marginVertical: moderateScale(20), paddingHorizontal: moderateScale(20), }]}>
                <FlashList
                    data={invoiceInfo.Data}
                    estimatedItemSize={20}
                    renderItem={({ item, index }) => (
                        <ItemBox
                            data={item}
                            handleDelete={() => deleteItem(index)}
                            changeDoneName={changeNameItem} //讓子組件呼叫並執行父組建方法 前面為子組件呼叫的方法
                            changeDoneCategory={changeCategoryItem}
                            changeDoneDate={changeDateItem}
                            index={index}
                        />
                    )}>
                </FlashList>
            </View>
            <Button
                onPress={() => { goNextPage() }}
                buttonStyle={styles.nextButton}
                titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
                title={"下一步"}
            >
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        //alignItems:'center',
    },
    title: {
        textAlign: 'center',
        fontSize: moderateScale(25),
        marginVertical: moderateScale(20),
        color: '#777',
        width: ScreenWidth,
    },
    dateButton: {
        borderRadius: moderateScale(10),
        height: moderateScale(50),
        marginHorizontal: moderateScale(20),
        backgroundColor: "#8C9090",
        justifyContent: 'flex-start',
        marginTop: moderateScale(20),
    },
    dateTitle: {
        marginStart: moderateScale(5),
        fontSize: moderateScale(23),
        color: "#FFFFFF"
    },
    dateTitleLeft: {
        width: moderateScale(200),
        textAlign: 'right',
        //backgroundColor:'black',
        flex: 1,
        fontSize: moderateScale(25),
        color: "#FFFFFF",
    },
    nextButton: {
        
        backgroundColor: "#27F727",
        marginVertical: moderateScale(20),
        marginHorizontal: moderateScale(50),
        borderRadius: moderateScale(10),
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
    },
    iconImg: {
        //flex:1,
        //backgroundColor:"black",
        width: moderateScale(20),
        height: moderateScale(20),
        //marginVertical:moderateScale(),
    },
})

export default InvoiceScreen;