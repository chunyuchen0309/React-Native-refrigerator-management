import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Button, Alert, StyleSheet, Vibration, Image } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Input, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircle, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import foodListItem from "../../style/FoodListItem";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import { AccessibilityInfo } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { TouchableNativeFeedback } from "react-native";
const ItemBox = (props) => {
    const swipeableRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [changeIndex, setChangeIndex] = useState(props.data);
    const [butttenOpacity, setButtonOpacity] = useState(1);
    const [YMD, setTMD] = useState([]);
    const { lookModel } = useContext(AuthContext);

    const foodImg = {
        '水果類': <Image source={require("../../../Img/foodpic/水果.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '加工食品類': <Image source={require("../../../Img/foodpic/加工食品.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '奶製品': <Image source={require("../../../Img/foodpic/奶製品.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '冰品': <Image source={require("../../../Img/foodpic/冰品.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '肉類': <Image source={require("../../../Img/foodpic/肉類.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '豆類': <Image source={require("../../../Img/foodpic/豆類.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '海鮮': <Image source={require("../../../Img/foodpic/海鮮.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '甜點': <Image source={require("../../../Img/foodpic/甜點.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '剩菜': <Image source={require("../../../Img/foodpic/剩菜.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '飲品類': <Image source={require("../../../Img/foodpic/飲料.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '蔬菜類': <Image source={require("../../../Img/foodpic/蔬菜.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>,
        '雞蛋': <Image source={require("../../../Img/foodpic/雞蛋.png")} resizeMode={"cover"} style={[style.iconImg, !lookModel && { marginTop: moderateScale(15) }]}></Image>
    };
    
    useEffect(() => {
        setTMD(props.data.expired_date.split('/'));
        //console.log("refQuery傳入的資料",props.data);
    }, []); //作用為即時更新選擇的數據，呈現在input之中

    return (
        <>
            {lookModel ?
                
                    <TouchableOpacity
                        //activeOpacity={0.5}
                        onPress={() => { props.handleClick() }}
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`${props.data.ingredient_orignal_name}有效日期為${YMD[0]}年${YMD[1]}月${YMD[2]}日`}
                    >
                        <View style={[foodListItem.listButton, { opacity: butttenOpacity }]}>
                            {foodImg[props.data.category_name]}
                            <Text style={foodListItem.listTitleLeft} numberOfLines={1} ellipsizeMode="tail">
                                {props.data.ingredient_orignal_name}
                            </Text>
                            <View style={[foodListItem.listTitleRight,{}]}>
                                <View style={style.dateIcon}>
                                    <FontAwesomeIcon icon={faCircle} size={moderateScale(15)} 
                                    color={props.data.day < 0 ? "#990A0A" : props.data.day == 0 ? "#FF0700" : props.data.day == 1 ? "#FF9900" : (props.data.day == 2 || props.data.day == 3) ? "#FFF000" : "#27F727"}></FontAwesomeIcon>
                                </View>
                                <Text style={[foodListItem.dateText,{}]}>
                                    {props.data.expired_date ? props.data.expired_date : props.data.ingredient_orignal_name}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                :
                
                    <TouchableOpacity
                        
                        onPress={() => { props.handleClick() }}
                        accessible={true}
                        accessibilityRole={"none"}
                        accessibilityLabel={`${props.data.ingredient_orignal_name}有效日期為${YMD[0]}年${YMD[1]}月${YMD[2]}日`}
                    >
                        <View style={[foodListItem.listButton, { height: moderateScale(60), opacity: butttenOpacity }]}>
                            {foodImg[props.data.category_name]}

                            <Text style={[foodListItem.listTitleLeft, { paddingTop: moderateScale(15), fontSize: moderateScale(25), paddingLeft: moderateScale(2) }]} numberOfLines={1} ellipsizeMode="tail">
                                {props.data.ingredient_orignal_name}
                            </Text>
                            <View style={[foodListItem.listTitleRight, { paddingTop: moderateScale(18), }]}>
                                <View style={[style.dateIcon, { marginTop: moderateScale(3), marginEnd: moderateScale(2), }]}>
                                    <FontAwesomeIcon icon={faCircle} size={moderateScale(18)}
                                    color={props.data.day < 0 ? "#990A0A" : props.data.day == 0 ? "#FF0700" : props.data.day == 1 ? "#FF9900" : (props.data.day == 2 || props.data.day == 3) ? "#FFF000" : "#27F727"}></FontAwesomeIcon>
                                </View>
                                <Text style={[foodListItem.dateText, { fontSize: moderateScale(20) ,}]}>
                                    {props.data.expired_date ? props.data.expired_date : props.data.ingredient_orignal_name}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                
            }
        </>
    );
};
const style = StyleSheet.create({
    dateIcon: {
        marginTop: moderateScale(5),
        marginEnd: moderateScale(5),
    },
    dateText: {
        color: "#777",
    },
    iconImg: {
        width: moderateScale(35),
        height: moderateScale(35),
        marginTop: moderateScale(5),
        marginStart: moderateScale(10),
    },
})

export default ItemBox;