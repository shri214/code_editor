import React from "react";
import { useDispatch } from "react-redux";
import { setModalType, setShow } from "../RTK/modalSlice";
import { useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import { RootState } from "../store";
import { deleteCard, deleteFolder } from "../RTK/playgroundSlice";
import logo from "../../src/assets/logo-small.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HeadingProps } from "../dataDefinition/definition";
import { passingProps } from "../RTK/propSlice";

const StyledRightComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  padding-right: 2rem;
   height:100vh;
  overflow:auto;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    padding: 1rem 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #989898;
  margin-bottom: 1rem;
`;

const Heading = styled.h3<HeadingProps>`
  font-size: ${(props) => (props.size === "small" ? "1.25rem" : "1.75rem")};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    font-weight: 700;
  }
`;

const AddButton = styled.div`
  font-size: 1rem;
  border-radius: 30px;
  color: black;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  span {
    font-size: 1.5rem;
    font-weight: 700;
  }

  &:hover {
    cursor: pointer;
  }
`;

const FolderCard = styled.div`
  margin-bottom: 1rem;

`;

const FolderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
`;

const PlayGroundCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 428px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 0 4px 0px #989898;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 1.05;
    box-shadow: 0 0 8px 0px #989898;
  }
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardContent = styled.div``;

const Logo = styled.img`
  width: 70px;
  margin-right: 1rem;

  @media (max-width: 425px) {
    width: 50px;
    margin-right: 0.5rem;
  }
`;

export const RightScreen: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.playgrounds);
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent,
    types: string,
    folderId?: string,
    cardId?: string
  ) => {
    dispatch(setShow(true));
    dispatch(setModalType(types));
    if (folderId) {
      if (folderId && cardId) {
        dispatch(passingProps({ folderId, cardId }));
      } else {
        dispatch(passingProps({ folderId }));
      }
    }

    e.stopPropagation();
  };
  const deleteFolders = (folderId: string) => {
    dispatch(deleteFolder(folderId));
  };
  const deleteCards = (folderId: string, cardId: string) => {
    dispatch(deleteCard({ folderId, cardId }));
  };
  return (
    <StyledRightComponent>
      <Header style={{position:"sticky", top:0, right:0, background:"white"}}>
        <Heading size="large">
          My <span>Playground</span>
        </Heading>
        <AddButton onClick={(e) => handleClick(e, "1")}>
          {" "}
          <span>+</span> New Folder
        </AddButton>
      </Header>

      {folders &&
        Object.entries(folders).map(([folderId, folder]) => {
          return (
            folder.title && (
              <FolderCard key={folderId}>
                <Header>
                  <Heading size="small">
                    <FcOpenedFolder /> {folder.title}
                  </Heading>
                  <FolderIcons>
                    <IoTrashOutline onClick={() => deleteFolders(folderId)} />
                    <BiEditAlt onClick={(e) => handleClick(e, "4", folderId)} />
                    <AddButton onClick={(e) => handleClick(e, "2", folderId)}>
                      <span>+</span> New Playground
                    </AddButton>
                  </FolderIcons>
                </Header>

                <PlayGroundCards>
                  {folder &&
                    folder["playgrounds"] &&
                    Object.entries(folder["playgrounds"]).map(
                      ([playgroundId, playground]) => (
                        <Card
                          key={playgroundId}
                          onClick={() => {
                            navigate(`/playground/${folderId}/${playgroundId}`);
                          }}
                        >
                          <CardContainer>
                            <Logo src={logo} />
                            <CardContent>
                              <p>{playground.title}</p>
                              <p>Language: {playground.language}</p>
                            </CardContent>
                          </CardContainer>
                          <FolderIcons
                            onClick={(e) => {
                              e.stopPropagation(); 
                            }}
                          >
                            <IoTrashOutline
                              onClick={() =>
                                deleteCards(folderId, playgroundId)
                              }
                            />
                            <BiEditAlt
                              onClick={(e) =>
                                handleClick(e, "5", folderId, playgroundId)
                              }
                            />
                          </FolderIcons>
                        </Card>
                      )
                    )}
                </PlayGroundCards>
              </FolderCard>
            )
          );
        })}
    </StyledRightComponent>
  );
};
