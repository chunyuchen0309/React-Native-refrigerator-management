import React, { Children, useContext } from "react";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import QrcodeScreen from "../screens/add_food/QrcodeScreen";


import { AuthContext } from "../context/AuthContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "../screens/UserScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faHome, faList, faPlus, faSearch, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import ListScreen from "../screens/ListScreen"
import SearchScreen from "../screens/SearchScreen";
import UpdateAccountnameScreen from "../screens/userscreen/UpdateAccountnameScreen";
import SharedAccountScreen from "../screens/userscreen/SharedAccountScreen";
import SharedListScreen from "../screens/userscreen/SharedListScreen";
import UpdateUserRoleScreen from "../screens/userscreen/UpdateUserRoleScreen";
import UpdateUserPhoneScreen from "../screens/userscreen/UpdateUserPhoneScreen";
import UpdateUserNameScreen from "../screens/userscreen/UpdateUserNameScreen";
import UpdateUserPasswordScreen from "../screens/userscreen/UpdateUserPasswordScreen";
import Step5Screen from "../screens/create_refrigerator/Step5Screen";
import Step4Screen from "../screens/create_refrigerator/Step4Screen";
import Step3Screen from "../screens/create_refrigerator/Step3Screen";
import Step2Screen from "../screens/create_refrigerator/Step2Screen";
import Step1Screen from "../screens/create_refrigerator/Step1Screen";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import PostScreen from "../screens/PostScreen";
import InvoiceScreen from "../screens/add_food/InvoiceScreen";
import HandAddScreen from "../screens/add_food/HandAddScreen";
import InvoiceToRefScreen from "../screens/add_food/InvoiceToRefScreen";
import HandToRefScreen from "../screens/add_food/HandToRefScreen";
import NfcScreen from "../screens/NfcScreen";
import RefrigeratorScreen from "../screens/RefrigeratorScreen";
import UpMethodScreen from "../screens/userscreen/UpMethodScreen";
import RegisterBusinessScreen from "../screens/userscreen/RegisterBusinessScreen";
import { scale, moderateScale, verticalScale } from "../screens/ScaleMethod";
import { Button } from "react-native-elements";
import LookModelScreenScreen from "../screens/userscreen/LookModelScreen";
import CreateStep1Screen from "../screens/recipeScreen/CreateStep1Screen";
import CreateStep2Screen from "../screens/recipeScreen/CreateStep2Screen";
import CreateStep3Screen from "../screens/recipeScreen/CreateStep3Screen";
import MyRecipeScreen from "../screens/recipeScreen/MyRecipeScreen";
import ModifyStep1Screen from "../screens/recipeScreen/ModifyStep1Screen";
import ModifyStep2Screen from "../screens/recipeScreen/ModifyStep2Screen";
import ModifyStep3Screen from "../screens/recipeScreen/ModifyStep3Screen";
import { useSelector } from "react-redux";
import BusinessInfoScreen from "../screens/userscreen/BusinessInfoScreen";
import RecipeDetailScreen from "../screens/recipeScreen/RecipeDetailScreen";
import PersonWeb from "../screens/userscreen/PersonWeb";
import FinishedScreen from "../screens/recipeScreen/FinishedScreen";

import { navigationRef } from './RootNavigation';
import SharedBusinessListScreen from "../screens/userscreen/SharedBusinessListScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const PostIcon = ({ children, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}>
        <View style={style.addIconView}
            accessible={true}
            accessibilityRole={"none"}
            accessibilityLabel={`新增食材`}>
            {children}
        </View>
    </TouchableOpacity>
)



