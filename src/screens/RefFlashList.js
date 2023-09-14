import React, { useEffect, useRef, useState } from "react";
import { View, Button, Alert, StyleSheet, Vibration, Image } from "react-native";
import { scale, moderateScale, verticalScale} from "./ScaleMethod.js";
import { TouchableOpacity } from "react-native";
import refrigerator from "../style/Refrigerator.js";
import { ScreenWidth } from "@rneui/base";
const RefFlashList = (props) => {
  const swipeableRef = useRef(null);
  const [modalVisible,setModalVisible]=useState(false);
  const [changeIndex,setChangeIndex]=useState(props.data);

    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染
    const [buttonTopDoor,setButtonTopDoor]=useState([]);//上層門分層渲染
    const [buttonDownDoor,setButtonDownDoor]=useState([]);//上層門分層渲染
    const [containerBoxCount,setContainerBoxCount]=useState([])//平面分層數量

    const handleButtonPress =(index,type)=>{
        props.handleClick(index);
        //console.log("內部點擊",index);
    }
  useEffect(() => {  
    console.log("傳入值",props.data);
    RefDropdownSelect();
  }, [props.data]); //作用為即時更新選擇的數據，呈現在input之中

  const renderTopCenter = () => { //冷凍
    var Buttonindex=1;   
    if(props.data.firstType=="cooler"){ 
        Buttonindex=props.data.coolerCount+1;
    }
    return buttonTopCenter.map((_, index) => (
        
      <TouchableOpacity

        key={index}
        style={{flex: 1, backgroundColor: "#416BFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
        //title={`Button ${index + 1}`}
        onPress={() => handleButtonPress(index + Buttonindex,"freezerContainer")}
        
      />
    ));
  };
  
const renderDownCenter = () => { //冷藏
    
    var Buttonindex=1;     
    if(props.data.firstType=="freezer"){ 
        Buttonindex=props.data.freezerCount+1;
    }
    return buttonDownCenter.map((_, index) => (
      <TouchableOpacity
        key={index}
        style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:moderateScale(3),borderRadius:moderateScale(10),}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:moderateScale(3),borderRadius:moderateScale(10),}}
        //title={`Button ${index + 1}`}
        onPress={() => handleButtonPress(index +Buttonindex,"coolerContainer")}
      />
    ));
  };

const renderTopDoor = () => { //冷凍門
    var Buttonindex=1;  
    if(props.data.firstType=="cooler"){ 
        Buttonindex=props.data.coolerDoorCount+1;
    }
    return buttonTopDoor.map((_, index) => (
      <TouchableOpacity
        key={index}
        style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
        //title={`Button ${index + 1}`}
        onPress={() => handleButtonPress(index + Buttonindex,"freezerDoorContainer")}
      />
    ));
  };

const renderDownDoor = () => { //冷藏門
    var Buttonindex=1;
    if(props.data.firstType=="freezer"){ 
        Buttonindex=props.data.freezerDoorCount+1;
    }
    return buttonDownDoor.map((_, index) => (
      <TouchableOpacity
        key={index}
        style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
        //title={`Button ${index + 1}`}
        onPress={() => handleButtonPress(index + Buttonindex,"coolerDoorContainer")}
      />
    ));
  };
const RefDropdownSelect=()=>{ //初始化內部分層格數
    //console.log("冷藏層數",parseInt(props.data.freezerCount));
    var selectedCount = parseInt(props.data.freezerCount);
    setButtonTopCenter(Array(selectedCount).fill(null));
    selectedCount = parseInt(props.data.coolerCount);
    setButtonDownCenter(Array(selectedCount).fill(null));
    selectedCount = parseInt(props.data.freezerDoorCount);
    setButtonTopDoor(Array(selectedCount).fill(null));
    selectedCount = parseInt(props.data.coolerDoorCount);
    setButtonDownDoor(Array(selectedCount).fill(null));
}

    
  return (
    <>
    <View style={{width:ScreenWidth,height:moderateScale(600)}}>
        <View style={style.finalTop}>
            <View style={[refrigerator.finallOutTop]}>
                {renderTopCenter()}
            </View>
            <View style={refrigerator.finallOutDoorTop}>
                {renderTopDoor()}
            </View>
        </View>
        <View style={style.finalDown}>
            <View style={[refrigerator.finallOutBotton]}>
                {renderDownCenter()}   
            </View>
            <View style={refrigerator.finallOutDoorBotton}>
                {renderDownDoor()}
            </View>
        </View>
    </View>
    </>
  );
};
const  style=StyleSheet.create({
  dateIcon:{
    marginTop:moderateScale(5),
    //backgroundColor:"blue",
    marginEnd:moderateScale(5),
  },
  dateText:{
    color:"#777",
    fontSize:""
  },
  iconImg:{
    //flex:1,
    //backgroundColor:"black",
    width:moderateScale(35),
    height:moderateScale(35),
    marginTop:moderateScale(5),
    marginStart:moderateScale(10),
},
finalTop:{
    flexDirection:'row',
    flex:5,
},
finalDown:{
    flexDirection:'row',
    flex:10,
},
})

export default RefFlashList;