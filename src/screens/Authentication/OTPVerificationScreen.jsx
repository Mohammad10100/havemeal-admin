import { StyleSheet, Text, TextInput, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradientButton from '../../Components/common/GradientButton'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signUp } from "../../services/operations/authAPI";
const global = require('../../css/css')

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function OTPVerificationScreen({ navigation }) {
    const [code, setCode] = useState('');
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // Only allow access of this route when user has filled the signup form
      if (!signupData) {
        navigation.replace("SignUp");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (otp) => {
        setCode(otp);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
          accountType,
          name,
          email,
          contactNumber,
          address,
          password,
          confirmPassword,
        } = signupData;

        dispatch(
          signUp(
            name,
            email,
            password,
            confirmPassword,
            accountType,
            address,
            contactNumber,
            otp=code,
            navigation
          )
        );
      };

    const handleResend = () => {
        console.log('clicked resend');
        setCode('')
        dispatch(sendOtp(signupData.email, navigation))

    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View>
                    <Text style={[global.textBlack, global.heading2, global.textC, styles.heading]}>
                        We have sent an  OTP {'\n'} to your email
                    </Text>
                    <Text style={[global.textBlack, global.secondaryText, styles.qoute, styles.width80]}>
                        Please check your email for the otp, {'\n'} Check the spam folder aswell
                    </Text>
                </View>

                <View>
                    <OTPInputView
                        style={{ width: '80%', height: 100 }}
                        pinCount={6}
                        autoFocusOnLoad
                        codeInputFieldStyle={[{ borderBottomWidth: 1 }, global.inputStyle, styles.box]}
                        codeInputHighlightStyle={{ borderColor: global.baseColor }}
                        onCodeChanged={(otp) => handleChange(otp)}
                        code={code} // Set the OTP code
                        autoFocus
                        keyboardHidesTabBar={false}
                    />
                </View>

                <View>

                    <TouchableOpacity
                        onPress={handleOnSubmit}
                        style={styles.width80}>
                        <GradientButton name={'Next'} />
                    </TouchableOpacity>

                    <View style={styles.resendText}>
                        <Text style={[global.textBlack, global.secondaryText, styles.qoute]}>
                            Didn't Recieve?
                        </Text>
                        <TouchableOpacity
                            onPress={handleResend}>
                            <Text style={[global.secondaryText, global.linkedText]}>Click Here</Text>
                        </TouchableOpacity>
                    </View>
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
        justifyContent: 'space-around',
        width: windowWidth,
        top: 0,
        marginBottom: 12,
    },
    innerContainer: {
        // marginTop:'5%',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: windowWidth,

    },
    heading: {
        fontSize: 30,
        top: 0,
        marginBottom: 12,
        width: windowWidth / 100 * 80,
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
    resendText: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },
    width80: {
        width: windowWidth / 100 * 80
    },
    box: {
        borderRadius: 5,
        width: windowWidth / 100 * 12,
        height: windowWidth / 100 * 12,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
})