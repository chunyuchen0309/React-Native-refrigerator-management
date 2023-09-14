import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBriefcase, faChartLine, faChevronRight, faCloudArrowUp, faEnvelope, faFingerprint, faList, faLock, faMoneyCheck, faPaperPlane, faPhone, faShare, faShareFromSquare, faSnowflake, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faIdCard,} from "@fortawesome/free-regular-svg-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
import messaging from '@react-native-firebase/messaging';

const UserScreen=()=>{

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(()=>{
            getUserInfo();
        },[])
    )
   
    const {token,logout,isLoading,userInfo,getUserInfoMethod,setIsLoading}=useContext(AuthContext);
    const iconSize=moderateScale(18);
    const textSize=moderateScale(14);
    const navigation=useNavigation();

    const getFCMToken = async () => {
        console.log("getFCMToken");
        try {
          const fcmtoken = await messaging().getToken();
          console.log(fcmtoken);
          axios({
            method:"POST",
            url:`${BASE_URL}/auth/uploadFCM`,
            headers:{'Authorization': token.token},
            data: {fcmtoken:fcmtoken},
          }).then(res=>{
                console.log(res.data);
            }).catch(e=>{
                console.log(`upFCM error ${e}`);
            });
        } catch (e) {
          console.log(e);
        }
      };
    const getUserInfo =async()=>{
        getUserInfoMethod();//取得用戶資訊
        console.log(userInfo);
    }

    const onRefresh =useCallback(()=>{ // 避免不必要的渲染使用
        setIsLoading(true);
        getUserInfo();
    },[]);
    //console.log(switchChange);
    return(
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>
                }>

                <View style={styles.infobg}>
                    <Button
                        accessible={true}
                        accessibilityHint="前往名稱設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.infoButtontop}
                        icon={<FontAwesomeIcon icon={faUser} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateUserName',{userInfo:userInfo})}
                        title={
                            <>
                                <Text style={{fontSize:textSize}}>名稱</Text>
                                    <View style={styles.titleView}>       
                                        <Text style={styles.leftTitle}>{userInfo.username}</Text>
                                        <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                    </View>
                                 
                            </>}>
                    </Button>
                    <Button 
                        buttonStyle={styles.infoButtoncenter}
                        icon={<FontAwesomeIcon icon={faEnvelope} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        title={<>
                                <Text style={{fontSize:textSize}}>電子郵件</Text>
                                <View style={styles.titleView_4}>
                                    <Text style={styles.leftTitle} ellipsizeMode="tail" numberOfLines={1}>{userInfo.email}</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityHint="前往電話設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.infoButtoncenter}
                        icon={<FontAwesomeIcon icon={faPhone} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateUserPhone',{userInfo:userInfo})}
                        title={<>
                                <Text style={{fontSize:textSize}}>電話</Text>
                                <View style={styles.titleView}>
                                    <Text style={styles.leftTitle}>{userInfo.phone}</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往密碼設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.infoButtoncenter}
                        icon={<FontAwesomeIcon icon={faLock} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateUserPassword',{userInfo:userInfo})}
                        title={<>
                                <Text style={{fontSize:textSize}}>修改密碼</Text>
                                <View style={styles.titleView_4}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往操作模式設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.infoButtoncenter}
                        icon={<FontAwesomeIcon icon={faFingerprint} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('LookModelScreen')}
                        title={<>
                                <Text style={{fontSize:textSize}}>操作模式</Text>
                                <View style={styles.titleView_4}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往用戶類型設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.infoButtonBottom}
                        icon={<FontAwesomeIcon icon={faIdCard} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateUserRole',{userInfo:userInfo})}
                        title={<>
                                <Text style={{fontSize:textSize}}> 用戶類型</Text>
                                <View style={styles.titleView_4}>
                                    <Text style={styles.leftTitle}>{userInfo.role}</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    
                    <Button 
                        accessible={true}
                        accessibilityHint="前往用戶帳號設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtontop}
                        icon={<FontAwesomeIcon icon={faSnowflake} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateAccountname',{accountName:userInfo.accountName,username:userInfo.username})}
                        title={<>
                                <Text style={{fontSize:textSize}}>你的冰箱</Text>
                                <View style={styles.titleView_4}>
                                    <Text style={styles.leftTitle}>{userInfo.accountName}</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往共用請求設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtoncenter}
                        icon={<FontAwesomeIcon icon={faShare} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('SharedAccount',{username:userInfo.username})}
                        title={<>
                                <Text style={{fontSize:textSize}}>共用請求</Text>
                                <View style={styles.titleView_4}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往查看共用用戶設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtoncenter}
                        icon={<FontAwesomeIcon icon={faList} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('SharedList')}
                        
                        title={<>
                                <Text style={{fontSize:textSize}}>查看共用用戶</Text>
                                <View style={styles.titleView_6}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往用升級方案設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtoncenter}
                        icon={<FontAwesomeIcon icon={faChartLine} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpMethod')}
                        
                        title={<>
                                <Text style={{fontSize:textSize}}>升級方案</Text>
                                <View style={styles.titleView_6}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>   
                    <Button 
                        accessible={true}
                        accessibilityLabel="前往商業資訊按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtoncenter}
                        icon={<FontAwesomeIcon icon={faBriefcase} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('')}
                        
                        title={<>
                                <Text style={{fontSize:textSize}}>查看商業資訊</Text>
                                <View style={styles.titleView_6}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>     
                    <Button 
                        accessible={true}
                        accessibilityLabel="開啟通知設定按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.accountButtonBottom}
                        icon={<FontAwesomeIcon icon={faCloudArrowUp} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>getFCMToken()}
                        title={<>
                                <Text style={{fontSize:textSize}}>開啟通知設定</Text>
                                <View style={styles.titleView_4}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>

                    <Button 
                        accessible={true}
                        accessibilityLabel="登出按鈕"
                        accessibilityRole="none"
                        buttonStyle={styles.logoutButton}
                        icon={<FontAwesomeIcon icon={faCircleLeft} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={logout}
                        title={<>
                                <Text style={{fontSize:textSize}}>登出</Text>
                                <View style={styles.titleView}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                </View>    
            </ScrollView>
        </SafeAreaView>
        
        
    );
};

const styles =StyleSheet.create({

    safeAreaView:{
        flex:1,
    },
    infobg:{
        backgroundColor:'#E4E4E4',
        marginHorizontal:moderateScale(20),
        marginTop:moderateScale(10),
        marginBottom:moderateScale(50),
        borderRadius:moderateScale(20),
        paddingVertical:moderateScale(50),
    },
    infoButtontop:{
        height:moderateScale(40),
        justifyContent:'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:moderateScale(20),
        //marginTop:50,
        marginBottom:moderateScale(3),
        borderTopStartRadius:moderateScale(10),
        borderTopEndRadius:moderateScale(10),
        borderBottomStartRadius:moderateScale(0),
        borderBottomEndRadius:moderateScale(0),
    },
    infoButtoncenter:{
        height:moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(3),
        borderRadius:moderateScale(0),
    },
    infoButtonBottom:{
        height:moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(3),
        borderBottomStartRadius:moderateScale(10),
        borderBottomEndRadius:moderateScale(10),
        borderTopStartRadius:0,
        borderTopEndRadius:0,
    },
    accountButtontop:{
        height:moderateScale(40),
        justifyContent:'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:moderateScale(20),
        marginTop:moderateScale(50),
        marginBottom:moderateScale(3),
        borderTopStartRadius:moderateScale(10),
        borderTopEndRadius:moderateScale(10),
        borderBottomStartRadius:0,
        borderBottomEndRadius:0,
    },
    accountButtoncenter:{
        height:moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(3),
        borderRadius:0,
    },
    accountButtonBottom:{
        height:moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:moderateScale(20),
        marginBottom:moderateScale(3),
        borderBottomStartRadius:moderateScale(10),
        borderBottomEndRadius:moderateScale(10),
        borderTopStartRadius:0,
        borderTopEndRadius:0,
    },

    logoutButton:{
        height:moderateScale(40),
        justifyContent: 'flex-start',
        backgroundColor:'#D9FEAA',
        marginHorizontal:moderateScale(20),
        //paddingTop:20,
        //marginVertical:40,
        marginTop:moderateScale(20),
        borderRadius:moderateScale(10),
    },
   
    leftTitle:{
        width:moderateScale(180),
        //flex:1,
        textAlign:'right',
        //backgroundColor:'black',
        color:'#969696',
        fontSize:moderateScale(15),
        
    },
    buttonTitle:{
        color:'black',
        //backgroundColor:"yellow",
    },
    titleView:{
        flexDirection:"row",
        flex:1,
        //width:235,
        justifyContent:'flex-end',
        
    },
    titleView_4:{
        flexDirection:"row",
        flex:1,
        justifyContent:'flex-end',
        
    },
    titleView_6:{
        flexDirection:"row",
        flex:1,
        justifyContent:'flex-end', 
    },
    iconLeft:{
        marginRight:moderateScale(5),
        marginLeft:moderateScale(5),
    },
    scrollView:{
        justifyContent:'flex-start',
        //alignItems:'center',
        //flex:1,
    },
});

export default UserScreen;