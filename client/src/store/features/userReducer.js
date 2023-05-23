import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/fetchLocalStorageData";

const initialState = {
  user: fetchData(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = fetchData();
    },
    logout(state, action) {
      state.user = null;
    },
  },
});

export const userSliceActions = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;

// {
//     "data": {
//         "addUser": {
//             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmJhMTE0OTY2MDhjM2M1NjEzZjI1OSIsImlhdCI6MTY4NDc3NTE4OSwiZXhwIjoxNjkyNTUxMTg5fQ.FMO1aSJFCO8MohCINllwGWHiSZInmuBv__VOF7iXXIQ",
//             "__typename": "User"
//         }
//     }
// }
