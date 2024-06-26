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
const RegisterBusinessScreen = () => {
	console.log("UpdateAccountnameScreen");
	const [companyName, setCompanyName] = useState("");
	const [companyAddress, setCompanyAddress] = useState("");
	const [companyPhone, setCompanyPhone] = useState("");
	const [uniformNumbers, setUniformNumbers] = useState("");
	const state = useSelector(state => state.userInfo);
	const route = useRoute();
	const { token } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation();


	const sendApi = () => {  //同意申請
		console.log("agreeAccount_up");
		axios({
			method: "POST",
			url: `${BASE_URL}/account/account/business/register`,
			headers: { 'Authorization': state.token },
			data: {
				"address": "" + companyAddress,
				"name": "" + companyName,
				"phone": "" + companyPhone,
				"number": "" + uniformNumbers,
			},
		}).then(res => {
			console.log("註冊商業帳號成功", res.data);
		}).catch(function (error) {
			console.log(error);
		}).finally(() => {
			navigation.navigate('User');
		});
	}

	const handleCompanyName = useCallback((text) => {
		setCompanyName(text);
	}, []);
	const handleCompanyAddressChange = useCallback((text) => {
		setCompanyAddress(text);
	}, []);
	const handleCompanyPhoneChange = useCallback((text) => {
		setCompanyPhone(text);
	}, []);
	const handleUniformNumbersChange = useCallback((text) => {
		setUniformNumbers(text);
	}, []);

	useEffect(() => {
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView style={Userstyle.safeAreaView}>
				<KeyboardAvoidingView behavior="position" enabled>
					<View style={Userstyle.greyBg}>
						<Input
							autoCapitalize="none"
							selectionColor='#777'
							label="公司名稱"
							labelStyle={Userstyle.lable1}
							containerStyle={[Userstyle.containerStyle2, { marginTop: moderateScale(20) }]}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							inputStyle={Userstyle.inputStyle1}
							value={companyName}
							onChangeText={handleCompanyName}
						/>
						<Input
							autoCapitalize="none"
							selectionColor='#777'
							label="公司地址"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							inputStyle={Userstyle.inputStyle1}
							value={companyAddress}
							onChangeText={handleCompanyAddressChange}
						/>
						<Input
							keyboardType="numeric"
							selectionColor='#777'
							label="公司電話"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							inputStyle={Userstyle.inputStyle1}
							value={companyPhone}
							onChangeText={handleCompanyPhoneChange}
						/>
						<Input
							keyboardType="numeric"
							autoCapitalize="none"
							selectionColor='#777'
							label="統一編號"
							labelStyle={Userstyle.lable1}
							containerStyle={Userstyle.containerStyle2}
							inputContainerStyle={Userstyle.inputContainerStyle1}
							inputStyle={Userstyle.inputStyle1}
							value={uniformNumbers}
							onChangeText={handleUniformNumbersChange}
						/>
						<Button
							buttonStyle={Userstyle.buttonUpdate}
							title="送出"
							titleStyle={{ fontSize: moderateScale(17), fontWeight: '500' }}
							loading={isLoading}
							onPress={() => { sendApi() }} />
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};


export default RegisterBusinessScreen;