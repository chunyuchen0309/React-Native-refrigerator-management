import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faCloudArrowUp, faEnvelope, faList, faLock, faPaperPlane, faPhone, faShare, faShareFromSquare, faSnowflake, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faIdCard, } from "@fortawesome/free-regular-svg-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";


const Step5Screen = () => {

    const setting=()=>{
        navigation.navigate("Home");
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
});

export default Step5Screen;