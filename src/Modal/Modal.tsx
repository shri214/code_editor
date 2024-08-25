import React from "react";
import "./modal.scss";
import { NewPlaygroundAndFolder } from "./NewPlaygroundAndFolder";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { setShow } from "../RTK/modalSlice";
import { useSelector } from "react-redux";
import { EditFolder } from "./FolderEditor";
import NewFolder from "./NewFolder";
import NewPlayground from "./NewPlaygrounds";
import EditPlaygroundTitle from "./EditPlaygroundTitle";

export const Modal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { modalType } = useSelector((state: RootState) => state.modal);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const closeModal = () => {
    dispatch(setShow(false));
  };
  return (
    <div className="modal">
      <div className="containers" onClick={handleClick}>
        {modalType !== "6" && (
          <div className="close" onClick={closeModal}>
            <span></span>
            <span></span>
          </div>
        )}
        {modalType === "1" && <NewFolder />}
        {modalType === "2" && <NewPlayground />}
        {modalType === "3" && <NewPlaygroundAndFolder />}
        {modalType === "4" && <EditFolder />}
        {modalType === "5" && <EditPlaygroundTitle />}
      </div>
    </div>
  );
};
