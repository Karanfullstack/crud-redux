import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, {rejectWithValue}) => {
    const response = await fetch(
      "https://645150e7a32219691160af9a.mockapi.io/todo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Read Action

export const showUser = createAsyncThunk(
  "showUser",
  async (args, {rejectWithValue}) => {
    const response = await fetch(
      "https://645150e7a32219691160af9a.mockapi.io/todo"
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete

export const DeleteUser = createAsyncThunk(
  "DeleteUser",
  async (id, {rejectWithValue}) => {
    const response = await fetch(
      `https://645150e7a32219691160af9a.mockapi.io/todo/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// updated user

export const updatedUser = createAsyncThunk(
  "updatedUser",
  async (data, {rejectWithValue}) => {
    const response = await fetch(
      `https://645150e7a32219691160af9a.mockapi.io/todo/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Show User
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const {id} = action.payload;
        if (id) {
          state.users = state.users.filter((item) => item.id !== id);
        }
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update User
      .addCase(updatedUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updatedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updatedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
export const {searchUser} = userDetail.actions