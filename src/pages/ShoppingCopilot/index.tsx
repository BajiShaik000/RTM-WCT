import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { CartIcon, RetakeIcon, SelectIcon } from "assets";
import {
  Camera20Regular,
  Camera24Filled,
  Mic24Filled,
  Speaker224Filled,
  SpeakerMute24Filled,
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
import { SettingsContext } from "context";
import { IconButton } from "@fluentui/react";

const { BlobBaseUrl } = window.config;
const COPILOT_API = "https://func-search-openai-dev-002.azurewebsites.net/api/";

const AUTHORS: User[] = [
  {
    id: "bot",
    name: "Eva",
    avatarUrl:
      "https://dreamdemoassets.blob.core.windows.net/daidemo/Bot%20Avatar.png",
  },
  {
    id: "user",
    name: "Ashley",
    avatarUrl:
      "https://dreamdemoassets.blob.core.windows.net/daidemo/RL_Copilot_User.png",
  },
];

const SUGGESTED_ACTIONS: Action[] = [];

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

export const ShoppingCopilot = () => {
  const { currentDemo } = useContext(SettingsContext);
  const [showPopup, setShowPopup] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      author: AUTHORS[0],
      text:
        currentDemo?.guid === "566941b0-d811-4bc5-b8f4-794c559dc09b"
          ? "Hello there and welcome to Ralph Lauren’s personal AI-powered virtual stylist. Who do I have the pleasure of speaking to today?"
          : "Hi, How can I help you?",
      suggestedActions: SUGGESTED_ACTIONS,
    },
  ]);
  const [products, setProducts] = useState<any>({});
  const [isPressed, setIsPressed] = useState(false);
  const timerRef: any = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [text] = useState("");
  const anchor = useRef(null);
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [images] = useState<ImageListType>([]);
  const [actions, setActions] = useState<Action[]>(SUGGESTED_ACTIONS);
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [showThoughtProcessPopup, setShowThoughtProcessPopup] = useState(false);
  const [selectionItem, setSelectionItem] = useState<any>({});
  const [showCart, setShowCart] = useState(false);

  const onChange = (imageList: ImageListType) => {
    if (imageList.length)
      onImageUpload(imageList[0].file, imageList[0].dataURL);
    setShow(false);
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
    const formData: any = new FormData();
    formData.append("image", file);
    fetch(
      "https://func-image-shopping-copilot.azurewebsites.net/api/getproductimages_upload",
      {
        method: "POST",
        body: formData,
      }
    )
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
                actions: actions,
                data_points: res?.data_points,
                thoughts: res?.thoughts,
              },
            ];
            return newArray;
          });
        } else {
          setMessages((old) => [...old.slice(0, old.length - 1)]);
        }

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
    setActions(filteredSuggestedActions);
    setMessages((old) => [
      ...old,
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);
    const historyMessages = [...messages, userMessage];
    historyMessages.shift();
    axios
      .post(COPILOT_API + "chat", {
        approach: "rrr",
        overrides: {},
        enableExternalDomain: false,
        company: "ralph",
        history: convertMessages(historyMessages),
      })
      .then(({ data }) => {
        if (data?.answer) {
          setMessages((old) => {
            const newArray = [
              ...old.slice(0, old.length - 1),
              {
                author: AUTHORS[0],
                text: data.answer,
                timestamp: new Date(),
                suggestedActions: filteredSuggestedActions,
                data_points: data?.data_points,
                thoughts: data?.thoughts,
              } as Message,
            ];
            return newArray;
          });
        } else {
          setMessages((old) => [...old.slice(0, old.length - 1)]);
        }
        data?.display_msg && setIsChatEnded(true);

        setProducts(data?.products ?? {});
        const formattedProducts = Object.values(data?.shopping_cart[0])
          .flat()
          .map((product: any, index) => ({
            ...product,
            checked: true,
            id: index,
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
      // Perform the desired action when the button is held down
    }, 1000); // Adjust the duration as needed
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    setIsPressed(false);
  };

  function convertBase64ToFile(base64: string, filename: string) {
    const base64WithoutPrefix = base64.split(",")[1]; // Remove the data URI scheme prefix if present
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

      // setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const customMessage = (props: ChatMessageBoxProps) => {
    return (
      <>
        {props.messageInput}
        {props.sendButton}
        <div ref={anchor} onClick={() => setShow(!show)}>
          <Camera24Filled style={{ cursor: "pointer" }}></Camera24Filled>
        </div>
        <div
          title="Hold to Speak"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ opacity: !isPressed ? 1 : 0.5 }}
        >
          <Mic24Filled className={styles.mic} />
        </div>
      </>
    );
  };
  const [hoveredProductIndex, setHoveredProductIndex] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredProductIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredProductIndex(null);
  };

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
    return (
      props.item.text && (
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
          <div>{props.item.text}</div>
          {props.item?.data_points?.length > 0 && (
            <>
              <br />
              <strong style={{ marginTop: 4, paddingTop: 4 }}>
                Citations:
              </strong>
              {props.item?.data_points?.map((point: any, index: number) => (
                <div>
                  <a
                    className={styles.citation}
                    href={COPILOT_API + "content/" + point.split(":")[0]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {index + 1}. {point.split(":")[0]}
                  </a>
                </div>
              ))}
            </>
          )}
        </div>
      )
    );
  };

  return (
    <div
      className={styles.container}
      style={{
        ...(Object.keys(products).length === 0 && cartProducts.length === 0
          ? {
              backgroundImage: `url("https://dreamdemoassets.blob.core.windows.net/daidemo/Copilot%20BG.png")`,
            }
          : { backgroundColor: "white" }),
      }}
    >
      <div
        className={styles.subNav}
        style={{
          justifyContent: selectedProduct ? "space-between" : "flex-end",
        }}
      >
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
        )}
        <div
          className={styles.navItem}
          onClick={() => setShowCart((old) => !old)}
        >
          {cartProducts?.length > 0 ? (
            <BadgeContainer>
              <CartIcon />
              <Badge
                className={styles.badge}
                align={{ horizontal: "start", vertical: "bottom" }}
              >
                {cartProducts?.length}
              </Badge>
            </BadgeContainer>
          ) : (
            <CartIcon />
          )}
          <span style={{ marginLeft: cartProducts?.length ? 8 : 4 }}>Cart</span>
        </div>
      </div>

      {!showPopup && (
        <img
          className={styles.chatIcon}
          src={`${BlobBaseUrl}Shopping%20Copilot%20Buttton.png`}
          alt="chat-icon"
          onClick={() => setShowPopup(true)}
        />
      )}

      {showCart && (
        <div
          style={{
            marginTop: 60,
            height: "100%",
            position: "relative",
          }}
        >
          <h1 className={`${styles.header} ${styles.headerFont}`}>Your Cart</h1>
          <div
            style={{
              overflowY: "auto",
              height: "calc(100% - 102px)",
              width: "64vw",
              padding: 24,
              paddingTop: 0,
            }}
          >
            <div className={styles.productContainer}>
              {cartProducts?.map((product: any, index: number) => {
                return (
                  <div className={styles.product}>
                    <div
                      className={styles.imageContainer}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Checkbox
                        value={
                          cartProducts.filter((p) => p.url === product.url)
                            .length > 0
                        }
                        onChange={() =>
                          setCartProducts((oldProducts) => {
                            const existingProduct = oldProducts.filter(
                              (p) => p.url === product.url
                            );

                            if (existingProduct.length > 0) {
                              return oldProducts.filter(
                                (p) => p.url !== product.url
                              );
                            } else {
                              return [...oldProducts, product];
                            }
                          })
                        }
                        className={styles.checkbox}
                      />

                      <img
                        src={product?.url}
                        alt={product.name}
                        onClick={() => {
                          setCartProducts((oldProducts) => {
                            const existingProduct = oldProducts.filter(
                              (p) => p.url === product.url
                            );

                            if (existingProduct.length > 0) {
                              return oldProducts.filter(
                                (p) => p.url !== product.url
                              );
                            } else {
                              return [...oldProducts, product];
                            }
                          });
                        }}
                      />
                    </div>
                    <div className={styles.metadata}>
                      <span className={styles.productTitle}>
                        {product?.name}
                      </span>
                      <span>{product?.price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!showCart && !selectedProduct && Object.keys(products)?.length > 0 && (
        <div
          style={{
            marginTop: 60,
            height: "100%",
            position: "relative",
          }}
        >
          <h1 className={`${styles.header} ${styles.headerFont}`}>
            Product Recommendations
          </h1>
          <div
            style={{
              overflowY: "auto",
              height: "calc(100% - 102px)",
              width: "64vw",
              padding: 24,
              paddingTop: 0,
            }}
          >
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
                      }}
                    >
                      {collection}
                    </h3>
                  </div>
                  <div className={styles.productContainer}>
                    {products?.[collection]?.map(
                      (product: any, index: number) => {
                        return (
                          <div className={styles.product}>
                            <div
                              className={styles.imageContainer}
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <Checkbox
                                value={
                                  cartProducts.filter(
                                    (p) => p.url === product.url
                                  ).length > 0
                                }
                                onChange={() =>
                                  setCartProducts((oldProducts) => {
                                    const existingProduct = oldProducts.filter(
                                      (p) => p.url === product.url
                                    );

                                    if (existingProduct.length > 0) {
                                      return oldProducts.filter(
                                        (p) => p.url !== product.url
                                      );
                                    } else {
                                      return [...oldProducts, product];
                                    }
                                  })
                                }
                                className={styles.checkbox}
                              />

                              <img
                                src={product?.url}
                                alt={product.name}
                                onClick={() => {
                                  setCartProducts((oldProducts) => {
                                    const existingProduct = oldProducts.filter(
                                      (p) => p.url === product.url
                                    );

                                    if (existingProduct.length > 0) {
                                      return oldProducts.filter(
                                        (p) => p.url !== product.url
                                      );
                                    } else {
                                      return [...oldProducts, product];
                                    }
                                  });
                                }}
                              />
                            </div>
                            <div className={styles.metadata}>
                              <span className={styles.productTitle}>
                                {product?.name}
                              </span>
                              <span>{product?.price}</span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {index + 1 !== Object.keys(products).length && (
                    <hr
                      style={{
                        color: "#8C8C8C",
                        opacity: 0.5,
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}

      {showPopup && (
        <div
          className={`${styles.chatContainer} ${
            showThoughtProcessPopup && styles.thoughtProcessChatContainer
          }`}
        >
          <div className={styles.chatHeader}>
            <h1 className={styles.headerFont}>Shopping Copilot</h1>
            

            <span
              onClick={() => setShowPopup(false)}
              className="k-icon k-i-close"
            />
          </div>
          <Chat
            messageTemplate={MessageTemplate}
            attachmentTemplate={AttachmentTemplate}
            onMessageSend={onMessageSend}
            className={styles.chat}
            user={AUTHORS[1]}
            messages={messages}
            ref={chatRef}
            messageBox={customMessage}
          />
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
            <span className={styles.chatEndedMessage}>Chat has ended.</span>
          )}
          {show && (
            <div className={styles["popup-content"]}>
              <Button
                className={styles.btn}
                style={{ width: 150 }}
                onClick={() => setShowCamera(true)}
              >
                Take a picture
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
                {({ imageList, onImageUpload, onImageRemoveAll }) => {
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
                        Select File
                      </Button>
                    </div>
                  );
                }}
              </ImageUploading>
            </div>
          )}
        </div>
      )}

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
                <RetakeIcon color={"white"} />
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
                <SelectIcon color={"white"} />
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
    </div>
  );
};
