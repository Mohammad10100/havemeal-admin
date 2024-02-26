import { StyleSheet, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const baseColor='#E91E59';
const baseLinear1='#F56178';
const baseLinear2='#E71989';

module.exports = StyleSheet.create({
    baseColor:baseColor,
    baseLinear1:baseLinear1,
    baseLinear2:baseLinear2,
    baseBackground:{
      backgroundColor: baseColor,
    },
    whiteBackground:{
      backgroundColor: 'white'
    },
    baseTextColor:{
      color: 'white'
    },
    textBlack:{
      color: 'black'
    },
    textWhite:{
      color: 'white'
    },
    heading2:{
      fontFamily:'Poppins',
      fontWeight:'bold',
      fontSize:14
    },
    secondaryText:{
      fontFamily:'Poppins',
      fontSize:12
    },
    full:{
      width:'100%',
      height:'100%',
    },
    fullViewPort:{
      width:windowWidth,
      height:windowHeight,
    },
    flexC:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    spacebtw:{
      justifyContent:'space-evenly'
    },
    screen:{
      backgroundColor: baseColor
    },
    textC:{
      textAlign:'center',
    },
    textBlack:{
      color:'black',
    },
    gradientButton:{
      color:'black',
    },
    inputStyle:{
      backgroundColor:'#d9d9d9',
      borderRadius:100,
      padding:20,
      lineHeight:20,
      fontSize:17,
      color:'#4E4E4E'
    },
    linkedText:{
      color:baseColor,
      fontWeight:'bold',
      marginHorizontal:5
    },
    borderblacktest:{
    borderWidth:4,
    borderBlockColor:'black'
  }
})
