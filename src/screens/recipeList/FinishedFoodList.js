import React, { useEffect, useRef } from "react";
import { View, Button, Image } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBookmark, faClock, faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";
import { AccessibilityInfo } from "react-native";


const FinishedFoodList = (props) => {
    const swipeableRef = useRef(null);
    
    return (
            <TouchableOpacity
                onPress={()=>props.click()}
                accessible={true}
                accessibilityRole={"none"}
                accessibilityLabel={`食材名稱為${props.data.ingredientsName}單位為${props.data.ingredientsUnit}`}
                >
                <View style={[RecipeListItem.ingredientsListButton, { height: moderateScale(70) ,backgroundColor:props.data.select?"#FF9900":"#CECECE"}]}>
                    <View style={[RecipeListItem.ingredientsView, {marginVertical:moderateScale(10)}]}>
                        <FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(25)} style={{ marginHorizontal: moderateScale(5), }} />
                        <Text style={[RecipeListItem.ingredientsViewText, {fontSize:moderateScale(25)}]}>
                            {props.data.ingredientsName}
                        </Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
    );
};

export default FinishedFoodList;