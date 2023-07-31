import { createSlice, configureStore } from "@reduxjs/toolkit";
export const users = [];
const userStart ={
    username: "",
    isActive: 0,
    color: "red",
    id:"",
}
const messagesStart = {
  messages : []
}

const userSlice = createSlice({
    name: "user",
    initialState: userStart,
    reducers: {
        username(state, action) {
            state.username = action.payload;
          },
          isActive(state,action){
            state.isActive = action.payload;
          },
          color(state,action){
            state.color = action.payload;
          },
          setId(state,action){
            state.id = action.payload;
          },
          reset() {
            return {
              ...userStart,
            };
          },
    }
})

const messagesSlice = createSlice({
  name: "message",
  initialState: messagesStart,
  reducers: {
      addMessage(state, action) {
          state.messages = [...state.messages, action.payload]
  }
}})

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        message: messagesSlice.reducer,
    },
  });
  export const userActions = userSlice.actions;
  export const messageActions = messagesSlice.actions;
  

export default store;