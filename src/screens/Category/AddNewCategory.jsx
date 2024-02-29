import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Switch } from 'react-native'
import React, { useState } from 'react'
const global = require('../../css/css')

import GradientButton from '../../Components/common/GradientButton'

import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'


const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;


export default function AddNewCategory() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(0)

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={[styles.innerContainer]}>
        <Text style={[global.textBlack, global.heading1, styles.heading]}>Add Category</Text>
      </SafeAreaView>

      <View style={[styles.inputForm]} >
        <View className="imageArea" style={[styles.input, styles.imageArea]}>
          {
            image ?
              <Image src={''} />
              :
              <Pressable style={styles.uploadBtn} onPress={() => { console.log('upload'); }}>
                <GradientButton name={'Upload Image'} />
              </Pressable>
          }
        </View>

        <View>
          <View style={styles.status}>
            <Text style={[styles.txt]} >Status:</Text>
            <Text style={[styles.statusTxt]} >{isEnabled?' VISIBLE':' NOT VISIBLE'}</Text>
          </View>
          <Switch
            trackColor={{ false: '#E91E59', true: '#E91E59' }}
            thumbColor={isEnabled ? '#8c8c8c' : '#8c8c8c'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style={styles.title} >Name</Text>
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Name"
          value={name}
          placeholderTextColor="#8c8989"
          onChangeText={text => { setName(text); console.log(name); }}
        />
        <Text style={styles.title} >Description</Text>
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Description"
          value={description}
          placeholderTextColor="#8c8989"
          onChangeText={text => { setDescription(text); console.log(description); }}
        />
        <Pressable style={styles.button} onPress={() => { console.log('add'); }}>
          <GradientButton name={'Add'} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100 * vh,
    alignItems: 'center',
    // backgroundColor: '#D8BFD8',
    // backgroundColor: '#F1F1F1',
  },
  innerContainer: {
    backgroundColor: '#f2dcf2',
  },
  heading: {
    padding: 5 * vw,
    width: 100 * vw,
  },
  scroll: {
    height: 100 * vh,
    // borderColor:'black',
    // borderWidth:1,
  },
  cardViewOuter: {
    marginVertical: 10,
    padding: '2%',
    backgroundColor: 'white',
    borderRadius: 2 * vw,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 10 * vh,
  },
  cardViewOuterText: {
    color: 'white',
  },
  cardViewInner: {
    backgroundColor: 'white',
    width: '50%',
    flex: 1,
    padding: 5,
    paddingLeft: 15,
    justifyContent: 'center',

  },
  cardViewInnerText: {
    color: 'white',
  },
  cardImage: {
    // maxWidth:'25%',
    height: '90%',
  },
  img: {
    backgroundColor: '#e8e3e3',
    borderRadius: 2 * vw,
    aspectRatio: 1.3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: vw * 80,
    margin: 15,
  },
  input: {
    width: vw * 80,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5
  },
  inputForm: {
    flex: 1,
    width: vw * 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageArea: {
    backgroundColor: '#FFFFFF',
    height: vw * 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: '#a1a1a1',
    borderWidth: 1,
    borderRadius: 15,
    borderWidth: 2.5,
  },
  title: {
    // color:'#E91E59',
    // color:'#00a819',
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    width: 80 * vw,
  },
  txt:{
    fontSize: 15,
    fontWeight: 'bold',
    // marginTop: 15,
    // marginBottom: 5,
  },
  statusTxt:{
    color: '#1DAC10',
    fontSize: 15,
    fontWeight: 'bold',
  },
  status: {
    flexDirection:'row',
    width:80*vw,
    marginVertical:10
  },

})