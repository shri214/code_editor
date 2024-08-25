import React, { useState } from "react";

import styled from "styled-components";
import { Header } from "./NewFolder";
import { Select } from "../Custom/Select";
import { languageOptions } from "../Variables/language";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { addPlayground } from "../RTK/playgroundSlice";
import { setShow } from "../RTK/modalSlice";
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

const NewPlayground = () => {
  const [playgroundName, setPlaygroundName] = useState("");
  const [language, setLanguage] = useState<string>(languageOptions[0].value);

  const dispatch = useDispatch();
  const { folderId } = useSelector((state: RootState) => state.props);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const addingPlaygrounds = () => {
    if (folderId) {
      dispatch(addPlayground({ folderId, playgroundName, language }));
      dispatch(setShow(false));
    }else{
        toast.warn("folderId not found")
    }
  };

  return (
    <>
      <Header>
        <h2>Create New Playground</h2>
      </Header>
      <InputWithSelect>
        <input
          type="text"
          onChange={(e) => setPlaygroundName(e.target.value)}
        />
        <Select
          options={languageOptions}
          value={language}
          onChange={(e) => handleLanguageChange(e)}
        />
        <button onClick={() => addingPlaygrounds()}> Create Playground </button>
      </InputWithSelect>
    </>
  );
};

export default NewPlayground;
