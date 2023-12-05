import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
	name: 'comment',
	initialState: {
		data: [],
	},
	reducers: {
		setComments: (state, action) => {
			if (!Array.isArray(state.data)) {
				state.data = [];
			}

			if (Array.isArray(action.payload)) {
				state.data = [...state.data, ...action.payload];
			} else {
				state.data = [...state.data, action.payload];
			}
		},
		fetchComments: (state, action) => {},
	},
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
