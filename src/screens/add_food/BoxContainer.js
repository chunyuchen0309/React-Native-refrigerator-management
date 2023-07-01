import React, { useEffect, useRef } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

const BoxContainer = (props) => {
   const pressIndx=(number)=>{
    props.clickIndex(number);
   }
  switch (props.number){
    case 4:
        return(
                <View style={style.ImageBg}>
                    <TouchableOpacity  onPress={()=>pressIndx(1)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box1,{left:50,top:-30,}]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>pressIndx(2)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box1,{left:10,top:-30,zIndex:1,}]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>pressIndx(3)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box1,{left:-7,top:-60,zIndex:1}]} ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity  onPress={()=>pressIndx(4)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box1,{zIndex:1,top:-60,left:-45}]} ></Image>
                    </TouchableOpacity>
                </View> 
        );
        break;
    case 6:
        return(
            <View style={style.ImageBg}>
                <TouchableOpacity  onPress={()=>pressIndx(1)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:70,top:-30,}]} ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>pressIndx(2)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:30,top:-30,zIndex:1,}]} ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>pressIndx(3)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:-5,top:-30,zIndex:2,}]} ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>pressIndx(4)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:12,top:-60,}]} ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>pressIndx(5)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:-23,top:-60,zIndex:1,}]} ></Image>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>pressIndx(6)}>
                    <Image source={require('../../../Img/分層2.png')} style={[style.box2,{left:-60,top:-60,zIndex:2,}]} ></Image>
                </TouchableOpacity>    
            </View> 
        )
    case 9:
            return(
                <View style={style.ImageBg}>
                    <TouchableOpacity  onPress={()=>pressIndx(1)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:70,top:-20,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(2)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:40,top:-20,zIndex:1,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(3)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:10,top:-20,zIndex:2,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(4)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:33,top:-45,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(5)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:3,top:-45,zIndex:1,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(6)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:-27,top:-45,zIndex:2,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(7)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:-5,top:-70,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(8)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:-35,top:-70,zIndex:1,}]} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>pressIndx(9)}>
                        <Image source={require('../../../Img/分層.png')} style={[style.box3,{left:-65,top:-70,zIndex:2,}]} ></Image>
                    </TouchableOpacity>  
                </View> 
            )
  }
};

const style=StyleSheet.create({
    ImageBg:{
        height:200,
        justifyContent:'center',  
        flexDirection:"row",
        flexWrap:"wrap",
        //backgroundColor:"#FDD384"
    },
    box1:{
        //backgroundColor:"black",
        height:122,
        width:155, 
    },
    box2:{
        //backgroundColor:"black",
        height:122,
        width:120, 
    },
    box3:{
        //backgroundColor:"black",
        height:87,
        width:111,
        //margin:10 
    },
    });
export default BoxContainer;