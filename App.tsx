import React, { useEffect } from "react";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar ,Platform} from "react-native";
import messaging from "@react-native-firebase/messaging"
import { NotificationListener ,requestUserPermission } from "./src/pushNotificationManager";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import {PermissionsAndroid} from 'react-native';
  
const App =()=>{
  
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
  
  useEffect(() => {
    
    requestUserPermission();
    NotificationListener();
    
    
    }, []);
    return(
      <GestureHandlerRootView style={{flex: 1}}>
        <AuthProvider>
          <StatusBar></StatusBar> 
          <Navigation />
        </AuthProvider>
      </GestureHandlerRootView>
        
    );
};

export default App;