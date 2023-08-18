import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Userstyle from "../style/UserStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKeyboard, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
const PostScreen=()=>{
    const navigation=useNavigation()
    return(
        
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.infobg}>
                <AnimatedLottieView
                style={{alignSelf:'center',width:moderateScale(300)}}
                source={require('../assets/package.json')}
                autoPlay={true}
                loop={false}>
                    
                </AnimatedLottieView>
                <Button
                onPress={
                    ()=>{navigation.navigate("Qrcode")}}
                buttonStyle={Userstyle.buttonUpdate}
                titleStyle={{fontSize:moderateScale(17)}}
                title={"QRcode"}
                icon={<FontAwesomeIcon icon={faQrcode} size={moderateScale(20)} color="#FFFFFF" style={{marginHorizontal:moderateScale(5)}}></FontAwesomeIcon>}
                >
                </Button>
                <Button
                onPress={()=>{navigation.navigate("HandAdd")}}
                buttonStyle={[Userstyle.buttonUpdate,{marginVertical:moderateScale(0),marginBottom:moderateScale(60),}]}
                titleStyle={{fontSize:moderateScale(17)}}
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