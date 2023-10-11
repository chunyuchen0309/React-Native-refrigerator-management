import React, { useEffect, useRef } from "react";
import { View, Button, Image, ScrollView, AccessibilityInfo } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBars, faBookmark, faClock, faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Swipeable } from "react-native-gesture-handler";
import { ScaleDecorator } from "react-native-draggable-flatlist";


const ModifyProcedureList = (props) => {
    const swipeableRef = useRef(null);
    const rightSwipe = () => {
        return (
            <TouchableOpacity
                style={{ flex: 1, }}
            >
                <View style={[RecipeListItem.deleteBox, { marginHorizontal: moderateScale(10) }]}>
                    <FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF"></FontAwesomeIcon>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <ScaleDecorator activeScale={1.05}>
            <Swipeable
                renderRightActions={rightSwipe}
                onSwipeableOpen={(directio) => { if (directio == "right") { 
                    swipeableRef.current.close(), 
                    props.handleDelete(),
                    AccessibilityInfo.announceForAccessibility("成功刪除") } }}
                overshootLeft={false}
                ref={swipeableRef} >
                <TouchableOpacity 
                    onLongPress={props.drag} 
                    onPress={props.handleClick} 
                    style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={`步驟${props.index + 1}為${props.data}`}>
                    <View style={[RecipeListItem.ModifyProcedureListButton, { backgroundColor: props.isActive ? '#FFC485' : '#F7F7F7' }]}>
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
                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                            <ScrollView>
                                <Text style={[RecipeListItem.ingredientsViewText, { fontSize: moderateScale(18), }]}>
                                    {props.data}
                                </Text>
                            </ScrollView>
                            <View style={{ marginHorizontal: moderateScale(2), marginTop: moderateScale(5) }}>
                                <FontAwesomeIcon icon={faBars} size={moderateScale(30)} color="#6D6D6D"></FontAwesomeIcon>
                            </View>

                        </View>


                    </View>

                </TouchableOpacity>

            </Swipeable>
        </ScaleDecorator>
    );
};

export default ModifyProcedureList;