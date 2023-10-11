import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, ImageBackground, Keyboard, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, FAB, Text, } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDoubleDown, faAngleDown, faAngleUp, faCheck, faChevronDown, faLightbulb, faQuestion, } from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import Box from "../../components/BoxUp";
import BoxDown from "../../components/BoxDown copy";
import BoxUp from "../../components/BoxUp";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { setRefInfo } from "../../store/createRefrigeratorSlice";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Step4Screen = () => {
    //console.log("step2")
    const coldPlaneList = [{ value: 4, label: "2 X 2" }, { value: 6, label: "2 X 3" }, { value: 9, label: "3 X 3" }];
    const freezingPlaneList = [{ value: 4, label: "2 X 2" }, { value: 6, label: "2 X 3" }, { value: 9, label: "3 X 3" }];
    const [coldPlaneCount,setColdPlaneCount]=useState("");
    const [freezingPlaneCount,setFreezingPlaneCount]=useState("");
    const state = useSelector(state => state.createRefrigerator);
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
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
        if (coldPlaneCount && freezingPlaneCount) {
            dispatch(setRefInfo(
                {"coldPlaneCount":coldPlaneCount,
                "freezingPlaneCount":freezingPlaneCount,
                })
            )
            navigation.navigate("Step5");
        } else {
            Alert.alert("請完成平面分層選擇")
        }
    }
    const animationRef = useRef(null);

    useEffect(() => {
        if(lookModel){
            const pauseTime = 3; // 暂停的时间，单位为秒
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
     * 點擊平面立體圖回傳
     * @param {*} buttonIndex 
     */
    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex} pressed`);
    };
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
                                value={freezingPlaneCount}
                                //setValue={step1}
                                items={coldPlaneList}
                                disabled
                                placeholder="冷凍平面分層"
                                style={dropdown.squareBoxTwo}
                                containerStyle={dropdown.squareContainerTwo}
                                textStyle={{ fontSize: moderateScale(17), color: '#777', fontWeight: '500' }}
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
                                value={coldPlaneCount}
                                //setValue={step1}
                                items={coldPlaneList}
                                disabled
                                placeholder="冷藏平面分層"
                                style={[dropdown.squareBoxTwo,{}]}
                                containerStyle={dropdown.squareContainerTwo}
                                textStyle={{ fontSize: moderateScale(17), color: '#777', fontWeight: '500', }}
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
                            <Text style={modal_fab.modalTitle}>選擇冷藏及冷凍平面分層，將呈現瓶面立體圖並同步顯示於畫面</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {lookModel?<>
                <View style={style.animationView}>
                <View style={{ flexDirection: 'column' }}>
                    <AnimatedLottieView
                        ref={animationRef}
                        style={{ height: moderateScale(30), width: moderateScale(20,) }}
                        source={require('../../assets/stepBar.json')}
                        autoPlay
                        loop
                        speed={0.5}
                        colorFilters={ChangeColor}
                        progress={0.7}
                    />
                </View>
            </View>
            </>:<></>}
            

            <View style={style.towDropdown}>

                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷凍平面分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
                    textStyle={{ fontSize: moderateScale(17), color: '#777', fontWeight: '500' }}
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
                    value={freezingPlaneCount}
                    setValue={setFreezingPlaneCount}
                    items={freezingPlaneList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>

                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="冷藏平面分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
                    textStyle={{ fontSize: moderateScale(17), color: '#777', fontWeight: '500' }}
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
                    value={coldPlaneCount}
                    setValue={setColdPlaneCount}
                    items={coldPlaneList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>
            </View>

            {state.info.outConfig == "上層冷藏+下層冷凍" ?
                <>
                    <ScrollView>
                        <ImageBackground source={require('../../../Img/Under.png')} style={{ height: moderateScale(200), marginVertical: moderateScale(30) }} >
                            <BoxDown number={coldPlaneCount} clickIndex={handleButtonPress}>
                            </BoxDown>
                        </ImageBackground>

                        <ImageBackground source={require('../../../Img/Under.png')} style={{ height: moderateScale(200), marginVertical: moderateScale(30) }}>
                            <BoxUp number={freezingPlaneCount} clickIndex={handleButtonPress}>
                            </BoxUp>
                        </ImageBackground>
                    </ScrollView>
                </>
                :
                <>
                    <ScrollView>
                        <ImageBackground source={require('../../../Img/Under.png')} style={{ height: moderateScale(200, 0.7), marginVertical: moderateScale(30, 0.7)}}>
                            <BoxUp number={freezingPlaneCount} clickIndex={handleButtonPress}>
                            </BoxUp>
                        </ImageBackground>
                        <ImageBackground source={require('../../../Img/Under.png')} style={{ height: moderateScale(200, 0.7), marginVertical: moderateScale(30, 0.7)}}>
                            <BoxDown number={coldPlaneCount} clickIndex={handleButtonPress}>
                            </BoxDown>
                        </ImageBackground>
                    </ScrollView>
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
        marginVertical: moderateScale(20),
        marginHorizontal: moderateScale(50),
        borderRadius: moderateScale(10),
    },
    towDropdown: {
        flexDirection: 'row',
        height: moderateScale(50),
        justifyContent: 'center',
        marginHorizontal: moderateScale(30),
        //backgroundColor:"#F3FA5E",
        marginVertical: moderateScale(10),
        zIndex: 1,
    },

})

export default Step4Screen;