import { createSlice } from "@reduxjs/toolkit";

const initialState = null; // Estado inicial es null

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload, // Guarda directamente el usuario
    logout: () => null, // Restablece el usuario a null en el logout
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;