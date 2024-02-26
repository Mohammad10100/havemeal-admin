import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientButton from '../Components/common/GradientButton'
const global = require('../css/css')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Images
const FoodBasket = require('../images/FoodBasket@X5.png')
const FoodBike = require('../images/FoodBike@X5.png')
const FoodPhone = require('../images/FoodPhone@X5.png')

export default function OnBoardingScreen({navigation}) {
  const [slideState, setSlideState] = useState(1)
  const [heading, setHeading] = useState('Find Food You Love')
  const [qoute, setQoute] = useState('Discover the best foods from over 1,000 restaurants and fast delivery to your doorstep')
  const [svgIcon, setSvgIcon] = useState(1)

  const changeSlide = () => {
    if (slideState == 2) {
      AsyncStorage.setItem('@visited', '1');
      setSlideState(3)
      setHeading("Live Tracking")
      setQoute("Real time tracking of your food on the app once you placed the order")
      setSvgIcon(3)
    }else if(slideState == 1){
      setSlideState(2)
      setHeading("Fast Delivery")
      setQoute("Fast food delivery to your home, office wherever you are")
      setSvgIcon(2)
    } else {
      navigation.navigate('MainApp')
    }
  }

  const returnImage = (svgIcon) => {
    switch (svgIcon) {
      case 1: return (
        <Image source={FoodBasket}
          style={[styles.img, styles.test]}
        />
      )
      case 2: return (
        <Image source={FoodBike}
          style={[styles.img, styles.test]}
        />
      )
      case 3: return (
        <Image source={FoodPhone}
          style={[styles.img, styles.test]}
        />
      )
      default: return (
        <Image source={FoodBasket}
          style={[styles.img, styles.test]}
        />
      )
    }

  }

  return (
    <SafeAreaView style={[global.whiteBackground, global.flexC, global.fullViewPort, styles.safeareaview]}>
      {returnImage(svgIcon)}
      <View style={[global.flexC, styles.bottomView]}>
        <View style={[styles.qouteView, global.flexC, styles.widht80]}>
          <Text style={[global.textBlack, global.heading2, global.textC, styles.heading]}>
            {heading}
          </Text>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            {qoute}
          </Text>
          <Pressable
            onPress={changeSlide}
            style={styles.button}>
            <GradientButton name={'Next'} />
          </Pressable>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  img: {
    height: windowHeight / 3,
    objectFit: 'contain',
    resizeMode: 'cover',
    position: 'absolute',
    top: windowHeight / 100 * 20,
    // height: windowHeight/2.2,
  },
  heading: {
    fontSize: 30,
    top: 0,
    marginBottom: 12,
  },
  qouteView: {
    marginHorizontal: 30,
  },
  qoute: {
    textAlign: 'center',
    height: windowHeight / 100 * 5,
  },
  safeareaview: {
    marginTop: 20,
    paddingTop: 30
  },
  bottomView: {
    position: 'absolute',
    bottom: windowHeight / 100 * 15
  },
  button: {
    width: windowWidth / 100 * 80
  }
})