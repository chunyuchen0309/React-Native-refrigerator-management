import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Alert, StyleSheet, TextInput, Keyboard } from "react-native";
import Userstyle from "../../style/UserStyle";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Button, Input, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown, faAngleUp, faBookBookmark, faBookmark, faCalendar, faCheck, faList, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-native-modal";
import { TouchableWithoutFeedback } from "react-native";
import { scale, moderateScale, verticalScale } from "../ScaleMethod";
import DropDownPicker from "react-native-dropdown-picker";
import dropdown from "../../style/Dropdown";
import DatePicker from "react-native-date-picker";
import { AuthContext } from "../../context/AuthContext";
import modal_fab from "../../style/Modal&FAB";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useSelector } from "react-redux";
const ItemBox = (props) => {
	const swipeableRef = useRef(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [ItemModalVisible, setItemModalVisible] = useState(false);
	//const [changeIndex,setChangeIndex]=useState(props.data);
	const [newName, setNewName] = useState('');
	const [foodCategory, setFoodCategory] = useState("");
	const [foodDate, setFoodDate] = useState("");
	const [date, setDate] = useState(new Date())
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [open, setOpen] = useState(false);
	const [month, setMonth] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
	const [foodCategoryList, setFoodCategoryList] = useState([
		{ label: '蔬菜類', value: '' },
		{ label: '肉類', value: '' },
		{ label: '海鮮', value: '' },
		{ label: '飲品類', value: '' },
		{ label: '水果類', value: '' },
		{ label: '加工食品類', value: '' },
		{ label: '冰品', value: '' },
		{ label: '甜點', value: '' },
		{ label: '奶製品', value: '' },
		{ label: '豆類', value: '' },
		{ label: '雞蛋', value: '' },
		{ label: '剩菜', value: '' },]);
	const { lookModel } = useContext(AuthContext);
	const [YMD, setTMD] = useState([]);
	const userState = useSelector(state => state.userInfo);
	useEffect(() => {
		setTMD(foodDate.split('/'));
	}, [foodDate]); //作用為即時更新選擇的數據，呈現在input之中
	//useEffect(() => {
	//setChangeIndex(props.data);
	//}, [props.data]); //作用為即時更新選擇的數據，呈現在input之中


	const getFoodCategoryList = () => {
        axios.get(`${BASE_URL}/storage/category`, {
            headers: {
                'Authorization': userState.token
            }
        }).then( res => {
            console.log(res.data);
            for(let i=0;i<res.data.length;i++){
                for(let j=0;j<foodCategoryList.length;j++)
                if(res.data[i].category_name==foodCategoryList[j].label){
                    foodCategoryList[j].value=res.data[i].category_id
                }
            }
        }).catch(e => {
            console.log(e);
        }).finally(()=>{
            console.log("食物選單123",foodCategoryList);
            
        });
    }
	useEffect(() => {
		getFoodCategoryList();
		
		//console.log("輸入的食材種類",props.data.Category)
	}, []); //作
	useEffect(() => {
		setNewName(props.data.OldData);
		setFoodCategory(props.data.Category);
		setFoodDate(props.data.Date);
		
		//console.log("輸入的食材種類",props.data.Category)
	}, [props.data.OldData,props.data.Category,props.data.Date]); //作用為即時更新選擇的數據，呈現在input之中

	useEffect(() => {
		// 监听 selectedFoodCategory 的变化
		if (foodCategory) {
			changeDoneCategory(); // 传递给父组件
		}
	}, [open]);

	useEffect(() => {
		// 监听 selectedFoodCategory 的变化
		if (foodDate) {
			changeDoneDate(); // 传递给父组件
		}
	}, [datePickerOpen]);



	const rightSwipe = () => {
		return (
			<TouchableOpacity
				style={{ flex: 1, }}
			>
				<View style={Userstyle.deleteInvoicebox}>
					<FontAwesomeIcon icon={faTrash} size={25} color="#FFFFFF"></FontAwesomeIcon>
				</View>
			</TouchableOpacity>
		);
	};
	const changeDoneName = () => {
		props.changeDoneName(props.index, newName);//呼叫父元素組建並回傳更改的index及值
		//swipeableRef.current.close();
	}
	const changeDoneCategory = () => {
		setTimeout(() => {
			props.changeDoneCategory(props.index, foodCategory);//呼叫父元素組建並回傳更改的index及值
		}, 0);
	}
	const changeDoneDate = () => {
		setTimeout(() => {
			props.changeDoneDate(props.index, foodDate);//呼叫父元素組建並回傳更改的index及值
		}, 0);
		//swipeableRef.current.close();
	}
	/**
		 * 
		 * @param {*} date 
		 * 更改日期
		 */
	const changeData = (date) => {
		//console.log(date);
		let datelist = date.split(/\s+/);
		//console.log(datelist);
		//;
		let tempDate = datelist[3] + "/" + month.indexOf(datelist[1]) + "/" + datelist[2];
		setFoodDate(tempDate);
	}
	const inputName = React.createRef();

	return (
		<>
			<Swipeable
				renderRightActions={rightSwipe}
				onSwipeableOpen={(directio) => { if (directio == "right") { swipeableRef.current.close(), props.handleDelete() } }}
				//renderLeftActions={leftSwipe}
				overshootLeft={false}
				ref={swipeableRef} >
				{lookModel ?
					<>
						<View style={[Userstyle.listButton, { height: moderateScale(80), marginHorizontal: 0, backgroundColor: '#CECECE' }]}>
							<Input
								selectionColor='#777'
								ref={inputName}
								leftIcon={<TouchableOpacity onPress={() => inputName.current.focus()}><FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(15)}></FontAwesomeIcon></TouchableOpacity>}
								containerStyle={{ paddingHorizontal: moderateScale(10), paddingTop: moderateScale(5), height: moderateScale(40) }}
								inputContainerStyle={{ height: moderateScale(30,0.7), borderBottomWidth: 0, backgroundColor: 'white', borderRadius: moderateScale(10), paddingLeft: moderateScale(10) }}
								inputStyle={{ lineHeight: moderateScale(20), fontSize: moderateScale(15), color: '#777', fontWeight: '500' }}
								value={newName}
								onChangeText={setNewName}
								onBlur={() => changeDoneName()}>
							</Input>
							<View style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: 'white', borderRadius: moderateScale(10), marginHorizontal: moderateScale(10), marginVertical: moderateScale(2), height: moderateScale(30) }}>
								<TouchableOpacity onPress={() => setOpen(true)} style={{ alignSelf: 'center', marginLeft: moderateScale(10) }} >
									<FontAwesomeIcon icon={faList} color="#BFBFBF" size={moderateScale(15)} ></FontAwesomeIcon>
								</TouchableOpacity>
								<DropDownPicker
									zIndex={9000}
									onPress={Keyboard.dismiss}
									placeholder="選擇種類"
									style={{ borderWidth: 0, backgroundColor: 'transparent', paddingBottom: moderateScale(22,-0.7), paddingLeft: moderateScale(3) }}
									containerStyle={{ backgroundColor: 'transparent', flex: 1, alignSelf: 'flex-start' }}
									textStyle={{ fontSize: moderateScale(15), color: '#777', fontWeight: '500'}}
									placeholderStyle={{ color: '#777', fontWeight: '500' }}
									searchable={false}
									listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5), zIndex: 100 }} //下方item內容文字
									listItemContainerStyle={{ height: moderateScale(50), zIndex: 100 }} //下方item高度 
									selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
									selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
									TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
									listParentContainerStyle={{ paddingLeft: moderateScale(20) }}
									listParentLabelStyle={{ fontWeight: "bold" }}
									listMode="MODAL"
									modalProps={{
										animationType: "slide"
									}}
									itemKey="value"
									open={open}
									setOpen={setOpen}
									value={foodCategory}
									setValue={(text) => { setFoodCategory(text) }}
									items={foodCategoryList}
									closeOnBackPressed={true}
									closeAfterSelecting={true}
									showArrowIcon={false}>
								</DropDownPicker>
								<Input
									leftIcon={<TouchableOpacity onPress={() => setDatePickerOpen(true)}><FontAwesomeIcon icon={faCalendar} color="#BFBFBF" size={moderateScale(15)}></FontAwesomeIcon></TouchableOpacity>}
									containerStyle={{ height: moderateScale(40), flex: 1, alignItems: 'flex-end' }}
									inputContainerStyle={{ height: moderateScale(30,0.8), borderBottomWidth: 0 }}
									inputStyle={{ lineHeight: moderateScale(20,), fontSize: moderateScale(16), color: '#777', fontWeight: '500' }}
									value={foodDate}
									placeholder="有效日期"
									placeholderTextColor="#777"
									onPressIn={() => { setDatePickerOpen(true) }}>
								</Input>
								<DatePicker
									title={"選擇食物過期日期"}
									modal
									confirmText="確定"
									cancelText="取消"
									mode="date"
									open={datePickerOpen}
									date={date}
									onConfirm={(date) => {
										changeData("" + date);
										setDatePickerOpen(false);
									}}
									onCancel={() => {
										setDatePickerOpen(false);
									}}
								/>
							</View>
						</View>
					</> :
					<>
						<Modal
							animationIn={"fadeIn"}
							animationInTiming={800}
							animationOut={"fadeOut"}
							animationOutTiming={100}
							isVisible={ItemModalVisible}
							backdropOpacity={0.9}
							onBackdropPress={() => setItemModalVisible(false)}
						>
							<TouchableWithoutFeedback onPress={() => setItemModalVisible(false)}
								accessible={false}
								accessibilityRole="none"
								>

								<View style={[modal_fab.lookSeelect,{marginVertical:moderateScale(180),}]}>
									<Text style={Userstyle.textLabel}
										accessible={false}
										accessibilityRole="none" // 设置为 "none" 表示标签不可点击
										accessibilityState={{ disabled: true }} >
										食物名稱
									</Text>
									<TextInput
										returnKeyType='done'
										selectionColor='#777'
										accessibilityLabel="食物名稱"
										accessible={true}
										style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(-20) }]}
										value={newName}
										onChangeText={setNewName}
									/>
									<Text style={Userstyle.textLabel}
										accessible={false}
										accessibilityRole="none" // 设置为 "none" 表示标签不可点击
										accessibilityState={{ disabled: true }} >
										食物種類
									</Text>
									<DropDownPicker
										onPress={Keyboard.dismiss}
										placeholder="選擇種類"
										style={[dropdown.squareBox,{}]}
										containerStyle={[dropdown.squareContainer,{marginTop:moderateScale(0),width:moderateScale(290,1.1),marginBottom:moderateScale(-20)}]}
										textStyle={{ fontSize: moderateScale(18), color: '#777', fontWeight: '500' }}
										placeholderStyle={{ color: '#777', fontWeight: '500' }}
										searchable={false}
										dropDownContainerStyle={{ borderRadius: 0, }} //下拉選單外誆
										listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5) }} //下方item內容文字
										listItemContainerStyle={{ height: moderateScale(35) }} //下方item高度 
										selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
										selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
										TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
										listParentContainerStyle={{ paddingLeft: moderateScale(20) }}
										listParentLabelStyle={{ fontWeight: "bold" }}
										listChildContainerStyle={{}}
										listMode="MODAL"
										modalProps={{
											animationType: "slide"
										}}
										itemKey="value"
										open={open}
										setOpen={setOpen}
										value={foodCategory}
										setValue={(text) => { setFoodCategory(text) }}
										items={foodCategoryList}
										closeOnBackPressed={true}
										closeAfterSelecting={true}
										showArrowIcon={false}>
									</DropDownPicker>
									<Text style={Userstyle.textLabel}
										accessible={false}
										accessibilityRole="none" // 设置为 "none" 表示标签不可点击
										accessibilityState={{ disabled: true }} >
										到期日期
									</Text>
									<TextInput
										accessibilityLabel="到期日期"
										accessible={true}
										style={[Userstyle.textContainerStyle, { marginBottom: moderateScale(40) }]}
										value={foodDate}
										//onChangeText={text=>setFoodDate(text)}
										onPressIn={() => { setDatePickerOpen(true) }}
									/>
									<DatePicker
										disabled
										title={"選擇食物過期日期"}
										modal
										confirmText="確定"
										cancelText="取消"
										mode="date"
										open={false}
										date={date}
										onConfirm={(date) => {
											changeData("" + date);
											setDatePickerOpen(false);
										}}
										onCancel={() => {
											setDatePickerOpen(false);
										}}
									/>
									<Button
										onPress={() => { setItemModalVisible(false) }}
										buttonStyle={{
											backgroundColor: "#D6D6D6",
											marginVertical: moderateScale(0),
											marginHorizontal: moderateScale(30),
											borderRadius: moderateScale(10),}}
										title={"完成修改"}
									>
								</Button>
								</View>
								
							</TouchableWithoutFeedback>
						</Modal>
						<TouchableOpacity
							onPress={() => setItemModalVisible(true)}
							accessible={true}
							accessibilityRole={"none"}
							accessibilityLabel={`食物名稱為${newName},種類為${foodCategoryList[foodCategoryList.findIndex(item => item.value === foodCategory)]?.label}有效日期為${YMD[0]}年${YMD[1]}月${YMD[2]}日`}
						>
							<View style={[Userstyle.listButton, { height: moderateScale(80), marginHorizontal: 0, backgroundColor: '#CECECE' }]}

							>

								<Input
									disabled
									disabledInputStyle={{lineHeight: moderateScale(20), fontSize: moderateScale(15), color: 'black', fontWeight: '500'}}
									selectionColor='#777'
									ref={inputName}
									leftIcon={<TouchableOpacity disabled onPress={() => inputName.current.focus()}><FontAwesomeIcon icon={faBookmark} color="#FF9900" size={moderateScale(15)}></FontAwesomeIcon></TouchableOpacity>}
									containerStyle={{ paddingHorizontal: moderateScale(10), paddingTop: moderateScale(5), height: moderateScale(40) }}
									inputContainerStyle={{ height: moderateScale(30), borderBottomWidth: 0, backgroundColor: 'white', borderRadius: moderateScale(10), paddingLeft: moderateScale(10) }}
									inputStyle={{ lineHeight: moderateScale(20), fontSize: moderateScale(15), color: '#777', fontWeight: '500' }}
									value={newName}
									onChangeText={setNewName}
									onBlur={() => changeDoneName()}>
								</Input>
								<View style={{ flexDirection: 'row', flexWrap: 'nowrap', backgroundColor: 'white', borderRadius: moderateScale(10), marginHorizontal: moderateScale(10), marginVertical: moderateScale(2), height: moderateScale(30) }}>
									<TouchableOpacity disabled onPress={() => setOpen(true)} style={{ alignSelf: 'center', marginLeft: moderateScale(10) }} >
										<FontAwesomeIcon icon={faList} color="#BFBFBF" size={moderateScale(15)} ></FontAwesomeIcon>
									</TouchableOpacity>
									<DropDownPicker
										disabled
										zIndex={9000}
										onPress={Keyboard.dismiss}
										placeholder="選擇種類"
										style={{ borderWidth: 0, backgroundColor: 'transparent', paddingBottom: moderateScale(22), paddingLeft: moderateScale(3) }}
										containerStyle={{ backgroundColor: 'transparent', flex: 1, alignSelf: 'flex-start' }}
										textStyle={{ fontSize: moderateScale(15), color: '#777', fontWeight: '500' }}
										placeholderStyle={{ color: '#777', fontWeight: '500' }}
										searchable={false}
										listItemLabelStyle={{ color: "#777", fontSize: moderateScale(17, 0.5), zIndex: 100 }} //下方item內容文字
										listItemContainerStyle={{ height: moderateScale(50), zIndex: 100 }} //下方item高度 
										selectedItemLabelStyle={{ fontWeight: "bold", color: '#777' }} //選擇後的item文字
										selectedItemContainerStyle={{ backgroundColor: "#FFC55A" }} //選擇後的item高度＆背景
										TickIconComponent={({ style }) => <FontAwesomeIcon icon={faCheck} color="#777" style={style} />} //選擇到的item右方勾勾
										listParentContainerStyle={{ paddingLeft: moderateScale(20) }}
										listParentLabelStyle={{ fontWeight: "bold" }}
										listMode="MODAL"
										modalProps={{
											animationType: "slide"
										}}
										itemKey="value"
										open={open}
										setOpen={setOpen}
										value={foodCategory}
										setValue={(text) => { setFoodCategory(text) }}
										items={foodCategoryList}
										closeOnBackPressed={true}
										closeAfterSelecting={true}
										showArrowIcon={false}>
									</DropDownPicker>
									<Input
									disabledInputStyle={{lineHeight: moderateScale(20), fontSize: moderateScale(15), color: 'black', fontWeight: '500'}}
										disabled
										leftIcon={<TouchableOpacity disabled onPress={() => setDatePickerOpen(true)}><FontAwesomeIcon icon={faCalendar} color="#BFBFBF" size={moderateScale(15)}></FontAwesomeIcon></TouchableOpacity>}
										containerStyle={{ height: moderateScale(40), flex: 1, alignItems: 'flex-end' }}
										inputContainerStyle={{ height: moderateScale(30), borderBottomWidth: 0 }}
										inputStyle={{ lineHeight: moderateScale(20), fontSize: moderateScale(16), color: '#777', fontWeight: '500' }}
										value={foodDate}
										placeholder="有效日期"
										placeholderTextColor="#777"
									//onPressIn={() => { setDatePickerOpen(true) }}
									>
									</Input>
									<DatePicker
										disabled
										title={"選擇食物過期日期"}
										modal
										confirmText="確定"
										cancelText="取消"
										mode="date"
										open={datePickerOpen}
										date={date}
										onConfirm={(date) => {
											changeData("" + date);
											setDatePickerOpen(false);
										}}
										onCancel={() => {
											setDatePickerOpen(false);
										}}
									/>
								</View>

							</View>
						</TouchableOpacity>
					</>}

			</Swipeable>
		</>
	);
};
const style = StyleSheet.create({
	modalView: {
		opacity: 1,
		borderRadius: 10,
		alignSelf: 'center',
		//justifyContent:'center',
		backgroundColor: '#FFFFFF',
		width: 280,
		height: 200,
	},
	modalTitle: {
		marginVertical: 20,
		fontSize: 30,
		textAlign: 'center',
	},
	modalContent: {
		padding: 10,
		lineHeight: 30,
		fontSize: 18,
		color: '#8D8D8D',
		//textAlign:'center',
	}
})

export default ItemBox;