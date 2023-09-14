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
import { all } from "axios";
import { FlashList } from "@shopify/flash-list";
import RefFlashList from "./RefFlashList";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
const RefrigeratorScreen=()=>{
    const navigation=useNavigation();
    const [modalVisible,setModalVisible]=useState(false);
    const {getRefInfoMethod,refInfo}=useContext(AuthContext);
    useFocusEffect( //載入該頁面時都會重新抓取資料
    React.useCallback(()=>{
        getRefInfoMethod();
        },[])
    );
    useEffect(() => { //設置標題右側按鈕
        navigation.setOptions( 
            {
                headerRight: () => (
                <FAB
                icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>}
                size="small"
                placement="right"
                color="#A7DCFF"
                onPress={() => setModalVisible(true)}
                style={modal_fab.headerfab}/>
                ),
            }
        );
    }, []);

    const clickItem=(index)=>{
        console.log("點擊 : ", index);
    }
    
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,height:600,width:ScreenWidth,justifyContent:'center'}}>
            {refInfo.length>0?
                <FlashList
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    data={refInfo}
                    horizontal= {true}
                    estimatedItemSize={900}
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