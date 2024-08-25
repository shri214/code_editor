import React, { useState } from "react";
import { languageOptions } from "../Variables/language";
import { Select } from "../Custom/Select";
import { useDispatch } from "react-redux";
import { addPlaygroundAndFolder } from "../RTK/playgroundSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setShow } from "../RTK/modalSlice";

import styled from "styled-components";
import { Header } from "./NewFolder";
import { toast } from "react-toastify";

const InputWithSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 1rem;
  margin-top: 1.2rem;
  align-items: center;

  input {
    flex-grow: 1;
    height: 2rem;
  }

  button {
    background: #241f21;
    height: 2.5rem;
    color: white;
    padding: 0.3rem 2rem;
  }

  & > div {
    width: 8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const NewPlaygroundAndFolder = () => {
  const [playgroundName, setPlaygroundName] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [language, setLanguage] = useState<string>(languageOptions[0].value);

  const dispatch = useDispatch();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const addPlaygroundAndFolders = () => {
    if (folderName !== "" && playgroundName !== "" && language !== "") {
      dispatch(
        addPlaygroundAndFolder({ folderName, playgroundName, language })
      );
      dispatch(setShow(false));
    } else {
      toast.warn("please fill the fields ");
    }
  };

  return (
    <>
      <Header>
        <h2>Create New Playground & Create New Folder</h2>
      </Header>
      <InputWithSelect>
        <label>Enter Folder Name</label>
        <input type="text" onChange={(e) => setFolderName(e.target.value)} />

        <label>Enter Card Name</label>
        <input
          type="text"
          onChange={(e) => setPlaygroundName(e.target.value)}
        />

        <Select
          options={languageOptions}
          value={language}
          onChange={handleLanguageChange}
        />

        <button onClick={addPlaygroundAndFolders}> Create Playground </button>
      </InputWithSelect>
    </>
  );
};
