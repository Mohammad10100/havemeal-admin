// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native'
import GradientButton from '../Components/common/GradientButton'
const global = require('../css/css')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TiffinImage = require('../images/Havemeal@X5.png')

export default function HomeScreen() {
  const [token, setToken] = useState('')
  useEffect( ()=>{
    const getToken = async()=>{
      console.log('something');
      console.log(await AsyncStorage.getItem('token'))
      console.log(JSON.parse(await AsyncStorage.getItem('user')).email)
      // console.log(await AsyncStorage.removeItem('token'))
    }

    getToken()
  },[token])

  return (
    // <SafeAreaView>
      // <Text>HomeScreen</Text>
      <SafeAreaView style={[global.whiteBackground, global.flexC, global.fullViewPort]}>
          <Image source={TiffinImage}
            style={[styles.img, styles.test]}
          />
          <View style={[global.flexC,styles.test]}>
            <View style={styles.qouteView}>
              <Text style={[global.textBlack, global.heading1, global.textC, styles.heading]}>Today Meal</Text>
              <Text style={[global.textBlack, global.heading2, global.textC, styles.heading]}>Lunch</Text>
              <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>Sukhi bhaji, rassa bhaji, dal fry, 
rice,2 chapati. </Text>
<Button title='Track Order'></Button>
<Text style={[global.textBlack, global.heading1, global.textC, styles.heading]}>Dinner</Text>
<Text style={[global.textBlack, global.secondaryText, styles.qoute]}>Sukhi bhaji, rassa bhaji, dal fry, 
rice,2 chapati. </Text>

    <Button title='Cancel'></Button><Button title='Edit'></Button>
    <Button title='Reschedule'></Button>
    <Button title='Customized'></Button>
              <GradientButton name={'Next'} />
            </View>
          </View>
    
        </SafeAreaView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({})