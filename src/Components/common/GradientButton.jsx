import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
const global = require('../../css/css')



const windowWidth = Dimensions.get('window').width;


export default function GradientButton(props) {
  const empty = props.empty?true:false;
  const { customColors: customColors } = props ?? {};

  return (
    <LinearGradient 
    colors={customColors?[customColors.color1, customColors.color2]:[global.baseLinear2, global.baseLinear1] }
    style={[styles.gradientView, empty?styles.emptyView:null]} start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}>
        <View style={styles.btn}>
          <Text style={[global.textBlack, global.textC, empty?styles.emptyText:global.textWhite]} >{props.name?props.name:null}</Text>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding:18,
  },
  gradientView:{
    borderRadius:100,

  },
  emptyView:{
    borderColor:global.baseLinear1,
    borderWidth:2,
  },
  emptyText:{
    color:global.baseLinear1
  },
  // width:{
  //   width:windowWidth/1.9,
  // }
});