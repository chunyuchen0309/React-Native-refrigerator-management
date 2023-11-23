import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Input, } from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { moderateScale } from "../ScaleMethod";
import { useSelector } from "react-redux";
const BusinessInfoScreen = () => {
	console.log("UpdateAccountnameScreen");
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [uniformNumbers, setUniformNumbers] = useState("");
	const state = useSelector(state => state.userInfo);
	const route = useRoute();

	const navigation = useNavigation();


	useEffect(() => {
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={Userstyle.safeAreaView}>
				<KeyboardAvoidingView behavior="position" enabled>
					<View style={Userstyle.greyBg}>
						<Input
							disabled
							
							label="公司名稱"
							labelStyle={Userstyle.lable1}
							containerStyle={[Userstyle.containerStyle2, { marginTop: moderateScale(20) }]}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							disabledInputStyle={[Userstyle.inputStyle1,{color:'black'}]}
							value={state.businessInfo.name}
						//onChangeText={handleCompanyName}
						/>
						<Input
							disabled
							selectionColor='#777'
							label="公司地址"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							disabledInputStyle={[Userstyle.inputStyle1,{color:'black'}]}
							value={state.businessInfo.address}
						//onChangeText={handleCompanyAddressChange}
						/>
						<Input
							disabled
							selectionColor='#777'
							label="公司電話"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							disabledInputStyle={[Userstyle.inputStyle1,{color:'black'}]}
							value={state.businessInfo.phone}
						//onChangeText={handleCompanyPhoneChange}
						/>
						<Input
							disabled
							selectionColor='#777'
							label="統一編號"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							disabledInputStyle={[Userstyle.inputStyle1,{color:'black'}]}
							value={state.businessInfo.number}
						//onChangeText={handleUniformNumbersChange}
						/>

					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};


export default BusinessInfoScreen;