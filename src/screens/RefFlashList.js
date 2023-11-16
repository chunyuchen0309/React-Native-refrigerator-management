import React, { useEffect, useRef, useState } from "react";
import { View, Button, Alert, StyleSheet, Vibration, Image } from "react-native";
import { scale, moderateScale, verticalScale } from "./ScaleMethod.js";
import { TouchableOpacity } from "react-native";
import refrigerator from "../style/Refrigerator.js";
import { ScreenWidth } from "@rneui/base";
import { Text } from "react-native";
const RefFlashList = (props) => {
    const swipeableRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [changeIndex, setChangeIndex] = useState(props.data);
    const [buttonTopCenter, setButtonTopCenter] = useState([]); //上層分層渲染
    const [buttonDownCenter, setButtonDownCenter] = useState([]); //下層分層渲染
    const [buttonTopDoor, setButtonTopDoor] = useState([]);//上層門分層渲染
    const [buttonDownDoor, setButtonDownDoor] = useState([]);//上層門分層渲染
    const [containerBoxCount, setContainerBoxCount] = useState([])//平面分層數量
    /**
     * 點擊冰箱分層回傳至父組件
     * @param {*} index 
     * @param {*} type 
     */
    const handleButtonPress = (index, type) => {
        props.handleClick(index, props.data.refrigerator_name, type);
        //console.log("內部點擊",index);
    }
    /**
     * 長按冰箱分層回傳至父組件
     * @param {*} index 
     * @param {*} type 
     */
    const longHandleButtonPress = (index, type) => {
        props.longHandleClick(index, props.data.refrigerator_name, type, props.index);
        //console.log("內部點擊",index);
    }
    useEffect(() => {
        //console.log("傳入值",props.data);
        RefDropdownSelect();
    }, [props.data]);

    /**
     * 冷凍分層數量配置
     * @returns 冷凍分層button
     */
    const renderTopCenter = () => {
        var Buttonindex = 1;
        if (props.data.firstType == "cooler") {
            Buttonindex = props.data.coolerCount + 1;
        }
        return buttonTopCenter.map((_, index) => (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={`冷凍第${index +Buttonindex}層`}
                accessibilityRole="none"
                key={index}
                style={{ flex: 1, backgroundColor: "#416BFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "freezer")}
                onLongPress={() => longHandleButtonPress(index + Buttonindex, "freezerContainer")}
            />
        ));
    };
    /**
   * 冷藏分層數量配置
   * @returns 冷藏分層button
    */
    const renderDownCenter = () => {
        var Buttonindex = 1;
        if (props.data.firstType == "freezer") {
            Buttonindex = props.data.freezerCount + 1;
        }
        return buttonDownCenter.map((_, index) => (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={`冷藏第${index +Buttonindex}層`}
                accessibilityRole="none"
                key={index}
                style={index === buttonDownCenter.length - 1 ? { flex: 2, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), } : { flex: 1, backgroundColor: "#95ECFF", marginVertical: moderateScale(3), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "cooler")}
                onLongPress={() => longHandleButtonPress(index + Buttonindex, "coolerContainer")}
            />
        ));
    };
    /**
     * 冷凍門分層數量配置
     * @returns 冷凍門分層button
     */
    const renderTopDoor = () => {
        var Buttonindex = 1;
        if (props.data.firstType == "cooler") {
            Buttonindex = props.data.coolerDoorCount + 1;
        }
        return buttonTopDoor.map((_, index) => (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={`冷凍門第${index +Buttonindex}層`}
                accessibilityRole="none"
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "freezerDoor")}
            //onLongPress={() => longHandleButtonPress(index + Buttonindex, "freezerDoor")}
            />
        ));
    };
    /**
     * 冷藏門分層數量配置
     * @returns 冷藏門分層button
     */
    const renderDownDoor = () => {
        var Buttonindex = 1;
        if (props.data.firstType == "freezer") {
            Buttonindex = props.data.freezerDoorCount + 1;
        }
        return buttonDownDoor.map((_, index) => (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={`冷藏門第${index +Buttonindex}層`}
                accessibilityRole="none"
                key={index}
                style={{ flex: 1, backgroundColor: "#CDCFFF", marginVertical: moderateScale(2), borderRadius: moderateScale(10), }}
                //title={`Button ${index + 1}`}
                onPress={() => handleButtonPress(index + Buttonindex, "coolerDoor")}
            //onLongPress={() => longHandleButtonPress(index + Buttonindex, "coolerDoor")}
            />
        ));
    };
    /**
     * 初始化內部分層格數
     */
    const RefDropdownSelect = () => {
        //console.log("冷藏層數",parseInt(props.data.freezerCount));
        var selectedCount = parseInt(props.data.freezerCount);
        setButtonTopCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(props.data.coolerCount);
        setButtonDownCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(props.data.freezerDoorCount);
        setButtonTopDoor(Array(selectedCount).fill(null));
        selectedCount = parseInt(props.data.coolerDoorCount);
        setButtonDownDoor(Array(selectedCount).fill(null));
    }


    return (
        <>
            {props.data.firstType == "freezer" ?
                <>
                    <Text
                        style={{ textAlign: 'center', fontSize: moderateScale(25), paddingBottom: moderateScale(10), color: '#777', fontWeight: '500' }}
                        accessible={true}
                        accessibilityLabel={`冰箱名稱`}
                        accessibilityRole="none">
                        {props.data.refrigerator_name}
                    </Text>

                    <View style={{ width: ScreenWidth, height: moderateScale(600) }}>
                        <View style={style.finalTop}>
                            <View style={[refrigerator.finallOutTop]}>
                                {renderTopCenter()}
                            </View>
                            <View style={refrigerator.finallOutDoorTop}>
                                {renderTopDoor()}
                            </View>
                        </View>
                        <View style={style.finalDown}>
                            <View style={[refrigerator.finallOutBotton]}>
                                {renderDownCenter()}
                            </View>
                            <View style={refrigerator.finallOutDoorBotton}>
                                {renderDownDoor()}
                            </View>
                        </View>
                    </View>
                </>
                :
                <>
                    <Text style={{ textAlign: 'center', fontSize: moderateScale(25), paddingBottom: moderateScale(10), color: '#777', fontWeight: '500' }}>{props.data.refrigerator_name}</Text>

                    <View style={{ width: ScreenWidth, height: moderateScale(600) }}>
                        <View style={style.finalDown}>
                            <View style={[refrigerator.finallOutTop]}>
                                {renderDownCenter()}
                            </View>
                            <View style={refrigerator.finallOutDoorTop}>
                                {renderDownDoor()}
                            </View>
                        </View>
                        <View style={style.finalTop}>
                            <View style={[refrigerator.finallOutBotton]}>
                                {renderTopCenter()}
                            </View>
                            <View style={refrigerator.finallOutDoorBotton}>
                                {renderTopDoor()}
                            </View>
                        </View>
                    </View>
                </>}
        </>
    );
};
const style = StyleSheet.create({
    dateIcon: {
        marginTop: moderateScale(5),
        //backgroundColor:"blue",
        marginEnd: moderateScale(5),
    },
    dateText: {
        color: "#777",
        fontSize: ""
    },
    iconImg: {
        //flex:1,
        //backgroundColor:"black",
        width: moderateScale(35),
        height: moderateScale(35),
        marginTop: moderateScale(5),
        marginStart: moderateScale(10),
    },
    finalTop: {
        flexDirection: 'row',
        flex: 5,
    },
    finalDown: {
        flexDirection: 'row',
        flex: 10,
    },
})

export default RefFlashList;