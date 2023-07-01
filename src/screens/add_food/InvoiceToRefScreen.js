import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import ItemBox from "./InvoiceItemBox";
import { TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../../style/Dropdown";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import CustomBackdrop from "./CustomBackdrop";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import refrigerator from "../../style/Refrigerator";
import BoxContainer from "./BoxContainer";
const InvoiceToRefScreen=()=>{
    //const [invoiceList,setInvoiceList]=useState([]);
    const route = useRoute();
    const {token}=useContext(AuthContext);
    const navigation=useNavigation();
    const [invoiceInfo, setInvoiceInfo] = useState({}); //傳入資訊
    const [RefInfo, setRefInfo] = useState({}); //refInfo

    const [open, setOpen] = useState(false); //drop
    const [RefList, setRefList] = useState([]); //for dropList
    const [selectRef,setSelectRef]=useState('');// 選擇存入的冰箱index
    const bottomSheetRef = React.useRef(null); //外層分層上拉選單參考
    const bottomSheetBoxRef = React.useRef(null);//內層分層上拉選單參考
    const [addList, setAddList] = useState([]); //foodList

    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染
    const [buttonTopDoor,setButtonTopDoor]=useState([]);//上層門分層渲染
    const [buttonDownDoor,setButtonDownDoor]=useState([]);//上層門分層渲染
    const [containerBoxCount,setContainerBoxCount]=useState([])//平面分層數量
    
    const getRefInfo =()=>{
        axios.get(`${BASE_URL}/storage/refrigerator/info`,{
            headers: {
                'Authorization': token.token
              }
        }).then(res=>{
            console.log(res.data);
            setRefInfo(res.data);
            //console.log(().length);
            for(let i=0; i<(res.data.refrigeratorList).length ;i++){
                RefList.push({label:""+res.data.refrigeratorList[i].refrigerator_name
                    ,value:""+i})
            }

        }).catch(e=>{
            console.log(`getInfo error ${e}`);
        }).finally(()=>{
            
        }
        );
    }
    useEffect(()=>{
        getRefInfo();
        setInvoiceInfo(route.params?.InvoiceInfo);
        var tempData = route.params?.InvoiceInfo.Data;
        setAddList(prevList => {
            const updatedList = [...prevList];
            for (let i = 0; i < tempData.length; i++) {
            updatedList.push({
                "OldData": tempData[i].OldData,
                "NewData": tempData[i].NewData,
                "Select": false,
            });
            }
            return updatedList;
        });
        
    },[]);
    const handlePress=(index)=>{
        console.log("點擊"+index);
        addList[index].Select = !addList[index].Select; // 直接修改特定索引的值
        setAddList([...addList]); // 触发重新渲染
        /*
        setAddList(prevList => {
        const updatedList = [...prevList]; // 创建新的数组副本
        updatedList[index].Select = !updatedList[index].Select; // 更新特定索引的值
        return updatedList; // 返回更新后的数组
        });
        */
        //console.log(addList);
    }   

    const renderTopCenter = () => { //冷凍
        return buttonTopCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#416BFF",marginVertical:2,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index,"freezerContainer")}
          />
        ));
      };
      
    const renderDownCenter = () => { //冷藏
        return buttonDownCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:3,borderRadius:10,}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index,"coolerContainer")}
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
    const RefDropdownSelect=()=>{
        var selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].freezerCount);
        setButtonTopCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].coolerCount);
        setButtonDownCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].freezerDoorCount);
        setButtonTopDoor(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].coolerDoorCount);
        setButtonDownDoor(Array(selectedCount).fill(null));
    }

    const handleButtonPress = (buttonIndex,type) => {
        console.log(`第 ${buttonIndex + 1} 點擊`);
        var tempType=type;
        bottomSheetRef.current.forceClose();
        //console.log("選擇的數量:  "+RefInfo.refrigeratorList[selectRef][tempType]);
        setContainerBoxCount(RefInfo.refrigeratorList[selectRef][tempType]);
        bottomSheetBoxRef.current.expand();

      };

    const containerhandleButtonPress = (buttonIndex) => {
        console.log(`第 ${buttonIndex + 1} 點擊`);
        bottomSheetBoxRef.current.forceClose();
    };
    return(   
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.title}>
                存入冰箱
            </Text>
     
            <View style={[Userstyle.towList,{height:300,marginVertical:20,paddingHorizontal:20,}]}>
                <FlashList
                data={addList}
                estimatedItemSize={20}
                renderItem={({item,index})=>{
                return(
                    <TouchableOpacity
                    onPress={()=>{handlePress(index)}}     
                    >
                    <View style={[Userstyle.listButton,{height:45,marginHorizontal:0,backgroundColor:item.Select?'#FBD589':'#FAFAFA'}]}>
                        <Text style={[Userstyle.listTitle,{textAlign:"left",marginStart:10,paddingTop:10,}]}>
                            {item.NewData?item.NewData:item.OldData}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    )
                    }}>
                </FlashList>
            </View>
            <View style={{height:200}}>
            <DropDownPicker
                placeholder="選擇存入冰箱"
                style={[dropdown.squareBox,{zIndex:0,}]}
                containerStyle={[dropdown.squareContainer,{zIndex:0}]}
                textStyle={{fontSize:15,color:'#777'}}
                placeholderStyle={{color:'#777'}}
                dropDownContainerStyle={{borderRadius:0,height:150}}
                listItemLabelStyle={{paddingTop:5,color: "#777",fontSize:15,height:25,paddingLeft:10,}}
                selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}}
                selectedItemContainerStyle={{backgroundColor: "#FFC55A"}}
                TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />}
                iconContainerStyle={{marginRight: 15}}
                open={open}
                setOpen={setOpen}
                value={selectRef}
                setValue={setSelectRef}
                items={RefList}
                onChangeValue={()=>{RefDropdownSelect()}}
                >
            </DropDownPicker>
            </View>
            
            
            <Button
            onPress={()=>{bottomSheetRef.current.expand();}}
            buttonStyle={styles.nextButton}
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
                handleIndicatorStyle={{backgroundColor:"#FFAA00",height:5,width:50,}}
                index={-1}
                snapPoints={['80%']}
                enablePanDownToClose={true}
                ref={bottomSheetRef}
            >
            <Text style={styles.addText}>選擇存放位置</Text>
            {   selectRef != "" ? RefInfo && RefInfo.refrigeratorList && RefInfo.refrigeratorList[selectRef].firstType == "cooler" ?
                <>
                <View style={styles.final}>
                    <View style={[refrigerator.finallOutTop,{height:320}]}>
                      {renderDownCenter()} 
                    </View>
                    <View style={refrigerator.finallOutDoorTop}>
                      {renderDownDoor()}
                    </View>
                </View>
                <View style={styles.final}>
                    <View style={[refrigerator.finallOutBotton,{height:180}]}>
                      {renderTopCenter()}  
                    </View>
                    <View style={refrigerator.finallOutDoorBotton}>
                      {renderTopDoor()}
                    </View>
                </View>
                </> : 
                <>
                <View style={styles.final}>
                    <View style={[refrigerator.finallOutTop]}>
                        {renderTopCenter()}
                    </View>
                    <View style={refrigerator.finallOutDoorTop}>
                        {renderTopDoor()}
                    </View>
                </View>
                <View style={styles.final}>
                    <View style={[refrigerator.finallOutBotton]}>
                        {renderDownCenter()}   
                    </View>
                    <View style={refrigerator.finallOutDoorBotton}>
                        {renderDownDoor()}
                    </View>
                </View>
                </>:<></>
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
                handleIndicatorStyle={{backgroundColor:"#FFAA00",height:5,width:50,}}
                index={-1}
                snapPoints={['60%']}
                enablePanDownToClose={true}
                ref={bottomSheetBoxRef}
            >
            <Text style={styles.addText}>選擇平面存放區域</Text>
            
                
                {containerBoxCount? 
                <>
                <ImageBackground source={require('../../../Img/Under.png') } style={{height:200,marginVertical:80,}}>
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

const styles=StyleSheet.create({
    safeAreaView:{
        flex:1,
        //alignItems:'center',
    },
    title:{
        textAlign:'center',
        fontSize:25,
        marginVertical:35,
        color: '#777'
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        //marginTop:,
        marginHorizontal:50,
        borderRadius:10,
        zIndex:0,
    },
    bottomSheetHandle:{
        height:30,
    },
    final:{
        flexDirection:'row',
    },
    addText:{
        textAlign:'center',
        fontSize:20,
        color:'#777',
        marginVertical:10,
    }
    
})

export default InvoiceToRefScreen;