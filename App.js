import React,  { useCallback, useEffect, useState } from "react";
//React navigation Stack
import RootStack from "./src/navigators/RootStack";
import AppNavigation from "./src/navigators/appNavigation"; 
import { AuthProvider } from "./src/context/AuthContext";
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


export default function App() {
  return (
    // <AuthProvider></AuthProvider>
  // <RootStack/>
  //  <HomeScreen></HomeScreen>
  <AppNavigation />
  );
}