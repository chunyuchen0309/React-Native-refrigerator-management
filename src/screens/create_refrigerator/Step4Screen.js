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

const Step4Screen=()=>{
    //console.log("step2")
    const coldPlaneList = [{key:"4",value:"2 X 2"},{key:"6",value:"2 X 3"},{key:"9",value:"3 X 3"}];
    const freezingPlaneList = [{key:"4",value:"2 X 2"},{key:"6",value:"2 X 3"},{key:"9",value:"3 X 3"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");
    const navigation=useNavigation()
    const [buttonTopPlane,setButtonTopPlane]=useState([]); //上層分層渲染
    const [buttonDownPlane,setButtonDownPlane]=useState([]); //下層分層渲染
    //冷凍平面排版
    const [freezingboxList,setFreezingBoxList]=useState([{width:110,height:70},{width:75,height:70},{width:70,height:45}]);
    const [freezingboxListIndex,setFreezingBoxListIndex]=useState("");
    //冷藏平面排版
    const [coldboxList,setColdBoxList]=useState([{width:110,height:130},{width:100,height:90},{width:70,height:90}]);
    const [coldboxListIndex,setColdBoxListIndex]=useState("");

    const {outConfig,step4_coldPlane,step4_freezingPlane,coldPlaneCount,freezingPlaneCount,}=useContext(RefrigeratorContext);

    const ToNextPage=()=>{
        if(coldPlaneCount && freezingPlaneCount){
            navigation.navigate("Step5");
        }else{
            Alert.alert("請完成平面分層選擇")
        }
    }

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
      };

    const renderTopPlane = () => {
        return buttonTopPlane.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{...freezingboxList[freezingboxListIndex],backgroundColor: "#7E7E7E",marginVertical:3,marginHorizontal:3,borderRadius:5,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
        >
        </TouchableOpacity>
        ));
      };
      
    const renderDownPlane = () => {
        return buttonDownPlane.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{...coldboxList[coldboxListIndex],backgroundColor: "#7E7E7E",marginVertical:3,marginHorizontal:3,borderRadius:5,}}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };

    useEffect(() => {
        // 冷凍平面分層選擇的變化
        if (freezingPlaneCount) {
          var selectedCount = parseInt(freezingPlaneCount);
          setButtonTopPlane(Array(selectedCount).fill(null));
          switch(selectedCount){
            case 4:
                setFreezingBoxListIndex(0);
                break;
            case 6:
                setFreezingBoxListIndex(1);
                break;
            case 9:
                setFreezingBoxListIndex(2);
                break;
            default:

          }
        }
      }, [freezingPlaneCount]);

    useEffect(() => {
        // 冷藏平面分層選擇的變化
        if (coldPlaneCount) {
          var selectedCount = parseInt(coldPlaneCount);
          setButtonDownPlane(Array(selectedCount).fill(null));
          switch(selectedCount){
            case 4:
                setColdBoxListIndex(0);
                break;
            case 6:
                setColdBoxListIndex(1);
                break;
            case 9:
                setColdBoxListIndex(2);
                break;
            default:

          }
        }
      }, [coldPlaneCount]);

    

    return(
        <SafeAreaView style={style.safeAreaView}>
            <Text style={style.title}>
                Step4
            </Text>
            <View style={style.towDropdown}>

                <SelectList
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:120}]}
                setSelected={(val)=>step4_freezingPlane(val)}
                data={freezingPlaneList}
                search={false}
                save="key"
                placeholder="冷凍平面分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />

                <SelectList 
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:120}]}
                setSelected={(val)=>step4_coldPlane(val)}
                data={coldPlaneList}
                search={false}
                save="key"
                placeholder="冷藏平面分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />
            </View>

            {outConfig == "上層冷藏+下層冷凍"?
                <>
                    <View style={[refrigerator.outTop,{height:320,flexDirection:"row",flexWrap:"wrap",justifyContent:'center',alignContent:'center'}]}>
                        {renderDownPlane()}
                    </View>
                    <View style={[refrigerator.outBotton,{height:180,flexDirection:"row",flexWrap:"wrap",justifyContent:'center',alignContent:'center'}]}>
                        {renderTopPlane()}
                    </View>
                </> : 
                <>
                    <View style={[refrigerator.outTop,{height:180,flexDirection:"row",flexWrap:"wrap",justifyContent:'center',alignContent:'center'}]}>
                        {renderTopPlane()}
                    </View>
                    <View style={[refrigerator.outBotton,{height:320,flexDirection:"row",flexWrap:"wrap",justifyContent:'center',alignContent:'center'}]}>
                        {renderDownPlane()}   
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

export default Step4Screen;