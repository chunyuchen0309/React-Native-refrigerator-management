import React, { useCallback, useContext, useEffect, useState ,useRef} from "react";
import { Alert, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Input, SpeedDial, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown, faQuestion,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import AwesomeButton, { ThemedButton } from 'react-native-really-awesome-button';
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../../assets/stepBarColor";


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
                icon={<FontAwesomeIcon icon={faQuestion} color="#FFAA00" size={25}></FontAwesomeIcon>}
                size="small"
                color="#D9D9D9"
                onPress={() => setModalVisible(true)}
                style={{ top: 0, left:110, zIndex: 2, }}>

            </FAB>

            <View style={{flexDirection:'column'}}>
                <AnimatedLottieView 
                    ref={animationRef}
                    style={{height:30}}
                    source={require('../../assets/stepBar.json')} 
                    autoPlay
                    loop  
                    speed={0.5}
                    colorFilters={ChangeColor}
                    autoSize={true}
                    
                />
        </View>

        </View>
            <View style={{marginVertical:10,height:50,zIndex:1,}}>
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
                    <View style={[refrigerator.outTop,{height:320}]}>
                        <View style={refrigerator.handledown}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton,{height:180}]}>
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
        marginLeft:40,
        marginVertical:20,
        textAlign:'center',
        fontSize:20,
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        marginVertical:20,
        marginHorizontal:50,
        borderRadius:10,
    },
    modalView:{
        opacity:1,
        borderRadius:10,
        alignSelf:'center',
        //justifyContent:'center',
        backgroundColor:'#FFFFFF',
        width:280,
        height:200,
    },
    modalTitle:{
        marginVertical:20,
        fontSize:30,
        textAlign:'center',
    },
    modalContent:{
        padding:10,
        lineHeight:30,
        fontSize:18,
        color:'#8D8D8D',
        //textAlign:'center',
    }
    
})

export default Step1Screen;