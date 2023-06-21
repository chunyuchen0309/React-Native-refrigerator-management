import React, { useCallback, useContext, useEffect, useState } from "react";
import {   SafeAreaView, ScrollView, StyleSheet, Switch, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";
import Modal from "react-native-modal";
import AnimatedLottieView from "lottie-react-native";

const Step5Screen = () => {
    const [modalVisible,setModalVisible]=useState(false);
    const setting=()=>{
        //navigation.navigate("Home");
        setModalVisible(true);
        
    }

    console.log('step5');
    const {
        outConfig,
        coldCount,
        freezingCount,
        coldDoorCount,
        freezingDoorCount,
        coldPlaneCount,
        freezingPlaneCount,}=useContext(RefrigeratorContext);
    const navigation = useNavigation();

    return (
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
                    buttonStyle={styles.infoButtonAll}
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
                    buttonStyle={styles.finishButton}
                    titleStyle={styles.finishTitle}
                    onPress={()=>setting()}
                    title="完成設定">
                </Button>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
    },
    infobg: {
        backgroundColor: '#E4E4E4',
        marginHorizontal: 20,
        marginTop: 50,
        borderRadius: 20,
    },
    infoButtontop: {
        height: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom: 3,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    infoButtonAll: {
        height: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom: 3,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
    },
    infoButtoncenter: {
        height: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: 20,
        marginBottom: 3,
        borderRadius: 0,
    },
    infoButtonBottom: {
        height: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#A7DCFF',
        marginHorizontal: 20,
        marginBottom: 3,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
    },
    finishButton: {
        height: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#A9FF3C',
        marginHorizontal: 20,
        marginVertical: 40,
        //marginBottom:3,
        borderRadius: 10,
    },
    finishTitle:{
        flex:1,
        color:'#000000',
        textAlign:'center',
    },
    rightTitle: { 
        marginRight:20,
        flex:1,
        textAlign: 'right',
        color: 'black',
        fontSize: 15,
    },
    leftTitle: { 
        marginLeft:20,
        textAlign: 'left',
        color: 'black',
        fontSize: 15,
    },
    modalView:{
        opacity:0.8,
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
});

export default Step5Screen;