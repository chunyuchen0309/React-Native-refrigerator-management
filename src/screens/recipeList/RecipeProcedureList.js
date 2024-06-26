import React, { useContext, useEffect, useRef } from "react";
import { View, Button, Image, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBars, faBookmark, faClock, faHeart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

const RecipeProcedureList = (props) => {
    const { lookModel } = useContext(AuthContext);
    return (
        <>
            {lookModel ?
                <>
                <View style={[RecipeListItem.ModifyProcedureListButton, { marginHorizontal: moderateScale(0), }]}>
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
                        lineHeight: moderateScale(25, 0.45)
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
                </View>
            </View>
                </>
                :
                <>
                <View   
                    style={[RecipeListItem.ModifyProcedureListButton, { marginHorizontal: moderateScale(0),height:moderateScale(130),  }]}
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={`步驟${props.index + 1}為${props.data}`}>
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
                        lineHeight: moderateScale(25, 0.45)
                    }}>
                        {props.index + 1}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>
                    <ScrollView>
                        <Text style={[RecipeListItem.ingredientsViewText, { fontSize: moderateScale(20), }]}>
                            {props.data}
                        </Text>
                    </ScrollView>
                </View>
            </View>
                </>
            }

            
        </>
    );
};

export default RecipeProcedureList;