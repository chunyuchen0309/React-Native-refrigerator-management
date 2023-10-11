import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import RecipeStyle from "../../style/RecipeStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faImage, faStar, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { moderateScale } from "../ScaleMethod";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ModifyStep1Screen = () => {

    const [selectImg, setSelectImg] = useState();
    const [recipeName, setRecipeName] = useState();
    const [recipeTime, setRecipeTime] = useState();
    const [recipeDescribe, setRecipeDescribe] = useState();
    const [recipeCategory, setReciperCategory] = useState([0, "all"]);
    const [recipeDifficult, setReciperDifficult] = useState([0, "all"]);
    const navigation = useNavigation();
    /**
     * 開啟相簿
     */
    const openCamra = async () => {
        var options = {
            mediaType: 'photo',
            includeBase64: 'true',
            includeExtra: 'true',
            storageOptions: {
                path: 'image'
            }
        }
        await launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log("未選擇照片");
            } else {
                setSelectImg(res.assets[0].uri);
            }
        });
    }

    /**
     * 前往下一頁
     */
    const nextPage = () => {
        if (!recipeName || !recipeTime || !recipeCategory || !recipeDifficult || !recipeDescribe) {
            //Alert.alert("請完成所有選項輸入");
            navigation.goBack() //測試時暫時開啟
        } else {
            navigation.goBack()
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ justifyContent: 'flex-start', marginBottom: moderateScale(100) }}>
                <KeyboardAvoidingView behavior="position" >
                    <TouchableOpacity onPress={() => openCamra()}
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"選擇食譜照片按鈕"}>
                        <View style={RecipeStyle.imgView}>
                            {selectImg ?
                                <>
                                    <Image
                                        source={{ uri: selectImg }}
                                        style={{ height: moderateScale(150), width: moderateScale(310) }}
                                        //defaultSource={require('../../../Img/defaultImage.png')}
                                        resizeMode="cover">
                                    </Image>
                                </> :
                                <FontAwesomeIcon icon={faImage} size={moderateScale(80)} color="#777"></FontAwesomeIcon>}
                        </View>
                    </TouchableOpacity>

                    <Text
                        style={RecipeStyle.inputLabel}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                        食物名稱
                    </Text>
                    <Input
                        accessibilityLabel="食譜名稱輸入欄位"
                        accessibilityRole="none"
                        accessible={true}
                        returnKeyType='done'
                        selectionColor='#777'
                        inputContainerStyle={RecipeStyle.input}
                        inputStyle={RecipeStyle.inputText}
                        value={recipeName}
                        onChangeText={(text) => { setRecipeName(text) }}
                        clearButtonMode="while-editing"
                        leftIcon={() => <FontAwesomeIcon icon={faUtensils} size={moderateScale(20)} color="#777" style={{ marginStart: moderateScale(10) }}></FontAwesomeIcon>}
                    />
                    <Text

                        style={RecipeStyle.inputLabel}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                        烹飪時長
                    </Text>
                    <Input
                        accessibilityLabel="烹飪時長輸入欄位"
                        accessibilityRole="none"
                        accessible={true}
                        returnKeyType='done'
                        selectionColor='#777'
                        inputContainerStyle={RecipeStyle.input}
                        inputStyle={RecipeStyle.inputText}
                        inputMode="numeric"
                        value={recipeTime}
                        onChangeText={(text) => { setRecipeTime(text) }}
                        clearButtonMode="while-editing"
                        leftIcon={() => <FontAwesomeIcon icon={faClock} size={moderateScale(20)} color="#777" style={{ marginStart: moderateScale(10) }}></FontAwesomeIcon>}
                    />

                    <Text
                        style={RecipeStyle.inputLabel}
                        accessible={false}
                        accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                        accessibilityState={{ disabled: true }} >
                        食譜概述
                    </Text>
                    <Input
                        accessible={true}
                        accessibilityRole="none"
                        accessibilityLabel="食譜概述輸入欄位"
                        returnKeyType='done'
                        selectionColor='#777'
                        inputContainerStyle={[RecipeStyle.input, { height: moderateScale(100), paddingTop: moderateScale(10) }]}
                        inputStyle={[RecipeStyle.inputText, { padding: moderateScale(10) }]}
                        multiline={true}
                        value={recipeDescribe}
                        onChangeText={(text) => { setRecipeDescribe(text) }}
                        clearButtonMode="while-editing"
                        textAlignVertical='top'
                    />
                    <Text
                        style={RecipeStyle.inputLabel}
                        accessible={true}
                        accessibilityLabel="食譜種類選擇" >
                        食譜種類
                    </Text>

                    <View style={styles.groupButtonBg}>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"中式"}
                            style={[styles.groupButton, { backgroundColor: recipeCategory[0] == 1 ? '#99FF17' : '#ECEAEA' }]}
                            onPress={() => setReciperCategory([1, "chiness"])}>
                            <Text style={[styles.groupButtonText, { color: recipeCategory[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>中式</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"西式"}
                            style={[styles.groupButton, { backgroundColor: recipeCategory[0] == 2 ? '#99FF17' : '#ECEAEA' }]}
                            onPress={() => setReciperCategory([2, "west"])}>
                            <Text style={[styles.groupButtonText, { color: recipeCategory[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>西式</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"韓式"}
                            style={[styles.groupButton, { backgroundColor: recipeCategory[0] == 3 ? '#99FF17' : '#ECEAEA' }]}
                            onPress={() => setReciperCategory([3, "korean"])}>
                            <Text style={[styles.groupButtonText, { color: recipeCategory[0] == 3 ? '#FFFFFF' : '#3E5481' }]}>韓式</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Text
                    style={RecipeStyle.inputLabel}
                    accessible={true}
                    accessibilityLabel="烹飪難易度選擇" >
                    烹飪難易度
                </Text>
                <View style={styles.groupButtonBg}>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"三顆星"}
                        style={[[styles.groupButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: recipeDifficult[0] == 1 ? '#FF0000' : '#ECEAEA' }]]}
                        onPress={() => setReciperDifficult([1, "3"])}>
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"兩顆星"}
                        style={[[styles.groupButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: recipeDifficult[0] == 2 ? '#FF0000' : '#ECEAEA' }]]}
                        onPress={() => setReciperDifficult([2, "2"])}>
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"一顆星"}
                        style={[[styles.groupButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: recipeDifficult[0] == 3 ? '#FF0000' : '#ECEAEA' }]]}
                        onPress={() => setReciperDifficult([3, "1"])}>
                        <FontAwesomeIcon icon={faStar} color="#FFB800" />
                    </TouchableOpacity>
                </View>
                <Button
                    accessible={true}
                    accessibilityRole={"none"}
                    accessibilityLabel={"完成修改按鈕"}
                    buttonStyle={RecipeStyle.nextButton}
                    titleStyle={{ fontSize: moderateScale(20), fontWeight: 'bold', }}
                    title={"完成修改"}
                    onPress={() => nextPage()}>

                </Button>

            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    groupButton: {
        backgroundColor: '#6D6D6D',
        width: moderateScale(80),
        height: moderateScale(50),
        borderRadius: 20,
        marginHorizontal: moderateScale(5),
        //flex:1,
        alignSelf: 'center',
    },
    groupButtonText: {
        color: '#484848',
        textAlign: 'center',
        flex: 1,
        lineHeight: moderateScale(50),
        fontWeight: 'bold',
    },
    groupButtonBg: {
        //backgroundColor:'#D9D9D9',
        marginVertical: moderateScale(10),
        height: moderateScale(60),
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(10),
    },

})


export default ModifyStep1Screen;