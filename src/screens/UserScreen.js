import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Switch, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight, faCloudArrowUp, faEnvelope, faList, faLock, faPaperPlane, faPhone, faShare, faShareFromSquare, faSnowflake, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faIdCard,} from "@fortawesome/free-regular-svg-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";

import messaging from '@react-native-firebase/messaging';

const UserScreen=()=>{

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
    const iconSize=18;
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
                                <Text>名稱</Text>
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
                                <Text>電子郵件</Text>
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
                                <Text>電話</Text>
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
                                <Text>修改密碼</Text>
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
                                <Text>用戶類型</Text>
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
                                <Text>你的冰箱</Text>
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
                                <Text>共用請求</Text>
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
                                <Text>查看共用用戶</Text>
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
                                <Text>上傳FCM</Text>
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
                                <Text>登出</Text>
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
        marginHorizontal:20,
        marginTop:50,
        borderRadius:20,
    },
    infoButtontop:{
        height:40,
        justifyContent:'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:20,
        marginTop:50,
        marginBottom:3,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
        borderBottomStartRadius:0,
        borderBottomEndRadius:0,
    },
    infoButtoncenter:{
        height:40,
        justifyContent: 'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:20,
        marginBottom:3,
        borderRadius:0,
    },
    infoButtonBottom:{
        height:40,
        justifyContent: 'flex-start',
        backgroundColor:'#A7DCFF',
        marginHorizontal:20,
        marginBottom:3,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
        borderTopStartRadius:0,
        borderTopEndRadius:0,
    },
    accountButtontop:{
        height:40,
        justifyContent:'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:20,
        marginTop:50,
        marginBottom:3,
        borderTopStartRadius:10,
        borderTopEndRadius:10,
        borderBottomStartRadius:0,
        borderBottomEndRadius:0,
    },
    accountButtoncenter:{
        height:40,
        justifyContent: 'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:20,
        marginBottom:3,
        borderRadius:0,
    },
    accountButtonBottom:{
        height:40,
        justifyContent: 'flex-start',
        backgroundColor:'#95ECFF',
        marginHorizontal:20,
        marginBottom:3,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
        borderTopStartRadius:0,
        borderTopEndRadius:0,
    },

    logoutButton:{
        height:40,
        justifyContent: 'flex-start',
        backgroundColor:'#D9FEAA',
        marginHorizontal:20,
        marginVertical:40,
        //marginBottom:3,
        borderRadius:10,
    },
   
    leftTitle:{
        width:180,
        textAlign:'right',
        //backgroundColor:'black',
        color:'#969696',
        fontSize:15,
    },
    buttonTitle:{
        color:'black',
    },
    titleView:{
        flexDirection:"row",
        width:235,
        justifyContent:'flex-end',
        
    },
    titleView_4:{
        flexDirection:"row",
        width:206,
        justifyContent:'flex-end',
        
    },
    titleView_6:{
        flexDirection:"row",
        width:178,
        justifyContent:'flex-end', 
    },
    iconLeft:{
        marginRight:5,
        marginLeft:5,
    },
    scrollView:{
        justifyContent:'flex-start',
        //alignItems:'center',
        flex:1,
    },
});

export default UserScreen;