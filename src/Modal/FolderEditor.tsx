import React, { useState } from "react";
import "./NewPlaygroundAndFolder.scss";
import { Header, Input } from "./NewFolder";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setShow } from "../RTK/modalSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { editFolderTitle } from "../RTK/playgroundSlice";
export const EditFolder: React.FC = () => {
  const [folderName, setFolderName] = useState<string>("");

  const dispatch = useDispatch();
  const { folderId } = useSelector((state: RootState) => state.props);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
     handleUpdates()
    }
  };
  const handleUpdates = () => {
    if (folderName !== "") {
      if (folderId) {
        dispatch(editFolderTitle({ folderId, folderName }));
      }
      dispatch(setShow(false));
    } else {
      toast.warn("add folder title");
    }
  };

  return (
    <>
      <Header>
        <h2>Edit Folder Title</h2>
      </Header>
      <Input>
        <input type="text" onChange={(e) => setFolderName(e.target.value)} onKeyDown={handleKeyPress}/>
        <button onClick={() => handleUpdates()} >Update Title</button>
      </Input>
    </>
  );
};
