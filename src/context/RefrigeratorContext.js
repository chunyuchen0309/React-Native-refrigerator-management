import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RefrigeratorContext= createContext();

export const RefrigeratorProvider =({children})=>{
    const [outConfig,setOutConfig]=useState('');

    const [coldCount,setColdCount]=useState(''); //冷藏分層數
    const [freezingCount,setFresszingCount]=useState(''); // 冷凍分層數

    const [coldDoorCount,setColdDoorCount]=useState(''); //冷藏門分層數
    const [freezingDoorCount,setFresszingDoorCount]=useState(''); //冷凍門分層數

    const [coldPlaneCount,setColdPlaneCount]=useState(''); //冷藏平面分層數
    const [freezingPlaneCount,setFresszingPlaneCount]=useState(''); //冷凍平面分層數

    
    const step1=(outConfig)=>{
        setOutConfig(outConfig);
        console.log(outConfig);
    }

    const step2_cold=(count)=>{
        console.log("冷藏分層 : "+count);
        setColdCount(count)
    }

    const step2_freezing=(count)=>{
        console.log(count);
        setFresszingCount(count);
    }

    const step3_coldDoor=(count)=>{
        console.log("冷藏門分層 : "+count);
        setColdDoorCount(count);
    }
    const step3_freezingDoor=(count)=>{
        console.log("冷凍門分層 : "+count);
        setFresszingDoorCount(count);
    }

    const step4_coldPlane=(count)=>{
        console.log("冷藏平面分層 : "+count);
        setColdPlaneCount(count);
    }
    const step4_freezingPlane=(count)=>{
        console.log("冷凍平面分層 : "+count);
        setFresszingPlaneCount(count);
    }


    return(
        <RefrigeratorContext.Provider 
        value={{
            step1,
            step2_cold,
            step2_freezing,
            step3_coldDoor,
            step3_freezingDoor,
            step4_coldPlane,
            step4_freezingPlane,
            outConfig,
            coldCount,
            freezingCount,
            coldDoorCount,
            freezingDoorCount,
            coldPlaneCount,
            freezingPlaneCount,
        }}>
        {children}
        </RefrigeratorContext.Provider>
    );
};