import React, { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, CheckBox, Input, Text,} from "react-native-elements";
import Userstyle from "../../style/UserStyle";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../config";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import WebView from "react-native-webview";

const PersonWeb=()=>{
    console.log("PersonWeb");
    return(
        <WebView
            source={{ uri: 'https://p-stage.ecpay.com.tw/DE9B488' }}
            style={{ flex: 1 }}
                    
                />
        
    );
};


export default PersonWeb;