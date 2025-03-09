import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  setActiveTileGlobally,
  setActiveTileNumber,
  setPageTitle,
  setPageType,
  setShowPopup,
} from "store";
import { PageType } from "types";
import Tile from "components/Tile";
import { ChatBot } from "components/ChatBot";
import { Button } from "@progress/kendo-react-buttons";

interface Props {
  pageTitle: string;
  pageType: PageType;
  src: string;
  className?: string;
  originalSize?: boolean;
  backgroundImage?: string;
}

const { BlobBaseUrl, INITIAL_ACTIONS } = window.config;

export const Image: FC<Props> = ({
  pageTitle,
  pageType,
  src,
  className,
  originalSize,
  backgroundImage,
}) => {
  const dispatch = useAppDispatch();
  //const [showPopup, setShowPopup] = useState(false);
  const { ActiveTileGlobally, ActiveTileNumber, showPopup } = useAppSelector(
    (state) => state.config
  );
  const [actions, setActions] = useState<any>(INITIAL_ACTIONS);
  const [type, setType] = useState("home");

  useEffect(() => {
    const storedTileGlobally = localStorage.getItem("ActiveTileGlobally");
    const storedTileNumber = localStorage.getItem("ActiveTileNumber");

    if (storedTileGlobally) {
      dispatch(setActiveTileGlobally(storedTileGlobally));
    } else {
      dispatch(setActiveTileGlobally("End-to-End Demo"));
    }

    if (storedTileNumber) {
      dispatch(setActiveTileNumber(storedTileNumber));
    } else {
      dispatch(setActiveTileNumber("1"));
    }

    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageTitle, pageType]);
  const [messages, setMessages] = useState("");

  return (
    <div className={`${styles.container} ${className}`}>
      {pageType === PageType.FutureStateArchitecture || originalSize ? (
        <div className={styles.subContainer}>
          <img
            src={src.includes("http") ? src : `${BlobBaseUrl}${src}`}
            alt={pageTitle}
            className={styles.image}
          />
        </div>
      ) : pageType.toString() === "Landing Page" ? (
        <>
          <div className={styles.subContainer1}>
            <div className={styles.tileContainer}></div>{" "}
            {
              // <img
              //   className={styles.chatIcon}
              //   src={`https://dreamdemoassets.blob.core.windows.net/dataandaidemo/copilot_image.png`}
              //   alt="chat-icon"
              //   onClick={() => dispatch(setShowPopup(true))}
              // />
            }
            {/* {showPopup && (
              <div className={styles.chatBotLandingPageContainer}>
                <ChatBot
                  INITIAL_ACTIONS={INITIAL_ACTIONS}
                  messages={messages}
                  setMessages={setMessages}
                  actions={actions}
                  setActions={setActions}
                  type={type}
                  onPlayClick={null}
                  setType={setType}
                />
              </div>
            )} */}
            {/* <img
              src={src.includes("http") ? src : `${BlobBaseUrl}${src}`}
              alt={pageTitle}
              className={`${styles.image} ${styles.landingPageImage}`}
            /> */}
          </div>
        </>
      ) : (
        <div className={styles.subContainer}>
          <img
            src={src.includes("http") ? src : `${BlobBaseUrl}${src}`}
            alt={pageTitle}
            className={styles.image}
          />
        </div>
      )}
    </div>
  );
};
