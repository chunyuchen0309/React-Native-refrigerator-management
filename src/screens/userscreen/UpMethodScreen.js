import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faFire } from "@fortawesome/free-solid-svg-icons";
const UpMethodScreen=()=>{

    const navigation=useNavigation();
    useEffect(()=>{
       
    },[]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>                   
            <SafeAreaView style={Userstyle.safeAreaView}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <View style={[Userstyle.greyBg,{marginTop:moderateScale(10),paddingBottom:moderateScale(40)}]}>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>個人免費</Text>
                            <View style={styles.cardContentView}>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#404496"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#404496"}]}>程式基本功能</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#404496"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#404496"}]}>客製化冰箱分層，手動新增食品</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#404496"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#404496"}]}>查詢食物存放位置</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#404496"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#404496"}]}>食譜、食物搜尋功能</Text>
                                        <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
                                                <Button 
                                                        buttonStyle={styles.buttonSend}
                                                        titleStyle={styles.buttonSendTitle}
                                                        title={"購買"}>             
                                                </Button>
                                        </View>
                                </View>
                                
                                
                            </View>
                            
                        </View>

                        <View style={[styles.card,{borderColor:"#FF9900",borderWidth:moderateScale(3)}]}>
                            <View style={{flexDirection:'row',}}>
                                <Text style={styles.cardTitle}>個人付費</Text>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginRight:moderateScale(25),marginTop:moderateScale(28)}}>
                                    <FontAwesomeIcon icon={faFire} color="#CA3936"></FontAwesomeIcon>
                                    <Text style={{color:'#CA3936',marginStart:moderateScale(5)}}>熱門方案</Text>
                                </View>
                            </View>
                            <View style={styles.cardContentView}>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#7257FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#7257FF"}]}>擁有程式基本功能</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#7257FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#7257FF"}]}>建立多個冰箱</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#7257FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#7257FF"}]}>喜好食譜推薦</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#7257FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#7257FF"}]}>智能化QRCODE掃描</Text>
                                        <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
                                                <Button 
                                                        buttonStyle={[styles.buttonSend,{backgroundColor:'#FF9900'}]}
                                                        titleStyle={styles.buttonSendTitle}
                                                        title={"購買"}>             
                                                </Button>
                                        </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>商業付費</Text>
                            <View style={styles.cardContentView}>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#0099FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#0099FF"}]}>擁有程式基本功能</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#0099FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#0099FF"}]}>商業化管理多個冰箱</Text>
                                </View>
                                <View style={styles.cardContentRow}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#0099FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#0099FF"}]}>冰箱共用存取</Text>
                                </View>
                                <View style={[styles.cardContentRow,{}]}>
                                    <FontAwesomeIcon icon={faCheck} size={moderateScale(17)} color="#0099FF"></FontAwesomeIcon>
                                    <Text style={[styles.cardContentText,{color:"#0099FF"}]}>訂閱制度</Text>
                                    <View style={{justifyContent:'flex-end',flexDirection:'row',flex:1}}>
                                            <Button 
                                                    buttonStyle={styles.buttonSend}
                                                    titleStyle={styles.buttonSendTitle}
                                                    title={"購買"}
                                                    onPress={()=>{navigation.navigate("RegisterBusiness")}}>             
                                            </Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>    
    );
};

const styles=StyleSheet.create({
    card:{
        backgroundColor:'#FFFFFF',
        marginHorizontal:moderateScale(20),
        height:moderateScale(190),
        marginTop:moderateScale(40),
        borderRadius:moderateScale(20)
    },
    cardTitle:{
        fontSize:moderateScale(25),
        marginTop:moderateScale(20),
        marginStart:moderateScale(20),
        color:'#8C9090',
    },
    cardContentRow:{
        flexDirection:'row',
        flexWrap:'nowrap',
        marginVertical:moderateScale(3),
    },
    cardContentView:{
        marginStart:moderateScale(40),
        marginTop:moderateScale(10),
    
    },
    cardContentText:{
        fontSize:moderateScale(15),
        paddingStart:moderateScale(5),
        fontWeight:500,
        
    },
    buttonSend:{
        borderRadius:moderateScale(10),
        width:moderateScale(60),
        height:moderateScale(30),
        backgroundColor:'#8C9090',
        marginRight:moderateScale(20),
    },
    buttonSendTitle:{
        color:'#FFFFFF',
        fontSize:moderateScale(15),
        lineHeight:moderateScale(15),
        padding:moderateScale(0),

    }
})


export default UpMethodScreen;