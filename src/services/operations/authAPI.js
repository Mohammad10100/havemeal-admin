// TODO: redux slices
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { Alert } from "react-native";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  // RESETPASSTOKEN_API,
  // RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigation) {
  return async (dispatch) => {
    // TODO: Loading spinner
    // Display loading spinner
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true, 
      })
      console.log(response.data.success);
      // do not log the response 
      // it will reveal the otp HIDE/MASK THE RESPONSE IN THE BACKEND 

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      // TODO: verify email and phone number
      // navigate to verify screen
      navigation.navigate('OTPVerification')
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      Alert.alert('Something Went Wrong', 'Could Not Send OTP Please Try Again', [
        {text: 'OK', onPress: () => console.log('OK')},
      ]);
  
    }
    dispatch(setLoading(false))
    // TODO: Set loading false
  }
}

export function signUp(
  name,
  email,
  password,
  confirmPassword,
  accountType,
  address,
  contactNumber,
  otp,
  navigation
) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        confirmPassword,
        accountType,
        address,
        contactNumber,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      // TODO: get a jwt token while signing up, and set token in AsyncStorage
      navigation.replace('MainApp', { screen: 'HomeScreen' });
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      navigation.replace("SignUp")
    }
    dispatch(setLoading(false))
  }
}

export function login(email, password, navigation) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    console.log('smthn', LOGIN_API);
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      dispatch(setToken(response.data.token)) 
      const userImage = response.data.user.image || `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('accountType', response.data.user.accountType);
      navigation.replace('MainApp', { screen: 'Dashboard' });
      // toast.success("Login Successful")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}



export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,})

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

      console.log("RESET Password RESPONSE ... ", response);


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch(error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}