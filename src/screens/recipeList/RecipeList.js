import React, { useEffect, useRef } from "react";
import { View, Button, Image } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faClock, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";


const RecipeList = (props) => {
  
  return (
    <TouchableOpacity 
        onPress={props.handleClick} //直接呼叫父組件傳遞的函數而不是執行方法
        >
        
        <View style={RecipeListItem.listButton}>
        <Image
            
            defaultSource={require('../../../Img/defaultImage.png')}
            //src={'https://reactnative.dev/img/tiny_logo.png'}
            //source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}
            style={RecipeListItem.recipeImg}
            resizeMode='contain'>
        </Image>
        <View style={RecipeListItem.containerGroup}>
            <View style={RecipeListItem.title_like}>
                <Text style={RecipeListItem.recipeTitle}>{props.data.name}</Text>
                <FontAwesomeIcon icon={faHeart} size={moderateScale(20)} color={props.data.heart?'#FF0000':'#CCCCCC'}/>
            </View>
            <View style={RecipeListItem.category_time_difficult}>
                <FontAwesomeIcon icon={faBookmark} size={moderateScale(15)} color="#6D6D6D" style={{marginHorizontal:moderateScale(2)}}/>
                <Text style={RecipeListItem.categoryTitle}>{props.data.category}</Text>
                
                <FontAwesomeIcon icon={faClock} size={moderateScale(15)} color="#6D6D6D" style={{marginHorizontal:moderateScale(2)}}/>
                <Text style={RecipeListItem.categoryTitle}>{props.data.time}</Text>
                
                <View style={RecipeListItem.difficult}>
                {props.data.difficult =="3"?
                <>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                </>
                :props.data.difficult =="2"?
                <>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                </>:
                <>
                    <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)}/>
                </>}
                </View>
                
            </View>
                
                
        </View>
            
        </View>  
    </TouchableOpacity>
  );
};

export default RecipeList;