import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import QrCodeMask from 'react-native-qrcode-mask';
import { useNavigation, useRoute } from '@react-navigation/native';

const QrcodeScreen=()=> {
  const navigation=useNavigation();
  const route= useRoute();
  //const id=route.params?.json1.name;
  //console.log(id);
  var repeat = new Set();
  const [scan, setScan] = useState(true);
  const [invoice,setInvoice]=useState([]);
  const [result,setResult]=useState(new Set());

  const result_mathod=()=>{ 
    let arr = Array.from(result); //set(）{}轉出為陣列
    let output= arr.join().split('');
    if(output[0]=='*'){
      arr[2]=arr[0];
      arr[0]=arr[1];
      arr[1]=arr[2];
      delete arr[2];
      arr=arr.filter(el=>el);
    }
    //console.log(arr.join());
    Alert.alert(arr.join());   
    //清空array
    result.clear();
    arr.splice(0, arr.length);
    invoice.splice(0, invoice.length);
  }

  const onSuccess =(e: { data: string; }) => {
    if(result.size !=2){
      invoice.push(e.data) ;//= (e.data); //add e.data to paper[]
      invoice.forEach(item => {
          result.has(item) ? repeat.add(item) : result.add(item); //不重複加入
      });
    }else{
      setScan(false);
      console.log("end");
    };
  };

  const tryScan = ()=>{
    setScan(true);
    this.scanner.reactivate();
  };

  
return (
<QRCodeScanner
  onRead={onSuccess}
  ref={(node) => { this.scanner = node }} //編譯錯誤不影響
  showMarker={true}
  reactivate={scan}
  reactivateTimeout={0}

  customMarker={
    <QrCodeMask 
    lineDirection='vertical'
    overlayOpacity={0.5}
    height={250}
    edgeBorderWidth={5}
    edgeWidth={25}
    edgeHeight={25}
    lineColor='red'
    edgeColor='white'
    lineSize={230}
    />
  } 
  bottomContent={   
    <>
    <TouchableOpacity style={styles.buttonTouchable} onPress={()=>tryScan() }>
      <Text style={styles.buttonText}>掃描</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonTouchable} onPress={()=>result_mathod()}>
    <Text style={styles.buttonText}>結果</Text>
    </TouchableOpacity>
    </>
    
  }
/>
      
      
      
    );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    borderWidth:3,
    borderRadius:50,
    padding: 16
  }
});

export default QrcodeScreen;