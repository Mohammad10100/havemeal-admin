import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, PixelRatio } from 'react-native'
const global = require('../../css/css')
const logo = require('../../images/Havemeal@X5.png')


export default function Logo() {
  return (
    <View style={[ global.baseBackground,styles.container,]}>
        <Image style={[styles.img]} source={logo} />  
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    aspectRatio:1,
    backgroundColor:'white',
    padding:5,
    width:200,
    height:200,
    borderRadius:100

  },
  img:{
    flex:1,
    width:'100%',
  }
})

