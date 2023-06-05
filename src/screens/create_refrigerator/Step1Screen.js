import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";

const Step1Screen=()=>{
    const navigation=useNavigation();
    const outList = [{key:"1",value:"上層冷凍+下層冷藏"},{key:"2",value:"上層冷藏+下層冷凍"}];
    const {step1,outConfig}=useContext(RefrigeratorContext);

    const ToNextPage=()=>{
        if(outConfig){
            navigation.navigate("Step2");
        }else{
            Alert.alert("請選擇配置")
        }
    }

    return(
        <SafeAreaView style={style.safeAreaView}>
            <Text style={style.title}>
                Step1
            </Text>
            <View style={{height:100,zIndex:1,}}>
                <SelectList
                boxStyles={dropdown.box}
                dropdownStyles={dropdown.dropdown}
                setSelected={(val)=>step1(val)}
                save="value"
                data={outList}
                search={false}
                placeholder="請選擇配置"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>}
                />
            </View>
            {outConfig == "上層冷藏+下層冷凍"?
                <>
                    <View style={[refrigerator.outTop,{height:320}]}>
                        <View style={refrigerator.handledown}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton,{height:180}]}>
                        <View style={refrigerator.handleup}>
                        </View>
                    </View>
                </> : 
                <>
                    <View style={[refrigerator.outTop]}>
                        <View style={refrigerator.handleup}>
                        </View>
                    </View>
                    <View style={[refrigerator.outBotton]}>
                        <View style={refrigerator.handledown}>
                        </View>
                    </View>
                </>
            }
                
            

            <Button buttonStyle={style.nextButton}
            title="下一步"
            onPress={()=>ToNextPage()}>

            </Button>
            

        </SafeAreaView>
    );
};




const  style=StyleSheet.create({
    safeAreaView:{
        flex:1,
    },
    title:{
        marginVertical:20,
        textAlign:'center',
        fontSize:20,
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        marginVertical:20,
        marginHorizontal:50,
        borderRadius:10,
    }
    
})

export default Step1Screen;