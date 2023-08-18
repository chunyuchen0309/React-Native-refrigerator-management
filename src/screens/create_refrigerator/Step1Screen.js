import React, { useCallback, useContext, useEffect, useState ,useRef} from "react";
import { Alert, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, SpeedDial, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faLightbulb, faQuestion,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import AwesomeButton, { ThemedButton } from 'react-native-really-awesome-button';
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";
import { ScreenWidth } from "@rneui/base";
import { scale, moderateScale, verticalScale} from "../ScaleMethod";

const Step1Screen=()=>{
    const navigation=useNavigation();
    const outList = [{key:"1",value:"上層冷凍+下層冷藏"},{key:"2",value:"上層冷藏+下層冷凍"}];
    const {step1,outConfig}=useContext(RefrigeratorContext);
    const [modalVisible,setModalVisible]=useState(false);
    const ToNextPage=()=>{
        if(outConfig){
            navigation.navigate("Step2");
        }else{
            Alert.alert("請選擇配置")
        }
    }

    const animationRef = useRef(null);

    useEffect(() => {
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
      }, []);

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
                        <Text style={style.modalContent} >依據冰箱冷凍及冷藏位置設定冰箱分層，將同步顯示於畫面</Text>
                    </View>            
                </TouchableWithoutFeedback>    
            </Modal>
        
            <View style={style.titleView}>
                <Text style={style.title}>
                    Step1
                </Text>
                <FAB
                    icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>}
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
                        autoSize={true}/>
                </View>
            </View>

            <View style={{marginVertical:moderateScale(10),height:moderateScale(50),zIndex:1,}}>
                <SelectList
                boxStyles={dropdown.box}
                dropdownStyles={dropdown.dropdown}
                setSelected={(val)=>step1(val)}
                save="value"
                data={outList}
                search={false}
                placeholder="請選擇配置"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>}
                />
            </View>
            
            {outConfig == "上層冷藏+下層冷凍"?
                <>
                    <View style={[refrigerator.outTop,{flex:5}]}>
                        <View style={refrigerator.handledown}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton,{flex:2}]}>
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

export default Step1Screen;