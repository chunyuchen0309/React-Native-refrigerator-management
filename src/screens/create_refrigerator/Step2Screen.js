import React, { useCallback, useContext, useEffect, useState,useRef } from "react";
import { Alert, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faLightbulb, faQuestion,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import Modal from "react-native-modal";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
const Step2Screen=()=>{
    //console.log("step2")
    const coldList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"},{key:"4",value:"四層"},{key:"5",value:"五層"}];
    const freezingList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");
    const navigation=useNavigation()
    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染
    const [modalVisible,setModalVisible]=useState(false);
    const {outConfig,coldCount,step2_cold,freezingCount,step2_freezing}=useContext(RefrigeratorContext);

    const ToNextPage=()=>{
        if(freezingCount && coldCount){
            navigation.navigate("Step3");
        }else{
            Alert.alert("請完成分層選擇")
        }
    }

    const animationRef = useRef(null);

    useEffect(() => {
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
      }, []);

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
      };

    const renderTopCenter = () => {
        return buttonTopCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#416BFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };
      
    const renderDownCenter = () => {
        return buttonDownCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}}
            //title={`Button ${index + 1}`}
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
                        
                        <Text style={style.modalContent} >依據冷凍及冷藏設定冰箱內部的分層，將同步顯示於畫面</Text>
                        
                    </View>
                        
                </TouchableWithoutFeedback>    
            </Modal>
            <View style={style.titleView}>
                <Text style={style.title}>
                    Step2
                </Text>
                <FAB
                    icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={moderateScale(20)}></FontAwesomeIcon>}
                    size="small"
                    placement="right"
                    color="#A7DCFF"
                    onPress={() => setModalVisible(true)}
                    style={{zIndex:2,
                        //width:moderateScale(30),
                        //height:moderateScale(30),
                        right:moderateScale(20),
                        bottom:moderateScale(20),
                        backgroundColor:"#A7DCFF",
                        shadowColor:'#10348D',
                        shadowOffset:{
                            width:0,
                            height:moderateScale(5),},
                        shadowOpacity:0.5,
                        shadowRadius:moderateScale(3.5),
                        elevation:moderateScale(5),}}/>

                <View style={{flexDirection:'column'}}>
                    <AnimatedLottieView 
                        ref={animationRef}
                        style={{height:moderateScale(30)}}
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

            <View style={style.towDropdown}>

                <SelectList
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:120}]}
                setSelected={(val)=>step2_freezing(val)}
                data={freezingList}
                search={false}
                save="key"
                placeholder="冷凍分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                dropdownTextStyles={{fontSize:moderateScale(15,0.1),}}
                />

                <SelectList 
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:190}]}
                setSelected={(val)=>step2_cold(val)}
                data={coldList}
                search={false}
                save="key"
                placeholder="冷藏分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                dropdownTextStyles={{fontSize:moderateScale(15,0.1),}}
                />
            </View>

            {outConfig == "上層冷藏+下層冷凍"?
                <>
                    <View style={[refrigerator.outTop,{flex:5}]}>
                        {renderDownCenter()}
                    </View>
                    <View style={[refrigerator.outBotton,{flex:2}]}>
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
        marginVertical:20,
        marginHorizontal:50,
        borderRadius:10,
    },
    towDropdown:{
        flexDirection:'row',
        height:50,
        justifyContent:'center',
        marginHorizontal:30,
        //backgroundColor:"#F3FA5E",
        marginVertical:10,
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

export default Step2Screen;