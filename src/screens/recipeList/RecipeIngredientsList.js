import React, { useContext, useEffect, useRef } from "react";
import { View, Button, Image } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBalanceScale, faBookmark, faCheck, faClock, faHeart, faStar, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swipeable } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";
import { ScrollView } from "react-native";


const RecipeIngredientsList = (props) => {
    const swipeableRef = useRef(null);
    const { lookModel } = useContext(AuthContext);
    return (
        <>
        {lookModel?
        <>
        <View style={[RecipeListItem.RecipeIngredientsButton]}>
            <View style={[RecipeListItem.recipeIngredientsView, { flex: 2 }]}>
                <FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5), }} />
                <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                    {props.data.ingredientsName}
                </Text>
            </View>
            <View style={[RecipeListItem.recipeIngredientsView, { marginHorizontal: 0, maxWidth:moderateScale(100),}]}>
                <FontAwesomeIcon icon={faBalanceScale} color="#6D6D6D" size={moderateScale(20)} style={{ marginHorizontal: moderateScale(5),maxWidth:moderateScale(80) }} />
                <Text style={[RecipeListItem.ingredientsViewText, {}]}>
                    {props.data.ingredientsUnit}
                </Text>
            </View>
            <View style={{
                backgroundColor: props.data.haveFood ?'#27F727':'#F7F7F7',
                width: moderateScale(30),
                height: moderateScale(30),
                borderRadius: moderateScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginHorizontal: moderateScale(10),
            }}>
                {props.data.haveFood ? 
                    <>
                        <FontAwesomeIcon icon={faCheck} color="#F7F7F7" size={moderateScale(20)} />
                    </> :
                    <>
                        <FontAwesomeIcon icon={faXmark} color="#F7F7F7" size={moderateScale(20)} />
                    </>}

            </View>

        </View>
        </>:
        <>
        <View style={[RecipeListItem.RecipeIngredientsButton,{ height:moderateScale(75), }]}
            accessible={true}
            accessibilityRole={"none"}
            accessibilityLabel={`${props.data.ingredientsName}所需用量${props.data.ingredientsUnit}冰箱中${props.data.haveFood?`有`:`沒有`}`}>
            <View style={[RecipeListItem.recipeIngredientsView, { flex: 2 }]}>
                <FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(25)} style={{ marginHorizontal: moderateScale(5), }} />
                <Text 
                style={[RecipeListItem.ingredientsViewText, {fontSize:moderateScale(18),}]}
                ellipsizeMode='tail'
                numberOfLines={2}>
                    {props.data.ingredientsName}
                </Text>
            </View>
            <View style={
                [RecipeListItem.recipeIngredientsView, 
                { marginHorizontal: 0 ,
                maxWidth:moderateScale(100),
                }]}>
                <FontAwesomeIcon icon={faBalanceScale} color="#6D6D6D" size={moderateScale(25)} style={{ marginHorizontal: moderateScale(5), }} />
                
                <Text 
                    style={[RecipeListItem.ingredientsViewText, {fontSize:moderateScale(18),paddingRight:30,maxWidth:moderateScale(80),}]}
                    
                    numberOfLines={2}
                    >
                    {props.data.ingredientsUnit}
                </Text>
                
            </View>
            <View style={{
                backgroundColor: props.data.haveFood ?'#27F727':'#F7F7F7',
                width: moderateScale(35),
                height: moderateScale(35),
                borderRadius: moderateScale(50),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginHorizontal: moderateScale(10),
            }}>
                {props.data.haveFood ? 
                    <>
                        <FontAwesomeIcon icon={faCheck} color="#F7F7F7" size={moderateScale(25)} />
                    </> :
                    <>
                        <FontAwesomeIcon icon={faXmark} color="#F7F7F7" size={moderateScale(25)} />
                    </>}

            </View>

        </View>
        </>
        }
        
        </>
    );
};

export default RecipeIngredientsList;