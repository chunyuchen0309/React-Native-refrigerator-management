import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";

const Step2Screen=()=>{
    //console.log("step2")
    const coldList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"},{key:"4",value:"四層"},{key:"5",value:"五層"}];
    const freezingList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");
    const navigation=useNavigation()
    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染

    const {outConfig,coldCount,step2_cold,freezingCount,step2_freezing}=useContext(RefrigeratorContext);

    const ToNextPage=()=>{
        if(freezingCount && coldCount){
            navigation.navigate("Step3");
        }else{
            Alert.alert("請完成分層選擇")
        }
    }

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
      };

    const renderTopCenter = () => {
        return buttonTopCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#416BFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };
      
    const renderDownCenter = () => {
        return buttonDownCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };

    useEffect(() => {
        // 冷凍分層選擇的變化
        if (freezingCount) {
          var selectedCount = parseInt(freezingCount);
          setButtonTopCenter(Array(selectedCount).fill(null));
        }
      }, [freezingCount]);

    useEffect(() => {
        // 冷藏分層選擇的變化
        if (coldCount) {
          var selectedCount = parseInt(coldCount);
          setButtonDownCenter(Array(selectedCount).fill(null));
        }
      }, [coldCount]);

    

    return(
        <SafeAreaView style={style.safeAreaView}>
            <Text style={style.title}>
                Step2
            </Text>
            <View style={style.towDropdown}>

                <SelectList
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:120}]}
                setSelected={(val)=>step2_freezing(val)}
                data={freezingList}
                search={false}
                save="key"
                placeholder="冷凍分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />

                <SelectList 
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:190}]}
                setSelected={(val)=>step2_cold(val)}
                data={coldList}
                search={false}
                save="key"
                placeholder="冷藏分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />
            </View>

            {outConfig == "上層冷藏+下層冷凍"?
                <>
                    <View style={[refrigerator.outTop,{height:320}]}>
                        {renderDownCenter()}
                    </View>
                    <View style={[refrigerator.outBotton,{height:180}]}>
                        {renderTopCenter()}
                    </View>
                </> : 
                <>
                    <View style={[refrigerator.outTop]}>
                        {renderTopCenter()}
                    </View>
                    <View style={[refrigerator.outBotton]}>
                        {renderDownCenter()}   
                    </View>
                </>
            }
            <Button buttonStyle={style.nextButton}
            title="下一步" onPress={()=>ToNextPage()}>
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
    },
    towDropdown:{
        flexDirection:'row',
        height:100,
        justifyContent:'center',
        marginHorizontal:30,
        //backgroundColor:"#F3FA5E",
        zIndex:1,
    },

    
})

export default Step2Screen;