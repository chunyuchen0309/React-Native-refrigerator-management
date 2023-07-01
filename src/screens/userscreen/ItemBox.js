import React, { useEffect, useRef } from "react";
import { View, Button, Alert } from "react-native";
import Userstyle from "../../style/UserStyle";
import  Swipeable  from "react-native-gesture-handler/Swipeable";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";


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
        style={Userstyle.deletebox}
        //style={{flex:1,justifyContent:'center'}}
        >
          <Text style={Userstyle.deletetext}>刪除</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable 
      renderRightActions={rightSwipe}     
      ref={swipeableRef} >
        <View style={Userstyle.listButton}>
          <Text style={Userstyle.listTitle}>
            {props.data.name}
          </Text>
        </View>
          
        
    </Swipeable>
  );
};

export default ItemBox;