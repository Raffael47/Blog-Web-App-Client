import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authValue: {
        username: "",
        email: "",
        phone: "",
        imgProfile:""
    }    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.authValue.username = action.payload.username
            state.authValue.email = action.payload.email
            state.authValue.phone = action.payload.phone
            state.authValue.imgProfile = action.payload.imgProfile
        }
    }
})

export const { setAuth} = userSlice.actions
export default userSlice.reducer
