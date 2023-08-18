import React, { Component, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Button, FAB, Input, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {  useIsFocused, useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faCalendar, faCalendarXmark, faTools, faTrash, faTrashCan, faUser } from "@fortawesome/free-solid-svg-icons";
import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import Userstyle from "../style/UserStyle";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import { scale, moderateScale, verticalScale} from "./ScaleMethod";
const HomeScreen =()=>{
    
    const navigation=useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const [buttonSelect,setButtonSelect] =useState(true);
    const onRefresh =useCallback(()=>{ // 避免不必要的渲染使用
        setRefreshing(true);

        setRefreshing(false);   
    },[]);
    const changeButtonColor =()=>{
        setButtonSelect(!buttonSelect);
    }
    
    
    return(
            <ScrollView
                contentContainerStyle={{flex:1,justifyContent:'flex-start'}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} style={{backgroundColor:'#E4E4E4'}}/>
                }>

                <View style={styles.topBg}>
                        <Input 
                            disabled
                            containerStyle={{paddingHorizontal:moderateScale(65),marginTop:verticalScale(50),justifyContent:'center'}}
                            inputContainerStyle={{height:moderateScale(30),}}
                            disabledInputStyle={{fontSize:moderateScale(30),}}
                            leftIcon={<FontAwesomeIcon icon={faUser} color="#777" size={moderateScale(18)}></FontAwesomeIcon>}
                            >
                        </Input>

                    <View style={styles.topThreeButton}>
                        <View>
                            <Text style={styles.topButtonText}>
                                冰箱配置
                            </Text>
                            <Button 
                                onPress={()=>{navigation.navigate("Step1")}}
                                buttonStyle={styles.topButton}
                                icon={<FontAwesomeIcon icon={faTools} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View>
                            <Text style={styles.topButtonText}>
                                NFC
                            </Text>
                            <Button 
                            onPress={()=>{navigation.navigate("Nfc")}}
                            buttonStyle={styles.topButton}
                            icon={<FontAwesomeIcon icon={faNfcSymbol} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
                        <View>
                            <Text style={styles.topButtonText}>
                                冰箱分層
                            </Text>
                            <Button 
                            buttonStyle={styles.topButton}
                            icon={<FontAwesomeIcon icon={faBars} color="#404496" size={moderateScale(30)}></FontAwesomeIcon>}>
                            </Button>
                        </View>
        
                    </View>
                </View>

                <View style={styles.dateView}>
                    <Button
                        onPress={()=>{changeButtonColor()}}
                        buttonStyle={[styles.dateButton,{backgroundColor:buttonSelect==true?"#FFCA7B":"#BFBFBF"}]}
                        title={
                            <View style={[styles.dateButtonTitle,]}>
                                <FontAwesomeIcon icon={faCalendar} color="#FFFFFF" size={moderateScale(20)} style={{marginHorizontal:moderateScale(10),top:2}}></FontAwesomeIcon>
                                <Text style={{fontSize:moderateScale(20),fontWeight:'bold',color:"#777"}}>即將過期食物數量</Text>
                            </View>}
                        >
                    </Button>
                    <View style={{height:moderateScale(10)}}>
                    </View>
                    <Button
                        onPress={()=>{changeButtonColor()}}
                        buttonStyle={[styles.dateButton,{backgroundColor:buttonSelect ==false?"#FFCA7B":"#BFBFBF"}]}
                        title={
                            <View style={styles.dateButtonTitle}>
                                <FontAwesomeIcon icon={faCalendarXmark} color="#FFFFFF" size={moderateScale(20)} style={{marginHorizontal:moderateScale(10),top:2}}></FontAwesomeIcon>
                                <Text style={{fontSize:moderateScale(20),fontWeight:'bold',color:"#777"}}>已過期食物數量</Text>
                            </View>}
                        >
                    </Button>
                </View>

                {buttonSelect?<>
                    <View style={styles.dateListView}>
                        <Text style={[Userstyle.list_outTitle,{marginTop:moderateScale(30)}]}>
                            即將過期食物數量
                        </Text>
                        <View style={Userstyle.homeDateList}>
                            
                        </View>
                    </View>
                </>

                :
                <>
                <View style={styles.dateListView}>
                <View style={{flexDirection:"row",justifyContent:'center',}}>
                    <Text style={[Userstyle.list_outTitle,{marginTop:moderateScale(30)}]}>
                        已過期食物數量 
                    </Text>
                    <FAB 
                        icon={<FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(15)}></FontAwesomeIcon>}
                        color="#C81414"
                        size="small"
                        placement="right"
                        style={{right:moderateScale(10),top:moderateScale(10)}}
                        >
                    </FAB>
                </View>
                    
                <View style={Userstyle.homeDateList}>
                    
                </View>
                </View>
                
                </>
                
                }
                


            </ScrollView>
             
    );
};
const styles = StyleSheet.create({

    sa:{
        flex:1,
    },
    topBg:{
        backgroundColor:'#E4E4E4',
        borderBottomRightRadius:moderateScale(20),
        borderBottomStartRadius:moderateScale(20),
        //hight:moderateScale(500),
        //flex:1,
    },
    dateView:{
        //backgroundColor:"#F7FE9B",
        justifyContent:'flex-end',
        marginTop:moderateScale(50),
    },
    dateListView:{
        justifyContent:'flex-start',
        flex:1,
        //backgroundColor:"#F1D6FF",
    },
    topThreeButton:{
        //backgroundColor:'yellow',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-around',
        alignItems:'center',
        marginHorizontal:20,
        marginTop:moderateScale(-30),
        top:moderateScale(35),
        //flex:1,
    },
    topButton:{
        marginTop:moderateScale(5),
        backgroundColor:'#A7DCFF',
        padding:moderateScale(23),
        borderRadius:moderateScale(50),
        },
    topButtonText:{
        textAlign:'center',
        fontWeight:"bold",
        color:"#777",
        fontSize:moderateScale(14),
    },
    dateButton:{
        marginHorizontal:moderateScale(40),
        borderRadius:moderateScale(20),
        backgroundColor:"#BFBFBF",
    },
    dateButtonTitle:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-start',
        paddingVertical:3,
    }
    
});

export default HomeScreen;