import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { languageMap } from "../Variables/languageMap";
import { Items } from "../dataDefinition/definition";

const initialState: Items = {};

const PlaygroundSlicer = createSlice({
  name: "playground",
  initialState,
  reducers: {
    deleteCard(
      state,
      action: PayloadAction<{ folderId: string; cardId: string }>
    ) {
      const { folderId, cardId } = action.payload;
      delete state[folderId].playgrounds[cardId];
    },

    deleteFolder(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },

    addFolder(state, action: PayloadAction<string>) {
      const folderId = crypto.randomUUID();
      state[folderId] = {
        title: action.payload,
        playgrounds: {},
      };
    },

    addPlayground(
      state,
      action: PayloadAction<{
        folderId: string;
        playgroundName: string;
        language: string;
      }>
    ) {
      const { folderId, playgroundName, language } = action.payload;
      const playgroundId = crypto.randomUUID();
      state[folderId].playgrounds[playgroundId] = {
        title: playgroundName,
        language: language,
        code: languageMap[language].defaultCode,
      };
    },

    addPlaygroundAndFolder(
      state,
      action: PayloadAction<{
        folderName: string;
        playgroundName: string;
        language: string;
      }>
    ) {
      const { folderName, playgroundName, language } = action.payload;
      const folderId = crypto.randomUUID();
      const playgroundId = crypto.randomUUID();
      state[folderId] = {
        title: folderName,
        playgrounds: {
          [playgroundId]: {
            title: playgroundName,
            language: language,
            code: languageMap[language].defaultCode,
          },
        },
      };
    },

    editFolderTitle: (
      state,
      action: PayloadAction<{ folderId: string; folderName: string }>
    ) => {
      const { folderId, folderName } = action.payload;
      state[folderId].title = folderName;
    },

    editPlaygroundTitle: (
      state,
      action: PayloadAction<{
        folderId: string;
        cardId: string;
        playgroundTitle: string;
      }>
    ) => {
      const { folderId, cardId, playgroundTitle } = action.payload;
      state[folderId].playgrounds[cardId].title = playgroundTitle;
    },

    savePlayground: (
      state,
      action: PayloadAction<{
        folderId: string;
        cardId: string;
        newCode: string;
        newLanguage: string;
      }>
    ) => {
      const { folderId, cardId, newCode, newLanguage } = action.payload;
      state[folderId].playgrounds[cardId].code = newCode;
      state[folderId].playgrounds[cardId].language = newLanguage;
    },
  },
});

export const {
  deleteCard,
  deleteFolder,
  addFolder,
  addPlayground,
  addPlaygroundAndFolder,
  editFolderTitle,
  editPlaygroundTitle,
  savePlayground,
} = PlaygroundSlicer.actions;

export default PlaygroundSlicer.reducer;