const HomeStack = ({ navigation, route }) => {

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "Qrcode" || routeName == "Step1" || routeName == "Step2" || routeName == "Step3" ||
            routeName == "Step4" || routeName == "Step5" || routeName == "Nfc" || routeName == "Refrigerator") {
            navigation.setOptions({ tabBarStyle: { backgroundColor: "#C7E0F9", display: 'none', } });
        } else {
            navigation.setOptions({ tabBarStyle: { ...style.tabBar, ...style.shadow } });
        }
    }, [navigation, route]);
    return (
            <Stack.Navigator
                initialRoutName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                    //headerBackground:'transparent',
                    animation: 'fade_from_bottom',
                    headerTintColor: '#5F5F5F',
                    headerTitleStyle: {
                        fontWeight: '500',
                        headerBackVisible: Platform.OS === 'android' ? 'false' : "true",
                        fontSize: moderateScale(20),
                    },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: "true",
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} />

                <Stack.Screen
                    name="Step1"
                    component={Step1Screen}
                    options={{ title: "步驟一", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Step2"
                    component={Step2Screen}
                    options={{ title: "步驟二", headerBackTitle: '步驟一', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Step3"
                    component={Step3Screen}
                    options={{ title: "步驟三", headerBackTitle: '步驟二', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Step4"
                    component={Step4Screen}
                    options={{ title: "步驟四", headerBackTitle: '步驟三', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Step5"
                    component={Step5Screen}
                    options={{ title: "步驟五", headerBackTitle: '步驟四', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Nfc"
                    component={NfcScreen}
                    options={{ title: "NFC", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
                <Stack.Screen
                    name="Refrigerator"
                    component={RefrigeratorScreen}
                    options={{ title: "存放位置", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
                />
            </Stack.Navigator>
       
    );
}

const UserStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "UpdateAccountname" || routeName == "SharedAccount" || routeName == "SharedList" ||
            routeName == "UpdateUserName" || routeName == "UpdateUserPhone" || routeName == "UpdateUserRole" ||
            routeName == "UpdateUserPassword" || routeName == "UpMethod" || routeName == "RegisterBusiness" ||
            routeName == "LookModelScreen" || routeName == "BusinessInfo" || routeName =="PersonWeb" || routeName=="SharedBusinessList") {
            navigation.setOptions({ tabBarStyle: { backgroundColor: "#C7E0F9", display: 'none', } });
        } else {
            navigation.setOptions({ tabBarStyle: { ...style.tabBar, ...style.shadow } });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRoutName="User"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                //headerBackground:'transparent',
                animation: 'fade_from_bottom',
                headerTintColor: '#5F5F5F',
                headerTitleStyle: {
                    fontWeight: '500',
                    headerBackVisible: Platform.OS === 'android' ? 'false' : "true",
                    fontSize: moderateScale(20),
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: "true",
            }}>
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="UpdateAccountname"
                component={UpdateAccountnameScreen}
                options={{ title: "帳戶名稱", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}

            />
            <Stack.Screen
                name="SharedAccount"
                component={SharedAccountScreen}
                options={{ title: "申請共用", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="SharedList"
                component={SharedListScreen}
                options={{ title: "個人共用帳戶", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="UpdateUserName"
                component={UpdateUserNameScreen}
                options={{ title: "用戶名稱", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="UpdateUserPhone"
                component={UpdateUserPhoneScreen}
                options={{ title: "用戶手機", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="UpdateUserRole"
                component={UpdateUserRoleScreen}
                options={{ title: "用戶身份", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="UpdateUserPassword"
                component={UpdateUserPasswordScreen}
                options={{ title: "更改密碼", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="UpMethod"
                component={UpMethodScreen}
                options={{ title: "升級方案", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="RegisterBusiness"
                component={RegisterBusinessScreen}
                options={{ title: "商業註冊", headerBackTitle: '升級方案', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="LookModelScreen"
                component={LookModelScreenScreen}
                options={{ title: "操作模式", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="BusinessInfo"
                component={BusinessInfoScreen}
                options={{ title: "商業資訊", headerBackTitle: '主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="PersonWeb"
                component={PersonWeb}
                options={{ title: "個人付費", headerBackTitle: '升級方案', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="SharedBusinessList"
                component={SharedBusinessListScreen}
                options={{ title: "商業共用帳戶", headerBackTitle: '升級方案', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
        </Stack.Navigator>

    );
}

const PostStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "Qrcode" || routeName == "Invoice" || routeName == "HandAdd" || routeName == "InvoiceToRef" ||
            routeName == "HandToRef") {
            navigation.setOptions({ tabBarStyle: { backgroundColor: "#C7E0F9", display: 'none', } });
        } else {
            navigation.setOptions({ tabBarStyle: { ...style.tabBar, ...style.shadow } });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRoutName="Post"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                //headerBackground:'transparent',
                animation: 'fade_from_bottom',
                headerTintColor: '#5F5F5F',
                headerTitleStyle: {
                    fontWeight: '500',
                    headerBackVisible: Platform.OS === 'android' ? 'false' : "true",
                    fontSize: moderateScale(20),
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: "true",
                //headerTransparent:'true',
            }}>
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{
                    headerShown: false, title: '新增方式'
                }} />
            <Stack.Screen
                name="Qrcode"
                component={QrcodeScreen}
                options={{ title: "QRcode掃描", headerBackTitle: '返回主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="Invoice"
                component={InvoiceScreen}
                options={{ title: "發票資訊", headerBackTitle: 'QRcode', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="HandAdd"
                component={HandAddScreen}
                options={{ title: "新增食物", headerBackTitle: '返回主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="InvoiceToRef"
                component={InvoiceToRefScreen}
                options={{ title: "存入冰箱", headerBackTitle: '發票資訊', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="HandToRef"
                component={HandToRefScreen}
                options={{ title: "存入冰箱", headerBackTitle: '新增品項', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
        </Stack.Navigator>
    );
}
const ListStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "createStep1" || routeName == "createStep2" || routeName == "createStep3" ||
            routeName == "MyRecipe" || routeName == "ModifyStep1" || routeName == "ModifyStep2" ||
            routeName == "ModifyStep3" || routeName == "RecipeDetail" || routeName == "Finished") {
            navigation.setOptions({ tabBarStyle: { backgroundColor: "#C7E0F9", display: 'none', } });
        } else {
            navigation.setOptions({ tabBarStyle: { ...style.tabBar, ...style.shadow } });
        }
    }, [navigation, route]);
    return (
        <Stack.Navigator
            initialRoutName="List"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                },
                //headerBackground:'transparent',
                animation: 'fade_from_bottom',
                headerTintColor: '#5F5F5F',
                headerTitleStyle: {
                    fontWeight: '500',
                    headerBackVisible: Platform.OS === 'android' ? 'false' : "true",
                    fontSize: moderateScale(20),
                },
                headerTitleAlign: 'center',
                headerBackTitleVisible: "true",
                //headerTransparent:'true',
            }}>
            <Stack.Screen
                name="List"
                component={ListScreen}
                options={{ headerShown: false }} />

            <Stack.Screen
                name="createStep1"
                component={CreateStep1Screen}
                options={{ title: "建立食譜1/3", headerBackTitle: '返回主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="createStep2"
                component={CreateStep2Screen}
                options={{ title: "建立食譜2/3", headerBackTitle: '返回1/3', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="createStep3"
                component={CreateStep3Screen}
                options={{ title: "建立食譜3/3", headerBackTitle: '返回2/3', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="MyRecipe"
                component={MyRecipeScreen}
                options={{ title: "我的食譜", headerBackTitle: '返回主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="ModifyStep1"
                component={ModifyStep1Screen}
                options={{ title: "修改食譜", headerBackTitle: '我的食譜', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="ModifyStep2"
                component={ModifyStep2Screen}
                options={{ title: "修改食譜", headerBackTitle: '我的食譜', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="ModifyStep3"
                component={ModifyStep3Screen}
                options={{ title: "修改食譜", headerBackTitle: '我的食譜', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="RecipeDetail"
                component={RecipeDetailScreen}
                options={{ title: "食譜資訊", headerBackTitle: '返回主頁', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />
            <Stack.Screen
                name="Finished"
                component={FinishedScreen}
                options={{ title: "完成烹飪", headerBackTitle: '食譜資訊', headerBackVisible: Platform.OS == 'android' ? false : true }}
            />

        </Stack.Navigator>
    );
}

const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    var iconPlace = (Platform.OS === 'android' ? iconPlace = { top: 0 } : iconPlace = { top: 10 });
    const { isLogin } = useContext(AuthContext);
    const state = useSelector(state => state.userInfo);
    return (
        <NavigationContainer //包在最外藏的container
            ref={navigationRef}
        >
            {isLogin ? (
                <>

                    <Tab.Navigator //tab的最外層 
                        initialRouteName="首頁"
                        screenOptions={{
                            headerShown: false,
                            tabBarShowLabel: false,
                            tabBarStyle: { ...style.tabBar, ...style.shadow },
                            tabBarInactiveTintColor: '#10348D',
                            tabBarActiveTintColor: '#FFFFFF',
                            lazy: true,
                            unmountOnBlur: true,
                        }}>

                        <Tab.Screen
                            
                            name="首頁"
                            component={HomeStack}
                            options={{
                                tabBarAccessibilityLabel:"首頁",
                                
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? size = moderateScale(30, 0.3) : size = moderateScale(25, 0.3),
                                    <View
                                        style={[style.tabIconView, iconPlace]}

                                    >
                                        <FontAwesomeIcon icon={faHome} size={size} color={color} />
                                    </View>
                                )
                            }}
                        />
                        <Tab.Screen
                            name="搜尋"
                            
                            component={SearchStack}
                            options={{
                                tabBarAccessibilityLabel:"搜尋",
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? size = moderateScale(30, 0.3) : size = moderateScale(25, 0.3),
                                    <View style={[style.tabIconView, iconPlace]}
                                    >
                                        <FontAwesomeIcon icon={faSearch} size={size} color={color} />
                                    </View>

                                )
                            }} />

                        <Tab.Screen
                            name="新增"
                            component={PostStack}
                            options={{
                                tabBarIcon: ({ focused, color, size }) => (
                                    <FontAwesomeIcon icon={faPlus} size={moderateScale(30)} color={"#FFFFFF"} />
                                ),
                                tabBarButton: (props) => ( //呼叫上方自定義按鈕
                                    <PostIcon {...props} />
                                )
                            }} />

                        <Tab.Screen name="清單" component={ListStack} options={{
                            tabBarAccessibilityLabel:"食譜",
                            tabBarIcon: ({ focused, color, size }) => (
                                focused ? size = moderateScale(30, 0.3) : size = moderateScale(25, 0.3),
                                <View style={[style.tabIconView, iconPlace]}
                                    >
                                    <FontAwesomeIcon icon={faUtensils} size={size} color={color} />
                                </View>

                            )
                        }} />
                        <Tab.Screen 
                            name="使用者" 
                            component={UserStack} 
                            options={{
                                tabBarAccessibilityLabel:"使用者",
                            tabBarIcon: ({ focused, color, size }) => (

                                focused ? size = moderateScale(30, 0.3) : size = moderateScale(25, 0.3),
                                <View style={[style.tabIconView, iconPlace]}
                                    >
                                    <FontAwesomeIcon icon={faUser} size={size} color={color} />
                                </View>
                            )
                        }} />

                    </Tab.Navigator>

                </>
            ) : (
                <>
                    <Stack.Navigator >
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false, gestureEnabled: false }}
                        //禁止左右滑動返回
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false, gestureEnabled: false }} />
                    </Stack.Navigator>
                </>
            )
            }

        </NavigationContainer>
    );
};

const style = StyleSheet.create({
    tabBar: {
        backgroundColor: "#C7E0F9",
        height: moderateScale(60, 0.2),
        bottom: moderateScale(25),
        position: 'absolute',
        marginHorizontal: moderateScale(25),
        borderRadius: moderateScale(15),
        //left:25,
        //right:25,

    },
    tabIconView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        top: moderateScale(10),
    },
    shadow: {
        shadowColor: '#10348D',
        shadowOffset: {
            width: 0,
            height: moderateScale(5),
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: moderateScale(5),
    },
    addIconView: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#FFB218',
        top: moderateScale(-30),
        borderRadius: moderateScale(50),
        width: moderateScale(70, 0.4),
        height: moderateScale(70, 0.4),
        padding: moderateScale(15),
        shadowColor: '#10348D',
        shadowOffset: {
            width: 0,
            height: moderateScale(5),
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: moderateScale(5),
    }
})



export default Navigation;