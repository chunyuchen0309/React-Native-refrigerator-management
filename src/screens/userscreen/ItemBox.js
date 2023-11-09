import React, { useEffect, useRef } from "react";
import { View, Button, Alert } from "react-native";
import Userstyle from "../../style/UserStyle";
import  Swipeable  from "react-native-gesture-handler/Swipeable";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const ItemBox = (props) => {
  const swipeableRef = useRef(null);

  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => {
        props.handleDelete();
        swipeableRef.current.close();
      }} activeOpacity={0.5}
      //style={{ flex:1,justifyContent:'center'}}
      >
        <View 
        style={[Userstyle.deletebox,{height:moderateScale(45),}]}
        //style={{flex:1,justifyContent:'center'}}
        >
          <FontAwesomeIcon icon={faTrash} color="#FFFFFF" size={moderateScale(25)}></FontAwesomeIcon>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable 
      overshootRight={false}
      renderRightActions={rightSwipe}     
      ref={swipeableRef} >
        <View style={[Userstyle.listButton,{height:moderateScale(45),}]}>
          <Text style={[Userstyle.listTitle,{fontSize:moderateScale(23),lineHeight:moderateScale(35),fontWeight:'500',color:"#777",}]}>
            {props.data.name}
          </Text>
        </View>
          
        
    </Swipeable>
  );
};

export default ItemBox;