import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit'

let userObject;
AsyncStorage.getItem("user").then(userObj =>{ 
  userObject = userObj;
})
const initialState = {
    user: userObject || null,
    loading:false

}
const profileSlice = createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setUser (state, value){
            state.user = value.payload;
            localStorage.setItem('user', JSON.stringify(value.payload))
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;