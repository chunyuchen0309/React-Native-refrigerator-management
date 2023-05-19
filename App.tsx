import React, { useEffect } from "react";
import Navigation from "./src/components/Navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { StatusBar ,Platform} from "react-native";
import messaging from "@react-native-firebase/messaging"
import { NotificationListener ,requestUserPermission } from "./src/pushNotificationManager";


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

      <AuthProvider>
        <StatusBar></StatusBar> 
        <Navigation />
      </AuthProvider>
        
    );
};

export default App;