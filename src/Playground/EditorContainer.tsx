import React, { useState } from "react";
import { IEditor, ILanguageValue, MainContainerProps } from "../dataDefinition/definition";
import styled from "styled-components";
import { languageMap } from "../Variables/languageMap";
import { languageOptions } from "../Variables/language";
import { BiEditAlt, BiExport, BiFullscreen, BiImport } from "react-icons/bi";
import { Select } from "../Custom/Select";
import { CodeEditor } from "./CodeEditor";
import { useDispatch } from "react-redux";
import { setModalType, setShow } from "../RTK/modalSlice";
import { passingProps } from "../RTK/propSlice";
import { themeOptions } from "../Variables/themeOptions";

const StyledEditorContainer = styled.div<MainContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
`

const UpperToolBar = styled.div`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.8rem 0.4rem;

  @media (max-width: 540px){
    height: 8rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 540px){
    width: 100%;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content:centre;
  gap: 1rem;
  margin-right: 2.3rem;
  font-size: 1.3rem;
  @media (min-width: 540px){
    margin-right: 1rem;
  }
`

const SelectBars = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  & > div{
    width: 8rem;
  }

  & > div:last-child{
    width: 10rem;
  }
`

const Button = styled.button`
  padding: 0.7rem 0.4rem;
  width: 6.2rem;
  background: #0097d7;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
`

const CodeEditorContainer = styled.div`
    height: calc(100% - 4rem);

    & > div{
        height: 100%;
    }
`

const LowerToolBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding: 0.8rem 1rem;

  input{
    display: none;
  }

  label, a, button{
    font-size: 1.2rem;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: black;
  }
  button:first-child{
    background: none;
  }
  button:last-child{
    font-weight: 400;
    font-size: 1.1rem;
  }
`
const SaveAndRunButton = styled.button`
  padding: 0.6rem 1rem;
  background: #0097d7;
  border: none;
  border-radius: 32px;
  font-weight: 700;
  cursor: pointer;
`
export const EditorContainer: React.FC<IEditor> = ({
  title,
  currentLanguage,
  setCurrentLanguage,
  currentCode,
  setCurrentCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen,
}) => {
const dispatch=useDispatch();
  const handleThemeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setCurrentTheme(e.target.value);
    }
  };

  const handleLanguageChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
      setCurrentLanguage(e.target.value);
      setCurrentCode(languageMap[e.target.value].defaultCode);
    
  };

  const [currentTheme, setCurrentTheme] = useState<string>('githubDark');
  const [language, setLanguage] = useState<string>(() => {
    const initialLanguage = languageOptions.find(option => option.value === currentLanguage);
    return initialLanguage?.value || languageOptions[0].value;
  });

  const handleModal=()=>{
      dispatch(setShow(true));
      dispatch(setModalType("5"));
      dispatch(passingProps({folderId, cardId:playgroundId}))
  }

  return (
    <StyledEditorContainer isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <UpperToolBar>
          <Header>
            <Title>
              <h3>{title}</h3>
              <BiEditAlt onClick={handleModal} />
            </Title>
            <Button onClick={saveCode}>Save code</Button>
          </Header>
          <SelectBars>
            <Select
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
            />
            <Select
              options={themeOptions}
              value={currentTheme}
              onChange={handleThemeChange}
            />
          </SelectBars>
        </UpperToolBar>
      )}
      <CodeEditorContainer>
        <CodeEditor
          currentLanguage={currentLanguage}
          currentTheme={currentTheme}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
        />
      </CodeEditorContainer>
      <LowerToolBar>
        <button onClick={() => setIsFullScreen((prev) => !prev)}>
          <BiFullscreen /> {isFullScreen ? 'Minimize Screen' : 'Full Screen'}
        </button>

        <label htmlFor="codefile">
          <input type="file" accept="." id="codefile" onChange={(e) => getFile(e, setCurrentCode)} /> <BiImport /> Import Code
        </label>

        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(currentCode)}`} download="code.txt">
          <BiExport /> Export Code
        </a>
        <SaveAndRunButton onClick={runCode}>Run Code</SaveAndRunButton>
      </LowerToolBar>
    </StyledEditorContainer>
  );
};
