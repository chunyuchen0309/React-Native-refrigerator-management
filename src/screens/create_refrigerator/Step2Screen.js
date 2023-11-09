import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import { Alert, Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, Text, } from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faCheck, faChevronDown, faLightbulb, faQuestion, } from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import Modal from "react-native-modal";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setRefInfo } from "../../store/createRefrigeratorSlice";
import { AuthContext } from "../../context/AuthContext";
const Step2Screen = () => {
    //console.log("step2")
    const coldList = [{ label: "一層", value: "1" }, { label: "二層", value: "2" }, { label: "三層", value: "3" }, { label: "四層", value: "4" }, { label: "五層", value: "5" }];
    const freezingList = [{ label: "一層", value: "1" }, { label: "二層", value: "2" }, { label: "三層", value: "3" }];
    const state = useSelector(state => state.createRefrigerator);
    const dispatch =useDispatch();
    const navigation = useNavigation()
    const [buttonTopCenter, setButtonTopCenter] = useState([]); //上層分層渲染
    const [buttonDownCenter, setButtonDownCenter] = useState([]); //下層分層渲染
    const [modalVisible, setModalVisible] = useState(false);
    const [coldCount,setColdCount]=useState("");
    const {lookModel}=useContext(AuthContext);
    const [freezingCount,setFresszingCount]=useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const animationRef = useRef(null);

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
    /**
     * 前往下一頁  
     * 優先判斷是否完成選擇
     */
    const ToNextPage = () => {
        if (freezingCount && coldCount) {
            dispatch(setRefInfo(
                {"coldCount":coldCount,
                "freezingCount":freezingCount
                })
            )
            navigation.navigate("Step3");

        } else {
            Alert.alert("請完成分層選擇")
        }
    }
    useEffect(() => { //動畫執行秒數
        if(lookModel){
            const pauseTime = 1.6; // 暂停的时间，单位为秒
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
        }
        
    }, []);

    /**
     * 點擊的內部分層位置
     */
    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
    };

    /**
     * 上方內部分層按鈕新增
     */
    const renderTopCenter = () => {
        return buttonTopCenter.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#416BFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index)}
            />
        ));
    };
    /**
     * 下方內部分層按鈕新增
     */
    const renderDownCenter = () => {
        return buttonDownCenter.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={index === buttonDownCenter.length - 1 ?
                    { flex: 2, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), }
                    : { flex: 1, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), }}
                onPress={() => handleButtonPress(index)}
            />
        ));
    };

    useEffect(() => {
        // 冷凍分層選擇的變化
        if (freezingCount) {
            var selectedCount = parseInt(freezingCount);
            setButtonTopCenter(Array(selectedCount).fill(null));
        }
    }, [freezingCount]);

    useEffect(() => {
        // 冷藏分層選擇的變化
        if (coldCount) {
            var selectedCount = parseInt(coldCount);
            setButtonDownCenter(Array(selectedCount).fill(null));
        }
    }, [coldCount]);

    return (
        <SafeAreaView style={style.safeAreaView}>
            {/* 右上方提示組件 */}
            <Modal
                animationIn={"fadeIn"}
                animationInTiming={800}
                animationOut={"fadeOut"}
                animationOutTiming={100}
                isVisible={modalVisible}
                backdropOpacity={0.9}
                onBackdropPress={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={[modal_fab.creatRefModalView, {}]}>
                        <View style={{ flexWrap: 'nowrap', flexDirection: 'row', marginTop: moderateScale(120, 0) }}>
                            <DropDownPicker
                                open={false}
                                setOpen={setOpen1}
                                value={coldCount}
                                //setValue={step1}
                                items={coldList}
                                disabled
                                placeholder="冷凍分層"
                                style={dropdown.squareBoxTwo}
                                containerStyle={dropdown.squareContainerTwo}
                                textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                                placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                searchable={false}
                                dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                                ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                                ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}
                            >
                            </DropDownPicker>
                            <DropDownPicker
                                open={false}
                                setOpen={setOpen1}
                                value={freezingCount}
                                //setValue={step1}
                                items={coldList}
                                disabled
                                placeholder="冷凍分層"
                                style={dropdown.squareBoxTwo}
                                containerStyle={dropdown.squareContainerTwo}
                                textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                                placeholderStyle={{ color: '#777', fontWeight: '500' }}
                                searchable={false}
                                dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                                ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                                ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}
                            >
                            </DropDownPicker>
                        </View>
                        <View style={modal_fab.modalContent}>
                            <Image source={require('../../../Img/arrow.png')}></Image>
                            <Text style={modal_fab.modalTitle}>選擇冷藏及冷凍分層層數，將同步顯示於畫面</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {lookModel?
            <>
            <View style={style.animationView}>
                <View style={{ flexDirection: 'column' }}>
                    <AnimatedLottieView
                        ref={animationRef}
                        style={{ height: moderateScale(30) }}
                        source={require('../../assets/stepBar.json')}
                        autoPlay
                        loop
                        speed={0.5}
                        colorFilters={ChangeColor}
                        autoSize={true}
                        progress={0.3}
                    />
                </View>
            </View>
            </>:
            <>

            </>}
            

            <View style={style.towDropdown}>
                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷凍分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
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
                    itemKey="value"
                    open={open1}
                    setOpen={setOpen1}
                    value={freezingCount}
                    setValue={setFresszingCount}
                    items={freezingList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>

                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷藏分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
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
                    itemKey="value"
                    open={open2}
                    setOpen={setOpen2}
                    value={coldCount}
                    setValue={setColdCount}
                    items={coldList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>
            </View>

            {state.info.outConfig == "上層冷藏+下層冷凍" ?
                <>
                    <View style={[refrigerator.outTop, { flex: 5 }]}>
                        {renderDownCenter()}
                    </View>
                    <View style={[refrigerator.outBotton, { flex: 2 }]}>
                        {renderTopCenter()}
                    </View>
                </> :
                <>
                    <View style={[refrigerator.outTop]}>
                        {renderTopCenter()}
                    </View>
                    <View style={[refrigerator.outBotton]}>
                        {renderDownCenter()}
                    </View>
                </>
            }
            <Button buttonStyle={style.nextButton}
                title="下一步" onPress={() => ToNextPage()}>
            </Button>

        </SafeAreaView>
    );
};




const style = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    animationView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: moderateScale(10),
    },
    title: {
        marginVertical: moderateScale(20),
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        width: ScreenWidth,
    },
    nextButton: {
        backgroundColor: "#A6FCB6",
        marginVertical: 20,
        marginHorizontal: 50,
        borderRadius: 10,
    },
    towDropdown: {
        flexDirection: 'row',
        height: moderateScale(50),
        justifyContent: 'center',
        marginHorizontal: 30,
        //backgroundColor:"#F3FA5E",
        marginVertical: 10,
        zIndex: 1,
    },
})

export default Step2Screen;