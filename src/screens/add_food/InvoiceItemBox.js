import React, { useEffect, useRef, useState } from "react";
import { View, Button, Alert, StyleSheet } from "react-native";
import Userstyle from "../../style/UserStyle";
import  Swipeable  from "react-native-gesture-handler/Swipeable";
import { Input, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";

const ItemBox = (props) => {
  const swipeableRef = useRef(null);
  const [modalVisible,setModalVisible]=useState(false);
  const [changeIndex,setChangeIndex]=useState(props.data);

  useEffect(() => {
    setChangeIndex(props.data);
  }, [props.data]); //作用為即時更新選擇的數據，呈現在input之中
  
  const rightSwipe = () => {
    return (
      <TouchableOpacity 
      style={{ flex:1,}}
      >
        <View style={Userstyle.deleteInvoicebox}>
          <FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF"></FontAwesomeIcon>
        </View>
      </TouchableOpacity>
    );
  };
  const leftSwipe = () => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setModalVisible(true);
          
       }} 
       activeOpacity={0.5}   
      >
        <View 
        style={[Userstyle.deleteInvoicebox,{backgroundColor:"#FFAA00",paddingHorizontal:15,}]} 
        >
          <FontAwesomeIcon icon={faPen} color="#FFFFFF" style={{paddingHorizontal:5}}></FontAwesomeIcon>
        </View>
      </TouchableOpacity>
    );
  };
  const changeDone=()=>{
    setModalVisible(false),
    props.changeDone(props.index,changeIndex);
    swipeableRef.current.close();
  }

  return (
    <>
    <Swipeable 
      renderRightActions={rightSwipe}   
      onSwipeableOpen={(directio)=>{if(directio=="right"){swipeableRef.current.close(),props.handleDelete()}}}
      renderLeftActions={leftSwipe}
      overshootLeft={false} 
      ref={swipeableRef} >
        <View style={[Userstyle.listButton,{height:45,marginHorizontal:0}]}>
          <Text style={[Userstyle.listTitle,{textAlign:"left",marginStart:10,paddingTop:10,}]}>
            {props.data}
          </Text>
        </View>
    </Swipeable>

      <Modal 
        animationIn={"zoomIn"}
        animationInTiming={800}
        animationOut={"zoomOut"}
        animationOutTiming={800}
        isVisible={modalVisible}
        backdropOpacity={0.2} 
        onBackdropPress={() => {changeDone()}}
        >
        <TouchableWithoutFeedback onPress={()=>{changeDone()}}>
            <View style={style.modalView}>
              <Input
                label="修改食物名稱"
                labelStyle={Userstyle.lable1}
                containerStyle={Userstyle.containerStyle1}
                inputContainerStyle={Userstyle.inputContainerStyle1}
                inputStyle={Userstyle.inputStyle1}
                value={changeIndex}
                onChangeText={text =>setChangeIndex(text)}
                />
                
            </View>
                
        </TouchableWithoutFeedback>    
      </Modal>
    </>
  );
};
const  style=StyleSheet.create({
  modalView:{
      opacity:1,
      borderRadius:10,
      alignSelf:'center',
      //justifyContent:'center',
      backgroundColor:'#FFFFFF',
      width:280,
      height:200,
  },
  modalTitle:{
      marginVertical:20,
      fontSize:30,
      textAlign:'center',
  },
  modalContent:{
      padding:10,
      lineHeight:30,
      fontSize:18,
      color:'#8D8D8D',
      //textAlign:'center',
  }
})

export default ItemBox;