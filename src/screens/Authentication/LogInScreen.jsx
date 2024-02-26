import { StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GradientButton from '../../Components/common/GradientButton'
const global = require('../../css/css')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { login } from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux';
 
export default function LogInScreen({ navigation }) {
  const dispatch = useDispatch()

  const customColorsBlue = {
    color1: '#367FC0',
    color2: '#367FC0',
  };
  const customColorsOrange = {
    color1: '#DD4B39',
    color2: '#DD4B39',
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleLogIn = () => {
    // Validation
    if (!formData.email || !formData.password) {
      alert('Please Fill All The Details');
      return;
    }

    // TODO: API Call and Handling
    dispatch(login(formData.email, formData.password, navigation))

    console.log('Login form data:', formData);
  };
  const handleLogInWithFacebook = () => {
    // TODO: API Call and Handling 
    // TODO: Integrating Facebook login API 
    console.log('trying to log in with facebook');
  };
  const handleLogInWithGoogle = () => {
    // TODO: API Call and Handling 
    // TODO: Integrating Google Login API
    console.log('trying to log in with google');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[global.textBlack, global.heading2, global.textC, styles.heading]}>
            Log In
          </Text>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            Enter you details to login
          </Text>
        </View>
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Email"
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Password"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleLogIn}
          style={styles.button}>
          <GradientButton name={'Log In'} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => { navigation.replace('ResetPassword') }}>
            <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>Forgot your password?</Text>
          </TouchableOpacity>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            Or Login With
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogInWithFacebook}
          style={styles.button}>
          <GradientButton name={'Log In with Facebook'}
            customColors={customColorsBlue} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogInWithGoogle}
          style={styles.button}>
          <GradientButton name={'Log In with Google'}
            customColors={customColorsOrange} />
        </TouchableOpacity>
        <View style={styles.switchOption}>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            Don't have an Account?
          </Text>
          <TouchableOpacity
            onPress={() => { navigation.replace('SignUp') }}>
            <Text style={[global.secondaryText, global.linkedText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    top: 0,
    marginBottom: 12,
  },
  innerContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: windowWidth,
    height: windowHeight / 100 * 90,

  },
  heading: {
    fontSize: 30,
    top: 0,
    marginBottom: 12,
  },
  qoute: {
    textAlign: 'center',
    height: windowHeight / 100 * 5,
  },
  input: {
    width: windowWidth / 100 * 80,
    textAlign: 'left',
    paddingHorizontal: 30,
  },
  button: {
    width: windowWidth / 100 * 80
  },
  switchOption: {
    // flex:1,
    flexDirection: 'row',
  },
})