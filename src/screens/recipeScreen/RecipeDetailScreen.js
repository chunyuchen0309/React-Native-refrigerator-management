import AnimatedLottieView from "lottie-react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faKeyboard, faQrcode, faStar } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import { useDispatch, useSelector } from "react-redux";
import { ScreenWidth } from "@rneui/base";
import { Image } from "react-native";
import RecipeStyle from "../../style/RecipeStyle";
import { FlashList } from "@shopify/flash-list";
import RecipeIngredientsList from "../recipeList/RecipeIngredientsList";
import RecipeProcedureList from "../recipeList/RecipeProcedureList";
import modal_fab from "../../style/Modal&FAB";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
const RecipeDetailScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const recipeState = useSelector(state => state.repiceInfo);
    const state = useSelector(state => state.userInfo);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [procedureList, setProcedureList] = useState([]);
    const [likeColor, setLikeColor] = useState(false);
    const { lookModel } = useContext(AuthContext);

    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {

            setIngredientsList(recipeState.clickRecipeList.ingredients);
            setProcedureList(recipeState.clickRecipeList.procedureList);
            if (recipeState.likeList?.length > 0) {
                for (var i = 0; i < recipeState.likeList.length; i++) {
                    if (recipeState.likeList[i].id == recipeState.clickRecipeList.id) {
                        setLikeColor(true);
                    }
                }
            }

        }, [])
    );

    useEffect(() => {
        navigation.setOptions(
            {
                headerRight: () => (
                    <TouchableOpacity onPress={() => { changeLike() }}
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`變更喜愛按鈕，目前${likeColor ? '有喜愛' : '無喜愛'}`}
                    >
                        <FontAwesomeIcon icon={faHeart} color={likeColor ? "#FF0000" : "#CCCCCC"} size={moderateScale(30)}></FontAwesomeIcon>
                    </TouchableOpacity>

                ),
            }
        );
    }, [likeColor]);

    console.log('喜愛', likeColor);

    const changeLike = () => {
        console.log("更改like");
        if (likeColor) {
            axios({
                method: "DELETE",
                url: `${BASE_URL}/storage/cookbook/personal`,
                headers: { 'Authorization': state.token },
                data: {
                    "cookbook_id": recipeState.clickRecipeList.id
                },
            }).then(res => {
                console.log("刪除成功", res.data);
                setLikeColor(false);
            }).catch(function (error) {

                console.log(error);

            }).finally(() => {

            });
        } else {
            axios({
                method: "POST",
                url: `${BASE_URL}/storage/cookbook/personal`,
                headers: { 'Authorization': state.token },
                data: {
                    "cookbook_id": recipeState.clickRecipeList.id
                },
            }).then(res => {
                console.log("成功", res.data);
                setLikeColor(true);
            }).catch(function (error) {
                console.log(error);
            }).finally(() => {

            });
        }

    }

    return (

        <SafeAreaView style={styles.safeAreaView}>

            <ScrollView
                bounces={false}
            >
                <Image
                    source={{ uri: `data:image/png;base64,${recipeState.clickRecipeList.image}` }}
                    style={{ height: moderateScale(200), width: ScreenWidth, backgroundColor: 'yellow' }}
                    resizeMode="cover">
                </Image>
                {lookModel ?
                    <>
                        <Text
                            style={RecipeStyle.recipelName}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        >
                            {recipeState.clickRecipeList.name}
                        </Text>
                        <View style={styles.detailGroup}>
                            <View style={[styles.detailView, {}]}>
                                <Text style={styles.detailText}>烹飪時間</Text>
                                <Text style={[styles.detailText, { color: "#404496", top: moderateScale(5) }]}>{recipeState.clickRecipeList.time}分鐘</Text>
                            </View>
                            <View style={[styles.detailView, { borderRightWidth: moderateScale(2), borderLeftWidth: moderateScale(2), borderColor: '#6D6D6D' }]}>
                                <Text style={styles.detailText}>種類</Text>
                                <Text style={[styles.detailText, { color: "#404496", top: moderateScale(5) }]}>{recipeState.clickRecipeList.category_id}</Text>
                            </View>
                            <View style={styles.detailView}>
                                <Text style={styles.detailText}>難易度</Text>

                                <View style={styles.starView}>
                                    {recipeState.clickRecipeList.difficult == '3' ?
                                        <>
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                        </>
                                        : recipeState.clickRecipeList.difficult == '2' ?
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            </>
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            </>
                                    }
                                </View>

                            </View>
                        </View>
                        <Text
                            style={RecipeStyle.recipelTitle}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        >
                            食譜概述
                        </Text>
                        <View style={styles.describeView}>
                            <ScrollView>
                                <Text style={styles.describeText}>
                                    {recipeState.clickRecipeList.describe}
                                </Text>
                            </ScrollView>

                        </View>
                        <Text
                            style={RecipeStyle.recipelTitle}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        >
                            {`所需食材${ingredientsList.reduce((count, obj) => (obj.haveFood ? count + 1 : count), 0)}/${ingredientsList.length}`}
                        </Text>
                        <View style={styles.ingredientsView}>
                            <FlashList
                                data={ingredientsList}
                                estimatedItemSize={60}
                                //showsVerticalScrollIndicator="false"
                                nestedScrollEnabled
                                renderItem={({ item, index }) => {
                                    return (
                                        <RecipeIngredientsList
                                            data={item}
                                            index={index}
                                        >
                                        </RecipeIngredientsList>
                                    )
                                }}
                            />
                        </View>
                        <Text
                            style={RecipeStyle.recipelTitle}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        >
                            烹飪步驟
                        </Text>
                        <View style={styles.procedureView}>
                            <FlashList
                                data={procedureList}
                                estimatedItemSize={60}
                                nestedScrollEnabled
                                //showsVerticalScrollIndicator="false"
                                renderItem={({ item, index }) => {
                                    return (
                                        <RecipeProcedureList
                                            data={item}
                                            index={index}
                                        >
                                        </RecipeProcedureList>
                                    )
                                }}
                            />

                        </View>
                        <Button
                            buttonStyle={RecipeStyle.nextButton}
                            titleStyle={{ fontSize: moderateScale(20), fontWeight: 'bold', }}
                            title={"完成烹飪"}
                            onPress={() => { navigation.navigate("Finished") }}>
                        </Button>
                    </> :
                    <>
                        <Text
                            style={[RecipeStyle.recipelName, { fontSize: moderateScale(30) }]}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityLabel={`食譜名稱為${recipeState.clickRecipeList.name}`}
                        >
                            {recipeState.clickRecipeList.name}
                        </Text>
                        <View style={styles.detailGroup}>
                            <View style={[styles.detailView, {}]}>
                                <Text
                                    style={styles.detailLookText}
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`烹飪時間為${recipeState.clickRecipeList.time}分鐘`}>
                                    烹飪時間
                                </Text>
                                <Text
                                    style={[styles.detailLookText, { color: "#404496", top: moderateScale(5) }]}
                                    accessible={false}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityState={{ disabled: true }}
                                >{recipeState.clickRecipeList.time}分鐘
                                </Text>
                            </View>
                            <View style={[styles.detailView, { borderRightWidth: moderateScale(2), borderLeftWidth: moderateScale(2), borderColor: '#6D6D6D' }]}>
                                <Text
                                    style={styles.detailLookText}
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`食譜種類為${recipeState.clickRecipeList.category_id}`}

                                >種類
                                </Text>
                                <Text
                                    style={[styles.detailLookText, { color: "#404496", top: moderateScale(5) }]}
                                    accessible={false}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityState={{ disabled: true }}>
                                    {recipeState.clickRecipeList.category_id}
                                </Text>
                            </View>
                            <View style={styles.detailView}>
                                <Text style={styles.detailLookText}
                                    accessible={true}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityLabel={`食譜難易度為${recipeState.clickRecipeList.difficult}顆星`}>
                                    難易度
                                </Text>

                                <View style={styles.starView}>
                                    {recipeState.clickRecipeList.difficult == '3' ?
                                        <>
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                        </>
                                        : recipeState.clickRecipeList.difficult == '2' ?
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            </>
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                            </>
                                    }
                                </View>

                            </View>
                        </View>

                        <Text
                            style={[RecipeStyle.recipelTitle, { fontSize: moderateScale(23), }]}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityLabel={`食譜概述${recipeState.clickRecipeList.describe}`}
                        >
                            食譜概述
                        </Text>
                        <View style={styles.describeView}>
                            <ScrollView>
                                <Text
                                    style={[styles.describeText, { fontSize: moderateScale(19), }]}
                                    accessible={false}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityState={{ disabled: true }}>
                                    {recipeState.clickRecipeList.describe}
                                </Text>
                            </ScrollView>

                        </View>
                        <Text
                            style={[RecipeStyle.recipelTitle, { fontSize: moderateScale(23), }]}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityLabel={`所需食材${ingredientsList.length}項食材中有${ingredientsList.reduce((count, obj) => (obj.haveFood ? count + 1 : count), 0)}項`}
                        >
                            {`所需食材${ingredientsList.reduce((count, obj) => (obj.haveFood ? count + 1 : count), 0)}/${ingredientsList.length}`}
                        </Text>
                        <View
                            style={styles.ingredientsView}
                            accessibilityRole={"none"}
                            accessibilityLabel={"食物列表"}>
                            <FlashList

                                data={ingredientsList}
                                estimatedItemSize={60}
                                //showsVerticalScrollIndicator="false"
                                nestedScrollEnabled
                                renderItem={({ item, index }) => {
                                    return (
                                        <RecipeIngredientsList
                                            data={item}
                                            index={index}
                                        >
                                        </RecipeIngredientsList>
                                    )
                                }}
                            />
                        </View>
                        <Text
                            style={[RecipeStyle.recipelTitle, { fontSize: moderateScale(23), }]}
                            accessible={true}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        >
                            烹飪步驟
                        </Text>
                        <View style={styles.procedureView}>
                            <FlashList
                                data={procedureList}
                                estimatedItemSize={60}
                                nestedScrollEnabled
                                //showsVerticalScrollIndicator="false"
                                renderItem={({ item, index }) => {
                                    return (
                                        <RecipeProcedureList
                                            data={item}
                                            index={index}
                                        >
                                        </RecipeProcedureList>
                                    )
                                }}
                            />

                        </View>
                        <Button
                            buttonStyle={RecipeStyle.nextButton}
                            titleStyle={{ fontSize: moderateScale(20), fontWeight: 'bold', }}
                            title={"完成烹飪"}
                            onPress={() => { navigation.navigate("Finished") }}>
                        </Button>
                    </>}

            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create(
    {
        safeAreaView: {
            flex: 1,
        },
        detailGroup: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            //backgroundColor:'#FFC485',
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            paddingVertical: moderateScale(10),
            marginHorizontal: moderateScale(30),
        },
        detailView: {
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        },
        detailText: {
            fontSize: moderateScale(15),
            fontWeight: 'bold',
            lineHeight: moderateScale(20),
            textAlign: 'center',
        },
        detailLookText: {
            fontSize: moderateScale(19),
            fontWeight: 'bold',
            lineHeight: moderateScale(22),
            textAlign: 'center',
        },
        describeView: {
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            //paddingVertical:moderateScale(10),
            marginHorizontal: moderateScale(30),
            padding: moderateScale(10),
            height: moderateScale(100),
        },
        describeText: {
            //backgroundColor:'gray',
            fontSize: moderateScale(17),
            lineHeight: moderateScale(20),
            fontWeight: '500',
            color: '#6D6D6D',
        },
        ingredientsView: {
            height: moderateScale(250),
            marginTop: moderateScale(20),
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            marginHorizontal: moderateScale(30),
        },
        procedureView: {
            height: moderateScale(280),
            marginTop: moderateScale(20),
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            marginHorizontal: moderateScale(30),
            marginBottom: moderateScale(0),
        },
        starView: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            top: moderateScale(5),
        }
    }

);

export default RecipeDetailScreen;