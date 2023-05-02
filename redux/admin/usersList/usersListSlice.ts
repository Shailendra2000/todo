import {createSlice} from '@reduxjs/toolkit'
const usersListSlice = createSlice({
    name:"usersList",
    initialState:{
        value:[]
    },
    reducers:{
        setUsers: (state,action) => {
            state.value = action.payload
        }   
    } 
})
export const { setUsers } = usersListSlice.actions 
export default usersListSlice.reducer