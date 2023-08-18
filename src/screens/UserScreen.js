import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBriefcase, faChevronRight, faCloudArrowUp, faEnvelope, faList, faLock, faMoneyCheck, faPaperPlane, faPhone, faShare, faShareFromSquare, faSnowflake, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faIdCard,} from "@fortawesome/free-regular-svg-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
import messaging from '@react-native-firebase/messaging';

const UserScreen=()=>{
    //123
    useFocusEffect(
        React.useCallback(()=>{
            getUserInfo();
        },[])
    )
    /*useEffect(()=>{
         getUserInfo();
    },[]);*/
    console.log('userScreen');
    const [refreshing, setRefreshing] = useState(false);
    const [userInfo,setUserInfo]=useState({});
    const {token,logout}=useContext(AuthContext);
    const [role,setRole]=useState("");
    const iconSize=moderateScale(18);
    const textSize=moderateScale(14);
    const [switchChange,setSwitchChange]=useState(true);
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

    const getUserInfo =()=>{
        axios.get(`${BASE_URL}/auth/getInfo`,{
            headers: {
                'Authorization': token.token
              }
        }).then(res=>{
            console.log(res.data);
            setUserInfo(res.data);
            res.data.role == "0" ? setRole('個人') : setRole('商業');
            setRefreshing(false);
        }).catch(e=>{
            console.log(`getInfo error ${e}`);
            setRefreshing(false);
        });
    }

    const onRefresh =useCallback(()=>{ // 避免不必要的渲染使用
        setRefreshing(true);
        getUserInfo();
    },[]);
    //console.log(switchChange);
    return(
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }>

                <View style={styles.infobg}>
                    <Button 
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
                        buttonStyle={styles.infoButtonBottom}
                        icon={<FontAwesomeIcon icon={faIdCard} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>navigation.navigate('UpdateUserRole',{userInfo:userInfo})}
                        title={<>
                                <Text style={{fontSize:textSize}}> 用戶類型</Text>
                                <View style={styles.titleView_4}>
                                    <Text style={styles.leftTitle}>{role}</Text>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>
                    
                    <Button 
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
                        buttonStyle={styles.accountButtonBottom}
                        icon={<FontAwesomeIcon icon={faCloudArrowUp} color="#404496" size={iconSize} style={styles.iconLeft}></FontAwesomeIcon>}
                        titleStyle={styles.buttonTitle}
                        onPress={()=>getFCMToken()}
                        title={<>
                                <Text style={{fontSize:textSize}}>上傳FCM</Text>
                                <View style={styles.titleView_4}>
                                    <FontAwesomeIcon icon={faChevronRight} color="#ECECEC" size={iconSize}></FontAwesomeIcon>
                                </View>
                            </>}>
                    </Button>

                    <Button 
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
        marginTop:moderateScale(50),
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