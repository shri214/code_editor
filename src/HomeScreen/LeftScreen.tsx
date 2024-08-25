import React from 'react'
import logo from "../assets/logo.png"
import "./left.scss";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setModalType, setShow } from '../RTK/modalSlice';
export const LeftScreen:React.FC = () => {
  const dispatch=useDispatch<AppDispatch>()

  const handleModal=(e:React.MouseEvent)=>{
    dispatch(setShow(true))
    dispatch(setModalType("3"))
    e.stopPropagation();
  }

  return (
    <div className='content'>
        <img src={logo} alt="logo" />
        <h1>Code. Compile. Debug.</h1>
        <button>
            <span>+</span>
            <span onClick={handleModal}>Add New Folder</span>
        </button>
    </div>
  )
}
