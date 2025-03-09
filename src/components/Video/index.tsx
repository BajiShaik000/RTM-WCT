import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { PageType } from "types";
import { AzureMediaPlayer } from "./azureMediaPlayer";
import styles from "./styles.module.scss";

interface Props {
  src: string;
  autoPlay: boolean;
  pageType: PageType;
  pageTitle: string;
  liveHosted?: string;
  productDemoVideo?: string;
  setIsEnded?: Dispatch<SetStateAction<boolean>>;
  videoTag?: boolean;
}

export const Video: FC<Props> = ({
  autoPlay,
  src,
  pageType,
  pageTitle,
  liveHosted,
  productDemoVideo,
  setIsEnded,
  videoTag,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div key={pageType} className={styles.container}>
      <h1 className={styles.videoTitle}>{pageTitle}</h1>
      <div className={styles.toggleButtonsContainer}>
        {liveHosted && (
          <div>
            <button
              className={`${styles.Button2New}`}
              onClick={(e) => {
                window.open(liveHosted, "_blank");
              }}
            >
              Live Hosted
            </button>
          </div>
        )}
        {productDemoVideo && (
          <div>
            <button
              className={`${styles.Button2New}`}
              onClick={(e) => {
                window.open(productDemoVideo, "_blank");
              }}
            >
              Product Demo Video
            </button>
          </div>
        )}
      </div>
      <div key={pageType} className={styles.subContainer}>
        {videoTag ? (
          <video className={styles.videoTag} src={src} autoPlay={true} />
        ) : (
          <AzureMediaPlayer
            src={src}
            autoPlay={autoPlay}
            setIsEnded={setIsEnded}
          />
        )}
      </div>
    </div>
  );
};
