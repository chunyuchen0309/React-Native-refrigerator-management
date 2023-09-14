import React, { useEffect, useState } from 'react';
import { scale, moderateScale, verticalScale} from "./ScaleMethod";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import QrCodeMask from 'react-native-qrcode-mask';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, FAB } from 'react-native-elements';
import modal_fab from '../style/Modal&FAB';
import { Image } from 'react-native';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Modal from "react-native-modal";


const QrcodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const id=route.params?.json1.name;
  //console.log(id);
  var repeat = new Set();
  const [scan, setScan] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [result, setResult] = useState(new Set());
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [modalVisible,setModalVisible]=useState(false);
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
  
  const onSuccess = (e: { data: string; }) => {
    console.log(e.data);
    if (result.size != 2) {
      invoice.push(e.data);//= (e.data); //add e.data to paper[]
      invoice.forEach(item => {
        result.has(item) ? repeat.add(item) : result.add(item); //不重複加入
      });
    } else {
      setScan(false);
      console.log("掃描結束");
      let arr = Array.from(result); //set(）{}轉出為陣列
    console.log(arr);
    let output = arr.join().split('');
    if (output[0] == '*') {
      arr[2] = arr[0];
      arr[0] = arr[1];
      arr[1] = arr[2];
      delete arr[2];
      arr = arr.filter(el => el);
    }
    //console.log(arr);
    var re=/[^\u4e00-\u9fa5]/;
    const s1=arr.join().split(":");
    var s2=[];
    for( let i =0; i<s1.length; i++){
        var chineseRegex = /[\u4e00-\u9fa5]/g;
        var chineseCharacters=s1[i].match(chineseRegex);
        if (chineseCharacters) {
            s2.push(chineseCharacters.join('')) 
          }
    }
    var tempData=[];
    for(let i=0;i<s2.length;i++){
      tempData.push({"OldData":""+s2[i],"NewData":'',})
    }
    setInvoiceInfo({"Number":arr.join().substring(0,10),"Date":""+arr.join().substring(10,17),"Data":tempData,});
    console.log(tempData);
    result.clear();
    arr.splice(0, arr.length);
    invoice.splice(0, invoice.length);
    };
  };

  const tryScan = () => {
    setScan(true);
    this.scanner.reactivate();
  };

  return (
    <SafeAreaView style={{flex:1}}>

    <Modal 
      animationIn={"fadeIn"}
      animationInTiming={800}
      animationOut={"fadeOut"}
      animationOutTiming={800}
      isVisible={modalVisible}
      backdropOpacity={0.9} 
      onBackdropPress={() => setModalVisible(false)}
      >
      <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}>
          <View style={[modal_fab.creatRefModalView,{marginTop:moderateScale(120,0)}]}>            
              <View style={[modal_fab.modalContent,{marginTop:moderateScale(70)}]}>
                  <Text style={[modal_fab.modalTitle,{marginHorizontal:moderateScale(10),marginVertical:moderateScale(0)}]}>
                      將鏡頭對準發票QRcode，震動結束即為掃描成功
                    </Text>
                  <Image source={require('../../Img/arrow_180.png')} resizeMode='contain'></Image>
              </View>
          </View>            
      </TouchableWithoutFeedback>    
    </Modal>

    <QRCodeScanner
      onRead={onSuccess}
      ref={(node) => { this.scanner = node }} //編譯錯誤不影響
      cameraStyle={{ height: moderateScale(350), width: moderateScale(350),overflow: 'hidden',borderRadius:moderateScale(30),borderWidth:moderateScale(5),borderColor:"#FFA600"}}
      containerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', }}
      showMarker={true}
      reactivate={scan}
      reactivateTimeout={0}
      customMarker={
        <QrCodeMask
          lineDirection='vertical'
          overlayOpacity={0}
          height={moderateScale(250)}
          width={moderateScale(250)}
          edgeBorderWidth={moderateScale(4)}
          edgeWidth={moderateScale(25)}
          edgeHeight={moderateScale(25)}
          lineColor='#FFA600'
          edgeColor='white'
          lineSize={moderateScale(230)}
        />
      }
      bottomContent={
        <>  
          <Button
            buttonStyle={styles.qrButton}
            onPress={() => tryScan()}
            title="掃描發票">
          </Button>
          <Button
            buttonStyle={styles.qrButton}
            onPress={() => navigation.navigate('Invoice',{"invoiceData":invoiceInfo})}
            title="掃描結果">
          </Button>
        </>
      }
    />
    </SafeAreaView>


  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: moderateScale(30),
    marginTop:moderateScale(50),
    //padding: 32,
    color: '#777'
  },
  qrButton: {
    //flex: 1,
    backgroundColor:'#8c9090',
    borderRadius:moderateScale(20),
    marginVertical:moderateScale(5),
    width:moderateScale(250),
    height:moderateScale(45),

  }
});

export default QrcodeScreen;