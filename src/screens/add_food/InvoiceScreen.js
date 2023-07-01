import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { FlashList } from "@shopify/flash-list";
import ItemBox from "./InvoiceItemBox";

const InvoiceScreen=()=>{
    //const [invoiceList,setInvoiceList]=useState([]);
    const route = useRoute();
    const [invoiceInfo, setInvoiceInfo] = useState({});
    const navigation=useNavigation();

    useEffect(()=>{
        setInvoiceInfo(route.params?.invoiceData);
        //setInvoiceInfo(
          //{
        //"Number":"A1234567",
        //"Date":"1130601",
        //"Data":[{"OldData":"小美冰淇淋","NewData":""},{"OldData":"可口可樂","NewData":""},{"OldData":"雀巢檸檬茶","NewData":""},]
        //});
    },[]);

    const deleteItem = (index) => { //回調函數
        console.log("刪除call")
        const updatedData=invoiceInfo.Data.filter((item, i) => i !== index);
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
        //console.log("刪除的陣列 : "+invoiceInfo.Data);
      };

    const changeItem =(index,changeData) =>{
        const updatedData = JSON.parse(JSON.stringify(invoiceInfo.Data));//深拷貝
        updatedData[index].NewData = changeData;
        setInvoiceInfo({ ...invoiceInfo, Data: updatedData });
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
            <Text style={styles.title}>
                發票內容
            </Text>
            <Button
            buttonStyle={styles.dateButton}
            //titleStyle={{alignSelf:'flex-start'}}
            icon={<FontAwesomeIcon icon={faCalendarDays} color="#FFFFFF" size={25}></FontAwesomeIcon>}
            title={<>
                <Text style={styles.dateTitle}>購買日期</Text>
                <Text style={styles.dateTitleLeft}>{addDate()}</Text>
                </>}>     
            </Button>
            <View style={[Userstyle.towList,{height:400,marginVertical:20,paddingHorizontal:20,}]}>
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
        fontSize:25,
        marginVertical:35,
        color: '#777'
    },
    dateButton:{
        borderRadius:10,
        height:50,
        marginHorizontal:20,
        backgroundColor:"#8C9090",
        justifyContent: 'flex-start',
    },
    dateTitle:{
        marginStart:5,
        fontSize:25,
        color:"#FFFFFF"
    },
    dateTitleLeft:{
        width:200,
        textAlign:'right',
        //backgroundColor:'black',
        fontSize:25,
        color:"#FFFFFF",
    },
    nextButton:{
        backgroundColor:"#A9FF3C",
        marginVertical:20,
        marginHorizontal:50,
        borderRadius:10,
    },
})

export default InvoiceScreen;