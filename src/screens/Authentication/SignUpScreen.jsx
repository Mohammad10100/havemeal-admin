import { StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import GradientButton from '../../Components/common/GradientButton'
import { useDispatch, useSelector } from 'react-redux';
const global = require('../../css/css')
import { ACCOUNT_TYPE } from "../../utils/constants"

import { sendOtp } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch()
  const { signupData, loading } = useSelector((state) => state.auth);

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.BUYER)
  const formObj = {
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    accountType: accountType,
  }
  const [formData, setFormData] = useState(signupData || formObj);

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSignup = () => {
    // Validation
    // TODO: password validation 
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobileNumber ||
      !formData.address ||
      !formData.password ||
      !formData.contactNumber ||
      !formData.confirmPassword) {
      alert('Please Fill All The Details');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: API Call and Handling 
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(formData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigation))


    console.log('Signup form data:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[global.textBlack, global.heading2, global.textC, styles.heading]}>
            Sign Up
          </Text>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            Enter you details to sign up
          </Text>
        </View>
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Mobile Number"
          value={formData.contactNumber}
          onChangeText={text => handleChange('contactNumber', text)}
          keyboardType="number-pad"
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Address"
          value={formData.address}
          onChangeText={text => handleChange('address', text)}
          autoCapitalize="none"
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Password"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <TextInput
          style={[global.textC, global.inputStyle, styles.input]}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={text => handleChange('confirmPassword', text)}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleSignup}
          style={styles.button}>
          <GradientButton name={'Sign Up'} />
        </TouchableOpacity>
        <View style={styles.switchOption}>
          <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
            Already have an Account?
          </Text>
          <TouchableOpacity
            onPress={() => { navigation.replace('LogIn') }}>
            <Text style={[global.secondaryText, global.linkedText]}>Login</Text>
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
    flexDirection:'row',
  },
})