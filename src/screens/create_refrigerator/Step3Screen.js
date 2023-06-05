import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, Text,} from "react-native-elements";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {faChevronDown,} from "@fortawesome/free-solid-svg-icons";
import dropdown from "../../style/Dropdown";
import refrigerator from "../../style/Refrigerator";
import { TouchableOpacity } from "react-native";
import { RefrigeratorContext } from "../../context/RefrigeratorContext";

const Step3Screen=()=>{
    //console.log("step2")
    const coldDoorList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"},{key:"4",value:"四層"}];
    const freezingDoorList = [{key:"1",value:"一層"},{key:"2",value:"二層"},{key:"3",value:"三層"}];
    //const [upCenterSelect,setUpCenterSelect]=useState("");
    //const [downCenterSelect,setDownCenterSelect]=useState("");

    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染
    const [buttonTopDoor,setButtonTopDoor]=useState([]);//上層門分層渲染
    const [buttonDownDoor,setButtonDownDoor]=useState([]);//上層門分層渲染

    const navigation=useNavigation()
    const {outConfig,coldCount,freezingCount,step3_coldDoor,step3_freezingDoor,coldDoorCount,freezingDoorCount}=useContext(RefrigeratorContext);


    const ToNextPage=()=>{
      if(coldDoorCount && freezingDoorCount){
          navigation.navigate("Step4");
      }else{
          Alert.alert("請完成分層選擇")
      }
  }

    const handleButtonPress = (buttonIndex) => {
        console.log(`Button ${buttonIndex + 1} pressed`);
      };

    const renderTopCenter = () => { //冷凍
        return buttonTopCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#416BFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };
      
    const renderDownCenter = () => { //冷藏
        return buttonDownCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };

    const renderTopDoor = () => { //冷凍門
        return buttonTopDoor.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };
    
    const renderDownDoor = () => { //冷藏門
        return buttonDownDoor.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index)}
          />
        ));
      };

    useEffect(() => {
        // 冷凍、冷藏分層導入     jioirjfiwoefe
          var selectedCount = parseInt(freezingCount);
          setButtonTopCenter(Array(selectedCount).fill(null));

          var selectedCount = parseInt(coldCount);
          setButtonDownCenter(Array(selectedCount).fill(null));      
      }, [freezingCount,coldCount]);

    useEffect(() => {
        // 冷凍門分層導入
        if(freezingDoorCount) {
          var selectedCount = parseInt(freezingDoorCount);
          setButtonTopDoor(Array(selectedCount).fill(null));
        }        
      }, [freezingDoorCount]);

    useEffect(() => {
        // 冷藏門分層導入
        if(coldDoorCount) {
          
          var selectedCount = parseInt(coldDoorCount);
          setButtonDownDoor(Array(selectedCount).fill(null));
        }        
      }, [coldDoorCount]);

    return(
        <SafeAreaView style={style.safeAreaView}>
            <Text style={style.title}>
                Step3
            </Text>
            <View style={style.towDropdown}>

                <SelectList
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:120}]}
                setSelected={(val)=>step3_freezingDoor(val)}
                data={freezingDoorList}
                search={false}
                save="key"
                placeholder="冷凍門邊分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />

                <SelectList 
                boxStyles={dropdown.boxTwo}
                dropdownStyles={[dropdown.dropdownTwo,{height:150}]}
                setSelected={(val)=>step3_coldDoor(val)}
                data={coldDoorList}
                search={false}
                save="key"
                placeholder="冷藏門邊分層"
                arrowicon={<FontAwesomeIcon icon={faChevronDown}/>} 
                />
            </View>
            {outConfig == "上層冷藏+下層冷凍"?
                <>
                <View style={style.final}>
                    <View style={[refrigerator.finallOutTop,{height:320}]}>
                      {renderDownCenter()} 
                    </View>
                    <View style={refrigerator.finallOutDoorTop}>
                      {renderDownDoor()}
                    </View>
                </View>
                <View style={style.final}>
                    <View style={[refrigerator.finallOutBotton,{height:180}]}>
                      {renderTopCenter()}  
                    </View>
                    <View style={refrigerator.finallOutDoorBotton}>
                      {renderTopDoor()}
                    </View>
                </View>
                </> : 
                <>
                <View style={style.final}>
                    <View style={[refrigerator.finallOutTop]}>
                        {renderTopCenter()}
                    </View>
                    <View style={refrigerator.finallOutDoorTop}>
                        {renderTopDoor()}
                    </View>
                </View>
                <View style={style.final}>
                    <View style={[refrigerator.finallOutBotton]}>
                        {renderDownCenter()}   
                    </View>
                    <View style={refrigerator.finallOutDoorBotton}>
                        {renderDownDoor()}
                    </View>
                </View>
                </>
            }
            <Button buttonStyle={style.nextButton}
            title="下一步"
            onPress={()=>ToNextPage()}
            >

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
    final:{
      flexDirection:'row',
    }

    
})

export default Step3Screen;