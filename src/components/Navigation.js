import React, { useContext } from "react";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import QrcodeScreen from "../screens/QrcodeScreen";


import { AuthContext } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  faHome, faList, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import ListScreen from "../screens/ListScreen"
import SearchScreen from "../screens/SearchScreen";

import * as Animatable from 'react-native-animatable';
import UpdateAccountnameScreen from "../screens/userscreen/UpdateAccountnameScreen";
import SharedAccountScreen from "../screens/userscreen/SharedAccountScreen";
import SharedListScreen from "../screens/userscreen/SharedListScreen";
import UpdateUserRoleScreen from "../screens/userscreen/UpdateUserRoleScreen";
import UpdateUserPhoneScreen from "../screens/userscreen/UpdateUserPhoneScreen";
import UpdateUserNameScreen from "../screens/userscreen/UpdateUserNameScreen";
import UpdateUserPasswordScreen from "../screens/userscreen/UpdateUserPasswordScreen";

import { RefrigeratorProvider } from "../context/RefrigeratorContext";
import Step5Screen from "../screens/create_refrigerator/Step5Screen";
import Step4Screen from "../screens/create_refrigerator/Step4Screen";
import Step3Screen from "../screens/create_refrigerator/Step3Screen";
import Step2Screen from "../screens/create_refrigerator/Step2Screen";
import Step1Screen from "../screens/create_refrigerator/Step1Screen";


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const HomeStack=({navigation,route})=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "Qrcode" || routeName == "Step1" || routeName == "Step2"|| routeName == "Step3"|| routeName == "Step4"|| routeName == "Step5") {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'none',} });
        } else {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'flex',} });
        }
    }, [navigation, route]);
    return(
        <RefrigeratorProvider>
            <Stack.Navigator initialRoutName="Home">   
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{headerShown:false }} />
                <Stack.Screen
                    name="Qrcode"
                    component={QrcodeScreen}
                    options={{headerShown:false }}
                    />
                <Stack.Screen
                    name="Step1"
                    component={Step1Screen}
                    options={{headerShown:false }}
                    />
                <Stack.Screen
                    name="Step2"
                    component={Step2Screen}
                    options={{headerShown:false }}
                    />
                <Stack.Screen
                    name="Step3"
                    component={Step3Screen}
                    options={{headerShown:false }}
                    />
                <Stack.Screen
                    name="Step4"
                    component={Step4Screen}
                    options={{headerShown:false }}
                    />
                <Stack.Screen
                    name="Step5"
                    component={Step5Screen}
                    options={{headerShown:false }}
                    />
            </Stack.Navigator>
        </RefrigeratorProvider>
    );
}

const UserStack=({navigation,route})=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "UpdateAccountname" || routeName == "SharedAccount"|| routeName == "SharedList" || routeName =="UpdateUserName"
            || routeName =="UpdateUserPhone" || routeName =="UpdateUserRole"|| routeName =="UpdateUserPassword") {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'none',} });
        } else {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'flex',} });
        }
    }, [navigation, route]);
    return(
    <Stack.Navigator initialRoutName="User">
        <Stack.Screen
            name="User"
            component={UserScreen}
            options={{ headerShown: false }}/>

        <Stack.Screen
            name="UpdateAccountname"
            component={UpdateAccountnameScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="SharedAccount"
            component={SharedAccountScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="SharedList"
            component={SharedListScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="UpdateUserName"
            component={UpdateUserNameScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="UpdateUserPhone"
            component={UpdateUserPhoneScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="UpdateUserRole"
            component={UpdateUserRoleScreen}
            options={{headerShown:false }}
            />
        <Stack.Screen
            name="UpdateUserPassword"
            component={UpdateUserPasswordScreen}
            options={{headerShown:false }}
            />
    </Stack.Navigator>
        
    );
}

const ListStack=()=>{
    return(
        <Stack.Navigator>
        <Stack.Screen
            name="List"
            component={ListScreen}
            options={{ headerShown: false }}/>
        </Stack.Navigator>
        
    );

}

const SearchStack=()=>{
    return(
        <Stack.Navigator>
        <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}/>
        </Stack.Navigator>
        
    );

}

const Navigation =()=>{

    const {token}=useContext(AuthContext);
    return(
        <NavigationContainer >    
            { token.token ?(
                <>
                <Tab.Navigator 
                //initialRouteName="首頁"
                screenOptions={{
                    headerShown:false,
                    tabBarShowLabel:false,
                    tabBarStyle:{backgroundColor:"#C7E0F9",display:'flex',position: 'absolute'},
                    tabBarInactiveTintColor:'#10348D',
                    tabBarActiveTintColor:'#FFFFFF',
                    lazy:true,
                    unmountOnBlur:true,                   
                }}
                >
                    <Tab.Screen name="首頁" component={HomeStack}   options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                                <FontAwesomeIcon icon={faHome} size={size} color={color} />
                        )
                    }}
                    />
                     <Tab.Screen name="搜尋" component={SearchStack} options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <FontAwesomeIcon icon={faSearch}  size={size} color={color}/>
                        )
                    }}/>
                     <Tab.Screen name="清單" component={ListStack} options={{
                        
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <FontAwesomeIcon icon={faList} size={size} color={color}/>
                        )
                    }}/>
                    <Tab.Screen name="使用者" component={UserStack} options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <FontAwesomeIcon icon={faUser} size={size} color={color}/>
                        )
                    }}/>
                    
                </Tab.Navigator>
                
                </>
            ):(
                <>
                <Stack.Navigator >
                <Stack.Screen
                    name="Login"
                    
                    component={LoginScreen}
                    options={{ headerShown: false , gestureEnabled: false}}
                    //禁止左右滑動返回

                    />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false , gestureEnabled: false}} />
                </Stack.Navigator>
                </>
            )
            }
            
        </NavigationContainer>
    );
};




export default Navigation;