import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPropsPassing } from "../dataDefinition/definition";

const initialState: IPropsPassing = {};

const PropSlicer = createSlice({
  name: "prop",
  initialState,
  reducers: {
    passingProps(
      state,
      action: PayloadAction<{ folderId?: string; cardId?: string }>
    ) {
      const { folderId, cardId } = action.payload;
      state.cardId = cardId;
      state.folderId = folderId;
    },
  },
});
export const {passingProps}=PropSlicer.actions
export default PropSlicer.reducer