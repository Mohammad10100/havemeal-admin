import Config from "react-native-config";
const BASE_URL = Config.REACT_APP_BASE_URL || "http://localhost:5001/api/v1"
console.log(BASE_URL);

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  // TODO: 
  // RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  // RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}