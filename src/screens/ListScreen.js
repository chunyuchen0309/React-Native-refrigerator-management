import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Input, SearchBar, SpeedDial, Text } from "react-native-elements";
import { create } from "react-test-renderer";
import { moderateScale } from "./ScaleMethod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faLayerGroup, faPen, faRotate, faScroll, faSearch, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import Userstyle from "../style/UserStyle";
import { TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal, PortalHost } from "@gorhom/portal";
import { FlashList } from "@shopify/flash-list";
import RecipeList from "./recipeList/RecipeList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TestExtend from "./TestExtend";

const ListScreen = () => {
    const navigation = useNavigation()
    const [searchInput, setSearchInput] = useState("");
    const bottomSheet = React.useRef(null);
    const [filterDate, setFilterDate] = useState([0, "all"]);
    const [filterCategory, setFilterCategory] = useState([0, "all"]);
    const [filterRecommend, setFilterRecommend] = useState([0, "all"]);
    const [filterDifficult, setFilterDifficult] = useState([0, "all"]);
    const [speedDialopen, setSpeedDialOpen] = useState(false);
    const [filterRepiceInfo, setFilterRepiceInfo] = useState([{ "name": "義大利麵", "category": '西式', "time": "50", "difficult": '3', "heart": true }, { "name": "海鮮炒麵", "category": '中式', "time": "30", 'difficult': '1', "heart": true }, { "name": "肉絲炒飯", "category": '中式', "time": "20", 'difficult': "2", "heart": false }]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // Do something when the screen blurs
            setSpeedDialOpen(false);
        });
        return unsubscribe;
    }, [navigation]);

    const handClickItem = (index,item) => {
        console.log("食譜點擊",index);
        //navigation.navigate("RecipeDetail");
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topBg}>
                <View style={{ flexDirection: 'row', flexWrap: 'nowrap', }}>
                    <Input
                        accessible={true}
                        accessibilityLabel="食譜名稱搜尋"
                        accessibilityRole="none"
                        returnKeyType='search'
                        selectionColor='#777'
                        containerStyle={{ flex: 1 }}
                        inputContainerStyle={[Userstyle.searchInput, { marginRight: 0 }]}
                        inputStyle={Userstyle.inputStyle1}
                        value={searchInput}
                        onChangeText={(text) => { setSearchInput(text) }}
                        clearButtonMode="while-editing"
                        leftIcon={() => <FontAwesomeIcon icon={faSearch} size={moderateScale(20)} color="#777" style={{ marginStart: moderateScale(10) }}></FontAwesomeIcon>}
                    />

                    <TouchableOpacity
                        style={{ marginRight: moderateScale(20) }}
                        onPressIn={() => bottomSheet.current.expand()}
                        accessible={true}
                        accessibilityLabel="篩選列表按鈕"
                        accessibilityRole="none">
                        <FontAwesomeIcon icon={faBars} size={moderateScale(35)} style={{ marginTop: moderateScale(5) }} color="#2E3E5C"></FontAwesomeIcon>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.repiceList}>
                <FlashList
                    accessibilityRole={"none"}
                    accessibilityLabel={"食譜列表"}
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
            {Platform.OS === 'android' ?
                <>
                    <SpeedDial
                        isOpen={speedDialopen}
                        icon={<FontAwesomeIcon icon={faLayerGroup} color="#FF9900" size={moderateScale(30)} />}
                        openIcon={<FontAwesomeIcon icon={faXmark} color="#FF9900" size={moderateScale(40)} />}
                        onOpen={() => setSpeedDialOpen(!speedDialopen)}
                        onClose={() => setSpeedDialOpen(!speedDialopen)}
                        buttonStyle={{
                            backgroundColor: '#CAC8C8',
                            borderRadius: moderateScale(50),
                        }}
                        backdropPressableProps
                        transitionDuration='100'
                        size='large'
                        style={{ paddingBottom: moderateScale(100) }}
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"開啟前往我的食譜頁面或新增食譜頁面選單按鈕"}
                    >
                        <SpeedDial.Action
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往新增食譜頁面按鈕"}
                            icon={<FontAwesomeIcon icon={faPen} color="#FF9900" size={moderateScale(20)} />}
                            title={
                                <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}>
                                    新增食譜
                                </Text>
                            }
                            titleStyle={{}}
                            buttonStyle={{
                                backgroundColor: '#ECEAEA',
                                height: moderateScale(55),
                                width: moderateScale(55),
                                borderRadius: moderateScale(50),
                            }}
                            onPress={() => navigation.navigate('createStep1')}
                        />
                        <SpeedDial.Action
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往我的食譜頁面按鈕"}
                            icon={<FontAwesomeIcon icon={faScroll} color="#FF9900" size={moderateScale(20)} />}
                            title={
                                <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}>
                                    我的食譜
                                </Text>
                            }
                            buttonStyle={{
                                backgroundColor: '#ECEAEA',
                                height: moderateScale(55),
                                width: moderateScale(55),
                                borderRadius: moderateScale(50),
                            }}
                            onPress={() => navigation.navigate('MyRecipe')}
                        />
                    </SpeedDial>
                </>
                :
                <>
                    <SpeedDial
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={"開啟前往我的食譜頁面或新增食譜頁面選單按鈕"}
                        isOpen={speedDialopen}
                        icon={<FontAwesomeIcon icon={faLayerGroup} color="#FF9900" size={moderateScale(30)} />}
                        openIcon={<FontAwesomeIcon icon={faXmark} color="#FF9900" size={moderateScale(40)} />}
                        onOpen={() => setSpeedDialOpen(!speedDialopen)}
                        onClose={() => setSpeedDialOpen(!speedDialopen)}

                        buttonStyle={{
                            backgroundColor: '#CAC8C8',
                            height: moderateScale(70),
                            width: moderateScale(70),
                            borderRadius: moderateScale(50),
                            borderColor: 'transparent',
                            borderWidth: 0,
                        }}
                        backdropPressableProps
                        transitionDuration='100'
                        size='large'
                        style={{ paddingBottom: moderateScale(100) }}
                    >
                        <SpeedDial.Action
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往新增食譜頁面按鈕"}
                            icon={<FontAwesomeIcon icon={faPen} color="#FF9900" size={moderateScale(20)} />}
                            title={
                                <View style={{ backgroundColor: '#ECEAEA', paddingHorizontal: moderateScale(20), paddingVertical: moderateScale(10), borderRadius: moderateScale(10), alignContent: 'flex-end' }}>
                                    <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}>
                                        新增食譜
                                    </Text>
                                </View>
                            }
                            titleStyle={{ backgroundColor: 'transparent', left: moderateScale(20), top: moderateScale(10) }}
                            buttonStyle={{
                                backgroundColor: '#ECEAEA',
                                height: moderateScale(55),
                                width: moderateScale(55),
                                borderRadius: moderateScale(50),
                            }}
                            onPress={() => navigation.navigate('createStep1')}
                        />
                        <SpeedDial.Action
                            accessible={true}
                            accessibilityRole={"none"}
                            accessibilityLabel={"前往我的食譜頁面按鈕"}
                            icon={<FontAwesomeIcon icon={faScroll} color="#FF9900" size={moderateScale(20)} />}
                            title={
                                <View style={{ backgroundColor: '#ECEAEA', paddingHorizontal: moderateScale(20), paddingVertical: moderateScale(10), borderRadius: moderateScale(10), alignContent: 'flex-end' }}>
                                    <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}>
                                        我的食譜
                                    </Text>
                                </View>
                            }
                            titleStyle={{ backgroundColor: 'transparent', left: moderateScale(20), top: moderateScale(10) }}
                            buttonStyle={{
                                backgroundColor: '#ECEAEA',
                                height: moderateScale(55),
                                width: moderateScale(55),
                                borderRadius: moderateScale(50),
                            }}
                            onPress={() => navigation.navigate('MyRecipe')}
                        />
                    </SpeedDial>
                </>}

            <Portal>
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
                    snapPoints={['60%']}
                    enablePanDownToClose={true}
                    ref={bottomSheet}
                    overDragResistanceFactor={0}
                    detached={true}
                >
                    <BottomSheetView>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={[styles.bottomSheetText, { textAlign: 'center', fontSize: moderateScale(20), marginBottom: moderateScale(10), paddingLeft: moderateScale(25),lineHeight:moderateScale(25)}]}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }}
                            >
                                搜尋篩選
                            </Text>
                            <TouchableOpacity
                                onPress={() => { setFilterCategory([0, "all"]), setFilterRecommend([0, "all"]), setFilterDifficult([0, "all"]) ,setFilterDate([0,"all"])}}>
                                <FontAwesomeIcon icon={faRotate} size={moderateScale(23)} style={{ left: moderateScale(100) }} color="#2E3E5C" />
                            </TouchableOpacity>
                        </View>
                    </BottomSheetView>

                    <View style={styles.bottomSheetGroup}>
                        <Text style={[styles.bottomSheetText, { marginStart: moderateScale(5), }]}
                            accessible={true}
                            accessibilityLabel="食材過期日期">食材過期日期</Text>
                        <View style={styles.bottomSheetGreyBg}>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"全部"}
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterDate[0] == 0 ? '#A2EDFC' : '#FFFFFF' }]}
                                onPress={() => setFilterDate([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"喜愛"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 1 ? '#A2EDFC' : '#FFFFFF' }]}
                                onPress={() => setFilterDate([1, "0"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>當天</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"過期日期"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 2 ? '#A2EDFC' : '#FFFFFF' }]}
                                onPress={() => setFilterDate([2, "1"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>一天</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"烹飪時長"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 3 ? '#A2EDFC' : '#FFFFFF' }]}
                                onPress={() => setFilterDate([3, "2"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 3 ? '#FFFFFF' : '#3E5481' }]}>兩天~三天</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.bottomSheetGroup}>
                        <Text style={[styles.bottomSheetText, { marginStart: moderateScale(5), }]}
                            accessible={true}
                            accessibilityLabel="食譜種類選擇">
                            種類
                        </Text>
                        <View style={styles.bottomSheetGreyBg}>

                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"全部"}
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterCategory[0] == 0 ? '#EF8337' : '#FFFFFF' }]}
                                onPress={() => setFilterCategory([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"中式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 1 ? '#EF8337' : '#FFFFFF' }]}
                                onPress={() => setFilterCategory([1, "chiness"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>中式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"西式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 2 ? '#EF8337' : '#FFFFFF' }]}
                                onPress={() => setFilterCategory([2, "west"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>西式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"韓式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 3 ? '#EF8337' : '#FFFFFF' }]}
                                onPress={() => setFilterCategory([3, "korean"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 3 ? '#FFFFFF' : '#3E5481' }]}>韓式</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.bottomSheetGroup}>
                        <Text style={[styles.bottomSheetText, { marginStart: moderateScale(5), }]}
                            accessible={true}
                            accessibilityLabel="推薦方式選擇">推薦方式</Text>
                        <View style={styles.bottomSheetGreyBg}>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"全部"}
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterRecommend[0] == 0 ? '#99FF17' : '#FFFFFF' }]}
                                onPress={() => setFilterRecommend([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"喜愛"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterRecommend[0] == 1 ? '#99FF17' : '#FFFFFF' }]}
                                onPress={() => setFilterRecommend([1, "like"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>喜愛</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"烹飪時長"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterRecommend[0] == 3 ? '#99FF17' : '#FFFFFF' }]}
                                onPress={() => setFilterRecommend([3, "time"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 3 ? '#FFFFFF' : '#3E5481' }]}>烹飪時長</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"過期日期"}
                                style={[styles.bottomSheetButton, { backgroundColor: "#D9D9D9" }]}
                                onPress={() => setFilterRecommend([2, "date"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 2 ? '#FFFFFF' : '#3E5481' }]}></Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.bottomSheetGroup}>
                        <Text style={[styles.bottomSheetText, { marginStart: moderateScale(5), }]}
                            accessible={true}
                            accessibilityLabel="烹飪難易度選擇"
                        >難易度</Text>
                        <View style={styles.bottomSheetGreyBg}>
                            <TouchableOpacity
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterDifficult[0] == 0 ? '#FF0000' : '#FFFFFF' }]}
                                onPress={() => setFilterDifficult([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDifficult[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"三顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 1 ? '#FF0000' : '#FFFFFF' }]]}
                                onPress={() => setFilterDifficult([1, "3"])}>
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"兩顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 2 ? '#FF0000' : '#FFFFFF' }]]}
                                onPress={() => setFilterDifficult([2, "2"])}>
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"一顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 3 ? '#FF0000' : '#FFFFFF' }]]}
                                onPress={() => setFilterDifficult([3, "1"])}>
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            </Portal>
            <PortalHost name="custom_host" />
        </View>
    );
};

const styles = StyleSheet.create({
    topBg: {
        backgroundColor: '#E4E4E4',
        borderBottomRightRadius: moderateScale(20),
        borderBottomStartRadius: moderateScale(20),
        paddingTop: moderateScale(60),
        zIndex: 0,
    },
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
        width: moderateScale(80),
        height: moderateScale(50),
        borderRadius: 20,
        marginHorizontal: moderateScale(5),
        flex: 1,
        alignSelf: 'center',
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
        height: moderateScale(60),
        flexDirection: 'row',
        flexWrap: 'nowrap',
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(10),
    },
    bottomSheetCircleButtton: {
        borderRadius: 50,
        width: moderateScale(50),
        height: moderateScale(50),
        marginHorizontal: moderateScale(5),
        alignSelf: 'center',
    },
    repiceList: {
        flex: 1,
        backgroundColor: '#ECEAEA',
        //height: verticalScale(320),
        marginHorizontal: moderateScale(20),
        borderRadius: moderateScale(20),
        paddingVertical: moderateScale(20),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(120)
    }
})

export default ListScreen;