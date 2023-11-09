import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
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
import FinishedFoodList from "../recipeList/FinishedFoodList";
import { deleteFoodApi } from "../../store/foodSlice";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
const FinishedScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const recipeState = useSelector(state => state.repiceInfo);
    const foodState = useSelector(state => state.foodInfo);
    const [ingredientsList, setIngredientsList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useFocusEffect( //載入該頁面時都會重新抓取資料
        React.useCallback(() => {
        }, [])
    );
    useEffect(() => {
        deleteList();
    }, []);

    /**
     * 設置要刪除的食材列表
     */
    const deleteList = () => {
        var foodInfoList = foodState.foodList;
        var recipeNeedFood = recipeState.clickRecipeList.ingredients;
        recipeNeedFood = recipeNeedFood.filter((item, index) => item.haveFood);
        recipeNeedFood = recipeNeedFood.map(item => ({
            ...item,
            select: false, // 添加新的属性并设置为 false
        }));
        setIngredientsList(recipeNeedFood);
        console.log(recipeNeedFood);
    }
    /**
     * 點擊選取或者取消選取
     * @param {*} index 
     * @param {*} item 
     */
    const clickItem = (index, item) => {
        ingredientsList[index].select = !ingredientsList[index].select;
        setIngredientsList([...ingredientsList]);
        console.log(ingredientsList);
    }

    /**
     * 刪除api
     */
    const toDeleteAPI = async () => {
        var filterRecipeFood = ingredientsList
            .filter((item) => item.select === true)
            .map((item) => item.ingredientsName);

        filterRecipeFood = filterRecipeFood.map(item => {
            for (var i = 0; i < foodState.foodList.length; i++) {
                if (foodState.foodList[i].ingredient_orignal_name == item) {
                    return foodState.foodList[i].ingredient_id
                }
            }
        });
        
        for (var j = 0; j < filterRecipeFood.length; j++) {
            await dispatch(deleteFoodApi(filterRecipeFood[j]));
        }
        
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            navigation.navigate("List");
        }, 3000);
        //Alert.alert("刪除成功");
        
        console.log(filterRecipeFood);
    }

    return (

        <SafeAreaView style={styles.safeAreaView}>
            <Modal
                animationIn={"zoomIn"}
                animationInTiming={900}
                animationOut={"zoomOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.6}
                onBackdropPress={() => { setModalVisible(false) }}
            >
                <TouchableWithoutFeedback
                    onPress={() => { setModalVisible(false) }}
                >
                    <View style={styles.modalView}>
                        <AnimatedLottieView
                            style={{ width: moderateScale(500), alignSelf: 'center', paddingEnd: moderateScale(6) }}
                            source={require('../../assets/trash.json')}
                            autoPlay
                            speed={0.5}
                            loop={false}>
                        </AnimatedLottieView>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Text style={styles.title}>冰箱中使用完的食材</Text>
            <View style={styles.ingredients}>
                <FlashList
                    accessibilityRole={"none"}
                    accessibilityLabel={"食材清單列表"}
                    ListEmptyComponent={
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            color: '#6D6D6D',
                            fontWeight: 'bold',
                            fontSize: moderateScale(20),
                        }}>
                            食材清單
                        </Text>
                    }
                    data={ingredientsList}
                    estimatedItemSize={60}
                    renderItem={({ item, index }) => {
                        return (
                            <FinishedFoodList
                                data={item}
                                click={() => clickItem(index, item)}
                                index={index}
                            >
                            </FinishedFoodList>
                        )
                    }}
                />
            </View>
            <Button
                buttonStyle={RecipeStyle.nextButton}
                titleStyle={{ fontSize: moderateScale(20), fontWeight: 'bold', }}
                title={"刪除所選食材"}
                onPress={() => { toDeleteAPI() }}>
            </Button>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create(
    {
        safeAreaView: {
            flex: 1,
        },
        title: {
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#777',
            fontSize: moderateScale(20),
            marginVertical: moderateScale(20),
        },
        ingredients: {
            flex: 1,
            backgroundColor: '#ECEAEA',
            marginHorizontal: moderateScale(30),
            borderRadius: moderateScale(20),
            paddingVertical: moderateScale(20),
            marginTop: moderateScale(10),
        },
        modalView: {
            borderRadius: moderateScale(10),
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width: moderateScale(300),
            height: moderateScale(250),
        },
    }

);

export default FinishedScreen;