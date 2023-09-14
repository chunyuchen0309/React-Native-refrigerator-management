import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";
import { Alert, ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
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
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
const HandToRefScreen=()=>{
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
    const [isfoodSelect,setIsFoodSelect]=useState("");
    const [upDataInfo,setUpDataInfo]=useState([]); //上傳的陣列

    const [buttonTopCenter,setButtonTopCenter]=useState([]); //上層分層渲染
    const [buttonDownCenter,setButtonDownCenter]=useState([]); //下層分層渲染
    const [buttonTopDoor,setButtonTopDoor]=useState([]);//上層門分層渲染
    const [buttonDownDoor,setButtonDownDoor]=useState([]);//上層門分層渲染
    const [containerBoxCount,setContainerBoxCount]=useState([])//平面分層數量

    const [choose,setChoose]=useState({Door:"",Outrow:'',InsideCol:"",InsideRow:''});
    const [initialRender, setInitialRender] = useState(true);

    const goHome =()=>{
        if(addList.length==0){
            Alert.alert("新增完成");
            navigation.navigate("Post");
        }
    }
    
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
            console.log(`getRefInfo error ${e}`);
        }).finally(()=>{
        }
        );
    }
    useEffect(()=>{
        getRefInfo();
        setInvoiceInfo(route.params?.InvoiceInfo);
        var tempData = route.params?.InvoiceInfo;
        setAddList(prevList => {
            const updatedList = [...prevList];
            for (let i = 0; i < tempData.length; i++) {
            updatedList.push({
                "OldData": tempData[i].foodName,
                "Date": tempData[i].foodDate,
                "FoodType":tempData[i].foodCatgory,
                "Select": false,
            });
            }
            return updatedList;
        });
        
    },[]);
    
    const handlePress=(index)=>{
        //console.log("點擊"+index);
        addList[index].Select = !addList[index].Select; // 直接修改特定索引的值
        setAddList([...addList]); // 触发重新渲染
        var count=0;
        for(let i=0;i<addList.length;i++){
            if(addList[i].Select){
                setIsFoodSelect(true);
                break;
            }else{
                setIsFoodSelect(false);
            }
        }
        //console.log(isfoodSelect);
        /*
        setAddList(prevList => {
        const updatedList = [...prevList]; // 创建新的数组副本
        updatedList[index].Select = !updatedList[index].Select; // 更新特定索引的值
        return updatedList; // 返回更新后的数组
        });
        */
        console.log(addList);
    }   

    const renderTopCenter = () => { //冷凍
        var Buttonindex=1;
        if(RefInfo.refrigeratorList[selectRef].firstType=="cooler"){ 
            Buttonindex=RefInfo.refrigeratorList[selectRef].coolerCount+1;
        }
        return buttonTopCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#416BFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index + Buttonindex,"freezerContainer")}
          />
        ));
      };
      
    const renderDownCenter = () => { //冷藏
        var Buttonindex=1;
        if(RefInfo.refrigeratorList[selectRef].firstType=="freezer"){
            Buttonindex=RefInfo.refrigeratorList[selectRef].freezerCount+1;
        }
        return buttonDownCenter.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={index === buttonDownCenter.length - 1 ?{flex: 2, backgroundColor: "#95ECFF",marginVertical:moderateScale(3),borderRadius:moderateScale(10),}:{flex: 1, backgroundColor: "#95ECFF",marginVertical:moderateScale(3),borderRadius:moderateScale(10),}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index +Buttonindex,"coolerContainer")}
          />
        ));
      };

    const renderTopDoor = () => { //冷凍門
        var Buttonindex=1;
        if(RefInfo.refrigeratorList[selectRef].firstType=="cooler"){ 
            Buttonindex=RefInfo.refrigeratorList[selectRef].coolerDoorCount+1;
        }
        return buttonTopDoor.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index + Buttonindex,"freezerDoorContainer")}
          />
        ));
      };
    
    const renderDownDoor = () => { //冷藏門
        var Buttonindex=1;
        if(RefInfo.refrigeratorList[selectRef].firstType=="freezer"){ 
            Buttonindex=RefInfo.refrigeratorList[selectRef].freezerDoorCount+1;
        }
        return buttonDownDoor.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{flex: 1, backgroundColor: "#CDCFFF",marginVertical:moderateScale(2),borderRadius:moderateScale(10),}}
            //title={`Button ${index + 1}`}
            onPress={() => handleButtonPress(index + Buttonindex,"coolerDoorContainer")}
          />
        ));
      };
    const RefDropdownSelect=()=>{ //初始化內部分層格數
        var selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].freezerCount);
        setButtonTopCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].coolerCount);
        setButtonDownCenter(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].freezerDoorCount);
        setButtonTopDoor(Array(selectedCount).fill(null));
        selectedCount = parseInt(RefInfo.refrigeratorList[selectRef].coolerDoorCount);
        setButtonDownDoor(Array(selectedCount).fill(null));
    }

    const handleButtonPress = (buttonIndex,type) => { //內部分層點擊
        
        var tempType=type;

        if(tempType=="freezerDoorContainer" ||tempType=="coolerDoorContainer"){ //點擊門的情況
            //console.log("種類:"+tempType);
            console.log(` 選擇第 ${buttonIndex} 層`);
            
            var Boxcol=1;
            var Boxrow=1;
            var Door=true;
           
            bottomSheetRef.current.forceClose();
            upUserSelect(Boxcol,Boxrow,Door,buttonIndex);// 上傳
        }else{ //點擊內部的情況
            console.log(`選擇第 ${buttonIndex} 層`);
            setChoose(prevState => ({
                ...prevState,
                Door: false,
                Outrow: buttonIndex
              }));        
            bottomSheetRef.current.forceClose();
            console.log("選擇的數量:  "+RefInfo.refrigeratorList[selectRef][tempType]);
            setContainerBoxCount(RefInfo.refrigeratorList[selectRef][tempType]);
            bottomSheetBoxRef.current.expand();
        }
      };

    const containerhandleButtonPress = (Boxcol,Boxrow) => { //平面分層點擊回傳
        console.log(`第${Boxcol} 行 第 ${Boxrow} 列 `);
        
        bottomSheetBoxRef.current.forceClose();
        //上傳
        var Door=false;
        upUserSelect(Boxcol,Boxrow,Door);
    };
      const upUserSelect = (Boxcol,Boxrow,Door,doorIndex) => {
        console.log("上傳")
        //setUpDataInfo([]);
        var newDataInfo = []; // 用于存储新元素的临时数组 
        //addList[i].Date 臨時拿掉日期
        for (let i = 0; i < addList.length; i++) {
          if (addList[i].Select) {
            newDataInfo.push({
              "refrigerator_name": RefList[selectRef].label,
              "refrigerator_col": 1,
              "refrigerator_row": doorIndex?doorIndex:choose.Outrow,
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
        console.log(newDataInfo);
        axios({
            method:"POST",
            url:`${BASE_URL}/storage/item/add`,
            headers: {'Authorization': token.token},
            data:{
                "ingredient":newDataInfo,
            },
        }).then(res=>{
            console.log(res.data);
            const filteredList = addList.filter(item => item["Select"] !== true);
            setAddList(filteredList);
            setIsFoodSelect(false);
            if(filteredList.length==0){
                Alert.alert("新增完成");
                navigation.navigate("Post");
            }
        }).catch(e=>{
            console.log(`add error ${e}`);
        }).finally(()=>{
            
        });
        
      };
    
    //console.log(upDataInfo);
    //console.log(addList);
    
    return(   
        <SafeAreaView style={styles.safeAreaView}>
            
            <View style={[Userstyle.towList,{height:moderateScale(400),marginVertical:moderateScale(20),paddingHorizontal:moderateScale(20),}]}>
                <FlashList
                data={addList}
                estimatedItemSize={20}
                renderItem={({item,index})=>{
                return(
                    <TouchableOpacity
                    onPress={()=>{handlePress(index)}}     
                    >
                    <View style={[Userstyle.listButton,{height:moderateScale(45),marginHorizontal:0,backgroundColor:item.Select?'#FBD589':'#FAFAFA'}]}>
                        <Text style={[Userstyle.listTitle,{textAlign:"left",marginStart:moderateScale(10),paddingTop:moderateScale(10),}]}>
                            {item.NewData?item.NewData:item.OldData}
                        </Text>
                    </View>
                    </TouchableOpacity>
                    )
                    }}>
                </FlashList>
            </View>
            <View style={{height:moderateScale(200)}}>
            <DropDownPicker
                placeholder="選擇存入冰箱"
                style={[dropdown.squareBox,{zIndex:0,}]}
                containerStyle={[dropdown.squareContainer,{zIndex:0}]}
                textStyle={{fontSize:moderateScale(15),color:'#777'}}
                placeholderStyle={{color:'#777'}}
                dropDownContainerStyle={{borderRadius:0,height:moderateScale(150)}}
                listItemLabelStyle={{paddingTop:5,color: "#777",fontSize:moderateScale(15),height:moderateScale(25),paddingLeft:moderateScale(10),}}
                selectedItemLabelStyle={{fontWeight:"bold",color:'#777'}}
                selectedItemContainerStyle={{backgroundColor: "#FFC55A"}}
                TickIconComponent={({style}) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />}
                iconContainerStyle={{marginRight: moderateScale(15)}}
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
                handleIndicatorStyle={{backgroundColor:"#FFAA00",height:moderateScale(5),width:moderateScale(50),}}
                index={-1}
                snapPoints={['80%']}
                enablePanDownToClose={true}
                ref={bottomSheetRef}
            >

            {  isfoodSelect && (selectRef != "") ?  RefInfo && RefInfo.refrigeratorList && RefInfo.refrigeratorList[selectRef].firstType == "cooler" ?
                <>
                <Text style={styles.addText}>選擇存放位置</Text>
                <View style={{flex:1,marginBottom:moderateScale(40)}}>
                    <View style={styles.finalDown}>
                        <View style={[refrigerator.finallOutTop,{}]}>
                        {renderDownCenter()} 
                        </View>
                        <View style={refrigerator.finallOutDoorTop}>
                        {renderDownDoor()}
                        </View>
                    </View>
                    <View style={styles.finalTop}>
                        <View style={[refrigerator.finallOutBotton,{}]}>
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
                <View style={{flex:1,marginBottom:moderateScale(40)}}>
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
                
                </>:
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
                handleIndicatorStyle={{backgroundColor:"#FFAA00",height:moderateScale(5),width:moderateScale(50),}}
                index={-1}
                snapPoints={['60%']}
                enablePanDownToClose={true}
                ref={bottomSheetBoxRef}
            >
            <Text style={styles.addText}>選擇平面存放區域</Text>
            
                
                {containerBoxCount? 
                <>
                <ImageBackground source={require('../../../Img/Under.png') } style={{height:moderateScale(200),marginVertical:moderateScale(80),}}>
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
        fontSize:moderateScale(25),
        marginVertical:moderateScale(35),
        color: '#777'
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        //marginTop:,
        marginHorizontal:moderateScale(50),
        borderRadius:moderateScale(10),
        zIndex:0,
    },
    bottomSheetHandle:{
        height:moderateScale(30),
    },
    finalTop:{
        flexDirection:'row',
        flex:5,
    },
    finalDown:{
        flexDirection:'row',
        flex:10,
    },
    addText:{
        textAlign:'center',
        fontSize:moderateScale(20),
        color:'#777',
        marginVertical:moderateScale(10),
    }
    
})

export default HandToRefScreen;