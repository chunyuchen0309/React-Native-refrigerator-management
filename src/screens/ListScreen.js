import React, { useCallback, useEffect, useState } from "react";
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
import { getRepiceInfo, getRepiceLikeInfo, setClickRecipe, setLikeToList } from "../store/repiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { RefreshControl } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config";
import { checkToken } from "../store/userSlice";

const ListScreen = () => {
    const navigation = useNavigation()
    const [searchInput, setSearchInput] = useState("");
    const [refresh, setRefresh] = useState(false);
    const bottomSheet = React.useRef(null);
    const [filteredFoodInfo, setFilteredFoodInfo] = useState([]);
    const [filterDate, setFilterDate] = useState([0, "all"]);
    const [filterCategory, setFilterCategory] = useState([0, "all"]);
    const [filterRecommend, setFilterRecommend] = useState([0, "all"]);
    const [filterDifficult, setFilterDifficult] = useState([0, "all"]);
    const [speedDialopen, setSpeedDialOpen] = useState(false);
    const [filterRecipeInfo, setFilterRecipeInfo] = useState([]);
    const recipeState = useSelector(state => state.repiceInfo);
    const foodState = useSelector(state => state.foodInfo);
    var jaccard = require('jaccard');
    const [JFilterRecipe, setJFilterRecipe] = useState([]);
    const [clearEffects, setClearEffects] = useState(true);
    const dispatch = useDispatch();
    
    const state = useSelector(state => state.userInfo);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setSpeedDialOpen(false);//離開頁面觸發

            setFilterDate([0, "all"]);
            setFilterCategory([0, "all"]);
            setFilterRecommend([0, "all"]);
            setFilterDifficult([0, "all"]);
            setClearEffects(false);
        });
        return unsubscribe;
    }, [navigation]);

    useFocusEffect(  //進入頁面獲取食譜資訊

        React.useCallback(() => {
            async function fetchData() {
                
                await dispatch(getRepiceLikeInfo());
                console.log(1);
                await dispatch(getRepiceInfo());
                await dispatch(setLikeToList());
                console.log(2);
                dispatch(checkToken());
            }
            setClearEffects(true)
            fetchData();
            
            //getLike();
        }, [])
    );

    const getLike=()=>{
        console.log('喜愛獲得api')
        axios({
            method: "GET",
            url: `${BASE_URL}/storage/cookbook/personal`,
            headers: { 'Authorization': state.token },
            
        }).then(res => {
            console.log(res.data);
        }).catch(function (error){
            console.log(error);
        }).finally(() => {
            //navigation.goBack();
        });
    }

    useEffect(() => { //有資料且正確載入
        var tempRepiceList=recipeState.repiceList;
        if (recipeState.repiceList.length > 0) {
            console.log("首次存入食譜資訊");
            
            calculateFoodInfoDate();
            setFilterRecipeInfo(recipeState.repiceList);

        }
    }, [recipeState.repiceList]);

    useEffect(() => { //更改判斷日期的篩選監聽
        if (recipeState.repiceList.length > 0 && clearEffects) {
            calculateFoodInfoDate();
        }
    }, [filterDate]);

    useEffect(() => {//上拉選單篩選方法
        //console.log("傳入的食譜list", JFilterRecipe);
        var tempList = JFilterRecipe;
        if (recipeState.repiceList.length > 0 && clearEffects) {
            if (filterCategory[1] == "all") {
                //console.log(`1篩選種類為${filterCategory[1]}:`, tempList);
            } else {
                tempList = tempList.filter((item) => item.category_id === filterCategory[1]);
                //console.log(`篩選種類為${filterCategory[1]}:`, tempList);
            }
            if (filterRecommend[1] == "all") {
                //console.log("1篩選推薦方式為all:", tempList);
            } else {
                //console.log(`篩選推薦方式為${filterRecommend[1]}:`, tempList);
                const sortedList = [...tempList]; // 创建副本
                switch (filterRecommend[1]) {
                    case "like":
                        tempList=tempList.filter((item) => item.like==true);
                        break;
                    case "timeLong":
                        sortedList.sort((a, b) => b.time - a.time);
                        tempList = sortedList;
                        break;
                    case "timeShort":
                        sortedList.sort((a, b) => a.time - b.time);
                        tempList = sortedList;
                        break;
                }
                
            }

            if (filterDifficult[1] == "all") {
                //console.log("1篩選難度為all:", tempList);
            } else {
                tempList = tempList.filter((item) => item.difficult === filterDifficult[1]);
                //console.log(`篩選難度為${filterDifficult[1]}:`, tempList);
            }

            if (searchInput.length > 0) {
                tempList = tempList.filter((item, index) => {
                    var str = "" + item.name;
                    if (str.includes(searchInput)) {
                        return true;
                    }
                });
            }
        }
        console.log("最終食譜", tempList);
        setFilterRecipeInfo(tempList);
    }, [filterCategory, JFilterRecipe, filterDifficult, filterRecommend, searchInput]);

    useEffect(() => {

        calculateJaccard();

    }, [filteredFoodInfo]);

    /**
     * Jaccard計算
     */
    const calculateJaccard = () => {
        console.log("Jaccard 篩選的食材：",filteredFoodInfo);
        var tempFoodList = [];
        var tempJRecipeList = [];
        if (recipeState.repiceList.length > 0) {
            tempFoodList = filteredFoodInfo.map((item, index) => {
                return item.ingredient_orignal_name
            });
            tempJRecipeList = recipeState.repiceList.map(recipeItem => {
                var tempRecipeList = recipeItem.needFoodList;
                var jaccardNumber = jaccard.index(tempRecipeList, tempFoodList);
                //console.log("jaccard:", jaccardNumber);
                return {
                    ...recipeItem, // Copy existing properties
                    jaccardNumber: jaccardNumber // Add the new property
                };
            });
            tempJRecipeList.sort((a, b) => b.jaccardNumber - a.jaccardNumber);
            setJFilterRecipe(tempJRecipeList);
            console.log("篩選後的J食譜: ", tempJRecipeList);
            console.log("篩選後的我的食材: ", tempFoodList);
        }

    }

    /**
     * 食物日期選擇後篩選
     */
    const calculateFoodInfoDate = () => {
        //console.log("calculateFoodInfoDat執行");
        switch (filterDate[1]) {
            case "all":
                //console.log("篩選食物日期all");
                var tempFoodList = foodState.foodList.filter((item) => item.day > -1);
                setFilteredFoodInfo([...tempFoodList]);
                break;
            case '0':
                //console.log("篩選食物日期0");
                setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 0));
                break;
            case '1':
                //console.log("篩選食物日期1");
                setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 1 || item.day == 0));
                break;
            case '2':
                //console.log("篩選食物日期2");
                setFilteredFoodInfo(foodState.foodList.filter(item => item.day == 3 || item.day == 2 || item.day == 1 || item.day == 0));
                break;
        }
    }

    /**
     * 點擊回傳，前往下一頁
     * @param {*} index 
     * @param {*} item 
     */
    const handClickItem = (index, item) => {
        console.log("食譜點擊", index);
        dispatch(setClickRecipe(item));
        navigation.navigate("RecipeDetail");
    }

    /**
     * 重新Refresh食譜資料
     */
    const onRefresh = useCallback(async () => { // 避免不必要的渲染使用
        setRefresh(true);
        await dispatch(getRepiceInfo());
        setRefresh(false);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.topBg, { paddingTop: Platform.OS === 'android' ? moderateScale(30) : moderateScale(60) }]}>
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
                    refreshControl={
                        <RefreshControl refreshing={refresh} onRefresh={onRefresh} style={{}} />
                    }
                    accessibilityRole={"none"}
                    accessibilityLabel={"食譜列表"}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: moderateScale(20), fontWeight: '500', color: "#777" }}>正在載入食譜列表</Text>}
                    data={filterRecipeInfo}
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
                        icon={<FontAwesomeIcon icon={faLayerGroup} color="#FF9900" size={moderateScale(30, 0.2)} />}
                        openIcon={<FontAwesomeIcon icon={faXmark} color="#FF9900" size={moderateScale(40, 0.2)} />}
                        onOpen={() => setSpeedDialOpen(!speedDialopen)}
                        onClose={() => setSpeedDialOpen(!speedDialopen)}

                        buttonStyle={{
                            backgroundColor: '#CAC8C8',
                            //borderRadius: 50,
                            //minHeight: moderateScale(50),
                            paddingVertical: moderateScale(20),
                            paddingHorizontal: moderateScale(20),
                            height: 0,
                            width: moderateScale(0),
                            flex: 1,
                        }}
                        backdropPressableProps
                        transitionDuration='100'
                        //size='large'
                        style={{
                            paddingBottom: moderateScale(100),
                        }}
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
                                <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}
                                accessible={false}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityState={{ disabled: true }}>
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
                                <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}
                                accessible={false}
                            accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                            accessibilityState={{ disabled: true }}>
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
                                    <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}
                                    accessible={false}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityState={{ disabled: true }}>
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
                                    <Text style={{ textAlign: 'center', fontSize: moderateScale(15), fontWeight: '500' }}
                                    accessible={false}
                                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                    accessibilityState={{ disabled: true }}>
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
                        style={[{ backgroundColor: 'rgba(0, 0, 0, 1)' }, StyleSheet.absoluteFillObject]} 
                        
                        />)}
                    handleStyle={styles.bottomSheetHandle}
                    handleIndicatorStyle={{ backgroundColor: "#FFAA00", height: moderateScale(5), width: moderateScale(50), }}
                    index={-1}
                    snapPoints={['65%']}
                    enablePanDownToClose={true}
                    ref={bottomSheet}
                    overDragResistanceFactor={0}
                    detached={false}
                    accessible={false}
                    accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                    accessibilityState={{ disabled: true }}
                    
                >
                    <BottomSheetView>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={[styles.bottomSheetText, { textAlign: 'center', fontSize: moderateScale(20), marginBottom: moderateScale(10), paddingLeft: moderateScale(25), lineHeight: moderateScale(25) }]}
                                accessible={true}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                //accessibilityState={{ disabled: true }}
                            >
                                搜尋篩選
                            </Text>
                            <TouchableOpacity
                                onPress={() => { setFilterCategory([0, "all"]), setFilterRecommend([0, "all"]), setFilterDifficult([0, "all"]), setFilterDate([0, "all"]), calculateJaccard() }}
                                accessible={true}
                                accessibilityRole="none" // 设置为 "none" 表示标签不可点击
                                accessibilityLabel={`重新選擇篩選`}>
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
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterDate[0] == 0 ? '#AAFF00' : '#FFFFFF' }]}
                                onPressIn={() => setFilterDate([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"當天"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 1 ? '#FF0700' : '#FFFFFF' }]}
                                onPressIn={() => setFilterDate([1, "0"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>當天</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"一天"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 2 ? '#FF9900' : '#FFFFFF' }]}
                                onPressIn={() => setFilterDate([2, "1"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDate[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>一天</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"二至三天"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterDate[0] == 3 ? '#FFF000' : '#FFFFFF' }]}
                                onPressIn={() => setFilterDate([3, "2"])}>
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
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterCategory[0] == 0 ? '#95ECFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterCategory([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"中式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 1 ? '#95ECFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterCategory([1, "中式"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>中式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"西式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 2 ? '#95ECFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterCategory([2, "西式"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterCategory[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>西式</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"韓式"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterCategory[0] == 3 ? '#95ECFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterCategory([3, "韓式"])}>
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
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterRecommend[0] == 0 ? '#A7DCFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterRecommend([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"喜愛"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterRecommend[0] == 1 ? '#A7DCFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterRecommend([1, "like"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 1 ? '#FFFFFF' : '#3E5481' }]}>喜愛</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"烹飪時長"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterRecommend[0] == 2 ? '#A7DCFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterRecommend([2, "timeLong"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 2 ? '#FFFFFF' : '#3E5481' }]}>烹飪時長</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"烹飪時短"}
                                style={[styles.bottomSheetButton, { backgroundColor: filterRecommend[0] == 3 ? '#A7DCFF' : '#FFFFFF' }]}
                                onPressIn={() => setFilterRecommend([3, "timeShort"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterRecommend[0] == 3 ? '#FFFFFF' : '#3E5481' }]}>烹飪時短</Text>
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
                                style={[styles.bottomSheetCircleButtton, { backgroundColor: filterDifficult[0] == 0 ? '#404496' : '#FFFFFF' }]}
                                onPressIn={() => setFilterDifficult([0, "all"])}>
                                <Text style={[styles.bottomSheetButtonText, { color: filterDifficult[0] == 0 ? '#FFFFFF' : '#3E5481' }]}>全部</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"三顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 1 ? '#404496' : '#FFFFFF' }]]}
                                onPressIn={() => setFilterDifficult([1, "3"])}>
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"兩顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 2 ? '#404496' : '#FFFFFF' }]]}
                                onPressIn={() => setFilterDifficult([2, "2"])}>
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                                <FontAwesomeIcon icon={faStar} color="#FFB800" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                accessible={true}
                                accessibilityRole={"none"}
                                accessibilityLabel={"一顆星"}
                                style={[[styles.bottomSheetButton, { flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'center', backgroundColor: filterDifficult[0] == 3 ? '#404496' : '#FFFFFF' }]]}
                                onPressIn={() => setFilterDifficult([3, "1"])}>
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
        fontSize: moderateScale(13),
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
        justifyContent: 'center',
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