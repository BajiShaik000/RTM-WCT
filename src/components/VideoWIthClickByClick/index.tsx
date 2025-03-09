import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { PageType } from "types";
import { AzureMediaPlayer } from "./azureMediaPlayer";
import styles from "./styles.module.scss";
import React from "react";
import { ImageSlideShow } from "components/ImageSlideShow";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useLocation } from "react-router-dom";

interface Props {
  videoSrc?: string;
  clickByClickURL?: string;
  clickVideo?: string;
  videoType?: string;
  autoPlay: boolean;
  pageType: PageType;
  pageTitle: string;
  liveHosted?: string;
  productDemoVideo?: string;
  setIsEnded?: Dispatch<SetStateAction<boolean>>;
  videoTag?: boolean;
  slider?: boolean;
  productDemoVideoDisabled: boolean;
  liveHostedDisabled: boolean;
  videoDisabled: boolean;
  clickbyclickDisabled: boolean;
  videoDetails?: any;
  videoArray?: any;
  dropDownMenu?: any;
  selectedItem?: any;
}

export const VideoWIthClickByClick: FC<Props> = ({
  autoPlay,
  videoSrc,
  videoType,
  clickByClickURL,
  clickVideo,
  liveHosted,
  productDemoVideo,
  pageType,
  pageTitle,
  setIsEnded,
  videoTag,
  slider = false,
  productDemoVideoDisabled,
  liveHostedDisabled,
  videoDisabled,
  clickbyclickDisabled,
  videoDetails,
  videoArray,
  dropDownMenu,
  selectedItem,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("video");
  const dispatch = useAppDispatch();
  const [videoUrlToPlay, setVideoUrlToPlay] = React.useState(videoSrc);

  useEffect(() => {
    setVideoUrlToPlay(videoSrc);
  }, [videoSrc]);
  function handleOnClick(url: string) {
    window.open(url);
  }
  const location = useLocation();

  useEffect(() => {
    setSelectedValue("video"); // Reset selectedValue to "video" when URL changes
  }, [location.pathname]);
  const handleChange = (e: any) => {
    const selectedVideoLink = e.target.value?.videoPlayurl;

    if (selectedVideoLink) {
      setVideoUrlToPlay(selectedVideoLink);
      setSelectedValue("video");
      if (selectedVideoLink.includes("manifest")) {
        videoType = "video";
      }
    } else {
      console.error("Selected video is undefined or invalid.");
    }
  };

  const handleClickByClickChange = () => {
    setSelectedValue("click-By-click");
  };

  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));
  }, [dispatch, pageType, pageTitle]);

  return (
    <div key={pageType} className={styles.container}>
      <div className={styles.toggleButtonsContainer}>
        <div>
          <DropDownList
            data={dropDownMenu}
            textField="text"
            defaultValue={selectedItem}
            dataItemKey="id"
            className={
              videoDisabled
                ? styles.disabledButton
                : `${styles.ButtonNew} ${
                    selectedValue === "video" ? styles.activeButton : ""
                  }`
            }
            onChange={handleChange}
          />
        </div>

        <button
          disabled={clickbyclickDisabled}
          className={
            clickbyclickDisabled
              ? styles.disabledButton
              : `${styles.ButtonNew} ${
                  selectedValue === "click-By-click" ? styles.activeButton : ""
                }`
          }
          onClick={handleClickByClickChange}
        >
          <span className={styles.circleRadioBtn}></span>
          <span className={styles.labelText}>Click-by-Click</span>
        </button>

        {liveHosted && (
          <div>
            <button
              disabled={liveHostedDisabled}
              className={
                liveHostedDisabled
                  ? `${styles.disabledButton}`
                  : `${styles.Button2New}`
              }
              onClick={() => window.open(liveHosted, "_blank")}
            >
              Live Hosted
            </button>
          </div>
        )}

        {productDemoVideo && (
          <div>
            <button
              disabled={productDemoVideoDisabled}
              className={
                productDemoVideoDisabled
                  ? `${styles.disabledButton}`
                  : `${styles.Button2New}`
              }
              onClick={() => setSelectedValue("product")}
            >
              Product Demo Video
            </button>
          </div>
        )}
      </div>

      {selectedValue === "video" ? (
        <>
          <h1 className={styles.videoTitle}>{pageTitle}</h1>
          {videoType === "clickVideo" &&
          !videoUrlToPlay?.includes("manifest") ? (
            <div className={styles.subContainer}>
              <iframe
                id="1"
                title={pageTitle}
                allow="autoplay"
                src={videoUrlToPlay}
                className={styles.iframe}
              />
            </div>
          ) : (
            <div key={pageType} className={styles.subContainer}>
              <AzureMediaPlayer
                src={videoUrlToPlay}
                autoPlay={autoPlay}
                setIsEnded={setIsEnded}
              />
            </div>
          )}
        </>
      ) : selectedValue === "click-By-click" ? (
        <>
          {slider === false ? (
            <>
              <h1 className={styles.videoTitle}>{pageTitle}</h1>
              <div className={styles.subContainer}>
                <iframe
                  id="1"
                  title={pageTitle}
                  allow="autoplay"
                  src={clickByClickURL}
                  className={styles.iframe}
                />
              </div>
            </>
          ) : (
            <ImageSlideShow
              src="https://dreamdemoassets.blob.core.windows.net/appspluscosmos/Kuberenetes_highlights"
              pageTitle="Azure Kubernetes Highlights"
              pageType={PageType.AzureGeoSpatialForFSI}
              count={39}
            />
          )}
        </>
      ) : selectedValue === "product" ? (
        <div className={styles.container}>
          <div className={styles.productCardContainer}>
            {videoArray.map((product: any) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => handleOnClick(product.navigateUrl)}
              >
                <img
                  src="https://dreamdemoassets.blob.core.windows.net/nrf/Play_button.png"
                  className={styles.playIcon}
                />
                <video
                  width="100%"
                  height="250px"
                  poster={product.thumbnailImage}
                >
                  <source src={product.navigateUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
