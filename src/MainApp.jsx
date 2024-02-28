import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

import { ACCOUNT_TYPE } from "./utils/constants"

// Screens
import OnBoardingScreen from './screens/OnBoardingScreen';
import HomeScreen from './screens/HomeScreen';
import Authentication from './screens/Authentication/Index';
import SignUpScreen from './screens/Authentication/SignUpScreen';
import LogInScreen from './screens/Authentication/LogInScreen';
import ResetPasswordScreen from './screens/Authentication/ResetPasswordScreen';
import LoadingFullScreen from './Components/common/LoadingFullScreen';
import OTPVerificationScreen from './screens/Authentication/OTPVerificationScreen';
import DashboardScreen from './screens/DashboardScreen';
import CategoryScreen from './screens/Category/CategoryScreen';
import CategoryDetailsScreen from './screens/Category/CategoryDetailsScreen';
import AddNewCategory from './screens/Category/AddNewCategory';

export default function MainApp({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check user authentication status
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('accountType');
        // setIsLoggedIn(!!userToken); // Convert userToken to boolean
        role===ACCOUNT_TYPE.ADMIN?setIsAdmin(true):setIsAdmin(false)
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigation.navigate('Authentication')
      } finally {
        setIsLoading(false); // Set loading to false regardless of the result
      }
    };

    checkAuthentication();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }} >
      {isLoading ? (
        <Stack.Screen name='LoadingFull' component={LoadingFullScreen}/>
        ) : (
        isAdmin ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Category" component={CategoryScreen} />
            <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
            <Stack.Screen name="AddNewCategory" component={AddNewCategory} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="LogIn" component={LogInScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="OTPVerification"
            screenOptions={{ presentation: 'modal' }}
            component={OTPVerificationScreen} />
          </>
        )
      )}
    </Stack.Navigator>
  )
}