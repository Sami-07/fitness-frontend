import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import { auth } from '../../firebase/config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
    email: null,
    name: null

}
export const logout = createAsyncThunk("logout", async () => {
    try {

        await auth.signOut();
     
    }
    catch (err) {
        throw err;
    }
})
export const register = createAsyncThunk("register", async ({ auth, email, password, userName }) => {
    try {

        const res = await createUserWithEmailAndPassword(auth, email, password);

        updateProfile(res.user, {
            userName: userName
        })
        if (res) {
            const dbRegister = await api.register(userName, email)
            return { user: res.user, email, userName }
        }
    }
    catch (err) {
        return { error: err.message }
    }
})
export const login = createAsyncThunk("login", async ({ auth, email, password }) => {
    try {

        const res = await signInWithEmailAndPassword(auth, email, password);

        if (res) {
            return { user: res.user }
        }
    }
    catch (err) {
        console.log("err", err.message);
    }
})
export const loginWithGoogle = createAsyncThunk("loginWithGoogle", async (user) => {
    try {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                return user;

            })


    }
    catch (err) {
        console.log("err", err.message);
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginExistingUser: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true
        }

    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {

            if (action.payload.user) {
                state.isLoggedIn = true
                console.log("user in auth slice", action.payload)
                state.user = action.payload.user
                state.error = null
                state.email = action.payload.email
                state.name = action.payload.userName
                // window.location.href = "/dashboard"

            }
            else {
                state.isLoggedIn = false
                state.error = action.payload.error
            }
        },
        [logout.fulfilled]: (state, action) => {
            console.log("post logout")
            state.user = null
            state.isLoggedIn = false


        },
        [login.fulfilled]: (state, action) => {

            if (action.payload.user) {
                state.user = action.payload.user
                state.isLoggedIn = true
            }
            else {
                state.isLoggedIn = false
                state.error = action.payload.error
            }

        },
        [loginWithGoogle.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isLoggedIn = true


        }
    }
})
export const { loginExistingUser } = authSlice.actions;
export default authSlice.reducer;