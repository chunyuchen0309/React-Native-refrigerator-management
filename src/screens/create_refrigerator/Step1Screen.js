import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import { Alert, Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, SpeedDial, Text, } from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faCheck, faChevronDown, faLightbulb, faQuestion, } from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setRefInfo } from "../../store/createRefrigeratorSlice";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const Step1Screen = () => {
    const navigation = useNavigation();
    const outList = [{ label: "上層冷凍+下層冷藏", value: "上層冷凍+下層冷藏" }, { label: "上層冷藏+下層冷凍", value: "上層冷藏+下層冷凍" }];
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [outConfig,setOutConfig]=useState('');
    const animationRef = useRef(null);
    const {lookModel}=useContext(AuthContext);
    const dispatch =useDispatch();
    const state = useSelector(state => state.createRefrigerator);
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
        if (outConfig) {
            dispatch(setRefInfo({"outConfig":outConfig}))
            navigation.navigate("Step2");
        } else {
            Alert.alert("請選擇配置")
        }
    }

    useEffect(() => { //動畫執行秒數
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
                    <View style={[modal_fab.creatRefModalView, { marginTop: moderateScale(120, 0) }]}>
                        <DropDownPicker
                            open={false}
                            setOpen={setOpen}
                            value={outConfig}
                            setValue={setOutConfig}
                            items={outList}
                            disabled
                            zIndex={9000}
                            placeholder="選擇分層"
                            style={dropdown.squareBox}
                            containerStyle={dropdown.squareContainer}
                            textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
                            placeholderStyle={{ color: '#777', fontWeight: '500' }}
                            searchable={false}
                            dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
                            ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                            ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}
                        >
                        </DropDownPicker>

                        <View style={modal_fab.modalContent}>
                            <Image source={require('../../../Img/arrow.png')}></Image>
                            <Text style={modal_fab.modalTitle}>選擇冰箱冷藏及冷凍位置，將同步顯示於畫面</Text>
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
                        autoSize={true} />
                </View>
            </View>
            </>:
            <>
            </>}
            

            <View style={{ marginVertical: moderateScale(10), height: moderateScale(50), zIndex: 1, }}>
                <DropDownPicker
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="選擇分層"
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
                    itemKey="value"
                    open={open}
                    setOpen={setOpen}
                    value={outConfig}
                    setValue={setOutConfig}
                    //setValue={(val) => {console.log("step1", val);}}
                    items={outList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({ style }) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>
            </View>

            {outConfig == "上層冷藏+下層冷凍" ?
                <>
                    <View style={[refrigerator.outTop, { flex: 5 }]}>
                        <View style={refrigerator.handledown}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton, { flex: 2 }]}>
                        <View style={refrigerator.handleup}>
                        </View>
                    </View>
                </> :
                <>
                    <View style={[refrigerator.outTop]}>
                        <View style={refrigerator.handleup}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton]}>
                        <View style={refrigerator.handledown}>
                        </View>
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
        marginVertical: moderateScale(20),
        marginHorizontal: moderateScale(50),
        borderRadius: moderateScale(10),
    },
})

export default Step1Screen;