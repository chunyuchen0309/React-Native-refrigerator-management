import React, { useContext, useEffect, useRef } from "react";
import { View, Button, Image } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import RecipeListItem from "../../style/RecipeListItem";
import { moderateScale } from "../ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark, faClock, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";


const RecipeList = (props) => {
    const { lookModel } = useContext(AuthContext);
    return (<>
        {lookModel ?
            <>
                <TouchableOpacity
                    onPress={props.handleClick} //直接呼叫父組件傳遞的函數而不是執行方法
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={`${props.data.name}種類為${props.data.category_id}烹飪時長${props.data.time}分鐘烹飪難易度為${props.data.difficult}顆星`}
                >

                    <View style={[RecipeListItem.listButton,{backgroundColor:props.data.jaccardNumber>0?'#F4FFFF':'#F7F7F7'}]}>
                        <Image
                            //blurRadius={20}
                            defaultSource={require('../../../Img/defaultImage.png')}
                            //src={'https://reactnative.dev/img/tiny_logo.png'}
                            source={{ uri: `data:image/png;base64,${props.data.image}` }}
                            style={RecipeListItem.recipeImg}
                            resizeMode='cover'>
                        </Image>
                        <View style={RecipeListItem.containerGroup}>
                            <View style={RecipeListItem.title_like}>
                                <Text style={[RecipeListItem.recipeTitle,{color:props.data.jaccardNumber>0?'#2C3E7A':'#777'}]}>{props.data.name}</Text>
                                <FontAwesomeIcon icon={faHeart} size={moderateScale(20)} color={props.data.like ? '#FF0000' : '#CCCCCC'} />
                            </View>
                            <View style={RecipeListItem.category_time_difficult}>
                                <FontAwesomeIcon icon={faBookmark} size={moderateScale(15)} color="#6D6D6D" style={{ marginHorizontal: moderateScale(2) }} />
                                <Text style={RecipeListItem.categoryTitle}>{props.data.category_id}</Text>

                                <FontAwesomeIcon icon={faClock} size={moderateScale(15)} color="#6D6D6D" style={{ marginHorizontal: moderateScale(2) }} />
                                <Text style={RecipeListItem.categoryTitle}>{props.data.time}</Text>

                                <View style={RecipeListItem.difficult}>
                                    {props.data.difficult == "3" ?
                                        <>
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                        </>
                                        : props.data.difficult == "2" ?
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                            </> :
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(15)} />
                                            </>}
                                </View>

                            </View>


                        </View>

                    </View>
                </TouchableOpacity>
            </> :
            <>
                <TouchableOpacity
                    onPress={props.handleClick} //直接呼叫父組件傳遞的函數而不是執行方法
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={`${props.data.name}種類為${props.data.category_id}烹飪時長${props.data.time}分鐘烹飪難易度為${props.data.difficult}顆星`}
                >

                    <View style={[RecipeListItem.listButton, { height: moderateScale(110),backgroundColor:props.data.jaccardNumber>0?'#F4FFFF':'#F7F7F7' }]}>
                        <Image
                            //blurRadius={20}
                            defaultSource={require('../../../Img/defaultImage.png')}
                            //src={'https://reactnative.dev/img/tiny_logo.png'}
                            source={{ uri: `data:image/png;base64,${props.data.image}` }}
                            style={[RecipeListItem.recipeImg, { width: moderateScale(100), height: moderateScale(90), }]}
                            resizeMode='cover'>
                        </Image>
                        <View style={RecipeListItem.containerGroup}>
                            <View style={RecipeListItem.title_like}>
                                <Text style={[RecipeListItem.recipeTitle, { fontSize: moderateScale(24),color:props.data.jaccardNumber>0?'#2C3E7A':'#777' }]}>{props.data.name}</Text>
                                <FontAwesomeIcon icon={faHeart} size={moderateScale(25)} color={props.data.like ? '#FF0000' : '#CCCCCC'} />
                            </View>
                            <View style={RecipeListItem.category_time_difficult}>
                                <FontAwesomeIcon icon={faBookmark} size={moderateScale(20)} color="#6D6D6D" style={{ marginHorizontal: moderateScale(2) }} />
                                <Text style={[RecipeListItem.categoryTitle, { fontSize: moderateScale(15), }]}>{props.data.category_id}</Text>

                                <FontAwesomeIcon icon={faClock} size={moderateScale(20)} color="#6D6D6D" style={{ marginHorizontal: moderateScale(2) }} />
                                <Text style={[RecipeListItem.categoryTitle, { fontSize: moderateScale(15), }]}>{props.data.time}</Text>

                                <View style={RecipeListItem.difficult}>
                                    {props.data.difficult == "3" ?
                                        <>
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                        </>
                                        : props.data.difficult == "2" ?
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                            </> :
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" size={moderateScale(20)} />
                                            </>}
                                </View>

                            </View>


                        </View>

                    </View>
                </TouchableOpacity>
            </>
        }


    </>);
};

export default RecipeList;