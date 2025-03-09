import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  Action,
  Chat,
  ChatMessageBoxProps,
  ChatMessageSendEvent,
  Message,
  User,
} from "@progress/kendo-react-conversational-ui";
import axios from "axios";
import {
  CartIcon,
  RetakeIcon,
  SelectIcon,
  Architecture,
  SpeakerIcon,
} from "assets";
import {
  AddCircle24Filled,
  AddCircle32Filled,
  Camera20Regular,
  Camera28Filled,
  Dismiss24Regular,
  Mic28Filled,
  Speaker224Filled,
  SpeakerMute24Filled,
  SubtractCircle24Filled,
  SubtractCircle32Filled,
  Video28Filled,
} from "@fluentui/react-icons";
import { useMic } from "hooks/useMic";
import Webcam from "react-webcam";
import { Popup } from "components";
import { Button } from "@progress/kendo-react-buttons";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";
import { Checkbox } from "@progress/kendo-react-inputs";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { IconButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { Notification } from "@progress/kendo-react-notification";
import {
  setSelectedButtonId,
  setShoppingGender,
  setShoppingStyle,
  setShowDefaultLooks,
} from "store";
import Slider from "react-slick";
import { DefaultLooks } from "components/DefaultLooks";
import { useMsal } from "@azure/msal-react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { INITIAL_PRODUCTS, WARDROBE_PRODUCTS } from "./Constants";
import { ArchitectureWithTags } from "pages/ArchitectureWithTags";
import { PageType } from "types";
import Checkout from "./Checkout/Index";

const IGNORE_LOOK_NAME_ARRAY = [
  "female casual",
  "female formal",
  "male casual",
  "male formal",
];

const { BlobBaseUrl, SPEECH_REGION, SPEECH_KEY } = window.config;
const COPILOT_API =
  "https://func-shoppingassistant-events-v1.azurewebsites.net/api/chat";
const SESSIONS_API =
  "https://func-shoppingcopilot-v2.azurewebsites.net/api/sessions";
const IMAGE_UPLOAD_API =
  "https://func-image-shopping-copilot.azurewebsites.net/api/getproductimages_upload";
const VIDEO_UPLOAD_API =
  "https://func-image-shopping-copilot.azurewebsites.net/api/productvideo_upload?";

const SUGGESTED_ACTIONS: Action[] = [
  {
    type: "reply",
    value:
      "I am going to Greece for a summer vacation. Can you please show me some outfits for my vacation?",
  },
  {
    type: "reply",
    value: "Show me some outfits for a wedding in London.",
  },

  {
    type: "reply",
    value:
      "Can you show me some ethnic Indian dresses for a wedding in Udaipur?",
  },
];

function convertMessages(inputMessages: Message[]) {
  const convertedMessages = [];
  let currentMessage: any = {};

  for (let i = 0; i < inputMessages.length; i++) {
    const authorId = inputMessages[i].author.id;
    const messageText = inputMessages[i].text;

    if (authorId === "bot") {
      if ("bot" in currentMessage) {
        convertedMessages.push(currentMessage);
        currentMessage = {};
      }
      currentMessage.bot = messageText;
    } else if (authorId === "user") {
      if ("user" in currentMessage) {
        convertedMessages.push(currentMessage);
        currentMessage = {};
      }
      currentMessage.user = messageText;
    }
  }

  if (Object.keys(currentMessage).length > 0) {
    convertedMessages.push(currentMessage);
  }

  return convertedMessages;
}

const NEW_SESSION = {
  sessionId: 0,
  text: "New Chat",
};

export const ShoppingCopilotMTC = () => {
  const { shoppingStyle, shoppingGender, selectedButtonId, showDefaultLooks } =
    useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const [sessionId, setSessionId] = useState<string>("");
  const [sessions, setSessions] = useState<any[]>([NEW_SESSION]);
  const [selectedSession, setSelectedSession] = useState<any>(NEW_SESSION);
  const { accounts } = useMsal();
  const [isCheckout, setIsCheckout] = useState(false);
  const location = useLocation();
  const handleProceedToCheckout = () => {
    setIsCheckout(true); // Show the checkout page when the button is clicked
  };
  const AUTHORS: User[] = [
    {
      id: "bot",
      name: "Cora",
      avatarUrl:
        "https://dreamdemoassets.blob.core.windows.net/mtc/mtc_bot_icon.png",
    },
    {
      id: "user",
      name: "Customer",
      avatarUrl: `https://dreamdemoassets.blob.core.windows.net/daidemo/AI_First_Movers_User_Icon.png`,
    },
  ];

  const INITIAL_MESSAGE = [
    {
      author: AUTHORS[0],
      text: "Hi, How can I help you?",
      suggestedActions: SUGGESTED_ACTIONS,
      tokens: 13,
    },
  ];

  const [showPopup, setShowPopup] = useState(true);
  const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGE);
  useEffect(() => {
    if (accounts.length > 0) {
    }
  }, [accounts]);

  useEffect(() => {
    getSessions();
  }, []);

  const [notification, setNotification] = useState(null);
  const notificationRef = useRef(null);
  const [products, setProducts] = useState<any>(INITIAL_PRODUCTS);
  const [isReplaced, setIsReplaced] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const timerRef: any = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showVideoCamera, setShowVideoCamera] = useState(false);
  const [text] = useState("");
  const anchor = useRef(null);
  const [show, setShow] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [images] = useState<ImageListType>([]);
  const [actions, setActions] = useState<Action[]>(SUGGESTED_ACTIONS);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [showThoughtProcessPopup, setShowThoughtProcessPopup] = useState(false);
  const [selectionItem, setSelectionItem] = useState<any>({});
  const [showCart, setShowCart] = useState(false);
  const [showWardrobe, setShowWardrobe] = useState(false);

  const [wardrobeProducts, setWardrobeProducts] =
    useState<any>(WARDROBE_PRODUCTS);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    notificationRef.current = notification;
  }, [notification]);
  let selectedLook;
  if (shoppingStyle === "casual" && shoppingGender === "female") {
    selectedLook = "Look 2";
  } else if (shoppingStyle === "formal" && shoppingGender === "female") {
    selectedLook = "Look 1";
  } else if (shoppingStyle === "casual" && shoppingGender === "male") {
    selectedLook = "Look 3";
  } else if (shoppingStyle === "formal" && shoppingGender === "male") {
    selectedLook = "Look 4";
  }

  let [addNotify, setAddNotify] = useState(false);
  let [removeNotify, setRemoveNotify] = useState(false);
  const [buttonGlow, setButtonGlow] = useState({
    isProceed: false,
    isChat: true,
  });
  const onChange = (imageList: ImageListType) => {
    if (imageList.length)
      onImageUpload(imageList[0].file, imageList[0].dataURL);
    setShow(false);
  };

  let popupTitle = " ";

  let imageUrl;
  let imageUrl2;
  if (window.location.href.includes("old-website")) {
    imageUrl =
      "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/old-architectureV1.png";
  } else if (window.location.href.includes("reimagined-website-with-scaling")) {
    imageUrl =
      "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/technical_reference_architectureV2.png";
    imageUrl2 =
      "https://dreamdemoassets.blob.core.windows.net/openai/ai_first_shopping_assistant_arch_diagram.png";
  } else {
    imageUrl =
      "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/mid-term-architectureV2.png";
  }

  const [issueToken, setIssueToken] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    const filteredProducts = Object.keys(products).reduce((acc: any, key) => {
      const [gender, style] = key.split(" ");
      if (gender === shoppingGender && style === shoppingStyle) {
        acc[key] = products[key];
      }
      return acc;
    }, {});
    setIsReplaced(false);
    setProducts(filteredProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingGender, shoppingStyle]);

  const deleteSession = () => {
    axios
      .post(COPILOT_API, {
        history: convertMessages(messages),
        gender: shoppingGender,
        style: shoppingStyle,
        sessionid: selectedSession?.sessionId,
        retrieve_session: false,
        delete_session: true,
      })
      .then((res) => {
        getSessions();
        setSelectedSession(sessions[0]);
        setMessages(INITIAL_MESSAGE);
      })
      .catch((err) => console.log({ err }))
      .finally(() => setIsDelete(false));
  };

  const generateNewSession = () => {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    setSessionId(randomNumber.toString());
    return {
      sessionId: randomNumber.toString(),
      text: "New Chat",
    };
  };

  const getSessions = () => {
    axios
      .get(SESSIONS_API)
      .then((res) => {
        const newSession = generateNewSession();
        setSessions([
          newSession,
          ...res.data.map((s: any) => ({
            sessionId: s.sessionId,
            text: s.sessionId,
          })),
        ]);
        setSelectedSession(newSession);
      })
      .catch((err) => console.log({ err }));
  };

  const generateToken = () => {
    axios
      .post(
        `https://${SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
        {},
        {
          headers: {
            "Ocp-Apim-Subscription-Key": SPEECH_KEY,
          },
          responseType: "text",
        }
      )
      .then((res) => setIssueToken(res.data));
  };

  useEffect(() => {
    if (!issueToken) {
      generateToken();
    }
  }, [issueToken]);

  const generateAudio = (text: string) => {
    const id = +new Date();

    let xml = `<speak version=\'1.0\' xml:lang="en-US">
    <voice xml:id='${id}' xml:lang='en-US' xml:gender='Female' name='en-US-CoraNeural'>${text.replaceAll(
      "&",
      "and"
    )}</voice>
    </speak>`;

    fetch(
      `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        body: xml,
        method: "post",
        headers: {
          "X-Microsoft-OutputFormat": "riff-48khz-16bit-mono-pcm",
          "Content-Type": "application/ssml+xml",
          Authorization: "Bearer " + issueToken,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((res) => {
        const audioBlob = new Blob([res], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const sampleAudioPlayer: HTMLAudioElement | null =
          document.getElementById("sampleAudioPlayer") as HTMLAudioElement;
        if (sampleAudioPlayer) {
          sampleAudioPlayer.src = audioUrl;
          sampleAudioPlayer.play();
        }
      })
      .catch((err) => {
        generateAudio(text);
      });
  };

  const onDefaultLooksClick = (id: number) => {
    onTextSend(`Look ${id} selected.`);
    dispatch(setShowDefaultLooks(false));
  };

  const onImageUpload = async (file?: File, dataURL?: string) => {
    const userMessage: Message = {
      author: AUTHORS[1],
      text: "",
      timestamp: new Date(),
      attachments: [
        {
          content: dataURL,
          contentType: "image",
        },
      ],
    };
    setMessages((old) => [
      ...old,
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);
    const history = convertMessages(messages);

    const formData: any = new FormData();
    formData.append("image", file);
    formData.append("history", JSON.stringify(history));
    fetch(IMAGE_UPLOAD_API, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.answer) {
          setMessages((old) => {
            const newArray = [
              ...old.slice(0, old.length - 1),
              {
                author: AUTHORS[0],
                text: res.answer,
                timestamp: new Date(),
                data_points: res?.data_points,
                thoughts: res?.thoughts,
              },
            ];
            return newArray;
          });
        } else {
          setMessages((old) => [...old.slice(0, old.length - 1)]);
        }
        setIsReplaced(true);
        setProducts(res?.products ?? {});
      });
  };

  const onTextSend = (text: string) => {
    onMessageSend(undefined, text);
  };

  const [sttFromMic] = useMic(text, onTextSend);
  const [isChatEnded, setIsChatEnded] = useState(false);

  const onMessageSend = (e?: ChatMessageSendEvent, text?: string) => {
    isChatEnded && setIsChatEnded(false);
    const userMessage = {
      author: AUTHORS[1],
      text: text?.trim() ?? e!.message.text?.trim(),
      timestamp: e?.message.timestamp ?? new Date(),
    };
    const filteredSuggestedActions = actions.filter(
      (item) => item.value !== e?.message.text
    );
    setButtonGlow((old) => ({
      ...old,
      isChat: false,
      isProceed: true,
    }));
    setMessages((old) => [
      ...old,
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);
    const historyMessages = [...messages, userMessage];
    historyMessages.shift();
    axios
      .post(COPILOT_API, {
        history: convertMessages(historyMessages),
        gender: shoppingGender,
        style: shoppingStyle,
        sessionid: selectedSession?.sessionId,
        retrieve_session: false,
        delete_session: false,
        ...(messages.length > 2 && { products }),
      })
      .then(({ data }) => {
        if (data?.answer) {
          generateAudio(data?.answer);
          setMessages((old) => {
            const newArray = [
              ...old.slice(0, old.length - 2),
              { ...userMessage, tokens: data?.question_tokens },
              {
                author: AUTHORS[0],
                text: data.answer,
                timestamp: new Date(),
                data_points: data?.data_points,
                thoughts: data?.thoughts,
                tokens: data?.answer_tokens,
                suggestedActions: data?.suggestions?.map((s: any) => ({
                  type: "reply",
                  value: s,
                })),
              } as Message,
            ];
            return newArray;
          });

          setSessions((old: any) => {
            const arr = old.map((s: any) =>
              s.text === "New Chat"
                ? { sessionId: s.sessionId, text: s.sessionId }
                : s
            );
            const newSession = generateNewSession();

            return [newSession, ...arr];
          });
          setSelectedSession((old: any) => ({
            sessionId: old.sessionId,
            text: old.sessionId,
          }));

          if (data?.show_default_looks) {
            dispatch(setSelectedButtonId(null));
            dispatch(setShowDefaultLooks(true));
          } else {
            dispatch(setShowDefaultLooks(false));
          }
        } else {
          setMessages((old) => [...old.slice(0, old.length - 1)]);
        }
        data?.display_msg && setIsChatEnded(true);
        setBackgroundImage(
          data?.background_img?.img?.replaceAll(" ", "%20") ?? ""
        );
        setIsReplaced(true);
        setProducts(data?.products ?? {});
        const formattedProducts = Object.values(data?.shopping_cart?.[0])
          .flat()
          .map((product: any, index) => ({
            ...product,
            checked: true,
            id: index,
          }));
        setButtonGlow((old) => ({
          ...old,
          isChat: false,
          isProceed: true,
        }));
        setCartProducts(formattedProducts ?? []);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const element = document.getElementsByClassName(
      "k-message-list k-avatars"
    )?.[0];

    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const AttachmentTemplate = (props: any) => {
    let attachment = props.item;
    return (
      <div className="k-card k-card-type-rich">
        <div className="k-card-body quoteCard">
          <img
            style={{ maxHeight: "124px" }}
            src={attachment.content}
            draggable={false}
            alt="content"
          />
        </div>
      </div>
    );
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    timerRef.current = setTimeout(() => {
      (sttFromMic as any)();
    }, 1000);
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    setIsPressed(false);
  };

  const videoWebCamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<any>([]);

  const handleStartCaptureClick = useCallback(() => {
    if (videoWebCamRef.current) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(
        videoWebCamRef.current.stream as MediaStream,
        {
          mimeType: "video/webm",
        }
      );
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [videoWebCamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setRecordedChunks((prev: any) => [...prev, data]);
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  function convertBase64ToFile(base64: string, filename: string) {
    const base64WithoutPrefix = base64.split(",")[1];
    const binaryString = window.atob(base64WithoutPrefix);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "application/octet-stream" });
    const file = new File([blob], filename, {
      type: "application/octet-stream",
    });

    return file;
  }

  const webcamRef = useRef<Webcam | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const customMessage = (props: ChatMessageBoxProps) => {
    return (
      <>
        {props.messageInput}
        {props.sendButton}
        <div
          ref={anchor}
          onClick={() => {
            setShow((old) => !old);
            setShowVideo(false);
          }}
        >
          <Camera28Filled style={{ cursor: "pointer" }}></Camera28Filled>
        </div>
        <div
          ref={anchor}
          onClick={() => {
            setShowVideo((old) => !old);
            setShow(false);
          }}
        >
          <Video28Filled style={{ cursor: "pointer" }}></Video28Filled>
        </div>
        <div
          title="Hold to Speak, Please wait for 2-3 seconds while holding down the mic button before you begin to speak."
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ opacity: !isPressed ? 1 : 0.5 }}
        >
          <Mic28Filled className={styles.mic} />
        </div>
      </>
    );
  };

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const element = document.getElementsByClassName(
      "k-message-list k-avatars"
    )?.[0];
    const spanElement = document.createElement("span");

    spanElement.classList.add(styles.chatEndedMessage);
    spanElement.textContent = "Chat has ended.";

    if (isChatEnded && element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [isChatEnded]);

  const MessageTemplate = (props: any) => {
    return props.item.text ? (
      <div className="k-bubble" key={props.item?.id}>
        {props.item?.thoughts && (
          <div
            className={styles.bulbPositioning}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              style={{ color: "black" }}
              iconProps={{ iconName: "Lightbulb" }}
              title="Show thought process"
              onClick={() => {
                setSelectionItem(props.item);
                setShowThoughtProcessPopup(true);
              }}
            />
          </div>
        )}
        {props.item.text}
      </div>
    ) : (
      props.item.video && (
        <div
          className="k-bubble"
          style={{ backgroundColor: "#fff", borderColor: "#fff" }}
          key={props.item?.id}
        >
          <video width={200} controls loop autoPlay src={props.item.video} />
        </div>
      )
    );
  };

  const onToggle = (flag: boolean) => {
    setAddNotify(flag);
    if (flag) {
      setTimeout(() => {
        setAddNotify(false);
      }, 2000);
    }
  };
  const onRemoveToggle = (flag: boolean) => {
    setRemoveNotify(flag);
    if (flag) {
      setTimeout(() => {
        setRemoveNotify(false);
      }, 2000);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef: any = useRef(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    const validVideoFormats = /\.(mp4|mov|mkv|avi|flv|webm)$/i;

    if (file && !validVideoFormats.test(file.name)) {
      alert("Please upload a valid video format.");
      return;
    }

    setSelectedFile(file);
    handleUpload(file);
  };
  const handleUpload = (file: any) => {
    setShowVideo(false);

    if (file) {
      const userMessage: any = {
        author: AUTHORS[1],
        text: "",
        timestamp: new Date(),
        video: URL.createObjectURL(file),
      };
      setMessages((old) => [
        ...old,
        userMessage,
        { author: AUTHORS[0], typing: true },
      ]);

      const formData: any = new FormData();
      formData.append("video", file);
      axios.post(VIDEO_UPLOAD_API, formData).then((res: any) => {
        if (res?.data?.answer) {
          setMessages((old) => {
            const newArray = [
              ...old.slice(0, old.length - 1),
              {
                author: AUTHORS[0],
                text: res.data?.answer,
                timestamp: new Date(),
                data_points: res?.data?.data_points,
                thoughts: res.data?.thoughts,
              },
            ];
            return newArray;
          });
        } else {
          setMessages((old) => [...old.slice(0, old.length - 1)]);
        }
        setIsReplaced(true);
        setProducts(res?.data?.products ?? {});
      });
      setSelectedFile(null);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const getVideoLink = () => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const url = URL.createObjectURL(blob);
    return url;
  };

  return (
    <>
      <div
        className={styles.container}
        style={{
          ...(Object.keys(products).length === 0 && cartProducts.length === 0
            ? {}
            : {}),
        }}
      >
        {" "}
        <div
          className={styles.subNav}
          style={{
            display: Object.keys(products)?.length > 0 ? "flex" : "none",
            // justifyContent: selectedProduct ? "space-between" : "flex-end",
          }}
        >
          {" "}
          {/* {!showCart && (
            <h1
              className={`${styles.header} ${styles.headerFont}`}
              style={{
                ...(backgroundImage && { color: "white" }),
              }}
            >
              {messages.length > 2
                ? "Product Recommendations"
                : "Product Recommendations based on your wardrobe"}
            </h1>
          )} */}
          {selectedProduct && (
            <div
              className={styles.navItem}
              onClick={() => {
                setSelectedProduct(null);
                setShowPopup(true);
              }}
            >
              <IoIosArrowBack color="white" />
              <span>Back</span>
            </div>
          )}{" "}
        </div>
        <audio hidden controls id="sampleAudioPlayer" muted={isMuted}></audio>
        {showWardrobe && selectedLook && (
          <div className={styles.prodContainer}>
            <h1
              className={`${styles.header} ${styles.headerFont}`}
              style={{
                ...(backgroundImage && { color: "white" }),
              }}
            >
              Purchase History
            </h1>
            <div
              style={{
                overflowY: "auto",
                height: "calc(100% - 102px)",
                width: "calc(100vw - 250px)",
                padding: 0,
              }}
            >
              <div
                className={styles.productContainer}
                style={{
                  gridTemplateColumns: showPopup
                    ? "repeat(3, 220px)"
                    : "repeat(5, 220px)",
                }}
              >
                {(WARDROBE_PRODUCTS as any)?.[selectedLook]?.map(
                  (product: any, index: number) => {
                    return (
                      <div
                        className={`${styles.product} && ${
                          cartProducts.filter((p) => p.url === product.url)
                            .length > 0
                            ? styles.activeProduct
                            : ""
                        } ${isReplaced && styles.replacedProduct}`}
                      >
                        <div className={styles.imageContainer}>
                          <img
                            className={styles.productImage}
                            src={product?.url}
                            alt={product?.name}
                          />
                        </div>
                        <div className={styles.metadata}>
                          <div className={styles.productTitle}>
                            {product?.name}
                          </div>
                          <div>
                            <div className={styles.productPrice}>
                              {product?.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}
        {showCart && !isCheckout && (
          <div className={styles.cartProdContainer}>
            <div className={styles.cartContainer}>
              <div className={styles.cartHeader}>
                <h1
                  className={`${styles.header} ${styles.headerFont}`}
                  style={{
                    ...(backgroundImage && { color: "white" }),
                  }}
                >
                  {"Product Recommendations based on your wardrobe"}
                </h1>
                {!window.location.href.includes("old-website") && (
                  <div
                    className={`${styles.navItem} ${styles.cartBtn}`}
                    onClick={() => {
                      setShowCart((old) => !old);
                      setShowWardrobe(false);
                    }}
                  >
                    <CartIcon color="#092952" />

                    <span
                      style={{
                        marginLeft: cartProducts?.length ? 8 : 4,
                        color: "#092952",
                        fontWeight: "bold",
                      }}
                    >
                      Cart{" "}
                      {cartProducts.length > 0 && `(${cartProducts.length})`}
                    </span>
                  </div>
                )}
              </div>
              <div>
                {" "}
                {cartProducts.map((product, index) => (
                  <div className={styles.cartItem} key={index}>
                    <div className={styles.cartProductCard}>
                      <img
                        src={product?.url}
                        alt={product?.name}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div className={styles.metadata}>
                        <div className={styles.productTitle}>
                          {product?.name}
                        </div>

                        <div className={styles.productQuantity}>
                          Quantity: {product?.quantity || 1}
                        </div>
                        <div>
                          {" "}
                          <button
                            onClick={() => {
                              setCartProducts((oldProducts) => {
                                const existingProduct = oldProducts.filter(
                                  (p) => p.url === product.url
                                );
                                if (existingProduct.length > 0) {
                                  onRemoveToggle(true);
                                  return oldProducts.filter(
                                    (p) => p.url !== product.url
                                  );
                                } else {
                                  onToggle(true);
                                  return [...oldProducts, product];
                                }
                              });
                            }}
                            className={
                              cartProducts.filter((p) => p.url === product.url)
                                .length > 0
                                ? styles.cartRemoveBtn
                                : styles.addBtn
                            }
                          >
                            {cartProducts.filter((p) => p.url === product.url)
                              .length > 0
                              ? "Remove"
                              : "Add"}
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className={styles.productPrice}>
                          {product?.price}
                        </div>
                      </div>
                      <div className={styles.horizontalLineNew} />{" "}
                    </div>{" "}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.orderDetails}>
              <h2>Order Details</h2>
              <div className={styles.horizontalLineNew} />
              <div className={styles.orderSummary}>
                <div className={styles.orderRow}>
                  <span>
                    <b>Price</b>
                    <br />
                    {cartProducts
                      .map((product: any) => product.price)
                      .join(" + ")}
                  </span>
                  <span>
                    <b> Total</b>
                    <br />$
                    {cartProducts
                      .map(
                        (product: any) =>
                          parseFloat(product.price.replace("$", "")) *
                          (product.quantity || 1)
                      )
                      .reduce((acc, curr) => acc + curr, 0)}
                  </span>
                </div>
                <div className={styles.horizontalLineNew}></div>

                <div className={styles.orderRow}>
                  <span>
                    {" "}
                    <b>Subtotal</b>
                  </span>
                  <span>
                    $
                    {cartProducts
                      .map(
                        (product: any) =>
                          parseFloat(product.price.replace("$", "")) *
                          (product.quantity || 1)
                      )
                      .reduce((acc, curr) => acc + curr, 0)}
                  </span>
                </div>
                <div className={styles.orderRow}>
                  <span>
                    <b>Delivery</b>
                  </span>
                  <span>$0</span>
                </div>
                <div className={styles.orderRow}>
                  <span>
                    <b>Estimated Total</b>
                  </span>
                  <span>
                    $
                    {cartProducts
                      .map(
                        (product: any) =>
                          parseFloat(product.price.replace("$", "")) *
                          (product.quantity || 1)
                      )
                      .reduce((acc, curr) => acc + curr, 0)}
                  </span>
                </div>
                <Button
                  className={styles.checkoutBtn}
                  onClick={() => {
                    handleProceedToCheckout();
                  }}
                >
                  Proceed to checkout
                </Button>
                <div className={styles.orderFooter}>
                  NEED ASSISTANT? <b>EMAIL US </b>
                  <br />
                  ALL TRANSACTIONS ARE SAFE AND SECURE. <b>SECURITY POLICY</b>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Order Details Section */}
        {!showCart &&
          !showWardrobe &&
          !selectedProduct &&
          !isCheckout &&
          Object.keys(products)?.length > 0 && (
            <div className={styles.prodContainer}>
              <div className={styles.prodCartContainer}>
                <div className={styles.cartHeader}>
                  <h1
                    className={`${styles.header} ${styles.headerFont}`}
                    style={{
                      ...(backgroundImage && { color: "white" }),
                    }}
                  >
                    {"Product Recommendations based on your wardrobe"}
                  </h1>
                  {!window.location.href.includes("old-website") && (
                    <div
                      className={`${styles.navItem} ${styles.cartBtn2}`}
                      onClick={() => {
                        setShowCart((old) => !old);
                        setShowWardrobe(false);
                      }}
                    >
                      <CartIcon color="#092952" />

                      <span
                        style={{
                          marginLeft: cartProducts?.length ? 8 : 4,
                          color: "#092952",
                          fontWeight: "bold",
                        }}
                      >
                        Cart{" "}
                        {cartProducts.length > 0 && `(${cartProducts.length})`}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  {Object.keys(products).map((collection, index) => {
                    return (
                      <>
                        <div className={styles.collectionHeader}>
                          <h3
                            className={`${styles.header} ${styles.headerFont}`}
                            style={{
                              fontSize: 20,
                              fontWeight: 600,
                              margin: 0,
                              marginBottom: 8,
                              ...(backgroundImage && { color: "white" }),
                            }}
                          >
                            {IGNORE_LOOK_NAME_ARRAY.includes(collection)
                              ? ""
                              : collection}
                          </h3>
                        </div>
                        <div
                          className={styles.productContainer}
                          style={{
                            gridTemplateColumns: showPopup
                              ? "repeat(3, 220px)"
                              : "repeat(5, 220px)",
                          }}
                        >
                          {" "}
                          {products?.[collection]?.map(
                            (product: any, index: number) => {
                              return (
                                <div className={styles.productCard}>
                                  <div
                                    className={`${styles.product} && ${
                                      cartProducts.filter(
                                        (p) => p.url === product.url
                                      ).length > 0
                                        ? styles.activeProduct
                                        : ""
                                    } ${styles.replacedProduct}`}
                                  >
                                    <img
                                      src={product?.url}
                                      alt={product?.name}
                                    />
                                    <div className={styles.metadata}>
                                      <div className={styles.productTitle}>
                                        {product?.name}
                                      </div>

                                      <div className={styles.productPrice}>
                                        {product?.price}
                                      </div>
                                    </div>
                                    {!window.location.href.includes(
                                      "old-website"
                                    ) && (
                                      <div className={styles.btnContainer}>
                                        <Button
                                          onClick={() => {
                                            setCartProducts((oldProducts) => {
                                              const existingProduct =
                                                oldProducts.filter(
                                                  (p) => p.url === product.url
                                                );

                                              if (existingProduct.length > 0) {
                                                onRemoveToggle(true);
                                                return oldProducts.filter(
                                                  (p) => p.url !== product.url
                                                );
                                              } else {
                                                onToggle(true);
                                                return [
                                                  ...oldProducts,
                                                  product,
                                                ];
                                              }
                                            });
                                          }}
                                          className={
                                            cartProducts.filter(
                                              (p) => p.url === product.url
                                            ).length > 0
                                              ? styles.removeBtn
                                              : styles.addBtn
                                          }
                                        >
                                          {cartProducts.filter(
                                            (p) => p.url === product.url
                                          ).length > 0 ? (
                                            <SubtractCircle32Filled color="black" />
                                          ) : (
                                            <AddCircle32Filled color="var(--kendo-color-primary)" />
                                          )}
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>

                        {window.location.href.includes("old-website") && (
                          <div className={styles.advertisementPage}>
                            <img
                              src="https://dreamdemoassets.blob.core.windows.net/nrf/Advertisement.png"
                              alt=""
                            />
                          </div>
                        )}
                        {index + 1 !== Object.keys(products).length && (
                          <hr
                            style={{
                              color: "#fff",
                              opacity: 1,
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>{" "}
                {!window.location.href.includes("old-website") &&
                  showPopup &&
                  !showCart && (
                    <div
                      className={`${styles.chatContainer}  ${
                        showThoughtProcessPopup &&
                        styles.thoughtProcessChatContainer
                      }`}
                    >
                      <div className={styles.chatHeader}>
                        <h1 style={{ margin: 0 }}>Shopping Copilot</h1>
                        <Button
                          title="Mute"
                          className={styles.muteButton}
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? (
                            <SpeakerMute24Filled className={styles.speaker} />
                          ) : (
                            <Speaker224Filled className={styles.speaker} />
                          )}
                        </Button>
                        <Dismiss24Regular
                          onClick={() => setShowPopup(false)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <Chat
                        messageTemplate={MessageTemplate}
                        attachmentTemplate={AttachmentTemplate}
                        onMessageSend={onMessageSend}
                        className={`${styles.chat} ${
                          showDefaultLooks && styles.disableChatBot
                        }`}
                        user={AUTHORS[1]}
                        messages={messages}
                        ref={chatRef}
                        messageBox={customMessage}
                      />
                      <div className={styles.disclaimerText}>
                        AI generated content may be incomplete or factually
                        incorrect.
                      </div>
                      {selectionItem && showThoughtProcessPopup && (
                        <div className={styles.thoughtProcessPopup}>
                          <div className={styles.thoughtProcessPopupHeader}>
                            <h1>Thought Process</h1>
                            <span
                              className={`k-icon k-i-close ${styles.closeBtn}`}
                              onClick={() => {
                                setShowThoughtProcessPopup(false);
                              }}
                            ></span>
                          </div>
                          <div
                            className={styles.body}
                            dangerouslySetInnerHTML={{
                              __html: (selectionItem as any)?.thoughts,
                            }}
                          ></div>
                        </div>
                      )}

                      {isChatEnded && (
                        <span className={styles.chatEndedMessage}>
                          Chat has ended.
                        </span>
                      )}
                      {show && (
                        <div className={styles["popup-content"]}>
                          <Button
                            className={styles.btn}
                            style={{ width: 150 }}
                            onClick={() => {
                              setShowCamera(true);
                              setShow(false);
                            }}
                          >
                            Take a Picture
                          </Button>
                          <span
                            style={{
                              color: "var(--secondary-color)",
                              margin: 0,
                              padding: 0,
                              fontWeight: 700,
                            }}
                          >
                            or
                          </span>
                          <ImageUploading
                            value={images}
                            onChange={onChange}
                            allowNonImageType={false}
                            multiple={false}
                          >
                            {({
                              imageList,
                              onImageUpload,
                              onImageRemoveAll,
                            }) => {
                              return (
                                <div
                                  className={`upload__image-wrapper ${styles.imageWrapper}`}
                                  style={{ width: "100%" }}
                                >
                                  <Button
                                    style={{ width: "100%" }}
                                    className={styles.btn}
                                    onClick={() => onImageUpload()}
                                    id="#file"
                                  >
                                    Upload your Look
                                  </Button>
                                </div>
                              );
                            }}
                          </ImageUploading>
                        </div>
                      )}
                      {showVideo && (
                        <div className={styles["popup-content"]}>
                          <Button
                            className={styles.btn}
                            style={{ width: 150 }}
                            onClick={() => {
                              setShowVideoCamera(true);
                              setShowVideo(false);
                            }}
                          >
                            Record a video
                          </Button>
                          <span
                            style={{
                              color: "var(--secondary-color)",
                              margin: 0,
                              padding: 0,
                              fontWeight: 700,
                            }}
                          >
                            or
                          </span>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                          />
                          <Button
                            style={{ width: "100%" }}
                            className={styles.btn}
                            onClick={() => handleClick()}
                            id="#file"
                          >
                            Select File
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
          )}
        {!showPopup && !window.location.href.includes("old-website") && (
          <img
            className={styles.chatIcon}
            src={`https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_sc_icon.png`}
            alt="chat-icon"
            onClick={() => setShowPopup(true)}
          />
        )}
        {isCheckout && <Checkout cartItems={cartProducts} />}
        <Popup
          onClose={() => setShowCamera(false)}
          showPopup={showCamera}
          title="Capture a Photo"
          className={styles.popup}
        >
          {imgSrc ? (
            <img alt="img" src={imgSrc} style={{ height: 480 }} />
          ) : (
            <Webcam
              audio={false}
              height={480}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
            />
          )}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            {imgSrc ? (
              <>
                <Button className={styles.btn} onClick={() => setImgSrc("")}>
                  <RetakeIcon color={"#092952"} />
                  Retake
                </Button>
                <Button
                  className={styles.btn}
                  onClick={() => {
                    setShow(false);
                    setShowCamera(false);
                    const file = convertBase64ToFile(imgSrc, uuidv4());
                    onImageUpload(file, imgSrc);
                    setImgSrc("");
                  }}
                >
                  <SelectIcon color={"#092952"} />
                  Select
                </Button>
              </>
            ) : (
              <Button className={styles.btn} onClick={capture}>
                <Camera20Regular /> Capture photo
              </Button>
            )}
          </div>
        </Popup>
        <Popup
          onClose={() => setShowVideoCamera(false)}
          showPopup={showVideoCamera}
          title="Record a Video"
          className={styles.popup}
        >
          {recordedChunks?.length < 1 ? (
            <Webcam audio={false} ref={videoWebCamRef} />
          ) : (
            <video controls autoPlay loop src={getVideoLink()} />
          )}
          <br />
          {recordedChunks?.length > 0 && (
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Button
                className={styles.btn}
                onClick={() => setRecordedChunks([])}
              >
                <RetakeIcon color={"#092952"} />
                Retake
              </Button>
              <Button
                className={styles.btn}
                onClick={() => {
                  const blob = new Blob(recordedChunks, {
                    type: "video/webm",
                  });
                  const file = new File([blob], "recorded-video.webm", {
                    type: "video/webm",
                  });
                  handleUpload(file);
                  setShowVideoCamera(false);
                }}
              >
                <SelectIcon color={"#092952"} />
                Select
              </Button>
            </div>
          )}
          {!recordedChunks?.length &&
            (capturing ? (
              <Button className={styles.btn} onClick={handleStopCaptureClick}>
                Stop Capture
              </Button>
            ) : (
              <Button className={styles.btn} onClick={handleStartCaptureClick}>
                Start Capture
              </Button>
            ))}
        </Popup>
      </div>
    </>
  );
};
