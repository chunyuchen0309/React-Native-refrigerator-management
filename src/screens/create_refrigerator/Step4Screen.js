import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, ImageBackground,  SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button,FAB, Text,} from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown,faLightbulb,faQuestion,} from "@fortawesome/free-solid-svg-icons";
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

const Step4Screen=()=>{
    //console.log("step2")
    const coldPlaneList = [{key:"4",value:"2 X 2"},{key:"6",value:"2 X 3"},{key:"9",value:"3 X 3"}];
    const freezingPlaneList = [{key:"4",value:"2 X 2"},{key:"6",value:"2 X 3"},{key:"9",value:"3 X 3"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");
    const navigation=useNavigation()
    const [coldBoxCount,setColdBoxCount]=useState(''); //上層分層渲染
    const [freezingBoxCount,setFreezingBoxCount]=useState(''); //下層分層渲染
    const [modalVisible,setModalVisible]=useState(false);
    const {outConfig,step4_coldPlane,step4_freezingPlane,coldPlaneCount,freezingPlaneCount,}=useContext(RefrigeratorContext);

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
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}></Text>
                        
                        <Text style={style.modalContent} >規劃冰箱內部平面分層，將採用俯視立體圖呈現</Text>
                    </View>
                </TouchableWithoutFeedback>    
            </Modal>
        <View style={style.titleView}>
            <Text style={style.title}>
                Step4
            </Text>
            <FAB
                    icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={moderateScale(20)}></FontAwesomeIcon>}
                    size="small"
                    placement="right"
                    color="#A7DCFF"
                    onPress={() => setModalVisible(true)}
                    style={{zIndex:2,
                            right:moderateScale(20),
                            bottom:moderateScale(20),
                            backgroundColor:"#A7DCFF",
                            shadowColor:'#10348D',
                            shadowOffset:{
                                width:0,
                                height:5,},
                            shadowOpacity:0.5,
                            shadowRadius:3.5,
                            elevation:5,}}/>

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

                <SelectList
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:moderateScale(120,0.3)}]}
                setSelected={(val)=>step4_freezingPlane(val)}
                data={freezingPlaneList}
                search={false}
                save="key"
                placeholder="冷凍平面分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                dropdownTextStyles={{fontSize:moderateScale(15),}}
                />

                <SelectList 
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:moderateScale(120,0.3)}]}
                setSelected={(val)=>step4_coldPlane(val)}
                data={coldPlaneList}
                search={false}
                save="key"
                placeholder="冷藏平面分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                dropdownTextStyles={{fontSize:moderateScale(15),}}
                />
            </View>

            {outConfig == "上層冷藏+下層冷凍"?
                <>
                <>
                <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200),marginVertical:moderateScale(30)}}>
                    
                    <BoxDown number={coldBoxCount} clickIndex={handleButtonPress}>
                    </BoxDown>
                </ImageBackground>

                <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200),marginVertical:moderateScale(30)}}>
                    <BoxUp number={freezingBoxCount} clickIndex={handleButtonPress}>
                    </BoxUp>
                </ImageBackground>
                </>
                </> : 
                <>
                <ScrollView
                >
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
    titleView:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
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
      modalView:{
        opacity:1,
        borderRadius:moderateScale(10),
        alignSelf:'center',
        //justifyContent:'center',
        backgroundColor:'#FFFFFF',
        width:moderateScale(280),
        height:moderateScale(200),
    },
    modalTitle:{
        marginVertical:moderateScale(20),
        fontSize:moderateScale(30),
        textAlign:'center',
    },
    modalContent:{
        padding:moderateScale(10),
        lineHeight:moderateScale(30),
        fontSize:moderateScale(18),
        color:'#8D8D8D',
        //textAlign:'center',
    }
    
})

export default Step4Screen;