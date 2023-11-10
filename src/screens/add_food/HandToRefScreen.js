import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, FAB, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../../style/Dropdown";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomBackdrop from "./CustomBackdrop";
import { faCheck, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import refrigerator from "../../style/Refrigerator";
import BoxContainer from "./BoxContainer";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { addRemove } from "../../store/createFoodSlice";
const HandToRefScreen = () => {
    //const [invoiceList,setInvoiceList]=useState([]);
    const userState = useSelector(state => state.userInfo);
    const refState = useSelector(state => state.refInfo);
    const foodState = useSelector(state => state.createFood);
    const route = useRoute();
    const { token } = useContext(AuthContext);
    const navigation = useNavigation();
    //const [invoiceInfo, setInvoiceInfo] = useState({}); //傳入資訊
    const [RefInfo, setRefInfo] = useState([]); //refInfo

    const [open, setOpen] = useState(false); //drop
    const [RefList, setRefList] = useState([]); //for dropList
    const [selectRef, setSelectRef] = useState('');// 選擇存入的冰箱index
    const bottomSheetRef = React.useRef(null); //外層分層上拉選單參考
    const bottomSheetBoxRef = React.useRef(null);//內層分層上拉選單參考
    const [addList, setAddList] = useState([]); //foodList
    const [isfoodSelect, setIsFoodSelect] = useState("");
    const [upDataInfo, setUpDataInfo] = useState([]); //上傳的陣列

    const [buttonTopCenter, setButtonTopCenter] = useState([]); //上層分層渲染
    const [buttonDownCenter, setButtonDownCenter] = useState([]); //下層分層渲染
    const [buttonTopDoor, setButtonTopDoor] = useState([]);//上層門分層渲染
    const [buttonDownDoor, setButtonDownDoor] = useState([]);//上層門分層渲染
    const [containerBoxCount, setContainerBoxCount] = useState([])//平面分層數量

    const [choose, setChoose] = useState({ Door: "", Outrow: '', InsideCol: "", InsideRow: '' });
    const [initialRender, setInitialRender] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFinishVisible, setModaFinishlVisible] = useState(false);
    const dispatch =useDispatch();
    const getRefInfo = () => {
        setRefInfo(refState.refList);
        //console.log(().length);
        for (let i = 0; i < refState.refList.length; i++) {
            RefList.push({
                label: "" + refState.refList[i].refrigerator_name
                , value: "" + i
            })
        }
    }
    useEffect(() => {
        navigation.setOptions(
            {
                headerRight: () => (
                    <View style={modal_fab.headerfab}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>
                        </TouchableOpacity>
                    </View>
                ),
            }
        );
        getRefInfo();
        var tempData = foodState.info;
        //console.log("傳入的foodList:",route.params.InvoiceInfo);
        setAddList(prevList => {
            const updatedList = [...prevList];
            for (let i = 0; i < tempData.length; i++) {
                updatedList.push({
                    "OldData": tempData[i].foodName,
                    "Date": tempData[i].foodDate,
                    "FoodType": tempData[i].foodCatgory,
                    "Select": false,
                });
            }
            return updatedList;
        });
    }, []);

    const handlePress = (index) => {
        //console.log("點擊"+index);
        addList[index].Select = !addList[index].Select; // 直接修改特定索引的值
        setAddList([...addList]); // 触发重新渲染
        var count = 0;
        for (let i = 0; i < addList.length; i++) {
            if (addList[i].Select) {
                setIsFoodSelect(true);
                break;
            } else {
                setIsFoodSelect(false);
            }
        }
        console.log(addList);
    }

    const renderTopCenter = () => { //冷凍
        var Buttonindex = 1;
        if (RefInfo[selectRef].firstType == "cooler") {
            Buttonindex = RefInfo[selectRef].coolerCount + 1;
        }
        return buttonTopCenter.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#416BFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "freezerContainer")}
                
            />
        ));
    };

    const renderDownCenter = () => { //冷藏
        var Buttonindex = 1;
        if (RefInfo[selectRef].firstType == "freezer") {
            Buttonindex = RefInfo[selectRef].freezerCount + 1;
        }
        return buttonDownCenter.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={index === buttonDownCenter.length - 1 ? { flex: 2, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), } : { flex: 1, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "coolerContainer")}
            />
        ));
    };

    const renderTopDoor = () => { //冷凍門
        var Buttonindex = 1;
        if (RefInfo[selectRef].firstType == "cooler") {
            Buttonindex = RefInfo[selectRef].coolerDoorCount + 1;
        }
        return buttonTopDoor.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "freezerDoorContainer")}
            />
        ));
    };

    const renderDownDoor = () => { //冷藏門
        var Buttonindex = 1;
        if (RefInfo[selectRef].firstType == "freezer") {
            Buttonindex = RefInfo[selectRef].freezerDoorCount + 1;
        }
        return buttonDownDoor.map((_, index) => (
            <TouchableOpacity
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "coolerDoorContainer")}
            />
        ));
    };
    const RefDropdownSelect = () => { //初始化內部分層格數
        var selectedCount = parseInt(RefInfo[selectRef].freezerCount);
        setButtonTopCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo[selectRef].coolerCount);
        setButtonDownCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo[selectRef].freezerDoorCount);
        setButtonTopDoor(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo[selectRef].coolerDoorCount);
        setButtonDownDoor(Array(selectedCount).fill(null));
    }

    const handleButtonPress = (buttonIndex, type) => { //內部分層點擊

        var tempType = type;

        if (tempType == "freezerDoorContainer" || tempType == "coolerDoorContainer") { 
            //點擊門的情況
            //console.log("種類:"+tempType);
            console.log(` 選擇第 ${buttonIndex} 層`);

            var Boxcol = 1;
            var Boxrow = 1;
            var Door = true;

            bottomSheetRef.current.forceClose();
            upUserSelect(Boxcol, Boxrow, Door, buttonIndex);// 上傳
        } else { //點擊內部的情況
            console.log(`選擇第 ${buttonIndex} 層`);
            setChoose(prevState => ({
                ...prevState,
                Door: false,
                Outrow: buttonIndex
            }));
            bottomSheetRef.current.forceClose();
            console.log("選擇的數量:  " + RefInfo[selectRef][tempType]);
            setContainerBoxCount(RefInfo[selectRef][tempType]);
            bottomSheetBoxRef.current.expand();
        }
    };

    const containerhandleButtonPress = (Boxcol, Boxrow) => { //平面分層點擊回傳
        console.log(`第${Boxcol} 行 第 ${Boxrow} 列 `);
        bottomSheetBoxRef.current.forceClose();
        //上傳
        var Door = false;
        upUserSelect(Boxcol, Boxrow, Door);
    };

    const upUserSelect = (Boxcol, Boxrow, Door, doorIndex) => {
        console.log("上傳")
        //setUpDataInfo([]);
        var newDataInfo = []; // 用于存储新元素的临时数组 
        //addList[i].Date 臨時拿掉日期
        for (let i = 0; i < addList.length; i++) {
            if (addList[i].Select) {
                newDataInfo.push({
                    "refrigerator_name": RefList[selectRef].label,
                    "refrigerator_col": 1,
                    "refrigerator_row": doorIndex ? doorIndex : choose.Outrow,
                    "container_col": Boxcol,
                    "container_row": Boxrow,
                    "door": Door,
                    "old_name": addList[i].OldData,
                    "custom_name": "",
                    "expired_date": addList[i].Date,
                    "amount": 1,
                    "categoryId": addList[i].FoodType,
                    "price": 0,
                    "addByMethod": "normal",
                });
            }
        }
        console.log("上傳資料：",newDataInfo);
        axios({
            method: "POST",
            url: `${BASE_URL}/storage/item/add`,
            headers: { 'Authorization': userState.token },
            data: {
                "ingredient": newDataInfo,
            },
        }).then(res => {
            console.log(res);
            const deletedIndexes = [];
            const filteredList = addList.filter((item, index) => {
            if (item["Select"] !== true) {  
                return true; // 保留false
            }
            deletedIndexes.push(index);//儲存要刪除的index
            return false; // 刪
            });
            dispatch(addRemove(deletedIndexes));
            setAddList(filteredList);
            setIsFoodSelect(false);
            if (filteredList.length == 0) {
                //Alert.alert("新增完成");
                setModaFinishlVisible(true);
                setTimeout(() => {
                    setModaFinishlVisible(false);
                    navigation.navigate("Post");
                }, 3500);
            }
        }).catch(function(e){
            console.log(e);
            Alert.alert("新增錯誤");
        }).finally(() => {

        });
    };

    //console.log(upDataInfo);
    //console.log(addList);

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Modal
                animationIn={"fadeIn"}
                animationInTiming={800}
                animationOut={"fadeOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.9}
                onBackdropPress={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={{ marginTop: moderateScale(110), height: moderateScale(40), justifyContent: 'flex-start', flex: 1 }}>
                        <TouchableOpacity disabled>
                            <View style={[Userstyle.listButton, { height: moderateScale(45), marginHorizontal: moderateScale(20), backgroundColor: '#FBD589' }]}>
                                <Text style={[Userstyle.listTitle, { textAlign: "left", marginStart: moderateScale(10), paddingTop: moderateScale(10), }]}>
                                    蘋果
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginHorizontal: moderateScale(30) }}>

                            <Image source={require('../../../Img/arrow.png')}></Image>
                            <Text style={modal_fab.modalTitle}>點擊想要加入的食物列表後，在點選存入的冰箱</Text>
                            <AnimatedLottieView
                                style={{ height: moderateScale(100), alignSelf: 'flex-end', top: moderateScale(-30,1.6), right: moderateScale(30,2) }}
                                source={require('../../assets/click.json')}
                                speed={0.5}
                                autoPlay={true}
                                loop={false}
                                autoSize={true} />
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                    animationIn={"zoomIn"}
                    animationInTiming={900}
                    animationOut={"zoomOut"}
                    animationOutTiming={800}
                    isVisible={modalFinishVisible}
                    backdropOpacity={0.8}
                    onBackdropPress={() => { setModaFinishlVisible(false)}}
                >
                        <View style={styles.modalView}>
                            <AnimatedLottieView
                                style={{width:moderateScale(500),alignSelf:'center',paddingEnd:moderateScale(6)}}
                                source={require('../../assets/addFoodFinish.json')}
                                autoPlay
                                speed={0.8}
                                loop={false}>
                            </AnimatedLottieView>

                        </View>
            </Modal>

            <View style={[Userstyle.towList, { height: moderateScale(400), marginVertical: moderateScale(20), paddingHorizontal: moderateScale(20), }]}>
                <FlashList
                    data={addList}
                    estimatedItemSize={20}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                            accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`點擊食物為${item.NewData ? item.NewData : item.OldData}`}
                    
                                onPress={() => { handlePress(index) }}
                            >
                                <View style={[Userstyle.listButton, { height: moderateScale(45), marginHorizontal: 0, backgroundColor: item.Select ? '#FBD589' : '#FAFAFA' }]}>
                                    <Text style={[Userstyle.listTitle, { textAlign: "left", marginStart: moderateScale(10), paddingTop: moderateScale(10), }]}>
                                        {item.NewData ? item.NewData : item.OldData}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}>
                </FlashList>
            </View>
            <View style={{ height: moderateScale(200) }}>
                <DropDownPicker
                    placeholder="選擇存入冰箱"
                    style={[dropdown.squareBox, { zIndex: 0, }]}
                    containerStyle={[dropdown.squareContainer, { zIndex: 0 }]}
                    textStyle={{ fontSize: moderateScale(15), color: '#777' }}
                    placeholderStyle={{ color: '#777' }}
                    dropDownContainerStyle={{ borderRadius: 0, height: moderateScale(150) }}
                    listItemLabelStyle={{ paddingTop: 5, color: "#777", fontSize: moderateScale(15), height: moderateScale(25), paddingLeft: moderateScale(10), }}
                    selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }}
                    selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }}
                    TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />}
                    iconContainerStyle={{ marginRight: moderateScale(15) }}
                    open={open}
                    setOpen={setOpen}
                    value={selectRef}
                    setValue={setSelectRef}
                    items={RefList}
                    onChangeValue={() => { RefDropdownSelect() }}
                >
                </DropDownPicker>
            </View>


            <Button
                onPress={() => { bottomSheetRef.current.expand(); }}
                buttonStyle={styles.nextButton}
                titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
                title={"新增"}
            >
            </Button>
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
                snapPoints={['90%']}
                enablePanDownToClose={true}
                ref={bottomSheetRef}
            >

                {isfoodSelect && (selectRef != "") ? RefInfo && RefInfo && RefInfo[selectRef].firstType == "cooler" ?
                    <>
                        <Text style={styles.addText}>選擇存放位置</Text>
                        <View style={{ flex: 1, marginBottom: moderateScale(40) }}>
                            <View style={styles.finalDown}>
                                <View style={[refrigerator.finallOutTop, {}]}>
                                    {renderDownCenter()}
                                </View>
                                <View style={refrigerator.finallOutDoorTop}>
                                    {renderDownDoor()}
                                </View>
                            </View>
                            <View style={styles.finalTop}>
                                <View style={[refrigerator.finallOutBotton, {}]}>
                                    {renderTopCenter()}
                                </View>
                                <View style={refrigerator.finallOutDoorBotton}>
                                    {renderTopDoor()}
                                </View>
                            </View>
                        </View>
                    </> :
                    <>
                        <Text style={styles.addText}>選擇存放位置</Text>
                        <View style={{ flex: 1, marginBottom: moderateScale(40) }}>
                            <View style={styles.finalTop}>
                                <View style={[refrigerator.finallOutTop]}>
                                    {renderTopCenter()}
                                </View>
                                <View style={refrigerator.finallOutDoorTop}>
                                    {renderTopDoor()}
                                </View>
                            </View>
                            <View style={styles.finalDown}>
                                <View style={[refrigerator.finallOutBotton]}>
                                    {renderDownCenter()}
                                </View>
                                <View style={refrigerator.finallOutDoorBotton}>
                                    {renderDownDoor()}
                                </View>
                            </View>
                        </View>

                    </> :
                    <>
                        <Text style={styles.addText}>必須選擇要存入的冰箱及食物</Text>
                    </>
                }
            </BottomSheet>

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
                ref={bottomSheetBoxRef}
            >
                <Text style={styles.addText}>選擇平面存放區域</Text>


                {containerBoxCount ?
                    <>
                        <ImageBackground source={require('../../../Img/Under.png')} style={{ height: moderateScale(200), marginVertical: moderateScale(80), }}>
                            <BoxContainer number={containerBoxCount} clickIndex={containerhandleButtonPress}>
                            </BoxContainer>
                        </ImageBackground>
                    </> :
                    <>

                    </>
                }

            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        //alignItems:'center',
    },
    title: {
        textAlign: 'center',
        fontSize: moderateScale(25),
        marginVertical: moderateScale(35),
        color: '#777'
    },
    nextButton: {
        backgroundColor: "#27F727",
        //marginTop:,
        marginHorizontal: moderateScale(50),
        borderRadius: moderateScale(10),
        zIndex: 0,
    },
    bottomSheetHandle: {
        height: moderateScale(30),
    },
    finalTop: {
        flexDirection: 'row',
        flex: 5,
    },
    finalDown: {
        flexDirection: 'row',
        flex: 10,
    },
    addText: {
        textAlign: 'center',
        fontSize: moderateScale(20),
        color: '#777',
        marginVertical: moderateScale(10),
    },
    modalView: {
        borderRadius: moderateScale(10),
        alignSelf: 'center',
        justifyContent:'center',
        backgroundColor: 'transparent',
        width: moderateScale(300),
        height: moderateScale(250),
    },

})

export default HandToRefScreen;