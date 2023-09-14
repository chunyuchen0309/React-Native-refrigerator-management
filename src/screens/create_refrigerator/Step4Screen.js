import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, ImageBackground,  Keyboard,  SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button,FAB, Text,} from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faAngleDoubleDown, faAngleDown, faAngleUp, faCheck, faChevronDown,faLightbulb,faQuestion,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import Box from "../../components/BoxUp";
import BoxDown from "../../components/BoxDown copy";
import BoxUp from "../../components/BoxUp";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import { ScreenHeight, ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import DropDownPicker from "react-native-dropdown-picker";

const Step4Screen=()=>{
    //console.log("step2")
    const coldPlaneList = [{value:"4",label:"2 X 2"},{value:"6",label:"2 X 3"},{value:"9",label:"3 X 3"}];
    const freezingPlaneList = [{value:"4",label:"2 X 2"},{value:"6",label:"2 X 3"},{value:"9",label:"3 X 3"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");
    const navigation=useNavigation()
    const [coldBoxCount,setColdBoxCount]=useState(''); //上層分層渲染
    const [freezingBoxCount,setFreezingBoxCount]=useState(''); //下層分層渲染
    const [modalVisible,setModalVisible]=useState(false);
    const {outConfig,step4_coldPlane,step4_freezingPlane,coldPlaneCount,freezingPlaneCount,}=useContext(RefrigeratorContext);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    useEffect(() => { //設置標題右側按鈕
        navigation.setOptions( 
            {
                headerRight: () => (
                <FAB
                icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>}
                size="small"
                placement="right"
                color="#A7DCFF"
                onPress={() => setModalVisible(true)}
                style={modal_fab.headerfab}/>
                ),
            }
        );
    }, []);
    const ToNextPage=()=>{
        if(coldPlaneCount && freezingPlaneCount){
            navigation.navigate("Step5");
        }else{
            Alert.alert("請完成平面分層選擇")
        }
    }
    const animationRef = useRef(null);

    useEffect(() => {
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
      }, []);

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex} pressed`);
      };

    useEffect(() => {
        // 冷凍平面分層選擇的變化
        if (freezingPlaneCount) {
          var selectedCount = parseInt(freezingPlaneCount);
          setFreezingBoxCount(selectedCount);
        }
      }, [freezingPlaneCount]);

    useEffect(() => {
        // 冷藏平面分層選擇的變化
        if (coldPlaneCount) {
          var selectedCount = parseInt(coldPlaneCount);
          setColdBoxCount(selectedCount);
        }
      }, [coldPlaneCount]);

    return(
        <SafeAreaView style={style.safeAreaView}>
            
            <Modal 
                animationIn={"zoomIn"}
                animationInTiming={800}
                animationOut={"zoomOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.2}  
                onBackdropPress={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
                    <View style={modal_fab.modalView}>
                        <Text style={modal_fab.modalTitle}></Text>
                        <Text style={modal_fab.modalContent} >規劃冰箱內部平面分層，將採用俯視立體圖呈現</Text>
                    </View>
                </TouchableWithoutFeedback>    
            </Modal>
        <View style={style.animationView}>
            <View style={{flexDirection:'column'}}>
                <AnimatedLottieView 
                    ref={animationRef}
                    style={{height:moderateScale(30),width:moderateScale(20,)}}
                    source={require('../../assets/stepBar.json')} 
                    autoPlay
                    loop  
                    speed={0.5}
                    colorFilters={ChangeColor}
                    progress={0.7}
                />
            </View>
        </View>

            <View style={style.towDropdown}>

            <DropDownPicker         
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="選擇分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
                    textStyle={{fontSize:moderateScale(18),color:'#777',fontWeight:'500'}}
                    placeholderStyle={{color:'#777',fontWeight:'500'}}
                    searchable={false}
                    dropDownContainerStyle={{borderRadius:0,}} //下拉選單外誆
                    listItemLabelStyle={{color: "#777",fontSize:moderateScale(17,0.5)}} //下方item內容文字
                    listItemContainerStyle={{height:moderateScale(35)}} //下方item高度 
                    selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}} //選擇後的item文字
                    selectedItemContainerStyle={{backgroundColor: "#FFC55A"}} //選擇後的item高度＆背景
                    TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                    listParentContainerStyle={{paddingLeft: moderateScale(20)}}
                    listParentLabelStyle={{fontWeight: "bold"}}
                    listChildContainerStyle={{}}
                    //iconContainerStyle={{paddingLeft:moderateScale(0)}} //item左方icon設定
                    maxHeight={moderateScale(250)}
                    itemKey="value"
                    open={open1}
                    setOpen={setOpen1}
                    value={freezingPlaneCount}
                    setValue={(val)=>step4_freezingPlane(val)}
                    items={freezingPlaneList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({style}) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({style}) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>

                <DropDownPicker             
                    //controller={(instance) => dropDownRef.current = instance}
                    zIndex={9000}
                    onPress={Keyboard.dismiss}
                    placeholder="選擇分層"
                    style={dropdown.squareBoxTwo}
                    containerStyle={dropdown.squareContainerTwo}
                    textStyle={{fontSize:moderateScale(18),color:'#777',fontWeight:'500'}}
                    placeholderStyle={{color:'#777',fontWeight:'500'}}
                    searchable={false}
                    dropDownContainerStyle={{borderRadius:0,}} //下拉選單外誆
                    listItemLabelStyle={{color: "#777",fontSize:moderateScale(17,0.5)}} //下方item內容文字
                    listItemContainerStyle={{height:moderateScale(35)}} //下方item高度 
                    selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}} //選擇後的item文字
                    selectedItemContainerStyle={{backgroundColor: "#FFC55A"}} //選擇後的item高度＆背景
                    TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
                    listParentContainerStyle={{paddingLeft: moderateScale(20)}}
                    listParentLabelStyle={{fontWeight: "bold"}}
                    listChildContainerStyle={{}}
                    //iconContainerStyle={{paddingLeft:moderateScale(0)}} //item左方icon設定
                    maxHeight={moderateScale(250)}
                    itemKey="value"
                    open={open2}
                    setOpen={setOpen2}
                    value={coldPlaneCount}
                    setValue={(val)=>step4_coldPlane(val)}
                    items={coldPlaneList}
                    closeOnBackPressed={true}
                    closeAfterSelecting={true}
                    ArrowUpIconComponent={({style}) => <FontAwesomeIcon icon={faAngleUp} color="#777" size={moderateScale(20)} style={style} />}
                    ArrowDownIconComponent={({style}) => <FontAwesomeIcon icon={faAngleDown} color="#777" size={moderateScale(20)} style={style} />}>
                </DropDownPicker>
            </View>

            {outConfig == "上層冷藏+下層冷凍"?
                <>
                <ScrollView>
                    <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200),marginVertical:moderateScale(30)}}>
                        
                        <BoxDown number={coldBoxCount} clickIndex={handleButtonPress}>
                        </BoxDown>
                    </ImageBackground>

                    <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200),marginVertical:moderateScale(30)}}>
                        <BoxUp number={freezingBoxCount} clickIndex={handleButtonPress}>
                        </BoxUp>
                    </ImageBackground>
                </ScrollView>
                </> 
                : 
                <>
                <ScrollView>
                    <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200,0.7),marginVertical:moderateScale(30,0.7)}}>
                        <BoxUp number={freezingBoxCount} clickIndex={handleButtonPress}>
                        </BoxUp>
                    </ImageBackground>
                    <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200,0.7),marginVertical:moderateScale(30,0.7)}}>
                        <BoxDown number={coldBoxCount} clickIndex={handleButtonPress}>
                        </BoxDown> 
                    </ImageBackground>
                </ScrollView>
                </>    
            }

            <Button buttonStyle={style.nextButton}
            title="下一步" onPress={()=>ToNextPage()}>
            </Button>
            
        </SafeAreaView>
    );
};




const  style=StyleSheet.create({
    safeAreaView:{
        flex:1,
    },
    animationView:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        marginTop:moderateScale(10),
    },
    title:{
        marginVertical:moderateScale(20),
        textAlign:'center',
        fontSize:moderateScale(20),
        color: '#777',
        width:ScreenWidth,
    },
      nextButton:{
          backgroundColor:"#A9FF3C",
          marginVertical:moderateScale(20),
          marginHorizontal:moderateScale(50),
          borderRadius:moderateScale(10),
      },
      towDropdown:{
        flexDirection:'row',
        height:moderateScale(50),
        justifyContent:'center',
        marginHorizontal:moderateScale(30),
        //backgroundColor:"#F3FA5E",
        marginVertical:moderateScale(10),
        zIndex:1,
      },
     
})

export default Step4Screen;