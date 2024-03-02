import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Switch } from 'react-native'
import React, { useState } from 'react'
const global = require('../../css/css')
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-picker';
import { createCategory } from '../../services/operations/categoryAPI'

import GradientButton from '../../Components/common/GradientButton'

import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'


const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;


export default function AddNewCategory({navigation}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);

  // const dispatch = useDispatch()

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(true);
        setSelectedImage(imageUri);
      }
    });
  };

  const formObj = {
    name: name,
    description: description,
  }


  const handleAddNewCategory = () => {
    // Validation
    if (
      !selectedImage ||
      !formObj.name ||
      !formObj.description) {
      alert('Please Fill All The Details');
      return;
    }

    // TODO: API Call and Handling 
    createCategory(formObj, navigation)
  };

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={[styles.innerContainer]}>
        <Text style={[global.textBlack, global.heading1, styles.heading]}>Add Category</Text>
      </SafeAreaView>

      <View style={[styles.inputForm]} >
        <View className="imageArea" style={[styles.input, styles.imageArea]}>
          {
            image ?
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }}  style={styles.imagePreview}   />
              <Pressable style={styles.changeImage}  onPress={selectImage}>
                {/* <GradientButton name={'Change Image'} /> */}
                <Text style={styles.changeTxt}>Change Image</Text>
              </Pressable>
            </View>
              :
              <Pressable style={styles.uploadBtn}  onPress={selectImage}>
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
        <Pressable style={styles.button} onPress={handleAddNewCategory}>
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
    marginVertical: 30,
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
  imageContainer: {
    width: '100%',
    height: "100%",
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    // resizeMode: 'stretch',
  },
  changeImage:{
    backgroundColor:'#1DAC10',
    marginBottom:20,
    padding:4,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  changeTxt:{
    color:'white',
    padding:5,
    fontWeight:'bold',
    textAlign:'center'
  }

})