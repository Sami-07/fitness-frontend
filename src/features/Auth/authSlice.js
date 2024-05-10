import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
    email: null,
    name: null

}
// export const logout = createAsyncThunk("logout", async () => {
//     try {

//         const x = await auth.signOut();


//     }
//     catch (err) {
//         throw err;
//     }
// })
export const register = createAsyncThunk("register", async ({ email, password, userName }) => {
    try {
        const dbRegister = await api.register(userName, email, password)
        if (dbRegister.error) {
            return { error: dbRegister.error }
        }
        if (dbRegister.result) {
            return { userName, email, user: dbRegister.result }
        }

    }
    catch (err) {
        return { error: err.message }
    }
})
export const getUser = createAsyncThunk("getUser", async () => {
    try {
        const res = await api.getCurrentUser()
        if (res) {


            return { user: res.user }
        }
    }
    catch (err) {
        return { error: err.message }
    }
}
)
export const login = createAsyncThunk("login", async ({  email, password }) => {
    try {
        const res = await api.login(email, password);
        if (res.error) {
            return { error: res.error }
        }
        if (res.result) {
            return { user: res.result.user }
        }
    } catch (error) {
        return { error: error.message }
    }
})

export const logout = createAsyncThunk("logout", async () => {
    try {
        const res = await api.logout();
        return res;

    } catch (error) {
        return { error: error.message }
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

                state.user = action.payload.user
                state.error = null
                state.email = action.payload.email
                state.name = action.payload.userName
                window.location.href = "/dashboard"

            }
            else {
                state.isLoggedIn = false
                state.error = action.payload.error
            }
        },
        [logout.fulfilled]: (state, action) => {

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
        [getUser.fulfilled]: (state, action) => {
            if (action.payload.user) {
                state.user = action.payload.user
                state.isLoggedIn = true
            }
            else {
                state.isLoggedIn = false
                state.error = action.payload.error
            }

        }

    }
})
export const { loginExistingUser } = authSlice.actions;
export default authSlice.reducer;