// ChildComponent.js
import React from 'react';
import { TouchableOpacity } from 'react-native';


const InsideButton = ({ index,style, onPress }) => {
  return (
    <TouchableOpacity
        key={index}
        style={style}
        onPress={onPress}
    />
  );
};

export default InsideButton;