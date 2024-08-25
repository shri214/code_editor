import React, { useState } from "react";
import { Header, Input } from "./NewFolder";
import { editPlaygroundTitle } from "../RTK/playgroundSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setShow } from "../RTK/modalSlice";

const EditPlaygroundTitle = () => {
  const dispatch = useDispatch();
  const { folderId, cardId } = useSelector((state: RootState) => state.props);

  const [playgroundTitle, setPlaygroundTitle] = useState("");

  const editPlaygroundTitles = () => {
    if (folderId && cardId) {
      dispatch(editPlaygroundTitle({ folderId, cardId, playgroundTitle }));
      dispatch(setShow(false));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      editPlaygroundTitles();
    }
  };
  return (
    <>
      <Header>
        <h2>Edit Card Title</h2>
      </Header>
      <Input>
        <input
          type="text"
          onChange={(e) => setPlaygroundTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <button onClick={() => editPlaygroundTitles()}>Update Title</button>
      </Input>
    </>
  );
};

export default EditPlaygroundTitle;
