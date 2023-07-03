import React, { Children, useContext } from "react";
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
import {  faHome, faList, faPlus, faSearch, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import ListScreen from "../screens/ListScreen"
import SearchScreen from "../screens/SearchScreen";
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
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PostScreen from "../screens/PostScreen";
import InvoiceScreen from "../screens/add_food/InvoiceScreen";
import HandAddScreen from "../screens/add_food/HandAddScreen";
import InvoiceToRefScreen from "../screens/add_food/InvoiceToRefScreen";
import HandToRefScreen from "../screens/add_food/HandToRefScreen";


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const PostIcon = ({children,onPress})=>(
    <TouchableOpacity
    onPress={onPress}>
        <View style={style.addIconView}>
            {children}
        </View>
    </TouchableOpacity>
)
    


const HomeStack=({navigation,route})=>{
    
    

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "Qrcode" || routeName == "Step1" || routeName == "Step2"|| routeName == "Step3"|| routeName == "Step4"|| routeName == "Step5") {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'none',} });
        } else {
            navigation.setOptions({ tabBarStyle:{...style.tabBar,...style.shadow} });
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
            navigation.setOptions({ tabBarStyle:{...style.tabBar,...style.shadow} });
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

const PostStack=({navigation,route})=>{
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        //console.log(routeName)
        if (routeName == "Qrcode" || routeName =="Invoice" || routeName =="HandAdd" || routeName=="InvoiceToRef" || routeName=="HandToRef") {
            navigation.setOptions({ tabBarStyle:{backgroundColor:"#C7E0F9",display:'none',} });
        } else {
            navigation.setOptions({ tabBarStyle:{...style.tabBar,...style.shadow} });
        }
    }, [navigation, route]);
    return(
        <Stack.Navigator initialRoutName="Post">
            <Stack.Screen
                name="Post"
                component={PostScreen}
                options={{ headerShown: false }}/>
            <Stack.Screen
                    name="Qrcode"
                    component={QrcodeScreen}
                    options={{headerShown:false }}
                    />
            <Stack.Screen
                    name="Invoice"
                    component={InvoiceScreen}
                    options={{headerShown:false }}
                    />
            <Stack.Screen
                    name="HandAdd"
                    component={HandAddScreen}
                    options={{headerShown:false }}
                    />
            <Stack.Screen
                    name="InvoiceToRef"
                    component={InvoiceToRefScreen}
                    options={{headerShown:false }}
                    />
            <Stack.Screen
                    name="HandToRef"
                    component={HandToRefScreen}
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
    var iconPlace=(Platform.OS === 'android'? iconPlace={top:0}:iconPlace={top:10});
    const {token}=useContext(AuthContext);
    return(
        <NavigationContainer //包在最外藏的container
        >    
            { token.token ?(
                <>
                <Tab.Navigator //tab的最外層 
                //initialRouteName="首頁"
                screenOptions={{
                    headerShown:false,
                    tabBarShowLabel:false,
                    tabBarStyle:{...style.tabBar,...style.shadow},
                    tabBarInactiveTintColor:'#10348D',
                    tabBarActiveTintColor:'#FFFFFF',
                    lazy:true,
                    unmountOnBlur:true,}}>

                    <Tab.Screen name="首頁" component={HomeStack}   options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <View style={[style.tabIconView,iconPlace]}>
                                <FontAwesomeIcon icon={faHome} size={size} color={color} />
                            </View>
                                
                        )
                    }}
                    />
                    <Tab.Screen name="搜尋" component={SearchStack} options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <View style={[style.tabIconView,iconPlace]}>
                                <FontAwesomeIcon icon={faSearch}  size={size} color={color}/>
                            </View>
                           
                        )
                    }}/>

                    <Tab.Screen name="新增" component={PostStack} options={{
                        tabBarIcon:({focused,color,size})=>(       
                                    <FontAwesomeIcon icon={faPlus}  size={30} color={"#FFFFFF"}/> 
                        ),
                        tabBarButton:(props)=>( //呼叫上方自定義按鈕
                            <PostIcon {...props}/>
                        )      
                    }}/>
                    <Tab.Screen name="清單" component={ListStack} options={{
                        
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <View style={[style.tabIconView,iconPlace]}>
                                <FontAwesomeIcon icon={faUtensils} size={size} color={color}/>
                            </View>
                            
                        )
                    }}/>
                    <Tab.Screen name="使用者" component={UserStack} options={{
                        tabBarIcon:({focused,color,size})=>(
                            focused ? size=30:size=25,
                            <View style={[style.tabIconView,iconPlace]}>
                                <FontAwesomeIcon icon={faUser} size={size} color={color}/>
                            </View>    
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

const style=StyleSheet.create({
    tabBar:{
        backgroundColor:"#C7E0F9",
        height:60,
        bottom:25,
        position: 'absolute',
        marginHorizontal:25,
        borderRadius:15,
        //left:25,
        //right:25,
        
    },
    tabIconView:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
        //backgroundColor:'black',
        //marginTop:10,
       
        top:10,
    },
    shadow:{
        shadowColor:'#10348D',
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:0.5,
        shadowRadius:3.5,
        elevation:5,
    },
    addIconView:{
        alignItems:"center",
        justifyContent:'center',
        backgroundColor:'#FFB218',
        top:-30,
        borderRadius:50,
        width:70,
        height:70,
        padding:15,
        shadowColor:'#10348D',
        shadowOffset:{
            width:0,
            height:5,
        },
        shadowOpacity:0.5,
        shadowRadius:3.5,
        elevation:5,
    }
})



export default Navigation;