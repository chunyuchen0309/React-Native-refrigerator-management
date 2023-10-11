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


const IngredientsList = (props) => {
    const swipeableRef = useRef(null);
    const rightSwipe = () => {
        return (
            <TouchableOpacity
                style={{ flex: 1, }}
            >
                <View style={RecipeListItem.deleteBox}>
                    <FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF"></FontAwesomeIcon>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <Swipeable
            renderRightActions={rightSwipe}
            onSwipeableOpen={(directio) => { if (directio == "right") { 
                swipeableRef.current.close(), 
                props.handleDelete(),
                AccessibilityInfo.announceForAccessibility("成功刪除") } }}
            overshootLeft={false}
            
            ref={swipeableRef} >
            <TouchableWithoutFeedback
                onLongPress={() => AccessibilityInfo.announceForAccessibility("滑動刪除已開始")}
                accessible={true}
                accessibilityRole={"none"}
                accessibilityLabel={`食材名稱為${props.data.ingredientsName}單位為${props.data.ingredientsUnit}`}
                >
                <View style={[RecipeListItem.ingredientsListButton, { height: moderateScale(70) }]}>
                    <View style={[RecipeListItem.ingredientsView, { marginTop: moderateScale(5), marginBottom: moderateScale(2.5), }]}>
                        <FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5), }} />
                        <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                            {props.data.ingredientsName}
                        </Text>
                    </View>
                    <View style={[RecipeListItem.ingredientsView, { marginTop: moderateScale(2.5), marginBottom: moderateScale(5), }]}>
                        <FontAwesomeIcon icon={faBalanceScale} color="#6D6D6D" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5), }} />
                        <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                            {props.data.ingredientsUnit}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    );
};

export default IngredientsList;