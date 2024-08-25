import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { MainContainerProps, ParamsType } from "../dataDefinition/definition";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { savePlayground } from "../RTK/playgroundSlice";
import { Navbar } from "./Navbar";
import { EditorContainer } from "./EditorContainer";
import { InputConsole } from "./InputConsole";
import axios from "axios";
import { languageMap } from "../Variables/languageMap";
import { OutputConsole } from "./OutputConsole";
import { Loading } from "../Modal/Loading";
import { toast } from "react-toastify";
import { Modal } from "../Modal/Modal";

// Styled components
const MainContainer = styled.div<MainContainerProps>`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) =>
    isFullScreen ? "1fr" : "2fr 1fr"};
  min-height: ${({ isFullScreen }) =>
    isFullScreen ? "100vh" : "calc(100vh - 4.5rem)"};
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`;

export const Playground: React.FC = () => {
  const { folderId = "", playgroundId = "" } = useParams<ParamsType>();
  const folders = useSelector((state: RootState) => state.playgrounds);
  const { show } = useSelector((state: RootState) => state.modal);

  const {
    title = "",
    language = "",
    code = "",
  } = folders[folderId]?.playgrounds[playgroundId] || {};

  // Corrected hooks with initial values
  const [newLanguage, setCurrentLanguage] = useState<string>(language ?? "");
  const [newCode, setCurrentCode] = useState<string>(code ?? "");
  const [currentInput, setCurrentInput] = useState<string>("");
  const [currentOutput, setCurrentOutput] = useState<any>("");
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Functions
  const saveCode = () => {
    if (folderId && playgroundId) {
      const cardId = playgroundId;
      dispatch(savePlayground({ folderId, cardId, newCode, newLanguage }));
      toast.success("code saved !");
    }
  };

  const encode = (str: string): string => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str: string): string => {
    return Buffer.from(str, "base64").toString();
  };

  // Submitting code for execution
  const postSubmission = async (
    language_id: number,
    source_code: string,
    stdin: string
  ): Promise<string | void> => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "1dc52a2b4cmshb326c9730652dd0p168960jsn1ca2baeebfc1",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    try {
      const res = await axios.request(options);
      return res.data.token;
    } catch (error: any) {
      handleError(error);
    }
  };

  // Tracking submission result
  const getOutput = async (token: string): Promise<any> => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "x-rapidapi-key": "1dc52a2b4cmshb326c9730652dd0p168960jsn1ca2baeebfc1",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const res = await axios.request(options);

      // Check the submission status
      if (res.data.status_id <= 2) {
        // If the submission is still in queue or processing, recursively call getOutput
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adding delay to avoid hitting the API rate limits
        return getOutput(token);
      }

      return res.data;
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Request failed"
          }`
        );
      } else if (error.request) {
        toast.error("Error: No response received from server.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  const runCode = async () => {
    setLoader(true);
    const language_id = languageMap[newLanguage].id || 54;
    const source_code = encode(newCode);
    const stdin = encode(currentInput);

    // pass these things to Create Submissions
    const token = await postSubmission(language_id, source_code, stdin);

    // get the output
    if (typeof token === "string") {
      const res = await getOutput(token);
      const status_name = res?.status?.description;
      const decoded_output = decode(res.stdout ? res.stdout : "");
      const decoded_compile_output = decode(
        res.compile_output ? res.compile_output : ""
      );
      const decoded_error = decode(res.stderr ? res.stderr : "");

      let final_output = "";
      if (res.status_id !== 3) {
        if (decoded_compile_output === "") {
          final_output = decoded_error;
        } else {
          final_output = decoded_compile_output;
        }
      } else {
        final_output = decoded_output;
      }
      setCurrentOutput(status_name + "\n\n" + final_output);
      setLoader(false);
    } else {
      setLoader(false);
      toast.error("Failed to retrieve the token for submission.");
    }
  };

  const getFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const input = e.target;
    if (input) {
      if (input.files && input.files.length > 0) {
        placeFileContent(input.files[0], setState);
      }
    }
  };

  const placeFileContent = (
    file: File,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((error) => console.log(error));
  };

  const readFileContent = (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event?.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={newLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={newCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          {/* <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          /> */}
          <OutputConsole currentOutput={currentOutput} />
        </Consoles>
      </MainContainer>
      {loader && <Loading />}
      {show && <Modal />}
    </div>
  );
};
