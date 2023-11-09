import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Userstyle from "../style/UserStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKeyboard, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
import { useDispatch } from "react-redux";
import { clearList } from "../store/createFoodSlice";
import { getFoodInfo } from "../store/foodSlice";
import { checkToken } from "../store/userSlice";
const PostScreen=()=>{
    const navigation=useNavigation();
    const dispatch =useDispatch();
    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
            dispatch(clearList());
            dispatch(getFoodInfo());
            dispatch(checkToken());
        }, [])
    );

    return(
        
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.infobg}>
                <AnimatedLottieView
                accessible={false}
                accessibilityRole={"none"}
                style={{alignSelf:'center',width:moderateScale(300)}}
                source={require('../assets/package.json')}
                autoPlay={true}
                loop={false}>
                    
                </AnimatedLottieView>
                <Button
                accessible={true}
                accessibilityRole={"none"}
                accessibilityLabel={"前往QRcode掃描發票按鈕"}
                //accessibilityHint={"顯示已過期食物列表按鈕"}
                onPress={()=>{navigation.navigate("Qrcode")}}
                buttonStyle={Userstyle.buttonUpdate}
                titleStyle={{fontSize:moderateScale(20),fontWeight:'500'}}
                title={"QRcode"}
                icon={<FontAwesomeIcon icon={faQrcode} size={moderateScale(20)} color="#FFFFFF" style={{marginHorizontal:moderateScale(5)}}></FontAwesomeIcon>}
                >
                </Button>
                <Button
                accessible={true}
                accessibilityRole={"none"}
                accessibilityLabel={"前往手動新增按鈕"}
                onPress={()=>{navigation.navigate("HandAdd")}}
                buttonStyle={[Userstyle.buttonUpdate,{marginVertical:moderateScale(0),marginBottom:moderateScale(60),}]}
                titleStyle={{fontSize:moderateScale(20),fontWeight:'500'}}
                title={"手動增加"}
                icon={<FontAwesomeIcon icon={faKeyboard} size={moderateScale(20)} color="#FFFFFF" style={{marginHorizontal:moderateScale(5)}}></FontAwesomeIcon>}
                >
                
                </Button>
            </View>
        </SafeAreaView>
           
        
            
    );
};

const styles =StyleSheet.create(
    {
        safeAreaView:{
            flex:1,
        },
        infobg:{
            backgroundColor:'#E4E4E4',
            marginHorizontal:moderateScale(20),
            marginTop:moderateScale(50),
            borderRadius:moderateScale(20),
        },
    }

);

export default PostScreen;