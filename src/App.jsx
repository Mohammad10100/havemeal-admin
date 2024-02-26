import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  SafeAreaView
 } from 'react-native'
 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const global = require('./css/css')

// Screens
import StartScreen from './screens/StartScreen';
import MainAppScreen from './MainApp';
import OnBoardingScreen from './screens/OnBoardingScreen';
const Stack = createNativeStackNavigator();

// TODO: Status bar
{/* <StatusBar
  animated={true}
  backgroundColor={global.baseBackground.backgroundColor}
/> */}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }} >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
        />
        <Stack.Screen
          name="MainApp"
          component={MainAppScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}