import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SubmitedType = {
	id: string;
	tracking_number: string;
	ledger_subject?: string;
	sender_name?: string;
	metadata_keywords?: string;
	recipient_name?: string;
	ledger_pdf?: string;
};

const initialState = {
	submitedData: null as SubmitedType | null,
};

const submitedSlice = createSlice({
	name: "submited",
	initialState,
	reducers: {
		setSubmitedData: (state, action: PayloadAction<SubmitedType>) => {
			state.submitedData = action.payload;
		},
		clearSubmitedData: (state) => {
			state.submitedData = null; // Reset to null
		},
	},
});

export const { setSubmitedData, clearSubmitedData } = submitedSlice.actions;
export default submitedSlice.reducer;
