import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIdentifier, IModalValue } from "../dataDefinition/definition";

const initialModalFields: IModalValue = {
  show: false,
  modalType: "",
  identifiers: {
    folderId: "",
    cardId: "",
  },
};

const modalSlice = createSlice({
  name: "ModalValue",
  initialState: initialModalFields,
  reducers: {
    setShow(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
    setModalType(state, action: PayloadAction<string>) {
      state.modalType = action.payload;
    },
    setIdentifiers(state, action: PayloadAction<IIdentifier>) {
      state.identifiers = action.payload;
    },
  },
});

export const { setShow, setModalType, setIdentifiers } = modalSlice.actions;
export default modalSlice.reducer;
