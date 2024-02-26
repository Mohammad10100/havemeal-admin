import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../Components/common/Logo'
const global = require('../css/css')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function StartScreen({ navigation }) {

  // check if already visited
  const checkVisited = async () => {
    try {
      const value = await AsyncStorage.getItem('@visited');
      value == 1?navigation.navigate('MainApp')
        : navigation.navigate('OnBoarding')
    } catch (error) {
      console.error('Error while retrieving @visited from AsyncStorage:', error);
      // TODO: i dont want to get back here after moving to main screen
      navigation.replace('MainApp');
    }
  };

  useEffect(() => {
    const changeOnXSecond = () => {
      setTimeout(() => {
        checkVisited();
      }, 2000);
    }

    changeOnXSecond()
  }, []);


  return (
    <SafeAreaView style={[global.flexC, global.fullViewPort, styles.safeArea]}>
      {/* <StatusBar
        animated={true}
        backgroundColor={global.baseLinear2}
      /> */}
      <LinearGradient
        colors={[global.baseLinear2, global.baseLinear1]}
        style={[global.flexC, styles.container]}
        id='paint0_linear_100_380'
        x1={414}
        y1={0.0000114018}
        x2={-0.0000124527}
        y2={915.5}
        gradientUnits='userSpaceOnUse'
      >
        <View style={[styles.container, global.flexC, styles.flexJust]}>
          <View style={[global.flexC, styles.container, styles.logo]}>
            <Logo />
          </View>

          <View style={[styles.container, global.flexC, styles.bottomView]}>
            {/* TODO: Random qoutes from backend*/}
            <Text style={[global.baseTextColor, global.heading2, styles.heading]}>Delicious unsold food</Text>
            <View style={styles.qouteView}>
              <Text style={[global.baseTextColor, global.secondaryText, styles.qoute]}>The Majority of food in OODZEE is made the same
                day. It's given a second chance . but it's delicious!</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: global.baseColor
  },
  heading: {
    marginBottom: 12
  },
  qouteView: {
    marginHorizontal: 30,
  },
  qoute: {
    textAlign: 'center'
  },
  logo: {
    position: 'absolute',
    top: windowHeight / 100 * 25,
  },
  bottomView: {
    // position: 'absolute',
    marginTop: windowHeight / 100 * 45,
  },
})

