import React, { ChangeEvent } from "react";

export interface IModal {
  modal?: boolean;
  setModal: (x: boolean) => void;
}

export interface ILanguageValue {
  value: string;
  label: string;
}

export interface ISelectProps {
  options: ILanguageValue[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export interface IIdentifier {
  folderId: string;
  cardId: string;
}

export interface IModalValue {
  show: boolean;
  modalType: string;
  identifiers: IIdentifier;
}

export interface IDefaultCode {
  id?: number;
  defaultCode: string;
}

export interface ILanguageMapping {
  [key: string]: IDefaultCode;
}

export interface Playground {
  title: string;
  language: string;
  code: string;
}

export interface Item {
  title: string;
  playgrounds: Record<string, Playground>;
}

export interface Items {
  [key: string]: Item;
}

export interface HeadingProps {
  size?: "small" | "large";
}

export type MainContainerProps = {
  isFullScreen: boolean;
};

export type ParamsType = {
  folderId: string;
  playgroundId: string;
};

export interface IPropsPassing {
  folderId?: string;
  cardId?: string;
}

export interface IEditor {
  title: string;
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>;
  currentCode: string;
  setCurrentCode: React.Dispatch<React.SetStateAction<string>>;
  folderId: string;
  playgroundId: string;
  saveCode: () => void;
  runCode: () => void;
  getFile: (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => void
  ;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>
}


export interface IInputConsole{
  currentInput:string;
  setCurrentInput:React.Dispatch<React.SetStateAction<string>>;
  getFile:(e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => void
}
export interface ICodeEditor{
  currentLanguage:string;
  currentTheme:string;
  currentCode:string;
  setCurrentCode:(x:string)=>void;
}