import { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { PageType } from "types";
import styles from "./styles.module.scss";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Button } from "@progress/kendo-react-buttons";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import {
  Card,
  CardBody,
  CardHeader,
  CardImage,
  CardTitle,
} from "@progress/kendo-react-layout";
import Slider from "react-slick";
import { Loader } from "@progress/kendo-react-indicators";
import {
  TextArea,
  Slider as KendoSlider,
  TextAreaHandle,
} from "@progress/kendo-react-inputs";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Error } from "@progress/kendo-react-labels";
import { Tooltip } from "@progress/kendo-react-tooltip";
import Typewriter from "typewriter-effect";

const { florenceAdApi, florenceDallEApi, dalleRegenerateAPI, campaigns } =
  window.config;

const CAMPAIGN_OPTIONS = [
  {
    label: "Instagram Campaign",
    value: "instagram",
  },
  {
    label: "Email Campaign",
    value: "email",
  },
];

const PROMPTS = [
  `Removing image background using Azure Computer Vision...\n`,
  `Extracting dense captions using Computer Vision and Florence-based AI models...\n`,
  `Extracting colors present in the image using Azure ChatGPT and Python Imaging Library...\n`,
  `Generating an image using DALL-E 2 in Azure OpenAI Service...\n`,
  `Summarizing the extracted captions using Azure ChatGPT...\n`,
  `Merging the Dall-E2 generated background with the background removed image using the Python Imaging library...`,
];

interface Dropdown {
  label: string;
  value: string;
  emailDescription: string;
  number?: string;
  instaDescription: string;
  bgPrompt?: string;
  order?: number;
}

