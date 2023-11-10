import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, FAB, Input, Text, } from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDoubleDown, faAngleDown, faAngleUp, faCheck, faChevronDown, faLightbulb, faQuestion, } from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import DropDownPicker from "react-native-dropdown-picker";
import { Keyboard } from "react-native";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setRefInfo } from "../../store/createRefrigeratorSlice";
import { AuthContext } from "../../context/AuthContext";
const Step3Screen = () => {
    //console.log("step2")
    const coldDoorList = [{ label: "一層", value: "1" }, { label: "二層", value: "2" }, { label: "三層", value: "3" }, { label: "四層", value: "4" }];
    const freezingDoorList = [{ label: "一層", value: "1" }, { label: "二層", value: "2" }, { label: "三層", value: "3" }];
    const state = useSelector(state => state.createRefrigerator);
    const dispatch = useDispatch();
    const [buttonTopCenter, setButtonTopCenter] = useState([]); //上層分層渲染
    const [buttonDownCenter, setButtonDownCenter] = useState([]); //下層分層渲染
    const [buttonTopDoor, setButtonTopDoor] = useState([]);//上層門分層渲染
    const [buttonDownDoor, setButtonDownDoor] = useState([]);//上層門分層渲染
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const [coldDoorCount,setColdDoorCount]=useState("");
    const [freezingDoorCount,setFreezingDoorCount]=useState("");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const animationRef = useRef(null);
    const {lookModel}=useContext(AuthContext);
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

    const ToNextPage = () => {
        if (coldDoorCount && freezingDoorCount) {
            dispatch(setRefInfo(
                {"freezingDoorCount":freezingDoorCount,
                "coldDoorCount":coldDoorCount,
                })
            )
            navigation.navigate("Step4");
        } else {
            Alert.alert("請完成分層選擇")
        }
    }

    useEffect(() => {
        if(lookModel){
            const pauseTime = 2.4; // 暂停的时间，单位为秒
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

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
    };
    /**
    * 上方內部分層按鈕新增
    */
    const renderTopCenter = () => { //冷凍
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
    const renderDownCenter = () => { //冷藏
        return buttonDownCenter.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={index === buttonDownCenter.length - 1 ? { flex: 2, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), } : { flex: 1, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index)}
            />
        ));
    };
    /**
    * 上方門內部分層按鈕新增
    */
    const renderTopDoor = () => { //冷凍門
        return buttonTopDoor.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index)}
            />
        ));
    };
    /**
    * 下方門內部分層按鈕新增
    */
    const renderDownDoor = () => { //冷藏門
        return buttonDownDoor.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index)}
            />
        ));
    };

    useEffect(() => {
        // 冷凍、冷藏分層導入
        var selectedCount = parseInt(state.info.freezingCount);
        setButtonTopCenter(Array(selectedCount).fill(null));
        var selectedCount = parseInt(state.info.coldCount);
        setButtonDownCenter(Array(selectedCount).fill(null));
    }, []);

    useEffect(() => {
        // 冷凍門分層導入
        if (freezingDoorCount) {
            var selectedCount = parseInt(freezingDoorCount);
            setButtonTopDoor(Array(selectedCount).fill(null));
        }
    }, [freezingDoorCount]);

    useEffect(() => {
        // 冷藏門分層導入
        if (coldDoorCount) {
            var selectedCount = parseInt(coldDoorCount);
            setButtonDownDoor(Array(selectedCount).fill(null));
        }
    }, [coldDoorCount]);

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
                                value={freezingDoorCount}
                                //setValue={step1}
                                items={coldDoorList}
                                disabled
                                placeholder="冷凍門分層"
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
                                value={coldDoorCount}
                                //setValue={step1}
                                items={coldDoorList}
                                disabled
                                placeholder="冷藏門分層"
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
                            <Text style={modal_fab.modalTitle}>選擇冷藏門及冷凍門分層層數，將同步顯示於畫面</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {lookModel?<>
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
                        progress={0.5}
                    />
                </View>
            </View>
            </>:<>

            </>}
            

            <View style={style.towDropdown}>
                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷凍門分層"
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
                    value={freezingDoorCount}
                    setValue={setFreezingDoorCount}
                    items={freezingDoorList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>

                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷藏門分層"
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
                    value={coldDoorCount}
                    setValue={setColdDoorCount}
                    items={coldDoorList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>
            </View>
            {state.info.outConfig == "上層冷藏+下層冷凍" ?
                <>
                    <View style={style.finalBotton}>
                        <View style={[refrigerator.finallOutTop, {}]}>
                            {renderDownCenter()}
                        </View>
                        <View style={refrigerator.finallOutDoorTop}>
                            {renderDownDoor()}
                        </View>
                    </View>
                    <View style={style.finalTop}>
                        <View style={[refrigerator.finallOutBotton, {}]}>
                            {renderTopCenter()}
                        </View>
                        <View style={refrigerator.finallOutDoorBotton}>
                            {renderTopDoor()}
                        </View>
                    </View>
                </> :
                <>
                    <View style={style.finalTop}>
                        <View style={[refrigerator.finallOutTop]}>
                            {renderTopCenter()}
                        </View>
                        <View style={refrigerator.finallOutDoorTop}>
                            {renderTopDoor()}
                        </View>
                    </View>
                    <View style={style.finalBotton}>
                        <View style={[refrigerator.finallOutBotton]}>
                            {renderDownCenter()}
                        </View>
                        <View style={refrigerator.finallOutDoorBotton}>
                            {renderDownDoor()}
                        </View>
                    </View>
                </>
            }
            <Button buttonStyle={style.nextButton}
                title="下一步"
                titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
                onPress={() => ToNextPage()}
            >

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
        backgroundColor: "#27F727",
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
    finalTop: {
        flexDirection: 'row',
        flex: 5,
    },
    finalBotton: {
        flexDirection: 'row',
        flex: 10,
    },
})

export default Step3Screen;