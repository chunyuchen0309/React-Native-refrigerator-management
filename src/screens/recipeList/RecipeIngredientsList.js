import React, { useEffect, useRef } from "react";
import { View, Button, Image } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBookmark, faCheck, faClock, faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Swipeable } from "react-native-gesture-handler";


const RecipeIngredientsList = (props) => {
    const swipeableRef = useRef(null);

    return (
            <View style={[RecipeListItem.RecipeIngredientsButton]}>
                <View style={[RecipeListItem.recipeIngredientsView,{flex:2}]}>
                    <FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5), }} />
                    <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                    頻果
                    </Text>
                </View>
                <View style={[RecipeListItem.recipeIngredientsView,{marginHorizontal:0}]}>
                    <FontAwesomeIcon icon={faBalanceScale} color="#6D6D6D" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5), }} />
                    <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                        
                    </Text>
                </View>
                <View style={{
                    backgroundColor:'#A7DCFF',
                    width:moderateScale(30),
                    height:moderateScale(30),
                    borderRadius:moderateScale(50),
                    justifyContent:'center',
                    alignItems:'center',
                    alignSelf:'center',
                    marginHorizontal:moderateScale(10),
                }}>
                    <FontAwesomeIcon icon={faCheck} color="#FFFFFF" size={moderateScale(20)}/>
                </View>
                
            </View>
    );
};

export default RecipeIngredientsList;