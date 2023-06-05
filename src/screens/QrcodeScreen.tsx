import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import QrCodeMask from 'react-native-qrcode-mask';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-elements';

const QrcodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //const id=route.params?.json1.name;
  //console.log(id);
  var repeat = new Set();
  const [scan, setScan] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [result, setResult] = useState(new Set());

  const result_mathod = () => {
    let arr = Array.from(result); //set(）{}轉出為陣列
    let output = arr.join().split('');
    if (output[0] == '*') {
      arr[2] = arr[0];
      arr[0] = arr[1];
      arr[1] = arr[2];
      delete arr[2];
      arr = arr.filter(el => el);
    }
    //console.log(arr.join());
    Alert.alert(arr.join());
    //清空array
    result.clear();
    arr.splice(0, arr.length);
    invoice.splice(0, invoice.length);
  }

  const onSuccess = (e: { data: string; }) => {
    if (result.size != 2) {
      invoice.push(e.data);//= (e.data); //add e.data to paper[]
      invoice.forEach(item => {
        result.has(item) ? repeat.add(item) : result.add(item); //不重複加入
      });
    } else {
      setScan(false);
      console.log("end");
    };
  };

  const tryScan = () => {
    setScan(true);
    this.scanner.reactivate();
  };


  return (
    <SafeAreaView style={{flex:1}}>
    <QRCodeScanner
      onRead={onSuccess}
      ref={(node) => { this.scanner = node }} //編譯錯誤不影響
      cameraStyle={{ height: 350, width: 350,overflow: 'hidden',borderRadius:30,borderWidth:5,borderColor:"#FFA600"}}
      
      containerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center', }}
      showMarker={true}
      reactivate={scan}
      reactivateTimeout={0}
      customMarker={
        <QrCodeMask
          lineDirection='vertical'
          overlayOpacity={0.5}
          height={250}
          edgeBorderWidth={4}
          edgeWidth={25}
          edgeHeight={25}
          lineColor='#FFA600'
          edgeColor='white'
          lineSize={230}
        />
      }
      topContent={
        <Text style={styles.centerText}>QRcode掃描</Text>
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
            onPress={() => result_mathod()}
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
    fontSize: 30,
    marginTop:50,
    //padding: 32,
    color: '#777'
  },
  qrButton: {
    //flex: 1,
    backgroundColor:'#8c9090',
    borderRadius:20,
    marginVertical:2,
    width:200,
    height:50,

  }
});

export default QrcodeScreen;