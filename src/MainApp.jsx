import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();


// Screens
import OnBoardingScreen from './screens/OnBoardingScreen';
import HomeScreen from './screens/HomeScreen';
import Authentication from './screens/Authentication/Index';
import SignUpScreen from './screens/Authentication/SignUpScreen';
import LogInScreen from './screens/Authentication/LogInScreen';
import ResetPasswordScreen from './screens/Authentication/ResetPasswordScreen';
import LoadingFullScreen from './Components/common/LoadingFullScreen';
import OTPVerificationScreen from './screens/Authentication/OTPVerificationScreen';

export default function MainApp({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check user authentication status
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!userToken); // Convert userToken to boolean
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
        isLoggedIn ? (
          <>
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