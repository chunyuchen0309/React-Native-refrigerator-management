import { faNfcSymbol } from "@fortawesome/free-brands-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Alert, SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
const NfcScreen=()=>{
    //NfcManager.start();
    const [hasNfc, setHasNFC ] = useState(null);


    useEffect(() => {
        const checkIsSupported = async () => {
          const deviceIsSupported = await NfcManager.isSupported()
    
          setHasNFC(deviceIsSupported);
          if (deviceIsSupported) {
            await NfcManager.start();
          }else{
            //Alert.alert("此裝置不支援NFC功能");
          }
        }
        checkIsSupported();
      }, [])

    async function readNdef() {
        try {
          // register for the NFC tag with NDEF in it
          await NfcManager.requestTechnology(NfcTech.Ndef);
          // the resolved tag object will contain `ndefMessage` property
          const tag = await NfcManager.getTag();
          Alert.alert(tag);
          //console.warn('Tag found', tag);
        } catch (ex) {
          //console.log('Oops!', ex);
          Alert.alert("error:"+ex);
        } finally {
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
        }
      }
    return(
        
        <SafeAreaView style={styles.safeAreaView}>
            <View style={[styles.infobg,{paddingVertical:20}]}>
                <AnimatedLottieView
                    style={{alignSelf:'center',width:moderateScale(300)}}
                    source={require('../assets/NFC.json')}
                    autoPlay={true}
                    loop={false}>
                        
                </AnimatedLottieView>
                    <View style={{marginVertical:moderateScale(10)}}>
                    </View>
                <Button
                    icon={<FontAwesomeIcon icon={faTag} color="#FFFFFF" size={moderateScale(18)}></FontAwesomeIcon>}
                    buttonStyle={styles.button}
                    title={"掃描NFC"}
                    onPress={()=>{readNdef()}}>
                        
                </Button>
                
            </View>
            
        </SafeAreaView>
           
        
            
    );
};
const styles=StyleSheet.create({
    button:{
        backgroundColor:'#8c9090',
        borderRadius:moderateScale(20),
        marginHorizontal:moderateScale(20),
    },
    safeAreaView:{
        flex:1,
    },
    infobg:{
        backgroundColor:'#E4E4E4',
        marginHorizontal:moderateScale(20),
        marginTop:moderateScale(50),
        borderRadius:moderateScale(20),
    },
});
export default NfcScreen;