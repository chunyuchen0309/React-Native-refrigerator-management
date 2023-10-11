import React, { useEffect, useRef } from "react";
import { View, Button, Image, ScrollView, AccessibilityInfo } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBookmark, faClock, faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";


const ProcedureList = (props) => {
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
                accessibilityLabel={`步驟${props.index + 1}為${props.data}`}
            >
            <View style={[RecipeListItem.ProcedureListButton, {}]}>
                <View style={{
                    backgroundColor: '#3E5481',
                    width: moderateScale(25),
                    height: moderateScale(25),
                    borderRadius: moderateScale(50),

                    marginVertical: moderateScale(5),
                }}>
                    <Text style={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        lineHeight: moderateScale(25)
                    }}>
                        {props.index + 1}
                    </Text>
                </View>
                <ScrollView>
                    <Text style={[RecipeListItem.ingredientsViewText, { fontSize: moderateScale(18), }]}>
                        {props.data}
                    </Text>
                </ScrollView>
            </View>
            </TouchableWithoutFeedback>
        </Swipeable>
    );
};

export default ProcedureList;