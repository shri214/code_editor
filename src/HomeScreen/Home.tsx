import React, { useEffect } from "react";
import { LeftScreen } from "./LeftScreen";
import { RightScreen } from "./RightScreen";
import "./home.scss";
import { Modal } from "../Modal/Modal";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useDispatch } from "react-redux";
import { setShow } from "../RTK/modalSlice";

export const Home: React.FC = () => {
  const { show } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const handleClick = () => {
      dispatch(setShow(false));
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
  return (
    <div className="Home-container">
      {show && <Modal />}
      <div className="left-container">
        <LeftScreen />
      </div>
      <div className="right-container">
        <RightScreen />
      </div>
    </div>
  );
};