export const SocialMediaCampaign: FC = () => {
  const container = useRef<PDFExport>(null);

  const dispatch = useAppDispatch();
  const [images, setImages] = useState<ImageListType>([]);
  const [dropdownOptions, setDropdownOptions] = useState<Dropdown[]>([]);
  const [imageDescription, setImageDescription] = useState(
    dropdownOptions?.[0]?.emailDescription
  );
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [dalleImages, setDalleImages] = useState<string[]>([]);
  const [consistencyFactor, setConsistencyFactor] = useState(0.8);
  const [showCaptions, setShowCaptions] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [recommendedResult, setRecommendedResult] = useState<any>();
  const [campaign, setCampaign] = useState("");
  const [isError, setIsError] = useState<any>("");
  const [isAdError, setIsAdError] = useState<any>("");
  const [isEdit, setIsEdit] = useState(false);
  const [isPromptEdit, setIsPromptEdit] = useState(false);
  const [isPromptUpdated, setIsPromptUpdated] = useState(false);

  useEffect(() => {
    dispatch(setPageType(PageType.SocialMediaCampaign));
    dispatch(setPageTitle("Florence Model"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (campaigns?.length > 0) {
      const mappedCampaigns = campaigns.map((c: any) => ({
        label: c.name,
        value: c.imageUrl,
        number: c.order.toString(),
        instaDescription: c.instagramText,
        emailDescription: c.emailText,
        bgPrompt: c.bgPrompt,
      }));

      setDropdownOptions(mappedCampaigns);
      setValue(mappedCampaigns[0]);
    }
  }, []);

  const [result, setResult] = useState<any>({});

  const onChange = (imageList: ImageListType) => {
    setResult({});
    setDalleImages([]);
    setIsProcessing(false);
    setImages(imageList as never[]);
    setImageDescription("");
  };

  const getUpdatedImages = () => {
    setShowCaptions(false);
    setShowPrompt(false);
    setDalleImages([]);
    setIsImageLoading(true);
    const formData: any = new FormData();
    if (images.length) {
      const fileData = images[0].file;
      formData.append("image", fileData);
      // formData.append("is_abstract", !!isAbstract);
      // formData.append("number", 3);
      // formData.append("prompt", recommendImageDescription);
    }
    setIsError("");
    fetch(dalleRegenerateAPI, {
      method: "post",
      body: images.length
        ? formData
        : JSON.stringify({
            dalle_prompt: prompt,
          }),
    })
      .then((res) => res.json())
      .then((res) => {
        setRecommendedResult((old: any) => ({
          ...old,
          recommendedItems: res?.recommendedItems,
          prompt: res?.dalle_prompt,
        }));
        setPrompt(res?.dalle_prompt);
        setDalleImages(Object.values(res.recommendedItems));
      })
      .catch((e) => {
        console.log(e);
        setIsError(e);
      })
      .finally(() => setIsImageLoading(false));
  };

  const getRecommendedProducts = () => {
    setIsPromptUpdated(false);
    setShowCaptions(false);
    setShowPrompt(false);
    setDalleImages([]);
    setIsImageLoading(true);
    const formData: any = new FormData();
    if (images.length) {
      const fileData = images[0].file;
      formData.append("image", fileData);
      // formData.append("is_abstract", !!isAbstract);
      // formData.append("number", 3);
      // formData.append("prompt", recommendImageDescription);
    }
    setIsError("");
    fetch(
      value?.number === "3"
        ? "https://func-recommend-images.azurewebsites.net/api/recommendimages"
        : florenceDallEApi,
      {
        method: "post",
        body: images.length
          ? formData
          : JSON.stringify({
              image_url: value.value,
              ...(value?.bgPrompt && {
                scenario: value?.bgPrompt,
              }),
              ...(value?.number === "3" && {
                image_num: value?.number?.toString(),
              }),
            }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setRecommendedResult(res);
        setPrompt(res?.prompt);
        setDalleImages(Object.values(res.recommendedItems));
      })
      .catch((e) => {
        console.log(e);
        setIsError(e);
      })
      .finally(() => setIsImageLoading(false));
  };

  const exportPDFWithComponent = () => {
    if (container.current) {
      container.current.save();
    }
  };

  const fetchData = (formData?: any, noProducts?: boolean) => {
    if (!noProducts) getRecommendedProducts();
    setIsLoading(true);
    // fetch(`https://clienopenaidemos.azurewebsites.net/api/campaignGeneration`, {
    setIsAdError("");
    if (!noProducts) setDalleImages([]);
    fetch(florenceAdApi, {
      method: "post",
      ...(formData && { body: formData }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCampaign(res.campaign);
        setResult(res);
      })
      .catch((e) => {
        console.log(e);
        setIsAdError(e);
      })
      .finally(() => setIsLoading(false));
  };

  const [value, setValue] = useState<Dropdown>(dropdownOptions?.[0]);

  const [campaignType, setCampaignType] = useState<{
    label: string;
    value: string;
  }>(CAMPAIGN_OPTIONS[0]);

  const [isProcessing, setIsProcessing] = useState(false);
  const handleChange = (event: DropDownListChangeEvent) => {
    setImages([]);
    setPrompt("");
    setIsError("");
    setIsAdError("");
    setIsPromptUpdated(false);
    const filteredValue = dropdownOptions?.filter(
      (d) => d?.label === event.target.value
    )[0];
    setIsProcessing(false);
    setValue(filteredValue);
    setDalleImages([]);
    setImageDescription(
      campaignType.value === "email"
        ? filteredValue.emailDescription
        : filteredValue.instaDescription
    );
  };

  const handleCampaignChange = (event: DropDownListChangeEvent) => {
    setImages([]);
    const filteredValue = CAMPAIGN_OPTIONS.filter(
      (d) => d?.label === event.target.value
    )[0];
    setIsProcessing(false);
    setCampaignType(filteredValue);
    setImageDescription(
      campaignType.value === "email"
        ? value.emailDescription
        : value.instaDescription
    );
    setDalleImages([]);
    setIsError("");
    setIsAdError("");
  };

  useEffect(() => {
    setImageDescription(
      campaignType.value === "email"
        ? value?.emailDescription
        : value?.instaDescription
    );
  }, [campaignType.value, value]);

  const onProcess = () => {
    setDalleImages([]);
    setIsError("");
    setIsAdError("");
    setIsProcessing(true);
    setPrompt("");
    setIsPromptUpdated(false);
    setResult({});
    if (images?.length) {
      const formData: any = new FormData();
      const fileData = images[0].file;
      formData.append("image", fileData);
      formData.append("description", imageDescription);
      formData.append("type", campaignType.value);
      formData.append("creative_factor", consistencyFactor.toString());
      // formData.append("is_abstract", !!isAbstract);
      fetchData(formData);
    } else {
      // formData.append("product_category", value.category);
      fetchData(
        JSON.stringify({
          description: imageDescription,
          type: campaignType.value,
          creative_factor: consistencyFactor.toString(),
        })
      );
    }
  };

  //preload images
  function preloadImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = img.onabort = function () {
        reject(src);
      };
      img.src = src;
    });
  }

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i of dropdownOptions) {
        imagesPromiseList.push(preloadImage(i.value));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, []);

  const campaignTextAreaRef = useRef<TextAreaHandle | null>(null);

  useEffect(() => {
    isEdit && campaignTextAreaRef.current?.focus();
  }, [isEdit]);

  const promptTextAreaRef = useRef<TextAreaHandle | null>(null);

  useEffect(() => {
    isPromptEdit && promptTextAreaRef.current?.focus();
  }, [isPromptEdit]);

  if (!dropdownOptions?.length) {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div className={styles.tabImg}>
          <ImageUploading
            value={images}
            onChange={onChange}
            allowNonImageType={false}
            multiple={false}
          >
            {({ imageList, onImageUpload, onImageRemoveAll }) => {
              return (
                <div
                  className={`upload__image-wrapper ${styles.imageWrapper}`}
                  style={{ width: "100%" }}
                >
                  {!imageList?.length && (
                    <DropDownList
                      className={styles.dropDown}
                      data={dropdownOptions?.map((d) => d?.label)}
                      value={value?.label}
                      onChange={handleChange}
                      disabled={isImageLoading || isLoading}
                    />
                  )}

                  {imageList?.map((image, index) => (
                    <div
                      key={index}
                      className="image-item"
                      style={{
                        // height: 300,
                        position: "relative",
                      }}
                    >
                      <span
                        onClick={() => {
                          !isLoading && setImages([]);
                          setValue(dropdownOptions[0]);
                          setCampaignType(CAMPAIGN_OPTIONS[0]);
                          setImageDescription(
                            dropdownOptions[0].emailDescription
                          );
                        }}
                        className={`k-icon k-i-close ${styles.closeBtn}`}
                      ></span>
                      <img
                        src={image.dataURL}
                        alt="uploaded-form"
                        style={{ height: "100%" }}
                      />
                    </div>
                  ))}
                  {images.length === 0 && (
                    <>
                      <img
                        src={value.value}
                        alt="uploaded-form"
                        style={
                          {
                            // height: 300,
                          }
                        }
                      />
                    </>
                  )}
                  {/* <p style={{ textAlign: "center" }}>or</p>
                  <Button
                    className={styles.btn}
                    onClick={() => onImageUpload()}
                    id="#file"
                  >
                    Select File
                  </Button> */}

                  <p>Campaign Type</p>
                  <DropDownList
                    className={styles.dropDown}
                    data={CAMPAIGN_OPTIONS?.map((d) => d?.label)}
                    value={campaignType?.label}
                    onChange={handleCampaignChange}
                    disabled={isImageLoading || isLoading}
                  />
                  {/* <RadioGroup
                    className={styles.radioGroup}
                    data={ABSTRACT_RADIO_VALUES}
                    onChange={handleAbstract}
                    value={isAbstract}
                    layout="horizontal"
                  /> */}
                  <p style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    Surprise Factor{" "}
                    <Tooltip
                      tooltipClassName={styles.tooltip}
                      position={"right"}
                      anchorElement="target"
                      content={(props) => (
                        <div
                          style={{
                            wordWrap: "break-word",
                            width: 200,
                            padding: 8,
                            fontSize: 13,
                          }}
                        >
                          {props.title}
                        </div>
                      )}
                    >
                      <span
                        title={`Surprise factor controls the temperature parameter which controls the randomness in output.\nChoose a high value to get more interesting content.`}
                        className="k-icon k-i-question"
                        style={{
                          color: "#e9883a",
                        }}
                      ></span>
                    </Tooltip>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      color: "white",
                      gap: 8,
                      fontSize: 14,
                      alignItems: "center",
                    }}
                  >
                    Min
                    <KendoSlider
                      min={0}
                      className={styles.creativeFactor}
                      max={1}
                      value={consistencyFactor}
                      onChange={(e) =>
                        setConsistencyFactor(+e.value.toFixed(1))
                      }
                    />
                    Max
                  </div>

                  <p>Enter campaign description:</p>
                  <TextArea
                    key={value.value}
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.value)}
                    autoSize={true}
                    placeholder="Enter campaign description"
                    className={styles.textArea}
                  />
                  <Button
                    className={styles.btn}
                    onClick={onProcess}
                    id="#file"
                    disabled={isImageLoading || isLoading}
                  >
                    Process
                  </Button>
                </div>
              );
            }}
          </ImageUploading>
        </div>

        <div className={styles.tabTextContainer}>
          <div className={styles.tabText}>
            {isProcessing ? (
              <>
                {/* {isLoading ? (
                  <div
                    className={styles.loaderContainer}
                    style={{ color: "white", height: 350, width: 400 }}
                  >
                    <h2 className={styles.generatingVerbText}>
                      Generating Campaign...
                    </h2>
                    <Loader
                      style={{
                        color: "white",
                        height: 350,
                        width: 400,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                ) : ( */}
                <div className={styles.textContainer}>
                  <Card className={styles.cardContainer}>
                    {!isLoading && (
                      <CardHeader>
                        <CardTitle>
                          <strong>
                            {result?.title ?? "Generated Marketing Copy"}
                          </strong>
                        </CardTitle>
                      </CardHeader>
                    )}
                    <CardBody className={styles.cardBody}>
                      <div
                        style={{
                          overflowY: "auto",
                          width: "50%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {isLoading ? (
                          <div
                            className={styles.loaderContainer}
                            style={{ color: "black" }}
                          >
                            <h2 className={styles.generatingVerbText}>
                              Generating Campaign...
                            </h2>
                            <Loader
                              style={{
                                color: "white",
                                height: 350,
                                width: 400,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </div>
                        ) : isAdError ? (
                          <Error className={styles.error}>
                            <div>
                              <span
                                className="k-icon k-i-warning"
                                style={{ marginRight: 8 }}
                              />
                              Oops! Something went wrong. Please try again
                              later.
                            </div>
                            <p>{isAdError?.message}</p>
                            <br />
                            <Button
                              className={styles.btn}
                              style={{
                                backgroundColor: "#ffc000",
                                fontWeight: 600,
                                color: "black",
                              }}
                              onClick={() => {
                                fetchData(
                                  JSON.stringify({
                                    description: imageDescription,
                                    type: campaignType.value,
                                    creative_factor:
                                      consistencyFactor.toString(),
                                  }),
                                  true
                                );
                              }}
                            >
                              Retry
                            </Button>
                          </Error>
                        ) : (
                          <>
                            <TextArea
                              value={campaign}
                              key={value.value}
                              readOnly={!isEdit}
                              onChange={(e) => setCampaign(e.value)}
                              autoSize={true}
                              ref={campaignTextAreaRef}
                              className={`${styles.campaignTextArea} ${
                                !isEdit && styles.disableTextArea
                              }`}
                            />
                            {!isImageLoading &&
                              result &&
                              dalleImages.length > 0 && (
                                <div className={styles.btnContainer}>
                                  <Button
                                    onClick={() => setIsEdit((old) => !old)}
                                    className={styles.btn}
                                  >
                                    {isEdit ? "Save" : "Edit"}
                                  </Button>
                                  <Button
                                    className={styles.btn}
                                    onClick={() => exportPDFWithComponent()}
                                  >
                                    Print
                                  </Button>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{
                            position: "relative",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {isImageLoading ? (
                            <div
                              style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                whiteSpace: "break-spaces",
                              }}
                            >
                              {value.value !== dropdownOptions?.[1].value &&
                              isPromptUpdated ? (
                                <Typewriter
                                  key={isImageLoading.toString()}
                                  onInit={(typewriter) => {
                                    typewriter.typeString(PROMPTS[3]).start();
                                  }}
                                />
                              ) : (
                                <Typewriter
                                  key={isImageLoading.toString()}
                                  options={{
                                    delay: 45,
                                  }}
                                  onInit={(typewriter) => {
                                    typewriter
                                      .typeString(PROMPTS[0])
                                      .typeString("\n")
                                      .typeString(PROMPTS[1])
                                      .typeString("\n")
                                      .typeString(PROMPTS[2])
                                      .typeString("\n")
                                      .typeString(PROMPTS[3])
                                      .typeString("\n")
                                      .typeString(PROMPTS[4])
                                      .start();
                                  }}
                                />
                              )}
                            </div>
                          ) : isError ? (
                            <Error className={styles.error}>
                              <div>
                                <span
                                  className="k-icon k-i-warning"
                                  style={{ marginRight: 8 }}
                                />
                                Oops! Something went wrong. Please try again
                                later.
                              </div>
                              <p>{isError?.message}</p>
                              <br />
                              <Button
                                className={styles.btn}
                                style={{
                                  backgroundColor: "#ffc000",
                                  fontWeight: 600,
                                  color: "black",
                                }}
                                onClick={() => {
                                  isPromptUpdated
                                    ? getUpdatedImages()
                                    : getRecommendedProducts();
                                }}
                              >
                                Retry
                              </Button>
                            </Error>
                          ) : (
                            <>
                              <div className={styles.btnContainer}>
                                <Button
                                  className={styles.btn}
                                  onClick={() => {
                                    setShowCaptions((old) => !old);
                                    setShowPrompt(false);
                                  }}
                                  style={{
                                    ...(showCaptions && {
                                      border: "1px solid white",
                                    }),
                                  }}
                                >
                                  {!showCaptions ? "Show" : "Hide"} Process
                                </Button>
                                {value?.number === "3" && (
                                  <Button
                                    className={styles.btn}
                                    onClick={() => {
                                      setShowPrompt((old) => !old);
                                      setShowCaptions(false);
                                    }}
                                    style={{
                                      ...(showPrompt && {
                                        border: "1px solid white",
                                      }),
                                    }}
                                  >
                                    {!showPrompt ? "Show" : "Hide"} Prompt
                                  </Button>
                                )}
                              </div>
                              {showCaptions ? (
                                <div className={styles.showCaptions}>
                                  <p>Image Background Removed: </p>
                                  <a
                                    style={{ color: "white" }}
                                    target="_blank"
                                    href={
                                      recommendedResult?.background_removed_image
                                    }
                                    rel="noreferrer"
                                  >
                                    {
                                      recommendedResult?.background_removed_image
                                    }
                                  </a>
                                  <hr />
                                  <p>Extracted Dense Captions:</p>
                                  {recommendedResult?.caption}
                                  <hr />
                                  <p>
                                    Extracted Colors:{" "}
                                    {recommendedResult?.colors}
                                  </p>
                                  <hr />
                                  <p>
                                    Dall.E 2 Prompt: {recommendedResult?.prompt}
                                  </p>
                                  <hr />
                                  <p>
                                    Generated Summary of Caption:{" "}
                                    {recommendedResult?.["summary of caption"]}
                                  </p>
                                </div>
                              ) : showPrompt ? (
                                <div
                                  className={styles.showCaptions}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                  }}
                                >
                                  <TextArea
                                    key={value.value}
                                    readOnly={!isPromptEdit}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.value)}
                                    autoSize={true}
                                    placeholder="Enter prompt"
                                    className={`${styles.promptTextArea} ${
                                      !isPromptEdit && styles.disableTextArea
                                    }`}
                                    ref={promptTextAreaRef}
                                  />
                                  <div className={styles.btnContainer}>
                                    <Button
                                      onClick={() => {
                                        if (isPromptEdit) {
                                          getUpdatedImages();
                                          setIsPromptUpdated(true);
                                        }
                                        setIsPromptEdit((old) => !old);
                                      }}
                                      className={styles.btn}
                                    >
                                      {isPromptEdit ? "Send" : "Edit"}
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    height: 350,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {dalleImages?.[selectedImage] && (
                                    <img
                                      style={{
                                        height: 350,
                                        // width: 425,
                                        borderRadius: 8,
                                      }}
                                      src={dalleImages[selectedImage]}
                                      alt="img"
                                    />
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                {/* )} */}
              </>
            ) : null}
          </div>
          {dalleImages.length > 0 && (
            <div className={styles.tabText}>
              <div className={styles.textContainer}>
                <Card className={styles.carouselCardContainer}>
                  <CardHeader>
                    <CardTitle>
                      Alternative Images
                      <span
                        onClick={() => getRecommendedProducts()}
                        className={`k-icon k-i-reset-sm ${styles.refreshIcon}`}
                      ></span>
                    </CardTitle>
                  </CardHeader>
                  <CardBody
                    style={{
                      height: 290,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Slider
                      arrows={true}
                      dots={true}
                      lazyLoad="progressive"
                      autoplay={false}
                      slidesToShow={3}
                      infinite={false}
                      className={styles.slick}
                      pauseOnFocus
                      pauseOnHover
                    >
                      {dalleImages?.map((item, index) => {
                        return (
                          <div
                            onClick={() => {
                              setSelectedImage(index);
                            }}
                            key={index}
                            className={styles.slideContainer}
                          >
                            <div
                              className={`${styles.overlay} ${
                                selectedImage === index && styles.showArrow
                              }`}
                            >
                              <span
                                className={`k-icon k-i-check-circle ${styles.checkIcon}`}
                              ></span>
                            </div>
                            <CardImage
                              style={{
                                height: 260,
                                width: 260,
                                borderRadius: 8,
                              }}
                              src={item}
                            />
                          </div>
                        );
                      })}
                    </Slider>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: -10000,
          top: 0,
        }}
      >
        <PDFExport
          paperSize="A4"
          landscape={true}
          margin="20"
          scale={1} // 1.1 for portrait
          ref={container}
          fileName={value?.label}
        >
          <div className={styles.tabText}>
            <div className={styles.textContainer}>
              <Card className={styles.cardContainer}>
                <CardHeader>
                  <CardTitle>
                    <strong>
                      {result?.title ?? "Generated Marketing Copy"}
                    </strong>
                  </CardTitle>
                </CardHeader>
                <CardBody className={styles.cardBody}>
                  <div>
                    <p style={{ whiteSpace: "break-spaces" }}>{campaign}</p>
                  </div>
                  <div>
                    <div
                      style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          height: 350,
                          width: 425,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{
                            height: 350,
                            width: 425,
                            borderRadius: 8,
                          }}
                          src={dalleImages[selectedImage]}
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};
