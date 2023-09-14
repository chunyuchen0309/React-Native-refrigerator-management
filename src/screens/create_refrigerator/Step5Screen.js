import React, { useCallback, useContext, useEffect, useState } from "react";
import {   Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableWithoutFeedback, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
const Step5Screen = () => {
    const [modalVisible,setModalVisible]=useState(false);
    const [refName,setRefName]=useState("");
    const [upInfo,setUpInfo]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const {token}=useContext(AuthContext);
    const setting=()=>{
        setIsLoading(true);
        //navigation.navigate("Home");
        //setModalVisible(true);
        //console.log(coldCount+freezingCount);
        if(outConfig=="上層冷凍+下層冷藏"){
            for(var i=1;i<=freezingCount;i++){
                upInfo.push(
                    {
                    "type":"freezer",
                    "door":false,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":freezingPlaneCount==4? 2:freezingPlaneCount==6? 3:freezingPlaneCount==9? 3:3,
                    "compartment_row":freezingPlaneCount==4? 2:freezingPlaneCount==6? 2:freezingPlaneCount==9? 3:3,
                    });
            }
            for(var i=(Number(freezingCount)+1);i<=(Number(coldCount)+Number(freezingCount));i++){
                upInfo.push(
                    {
                    "type":"cooler",
                    "door":false,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":coldPlaneCount==4? 2:coldPlaneCount==6? 3:coldPlaneCount==9? 3:3,
                    "compartment_row":coldPlaneCount==4? 2:coldPlaneCount==6? 2:coldPlaneCount==9? 3:3,
                    });
            }
            for(var i=1;i<=Number(freezingDoorCount);i++){
                upInfo.push(
                    {
                    "type":"freezer",
                    "door":true,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":1,
                    "compartment_row":1,
                    });
            }
            for(var i=(Number(freezingDoorCount)+1);i<=(Number(coldDoorCount)+Number(freezingDoorCount));i++){
                upInfo.push(
                    {
                    "type":"cooler",
                    "door":true,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":1,
                    "compartment_row":1,
                    });
            }
            console.log(upInfo);
        }else{
            for(var i=1;i<=Number(coldCount);i++){
                upInfo.push(
                    {
                    "type":"cooler",
                    "door":false,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":coldPlaneCount==4? 2:coldPlaneCount==6? 3:coldPlaneCount==9? 3:3,
                    "compartment_row":coldPlaneCount==4? 2:coldPlaneCount==6? 2:coldPlaneCount==9? 3:3,
                    });
            }
            for(var i=(Number(coldCount)+1);i<=(Number(freezingCount)+Number(coldCount));i++){
                upInfo.push(
                    {
                    "type":"freezer",
                    "door":false,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":freezingPlaneCount==4? 2:freezingPlaneCount==6? 3:freezingPlaneCount==9? 3:3,
                    "compartment_row":freezingPlaneCount==4? 2:freezingPlaneCount==6? 2:freezingPlaneCount==9? 3:3,
                    });
            }
            for(var i=1;i<=Number(coldDoorCount);i++){
                upInfo.push(
                    {
                    "type":"cooler",
                    "door":true,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":1,
                    "compartment_row":1,
                    });
            }
            for(var i=(1+Number(coldDoorCount));i<=(Number(coldDoorCount)+Number(freezingDoorCount));i++){
                upInfo.push(
                    {
                    "type":"freezer",
                    "door":true,
                    "refrigerator_col":"1",
                    "refrigerator_row":""+i,
                    "compartment_col":1,
                    "compartment_row":1,
                    });
            }
            console.log(upInfo);
        }
        //setUpInfo([]);
        Update();
    };

    const {
        outConfig,
        coldCount,
        freezingCount,
        coldDoorCount,
        freezingDoorCount,
        coldPlaneCount,
        freezingPlaneCount,}=useContext(RefrigeratorContext);
    const navigation = useNavigation();

    const Update=()=>{
        
        axios({
            method:"POST",
            url:`${BASE_URL}/storage/add`,
            headers: {'Authorization': token.token},
            data:{
                "refrigerator_name": refName,
                "compartment": upInfo,
            },
        }).then(res=>{
            console.log(res.data);
            setIsLoading(false);
            setModalVisible(true);
        }).catch(e=>{
            console.log(`新增冰箱失敗 ${e}`);
            setIsLoading(false);
            Alert.alert("已有建立冰箱紀錄，無法再次新增");
            navigation.navigate("Home")
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    console.log(refName);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={styles.safeAreaView}>
        <Modal 
            animationIn={"zoomIn"}
            animationInTiming={900}
            animationOut={"zoomOut"}
            animationOutTiming={800}
            isVisible={modalVisible}
            backdropOpacity={0.2}  
            onBackdropPress={() => {setModalVisible(false),navigation.navigate("Home")}}
            >
                <TouchableWithoutFeedback 
                onPress={()=>{setModalVisible(false),navigation.navigate("Home")}}
                >
                    <View style={styles.modalView}>
                        <AnimatedLottieView
                        source={require('../../assets/checkmark.json')}
                        autoPlay
                        speed={0.3}
                        loop={false}>

                        </AnimatedLottieView>

                    </View>
                </TouchableWithoutFeedback>    
        </Modal>

            <View style={styles.infobg}>
                <Button
                    buttonStyle={[styles.infoButtontop,{backgroundColor:"#A7DCFF",borderWidth:moderateScale(2),borderColor:"#FF9900"}]}
                    titleStyle={{}}
                    title={
                        <>               
                            <Input
                                placeholder="輸入冰箱名稱"
                                containerStyle={{flex:1,marginHorizontal:moderateScale(10),marginTop:moderateScale(15),}}
                                inputContainerStyle={{height:moderateScale(60),}}
                                inputStyle={{fontSize:moderateScale(16),}}
                                clearButtonMode="while-editing"
                                value={refName}
                                onChangeText={(text)=>setRefName(text)}>
                            </Input>
                        </>
                    } />
                <Button
                    buttonStyle={[styles.infoButtonBottom,{backgroundColor:"#A7DEFF"}]}
                    titleStyle={styles.buttonTitle}
                    title={
                        <>
                            <Text style={styles.leftTitle}>外部分層</Text>                 
                            <Text style={styles.rightTitle}>{outConfig}</Text>
                        </>
                    } />
                <Button
                    buttonStyle={[styles.infoButtontop,{backgroundColor:"#95ECFF"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷凍分層</Text>                 
                        <Text style={styles.rightTitle}>{freezingCount} 層</Text>
                    </>}>
                </Button>

                <Button
                    buttonStyle={[styles.infoButtoncenter,{backgroundColor:"#95ECFF"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷藏分層</Text>         
                        <Text style={styles.rightTitle}>{coldCount} 層</Text>
                    </>}>
                </Button>
                <Button
                    buttonStyle={[styles.infoButtoncenter,{backgroundColor:"#95ECFF"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷凍門邊分層</Text>         
                        <Text style={styles.rightTitle}>{freezingDoorCount} 層</Text>
                    </>}>
                </Button>
                <Button
                    buttonStyle={[styles.infoButtonBottom,{backgroundColor:"#95ECFF"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷藏門邊分層</Text>         
                        <Text style={styles.rightTitle}>{coldDoorCount} 層</Text>
                    </>}>
                </Button>

                <Button
                    buttonStyle={[styles.infoButtontop,{backgroundColor:"#A3FFE9"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷凍平面詳細分層</Text>                 
                        <Text style={styles.rightTitle}>{freezingPlaneCount} 個區塊</Text>
                    </>}>
                </Button>

                <Button
                    buttonStyle={[styles.infoButtonBottom,{backgroundColor:"#A3FFE9"}]}
                    titleStyle={styles.buttonTitle}
                    title={<>
                        <Text style={styles.leftTitle}>冷藏平面詳細分層</Text>         
                        <Text style={styles.rightTitle}>{coldPlaneCount} 個區塊</Text>
                    </>}>
                </Button>

                <Button
                    loading={isLoading}
                    buttonStyle={styles.finishButton}
                    titleStyle={styles.finishTitle}
                    onPress={()=>setting()}
                    title="完成設定">
                </Button>

            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
    },
    infobg: {
        backgroundColor: '#E4E4E4',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(50),
        borderRadius: moderateScale(20),
    },
    infoButtontop: {
        height: moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: moderateScale(20),
        marginTop: moderateScale(50),
        marginBottom: moderateScale(3),
        borderTopStartRadius: moderateScale(10),
        borderTopEndRadius: moderateScale(10),
        borderBottomStartRadius: moderateScale(0),
        borderBottomEndRadius:moderateScale(0) ,
    },
    infoButtonAll: {
        height: moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal:moderateScale(20) ,
        marginTop: moderateScale(50),
        marginBottom: moderateScale(3),
        borderTopStartRadius:moderateScale(10) ,
        borderTopEndRadius:moderateScale(10),
        borderBottomStartRadius: moderateScale(10),
        borderBottomEndRadius:moderateScale(10),
    },
    infoButtoncenter: {
        height: moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: moderateScale(20),
        marginBottom:moderateScale(3) ,
        borderRadius:moderateScale(0) ,
    },
    infoButtonBottom: {
        height: moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: moderateScale(20),
        marginBottom: moderateScale(3),
        borderBottomStartRadius: moderateScale(10),
        borderBottomEndRadius: moderateScale(10),
        borderTopStartRadius: moderateScale(0),
        borderTopEndRadius: moderateScale(0),
    },
    finishButton: {
        height: moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor: '#A9FF3C',
        marginHorizontal:moderateScale(20),
        marginVertical: moderateScale(40),
        //marginBottom:3,
        borderRadius: moderateScale(10),
    },
    finishTitle:{
        flex:1,
        color:'#000000',
        textAlign:'center',
    },
    rightTitle: { 
        marginRight:moderateScale(20),
        flex:1,
        textAlign: 'right',
        color: 'black',
        fontSize: moderateScale(15),
    },
    leftTitle: { 
        marginLeft:moderateScale(20),
        textAlign: 'left',
        color: 'black',
        fontSize: moderateScale(15),
    },
    modalView:{
        opacity:moderateScale(0.8),
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
});

export default Step5Screen;