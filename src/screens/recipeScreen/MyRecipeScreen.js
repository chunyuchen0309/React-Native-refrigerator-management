import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Input, } from "react-native-elements";
import { Keyboard } from "react-native";
import { moderateScale } from "../ScaleMethod";
import RecipeList from "../recipeList/RecipeList";
import { FlashList } from "@shopify/flash-list";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const MyRecipeScreen = () => {
    const [filterRepiceInfo, setFilterRepiceInfo] = useState([
        { "name": "義大利麵", "category": '西式', "time": "50", "difficult": '3', "heart": true },
        { "name": "海鮮炒麵", "category": '中式', "time": "30", 'difficult': '1', "heart": true },
        { "name": "肉絲炒飯", "category": '中式', "time": "20", 'difficult': "2", "heart": false }
    ]);
    const bottomSheet = React.useRef(null);
    const [modifySelect, setModifySelect] = useState("");
    const navigation = useNavigation()
    const handClickItem = (index, item) => {
        console.log("我的食譜點擊：", index);
        //console.log("item:",item);
        Alert.alert(filterRepiceInfo[index].name, "", [
            {
                text: '修改',
                onPress: () => bottomSheet.current.expand(),
                style: 'cancel',
            },
            {
                text: '刪除',
                onPress: () => console.log('刪除'),
                style: 'destructive'
            },
        ]);
    }
    useFocusEffect(
        React.useCallback(() => {
            setModifySelect("");
        }, [])
    );

    useEffect(() => {
        //console.log("effect 執行 ",modifySelect);
        if (modifySelect) {
            goModify();
        }
    }, [modifySelect]);

    const goModify = () => {
        switch (modifySelect) {
            case 1:
                navigation.navigate("ModifyStep1");
                break;
            case 2:
                navigation.navigate("ModifyStep2");
                break;
            case 3:
                navigation.navigate("ModifyStep3");
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.repiceList}>
                <FlashList
                accessibilityRole={"none"}
                        accessibilityLabel={"我的食譜列表"}
                    ListEmptyComponent={
                        <Text style={{
                            flex: 1,
                            textAlign: 'center',
                            color: '#6D6D6D',
                            fontWeight: 'bold',
                            fontSize: moderateScale(20),
                        }}>
                            我的食譜列表
                        </Text>
                    }
                    data={filterRepiceInfo}
                    estimatedItemSize={60}
                    renderItem={({ item, index }) => {
                        return (
                            <RecipeList
                                data={item}
                                handleClick={() => handClickItem(index, item)}
                                index={index}
                            >
                            </RecipeList>
                        )
                    }}
                />
            </View>
            <BottomSheet
                backdropComponent={props => (<BottomSheetBackdrop {...props}
                    opacity={0.8}
                    enableTouchThrough={false}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} />)}
                handleStyle={styles.bottomSheetHandle}
                handleIndicatorStyle={{ backgroundColor: "#FFAA00", height: moderateScale(5), width: moderateScale(50), }}
                index={-1}
                snapPoints={['35%']}
                enablePanDownToClose={true}
                ref={bottomSheet}
                overDragResistanceFactor={0}
                detached={true}
            >
                <BottomSheetView>
                    <Text
                        style={[styles.bottomSheetText, { textAlign: 'center', fontSize: moderateScale(20), marginBottom: moderateScale(10), }]}
                        accessibilityRole={"none"}
                        accessibilityLabel={"選擇修改項目"}>
                        選擇修改項目
                    </Text>
                </BottomSheetView>

                <View style={styles.bottomSheetGroup}>
                    <View style={styles.bottomSheetGreyBg}>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"食譜名稱"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(1)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>食譜名稱</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"烹飪時長"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(1)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>烹飪時長</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"食譜概述"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(1)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>食譜概述</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"食譜種類"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(1)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>食譜種類</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"所需食材"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(2)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>所需食材</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"烹飪步驟"}
                            style={[styles.bottomSheetButton, { backgroundColor: '#FFFFFF' }]}
                            onPress={() => setModifySelect(3)}>
                            <Text style={[styles.bottomSheetButtonText, { color: '#3E5481' }]}>烹飪步驟</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    bottomSheetText: {
        color: '#3E5481',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
    },
    bottomSheetGroup: {
        marginHorizontal: moderateScale(20),
    },
    bottomSheetButton: {
        backgroundColor: '#FFFFFF',
        width: moderateScale(100),
        height: moderateScale(50),
        borderRadius: 20,
        marginHorizontal: moderateScale(5),
        marginTop: moderateScale(2.5),
        marginBottom: moderateScale(2.5),
        //alignSelf:'center',
    },
    bottomSheetButtonText: {
        color: '#484848',
        textAlign: 'center',
        flex: 1,
        lineHeight: moderateScale(50),
        fontWeight: 'bold',
    },
    bottomSheetGreyBg: {
        backgroundColor: '#D9D9D9',
        marginVertical: moderateScale(10),
        height: moderateScale(120),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    repiceList: {
        flex: 1,
        backgroundColor: '#ECEAEA',
        //height: verticalScale(320),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(20)
    }
})



export default MyRecipeScreen;