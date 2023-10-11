import AnimatedLottieView from "lottie-react-native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKeyboard, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import { useDispatch } from "react-redux";
import { ScreenWidth } from "@rneui/base";
import { Image } from "react-native";
import RecipeStyle from "../../style/RecipeStyle";
import { FlashList } from "@shopify/flash-list";
import RecipeIngredientsList from "../recipeList/RecipeIngredientsList";
import RecipeProcedureList from "../recipeList/RecipeProcedureList";
const RecipeDetailScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [ingredientsList, setIngredientsList] = useState([1, 2, 3, 4, 5, 6]);
    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {

        }, [])
    );

    return (

        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
                bounces={false}
                
            >
                <Image
                    //source={{ uri: selectImg }}
                    style={{ height: moderateScale(200), width: ScreenWidth, backgroundColor: 'yellow' }}
                    resizeMode="cover">
                </Image>
                <Text
                    style={RecipeStyle.recipelName}
                    accessible={true}
                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                >
                    e.g.食譜名稱
                </Text>
                <View style={styles.detailGroup}>
                    <View style={[styles.detailView, {}]}>
                        <Text style={styles.detailText}>時間</Text>
                        <Text style={[styles.detailText, { color: "#404496", top: moderateScale(5) }]}>30</Text>
                    </View>
                    <View style={[styles.detailView, { borderRightWidth: moderateScale(2), borderLeftWidth: moderateScale(2), borderColor: '#6D6D6D' }]}>
                        <Text style={styles.detailText}>種類</Text>
                        <Text style={[styles.detailText, { color: "#404496", top: moderateScale(5) }]}>西式</Text>
                    </View>
                    <View style={styles.detailView}>
                        <Text style={styles.detailText}>難易度</Text>
                        <Text></Text>
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

                        </Text>
                    </ScrollView>

                </View>
                <Text
                    style={RecipeStyle.recipelTitle}
                    accessible={true}
                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                >
                    所需食材
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
                            data={ingredientsList}
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
                    onPress={() => { }}>
                </Button>
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
            height: moderateScale(200),
            marginTop: moderateScale(20),
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            marginHorizontal: moderateScale(30),
        },
        procedureView: {
            height: moderateScale(210),
            marginTop: moderateScale(20),
            borderBottomWidth: moderateScale(2),
            borderColor: '#6D6D6D',
            marginHorizontal: moderateScale(30),
            marginBottom: moderateScale(0),
        }
    }

);

export default RecipeDetailScreen;