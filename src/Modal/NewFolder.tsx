import React, { useState } from "react";
import "./NewPlaygroundAndFolder.scss";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setShow } from "../RTK/modalSlice";
import { addFolder } from "../RTK/playgroundSlice";
import { toast } from "react-toastify";

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const CloseButton = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  font-size: 2rem;
  cursor: pointer;
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  gap: 2rem;
  padding-bottom: 0;

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
`;
const NewFolder: React.FC = () => {
  const [folderTitle, setFolderTitle] = useState("");

  const dispatch = useDispatch();

  const handleCreate = () => {
    if (folderTitle !== "") {
      dispatch(addFolder(folderTitle));
      dispatch(setShow(false));
    }else{
      toast.warn("please add folder name");
    }
  };
  return (
    <>
      <Header>
        <h2>Create New Folder</h2>
      </Header>
      <Input>
        <input type="text" onChange={(e) => setFolderTitle(e.target.value)} />
        <button onClick={() => handleCreate()}>Create Folder</button>
      </Input>
    </>
  );
};

export default NewFolder;
