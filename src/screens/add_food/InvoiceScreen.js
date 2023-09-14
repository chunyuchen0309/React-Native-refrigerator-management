import { faCalendarDays, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Button, FAB, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./InvoiceItemBox";
import Modal from "react-native-modal";
import { Image } from "react-native";
import { scale, moderateScale, verticalScale} from "../ScaleMethod";
import modal_fab from "../../style/Modal&FAB";
import { ScreenWidth } from "@rneui/base";
const InvoiceScreen=()=>{
    //const [invoiceList,setInvoiceList]=useState([]);
    const route = useRoute();
    const [invoiceInfo, setInvoiceInfo] = useState({});
    const navigation=useNavigation();
    const [modalVisible,setModalVisible]=useState(false);
    useEffect(()=>{
        setInvoiceInfo(route.params?.invoiceData);
        //setInvoiceInfo({"Number":"A1234567","Date":"1130601","Data":[{"OldData":"統一糙米漿","NewData":""},{"OldData":"可口可樂","NewData":""},]});
    },[]);

    useEffect(() => { //設置標題右側按鈕
        navigation.setOptions( 
            {
                headerRight: () => (
                <FAB
                icon={<FontAwesomeIcon icon={faLightbulb} color="#FFFFFF" size={20}></FontAwesomeIcon>}
                size="small"
                placement="right"
                color="#A7DCFF"
                onPress={() => setModalVisible(true)}
                style={modal_fab.headerfab}/>
                ),
            }
        );
    }, []);

    const deleteItem = (index) => { //回調函數
        console.log("刪除call")
        const updatedData=invoiceInfo.Data.filter((item, i) => i !== index); 
        //filter 方法接受一個回調函數，這個回調函數對陣列中的每個元素執行判斷，如果回傳 true，該元素將被保留，否則將被移除
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //console.log("刪除的陣列 : "+invoiceInfo.Data);
      };

    const changeItem =(index,changeData) =>{
        const updatedData = JSON.parse(JSON.stringify(invoiceInfo.Data));//深拷貝
        updatedData[index].NewData = changeData;
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //展開運算子 複製原來的結構，並改寫其中的Data內容
    }

    const addDate=()=>{
        var date=""+invoiceInfo.Date
        var result=date.slice(0,3)+ "/" +date.slice(3,5)+ "/" +date.slice(5,7);
        return(
            result
        )
    }
    console.log(invoiceInfo);
    return(
        
        <SafeAreaView style={styles.safeAreaView}>
            <Modal 
                animationIn={"fadeIn"}
                animationInTiming={800}
                animationOut={"fadeOut"}
                animationOutTiming={800}
                isVisible={modalVisible}
                backdropOpacity={0.9} 
                onBackdropPress={() => setModalVisible(false)}
                >
                <TouchableWithoutFeedback onPress={()=>setModalVisible(false)}> 
                    <View style={[modal_fab.creatRefModalView,{justifyContent:'center'}]}>
                        <View style={{justifyContent:'center',alignItems:'center',marginBottom:moderateScale(90)}}>
                        <Image 
                            source={require('../../../Img/InvoiceHint.gif')} 
                            style={{width:moderateScale(500),height:moderateScale(440),}} 
                            resizeMode="contain"
                        />
                        </View>         
                    </View>             
                </TouchableWithoutFeedback>    
            </Modal>
            
            <Button
                buttonStyle={styles.dateButton}
                //titleStyle={{alignSelf:'flex-start'}}
                icon={<FontAwesomeIcon icon={faCalendarDays} color="#FFFFFF" size={moderateScale(23)}></FontAwesomeIcon>}
                title={<>
                    <Text style={styles.dateTitle}>購買日期</Text>
                    <Text style={styles.dateTitleLeft}>{addDate()}</Text>
                    </>}>     
            </Button>
            <View style={[Userstyle.towList,{height:moderateScale(400),marginVertical:moderateScale(20),paddingHorizontal:moderateScale(20),}]}>
                <FlashList      
                data={invoiceInfo.Data}
                estimatedItemSize={20}
                renderItem={({item,index})=>(
                    <ItemBox 
                        data={ item.NewData? item.NewData: item.OldData} 
                        handleDelete={() => deleteItem(index)} 
                        changeDone={changeItem} //讓子組件呼叫並執行父組建方法 前面為子組件呼叫的方法
                        index={index}                      
                        />
                    )}>

                </FlashList>
            </View>
            <Button
            onPress={()=>{navigation.navigate("InvoiceToRef",{"InvoiceInfo":invoiceInfo})}}
            buttonStyle={styles.nextButton}
            title={"下一步"}
            >     
            </Button>
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
        marginVertical:moderateScale(20),
        color: '#777',
        width:ScreenWidth,
    },
    dateButton:{
        borderRadius:moderateScale(10),
        height:moderateScale(50),
        marginHorizontal:moderateScale(20),
        backgroundColor:"#8C9090",
        justifyContent: 'flex-start',
        marginTop:moderateScale(20),
    },
    dateTitle:{
        marginStart:moderateScale(5),
        fontSize:moderateScale(23),
        color:"#FFFFFF"
    },
    dateTitleLeft:{
        width:moderateScale(200),
        textAlign:'right',
        //backgroundColor:'black',
        flex:1,
        fontSize:moderateScale(25),
        color:"#FFFFFF",
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        marginVertical:moderateScale(20),
        marginHorizontal:moderateScale(50),
        borderRadius:moderateScale(10),
    },
    modalView:{
        borderRadius:moderateScale(10),
        alignSelf:'center',
        //justifyContent:'center',
        backgroundColor:'#FFFFFF',
        height:moderateScale(400),
        //flex:1,
        marginVertical:moderateScale(200),
    },
    modalTitle:{
        marginTop:moderateScale(20),
        marginBottom:moderateScale(20),
        fontSize:moderateScale(30),
        textAlign:'center',
        color:"#777"
    },
    titleView:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
    },
})

export default InvoiceScreen;