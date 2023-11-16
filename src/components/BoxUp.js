import React, { useEffect, useRef } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { create } from "react-test-renderer";
import { scale, moderateScale, verticalScale } from "../screens/ScaleMethod";
import { ScreenWidth } from "@rneui/base";
const BoxUp = (props) => {
    //console.log(props.number);
    const pressIndx = (number) => {
        props.clickIndex(number);
    }
    switch (props.number) {

        case 4:
            return (
                <View style={style.ImageBg}>
                    <TouchableOpacity
                        onPress={() => pressIndx(1)}
                        accessible={true}
                        accessibilityLabel={`左上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box1, { left: moderateScale(50, 0.7), top: moderateScale(-30, 0.7), }]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => pressIndx(2)}
                        accessible={true}
                        accessibilityLabel={`右上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box1, { left: moderateScale(10, 0.7), top: moderateScale(-30, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => pressIndx(3)}
                        accessible={true}
                        accessibilityLabel={`左下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box1, { left: moderateScale(-7, 0.7), top: moderateScale(-60, 0.7), zIndex: 1 }]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => pressIndx(4)}
                        accessible={true}
                        accessibilityLabel={`右下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box1, { zIndex: 1, top: moderateScale(-60, 0.7), left: moderateScale(-45, 0.7) }]} ></Image>
                    </TouchableOpacity>
                </View>
            );
            break;
        case 6:
            return (
                <View style={style.ImageBg}>
                    <TouchableOpacity onPress={() => pressIndx(1)}
                        accessible={true}
                        accessibilityLabel={`左上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(70, 0.7), top: moderateScale(-30, 0.7), }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(2)}
                        accessible={true}
                        accessibilityLabel={`中上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(30, 0.7), top: moderateScale(-30, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(3)}
                        accessible={true}
                        accessibilityLabel={`右上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(-5, 0.7), top: moderateScale(-30, 0.7), zIndex: 2, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(4)}
                        accessible={true}
                        accessibilityLabel={`左下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(12, 0.7), top: moderateScale(-60, 0.7) }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(5)}
                        accessible={true}
                        accessibilityLabel={`中下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(-23, 0.7), top: moderateScale(-60, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(6)}
                        accessible={true}
                        accessibilityLabel={`右下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層2.png')} resizeMode={"contain"} style={[style.box2, { left: moderateScale(-60, 0.7), top: moderateScale(-60, 0.7), zIndex: 2, }]} ></Image>
                    </TouchableOpacity>
                </View>
            )
        case 9:
            return (
                <View style={style.ImageBg}>
                    <TouchableOpacity onPress={() => pressIndx(1)}
                        accessible={true}
                        accessibilityLabel={`左上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(70, 0.7), top: moderateScale(-20, 0.7), }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(2)}
                        accessible={true}
                        accessibilityLabel={`中上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(40, 0.7), top: moderateScale(-20, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(3)}
                        accessible={true}
                        accessibilityLabel={`右上平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(10, 0.7), top: moderateScale(-20, 0.7), zIndex: 2, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(4)}
                        accessible={true}
                        accessibilityLabel={`中左平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(33, 0.7), top: moderateScale(-45, 0.7), }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(5)}
                        accessible={true}
                        accessibilityLabel={`中間平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(3, 0.7), top: moderateScale(-45, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(6)}
                        accessible={true}
                        accessibilityLabel={`中右平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(-27, 0.7), top: moderateScale(-45, 0.7), zIndex: 2, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(7)}
                        accessible={true}
                        accessibilityLabel={`左下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(-5, 0.7), top: moderateScale(-70, 0.7), }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(8)}
                        accessible={true}
                        accessibilityLabel={`中下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(-35, 0.7), top: moderateScale(-70, 0.7), zIndex: 1, }]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pressIndx(9)}
                        accessible={true}
                        accessibilityLabel={`右下平面區塊`}
                        accessibilityRole="none">
                        <Image source={require('../../Img/分層.png')} resizeMode={"contain"} style={[style.box3, { left: moderateScale(-65, 0.7), top: moderateScale(-70, 0.7), zIndex: 2, }]} ></Image>
                    </TouchableOpacity>
                </View>
            )
    }
};

const style = StyleSheet.create({
    ImageBg: {
        //height:moderateScale(250),
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        //backgroundColor:"#FDD384",
        width: ScreenWidth * 0.95,
    },
    box1: {
        //backgroundColor:"black",
        height: moderateScale(122, 0.7),
        width: moderateScale(155, 0.7),
    },
    box2: {
        //backgroundColor:"black",
        height: moderateScale(122, 0.7),
        width: moderateScale(120, 0.7),
    },
    box3: {
        //backgroundColor:"black",
        height: moderateScale(87, 0.7),
        width: moderateScale(111, 0.7),
        //margin:5 
    },
});


export default BoxUp;
