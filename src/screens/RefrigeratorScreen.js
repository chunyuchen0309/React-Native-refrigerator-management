import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-elements";
import modal_fab from "../style/Modal&FAB";
import { moderateScale } from "./ScaleMethod";
import { ScreenWidth } from "@rneui/base";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import refrigerator from "../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import axios, { all } from "axios";
import { FlashList } from "@shopify/flash-list";
import RefFlashList from "./RefFlashList";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native";
import Userstyle from "../style/UserStyle";
import AnimatedLottieView from "lottie-react-native";
import { ChangeColor } from "../assets/swipeColor";
import { useDispatch, useSelector } from "react-redux";
import { getRefInfo, queryRefPlace } from "../store/refSlice";
import { BASE_URL } from "../config";
const RefrigeratorScreen=()=>{
    const navigation=useNavigation();
    const [modalVisible,setModalVisible]=useState(false);
    //const {refInfo}=useContext(AuthContext);
    const userState = useSelector(state => state.userInfo);
    const refState = useSelector(state => state.refInfo);
    const dispatch =useDispatch();
    useFocusEffect( //載入該頁面時都會重新抓取資料
    React.useCallback(()=>{
        dispatch(getRefInfo());
        },[])
    );
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

    const clickItem=(index,name)=>{
        console.log("分層點擊= ", index,"名稱= ",name);
        dispatch(queryRefPlace());
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Modal
                animationIn={"fadeIn"}
                animationInTiming={800}
                animationOut={"fadeOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.9} 
                onBackdropPress={() => setModalVisible(false)}
                >
                <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}> 
        
                    <View style={{flex:1,justifyContent:'space-between'}}>
                        <View>
                            <TouchableOpacity 
                                disabled              
                                style={{backgroundColor: "#416BFF",
                                    marginLeft:moderateScale(20),
                                    marginTop:moderateScale(150),
                                    borderRadius:moderateScale(10),
                                    justifyContent:'flex-start',
                                    height:moderateScale(70),
                                    width:moderateScale(220)}}
                            >
                                <AnimatedLottieView      
                                    style={{height:moderateScale(120),alignSelf:'flex-start'}}
                                    source={require('../assets/click.json')}  
                                    speed={0.5}
                                    autoPlay
                                    loop={false}
                                    autoSize={true}/>
                            </TouchableOpacity>
                            
                            <View style={{flexDirection:'row',marginHorizontal:moderateScale(10)}}>
                                
                                <Text style={[modal_fab.modalTitle,{marginRight:moderateScale(10)}]}>點擊查看該分層儲存食材，長按則會跳出平面分層圖，再進行區塊選擇</Text>
                                </View> 
                            
                        </View>
                        <View>
                            <AnimatedLottieView
                                style={{width:moderateScale(200),alignSelf:'center',}}
                                source={require('../assets/swipeLeft.json')}  
                                speed={0.9}
                                autoPlay
                                loop={false}
                                colorFilters={ChangeColor}
                                autoSize={true}/>
                            <View style={{flexDirection:'row',flexWrap:'nowrap',marginHorizontal:moderateScale(30)}}>
                                <Text style={[modal_fab.modalTitle,{marginTop:0}]}>左右滑動頁面查看不同冰箱</Text>
                            </View> 
                    </View>
                    </View>                                
                </TouchableWithoutFeedback>    
            </Modal>

            <View style={{flex:1,width:ScreenWidth,justifyContent:'flex-start',marginTop:moderateScale(20)}}>
            {refState.refList.length>0?
                <FlashList
                    ListEmptyComponent={<Text style={{textAlign:'center'}}>請建立冰箱配置</Text>}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={refState.refList}
                    horizontal= {true}
                    estimatedItemSize={800}
                    renderItem={({item,index})=>(
                        <RefFlashList
                            data={item}
                            handleClick={clickItem}
                            index={index}
                        />)}>
                </FlashList>
            :<></>
            }
                
            </View>
        </SafeAreaView>         
    );
};

const styles=StyleSheet.create({
    safeAreaView:{
        flex:1,
    },
    scrollView:{
        flex:1,
        //backgroundColor:"yellow",
    },
    title:{
        textAlign:'center',
        fontSize:moderateScale(25),
        marginVertical:moderateScale(20),
        color: '#777',
        width:ScreenWidth,
    },
    modalView:{
        borderRadius:moderateScale(10),
        alignSelf:'center',
        //justifyContent:'center',
        backgroundColor:'#FFFFFF',
        height:moderateScale(400),
        //flex:1,
        marginVertical:moderateScale(200),
    },
    modalTitle:{
        marginTop:moderateScale(20),
        marginBottom:moderateScale(20),
        fontSize:moderateScale(30),
        textAlign:'center',
        color:"#777"
    },
    titleView:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        marginBottom:50,},
    finalTop:{
        flexDirection:'row',
        flex:5,
    },
    finalDown:{
        flexDirection:'row',
        flex:10,
    },
})

export default RefrigeratorScreen;