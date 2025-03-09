import { FC, useCallback, useEffect, useRef, useState } from "react";
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
  Delete24Filled,
  Mic24Filled,
  Tag20Filled,
} from "@fluentui/react-icons";
import { useMic } from "hooks/useMic";
import Webcam from "react-webcam";
import { Popup } from "components";
import { Button } from "@progress/kendo-react-buttons";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";
import { Orders } from "../NewWebsiteShoppingCopilot/Orders";
import { OrderDetails } from "./OrderDetails";
import { Notification } from "./Notification";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import {
  setNotificationCount,
  setPageType,
  setPersona,
  setReImaginedDemoComplete,
  setReImaginedScalingDemoComplete,
} from "store";
import { PageType } from "types";
import { useAppDispatch } from "hooks";
import {
  Order,
  OrderDetail,
  OrderHistory,
  ProductDetail,
  CustomerOrderHistory,
} from "types/order.models";
import Slider from "react-slick";
import { Cart } from "./Cart";
import { Badge } from "@progress/kendo-react-indicators";
import {
  Notification as KendoNotification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { MyOrderIcon } from "assets/MyOrderIcon";
import { PlusIcon } from "assets/PlusIcon";
import { CreateLooksIcon } from "assets/CreateLooksIcon";

const {
  ChatAPI,
  OrderAPI,
  CustomerId,
  VacationLooksResponse,
  IndianDressesForWeddingInUdaipur,
  TurquoiseBlueDressPrompt,
  TurquoiseBlueDressResponse,
} = window.config;

const AUTHORS: User[] = [
  {
    id: "bot",
    name: "Cora",
    avatarUrl:
      "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/eva_bot_icon.png",
  },
  {
    id: "user",
    name: "Ashley",
    avatarUrl:
      "https://retailcognitivesearch.blob.core.windows.net/retail-demo-images/Ashley%20Shields%20Persona%20Image.png",
  },
];

// const SUGGESTED_ACTIONS: Action[] = [];

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

interface Props {
  paymentFailedDemo?: boolean;
  isCollapsed?: boolean;
  suggestedActions: Action[];
}

export const NewWebsiteShoppingCopilot: FC<Props> = ({
  paymentFailedDemo,
  isCollapsed,
  suggestedActions,
}) => {
  const INIT_MESSAGES = [
    {
      author: AUTHORS[0],
      text: "Hello, Ashley! \nI am your Fashion Assistant, Cora. I am here to help you on your fashion journey. Feel free to share your style preferences, must-haves, or any fashion challenges you would like assistance with. How may I assist you?",
      suggestedActions,
    },
  ];

  // const { currentDemo } = useContext(SettingsContext);
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [products, setProducts] = useState<any>([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const timerRef: any = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [text] = useState("");
  const anchor = useRef(null);
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [images] = useState<ImageListType>([]);
  const [actions, setActions] = useState<Action[]>(suggestedActions);
  // const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [showThoughtProcessPopup, setShowThoughtProcessPopup] = useState(false);
  const [selectionItem, setSelectionItem] = useState<any>({});
  const [showCart, setShowCart] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [showOrders, setShowOrders] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orderId, setOrderId] = useState<String>("");
  const [orderTotal, setOrderTotal] = useState<String>("");
  const [notificationMessage, setNotificationMessage] = useState<any>(null);
  const [sessions, setSessions] = useState<any>([]);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useAppDispatch();
  const [orderHistory, setOrderHistory] = useState<OrderHistory>();
  const [showOrderHistory, setShowOrderHistory] = useState<boolean>();
  const [orderHistories, setOrderHistories] = useState<CustomerOrderHistory[]>(
    []
  );

  const [cartDetails, setCartDetails] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getOrder = (orderId: string) => {
    axios
      .get(OrderAPI + "/Order/" + orderId)
      .then((res) => setOrderDetails(res.data))
      .catch((err) => console.log({ err }))
      .finally(() => setLoading(false));
  };

  const getCart = (resetDemo?: boolean) => {
    if (resetDemo) {
      axios.get(OrderAPI + "/ResetDemoData").then(() => {
        setLoading(true);

        axios
          .get(OrderAPI + "/Cart/" + CustomerId)
          .then((res) => {
            //   setOrderId(res.data.orders?.[0]?.id);
            setCartDetails(res?.data);
            getOrder(res.data.orders?.[0]?.id);
          })
          .catch((err) => console.log({ err }));
      });
    } else {
      setLoading(true);

      axios
        .get(OrderAPI + "/Cart/" + CustomerId)
        .then((res) => {
          //   setOrderId(res.data.orders?.[0]?.id);
          setCartDetails(res?.data);
          getOrder(res.data.orders?.[0]?.id);
        })
        .catch((err) => console.log({ err }));
    }
  };

  useEffect(() => {
    dispatch(setReImaginedScalingDemoComplete(false));
    dispatch(setReImaginedDemoComplete(false));
    getCart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setPageType(PageType.ShoppingAssistant));
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (orderHistory?.profileImageUrl) {
      dispatch(setPersona(orderHistory.profileImageUrl));
    }
  }, [dispatch, orderHistory]);

  const getOrderDetails = () => {
    axios
      .get(OrderAPI + "/Customer/" + CustomerId, {
        method: "GET",
      })
      .then((res) => {
        setOrderHistory(res.data);
      });
  };

  const getSessions = () => {
    axios
      .get(ChatAPI + "/sessions")
      .then((res) => setSessions([{ id: "", name: "New Chat" }, ...res.data]))
      .catch((err) => console.log({ err }));
  };

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
          onTextSend(res?.answer, userMessage);
        }

        // setProducts(res?.products ?? {});
      });
  };

  const onTextSend = (text: string, userMessage?: any) => {
    onMessageSend(undefined, text, userMessage);
  };

  useEffect(() => {
    // fetchData();
    getSessions();
  }, []);

  const deleteSession = () => {
    axios
      .delete(ChatAPI + "/sessions/" + selectedSession?.id)
      .then((res) => {
        getSessions();
        setSelectedSession(sessions[0]);
        createNewSession();
      })
      .catch((err) => console.log({ err }))
      .finally(() => setIsDelete(false));
  };

  const getChatHistory = () => {
    axios
      .get(ChatAPI + "/sessions/" + selectedSession?.id + "/messages")
      .then((res) => {
        const messages: Message[] = [];

        if (res?.data?.length > 0) {
          res?.data?.reverse()?.map((d: any) => {
            if (d?.type === "Message") {
              messages?.push({
                author:
                  d?.sender?.toLowerCase() === "user" ? AUTHORS[1] : AUTHORS[0],
                text: d?.text,
                timestamp: d?.timestamp,
                tokens: d?.tokens,
              } as Message);
            }
          });
          setMessages(messages);
        }
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    if (selectedSession?.id && selectedSession?.name !== "New Chat") {
      getChatHistory();
    } else {
      setMessages(INIT_MESSAGES);
    }
  }, [selectedSession]);

  const [sttFromMic] = useMic(text, onTextSend);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const getCompletion = async (
    e?: any,
    text?: string,
    sessionId?: string,
    existingMessage?: any
  ) => {
    isChatEnded && setIsChatEnded(false);
    const userMessage = {
      author: AUTHORS[1],
      text: text?.trim() ?? e!.message.text?.trim(),
      timestamp: e?.message.timestamp ?? new Date(),
    };

    const filteredSuggestedActions = actions.filter(
      (item) => item.value !== e.message.text ?? text
    );

    setActions(filteredSuggestedActions);

    if (!existingMessage) {
      setMessages((old) => [
        ...old,
        userMessage,
        { author: AUTHORS[0], typing: true },
      ]);
    }

    const session = sessionId ?? selectedSession?.id;

    // const { data } = await axios.post(
    //   ChatAPI + '/sessions/' + session + '/completion',
    //   JSON.stringify(`${text?.trim() ?? e!.message.text?.trim()}`),
    //   {
    //     headers: {
    //       'Content-Type': 'application/json', // Set the content type to text/plain
    //     },
    //   }
    // );
    let data: any;
    if (e!.message.text.trim() === "Show me some looks for my vacation") {
      await delay(1000);
      data = VacationLooksResponse;
    } else if (
      e!.message.text.trim() ===
      "Can you show me some Indian dresses for a wedding in Udaipur?"
    ) {
      await delay(1000);
      data = IndianDressesForWeddingInUdaipur;
    } else if (e!.message.text.trim() === TurquoiseBlueDressPrompt) {
      await delay(1000);
      data = TurquoiseBlueDressResponse;
    } else {
      let response = await axios.post(
        ChatAPI + "/sessions/" + session + "/completion",
        JSON.stringify(`${text?.trim() ?? e!.message.text?.trim()}`),
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to text/plain
          },
        }
      );

      data = response?.data;
    }

    if (data?.backgroundImage) {
      setBackgroundImage(data?.backgroundImage);
    } else {
      setBackgroundImage("");
    }
    if (data?.answer) {
      if (show) {
        setMessages((old) => {
          const newArray = [
            ...old.slice(0, old.length - 2),
            {
              ...(existingMessage ?? userMessage),
              tokens: data?.userPromptTokens,
            },
            {
              author: AUTHORS[0],
              text: text?.trim().split(".")?.[0],
              timestamp: new Date(),
            } as Message,
            {
              author: AUTHORS[0],
              text: data.answer,
              timestamp: new Date(),
              suggestedActions: filteredSuggestedActions,
              data_points: data?.data_points,
              thoughts: data?.thoughts,
              tokens: data?.responseTokens,
            } as Message,
          ];
          return newArray;
        });
      } else {
        setMessages((old) => {
          const newArray = [
            ...old.slice(0, old.length - 2),
            {
              ...(existingMessage ?? userMessage),
              tokens: data?.userPromptTokens,
            },
            {
              author: AUTHORS[0],
              text: data.answer,
              timestamp: new Date(),
              suggestedActions: filteredSuggestedActions,
              data_points: data?.data_points,
              thoughts: data?.thoughts,
              tokens: data?.responseTokens,
            } as Message,
          ];
          return newArray;
        });
      }
    } else {
      setMessages((old) => {
        return [...old.slice(0, old.length - 1)];
      });
    }
    data?.display_msg && setIsChatEnded(true);
    setNotificationMessage(null);

    // data?.products?.forEach(async (element: any) => {
    //   if (element?.productsList?.length) await fetchData(element?.productsList);
    // });

    processProducts(data?.products);
    if (data?.orderHistories?.length > 0) {
      processOrderHistory(data.orderHistories);
    } else {
      setOrderHistories([]);
      setShowOrderHistory(false);
    }
    // fetchData(data?.products?.[0]?.productsList);
  };

  useEffect(() => {
    const inputField: any = document.querySelector(
      ".k-input.k-input.k-input-md.k-input-solid.k-input-solid-base"
    );
    inputField?.focus();
  }, [messages]);

  async function processProducts(products: any[]) {
    const promises = products?.map(async (element: any) => {
      await fetchData(element?.productsList);
    });

    await Promise.all(promises);
    if (products?.[0]?.productsList?.length > 0) setProducts(products);
  }

  function processOrderHistory(orderHistories: any[]) {
    setOrderHistories(orderHistories);
    setShowOrderHistory(true);
  }

  async function fetchData(products: any[]) {
    const productPromises = (products || []).map(async (product: any) => {
      try {
        const response = await axios.get(
          OrderAPI + "/Product/" + product.productId
        );
        // Update the product object with details received from the API
        Object.assign(product, response.data);
      } catch (err) {
        console.log({ err });
      }
    });

    // Wait for all productPromises to complete
    await Promise.all(productPromises);

    // Now the products array should be updated with details received from the API
  }

  const createNewSession = () => {
    axios
      .post(ChatAPI + "/sessions")
      .then(async (res) => {
        setSelectedSession({ id: res.data?.id, name: "New Chat" });
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    createNewSession();
  }, []);

  const createLooks = (index: number) => {
    const userMessage: Message = {
      author: AUTHORS[1],
      text: "Show me some looks for option " + (index + 1),
      timestamp: new Date(),
    };
    setMessages((old) => [
      ...old,
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);

    return onMessageSend(undefined, userMessage.text, userMessage);
  };

  const getProductsOrLooksByProductName = (message: string) => {
    const userMessage: Message = {
      author: AUTHORS[1],
      text: message,
      timestamp: new Date(),
    };
    setMessages((old) => [
      ...old,
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);

    return onMessageSend(undefined, userMessage.text, userMessage);
  };

  const onMessageSend = async (
    e?: ChatMessageSendEvent,
    text?: string,
    userMessage?: any
  ) => {
    return await getCompletion(e, text, undefined, userMessage);
  };

  useEffect(() => {
    const element = document.getElementsByClassName(
      "k-message-list k-avatars"
    )?.[0];

    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (
      notificationMessage?.sessionId === selectedSession?.id &&
      notificationMessage?.answer
    ) {
      setMessages((old) => [
        ...old,
        {
          author: AUTHORS[0],
          text: notificationMessage.answer,
          timestamp: new Date(),
          // actions: actions,
        },
      ]);
      dispatch(setNotificationCount());
    }
  }, [notificationMessage]);

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

  const [showCartNotification, setShowCartNotification] = useState(false);

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
        <div
          ref={anchor}
          onClick={() => {
            setShow(!show);
          }}
          style={{ marginTop: 8 }}
        >
          <Camera24Filled style={{ cursor: "pointer" }}></Camera24Filled>
        </div>
        <div
          title="Hold to Speak"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ opacity: !isPressed ? 1 : 0.5, marginTop: 8 }}
        >
          <Mic24Filled className={styles.mic} />
        </div>
      </>
    );
  };

  const addToCart = (product: any) => {
    axios
      .post(OrderAPI + "/Cart/" + CustomerId, {
        product: [
          {
            productId: product?.id,
            productName: product?.productName,
            imageUrl: product?.imageUrl,
          },
        ],
        quantity: 1,
        lineAmount: product?.price,
      })
      .then(() => {
        getCart();
        setShowCartNotification(true);
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    setTimeout(() => setShowCartNotification(false), 2000);
  }, [showCartNotification]);

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
    return (
      props.item.text && (
        <div
          className="k-bubble"
          key={props.item?.id}
          style={{
            flexDirection:
              props?.item?.token && props?.item?.author?.id === "bot"
                ? "row-reverse"
                : "row",
          }}
        >
          {props.item?.thoughts && (
            <div
              className={styles.bulbPositioning}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {/* <Lightbulb24Regular
                onClick={() => {
                  setSelectionItem(props.item);
                  setShowThoughtProcessPopup(true);
                }}
              /> */}
              {/* <IconButton
                style={{ color: 'black' }}
                iconProps={{ iconName: 'Lightbulb' }}
                title="Show thought process"
                onClick={() => {
                  setSelectionItem(props.item);
                  setShowThoughtProcessPopup(true);
                }}
              /> */}
            </div>
          )}
          {props.item?.tokens > 0 && (
            <div
              className={styles.tokens}
              style={{
                ...(props?.item?.author?.id !== "bot"
                  ? { right: 16 }
                  : { left: 16 }),
              }}
            >
              <span>Tokens:</span> {props.item.tokens}
            </div>
          )}
          <div
            style={{
              marginTop: props?.item?.tokens > 0 ? 28.5 : 0,
            }}
          >
            {props.item.text}
          </div>
        </div>
      )
    );
  };

  function showOrderDetails(orderId: string, orderTotal: string) {
    setShowOrders(false);
    setOrderId(orderId);
    setOrderTotal(orderTotal);
    setShowOrderDetail(true);
  }

  function toggleOrders(): void {
    setShowOrderDetail(false);
    setShowOrders(!showOrders);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 7500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  };

  const carousel_images = [
    "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/carousel_1.png",
    "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/carousel_2.png",
    "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/carousel_3.png",
    "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/carousel_4.png",
  ];

  return (
    <div
      className={styles.container}
      style={{
        ...(Object.keys(products).length === 0 ||
        showOrderDetail ||
        showCart ||
        showOrders
          ? {
              // backgroundImage: `url("https://dreamdemoassets.blob.core.windows.net/openai/Copilot%20BG.png")`,
            }
          : {
              ...(!backgroundImage
                ? {
                    backgroundImage:
                      "url(https://dreamdemoassets.blob.core.windows.net/appspluscosmos/cosmos_copilot_bg_image.png)",
                  }
                : { backgroundImage: `url(${backgroundImage})` }),
            }),
      }}
    >
      <div className={styles.subNav}>
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
        <div className={styles.alignLeftBack}>
          {(showOrders || showOrderDetail || showCart) && (
            <div
              className={styles.navItem}
              onClick={() => {
                if (showOrderDetail) {
                  setShowOrderDetail(false);
                  setShowOrders(true);
                } else if (showOrders) {
                  setShowOrders(false);
                } else if (showCart) {
                  setShowCart(false);
                }
              }}
            >
              <IoIosArrowBack color="white" />
              <span>Back</span>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            marginLeft:
              selectedProduct || showOrders || showOrderDetail || showCart
                ? !isCollapsed
                  ? "-9%"
                  : "9%"
                : !isCollapsed
                ? "10%"
                : "20%",
          }}
        >
          <div className={styles.tempNavItem}>
            <span>Sales</span>
          </div>
          <div className={styles.tempNavItem}>
            <span>Women</span>
          </div>
          <div className={styles.tempNavItem}>
            <span>Men</span>
          </div>
          <div className={styles.tempNavItem}>
            <span>Kids</span>
          </div>
          <div className={styles.tempNavItem}>
            <span>Home</span>
          </div>

          <div className={styles.tempNavItem}>
            <span>Explore</span>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            className={styles.navItem}
            style={{ marginLeft: 0 }}
            onClick={() => toggleOrders()}
          >
            <MyOrderIcon />
            <span style={{ marginRight: -105 }}>My Orders</span>
          </div>
          <div
            className={`${styles.navItem} ${
              orderDetails?.lineItems?.length > 0 &&
              !showCart &&
              styles.cartGlow
            }`}
            onClick={() => {
              setShowOrders(false);
              setShowOrderDetail(false);
              setShowCart(true);
              setShowPopup(false);
            }}
          >
            <CartIcon />

            {orderDetails?.lineItems?.length > 0 && (
              <Badge
                className={styles.badge}
                align={{ horizontal: "start", vertical: "bottom" }}
              >
                {orderDetails?.lineItems?.length}
              </Badge>
            )}
            <span style={{ marginLeft: 4 }}>Cart</span>
          </div>
        </div>
      </div>

      {!showOrders &&
        !showCart &&
        !showOrderDetail &&
        Object.keys(products).length === 0 && (
          <div className={styles.homePageContainer}>
            <Slider {...settings}>
              {(showPopup ? [carousel_images[3]] : carousel_images).map(
                (image, index) => (
                  <div className={styles.carouselImageContainer} key={index}>
                    <img src={image} alt={`slide-${index}`} />
                  </div>
                )
              )}
            </Slider>
            <img
              src={
                "https://dreamdemoassets.blob.core.windows.net/appspluscosmos/product_collage_home_new_website.png"
              }
              alt="product"
            />
          </div>
        )}

      {!showPopup && !showCart && (
        <img
          className={`${styles.shoppingAssistantBtnGlow} ${styles.chatIcon}`}
          src={`https://dreamdemoassets.blob.core.windows.net/appspluscosmos/shopping_assistant.png`}
          alt="chat-icon"
          onClick={() => setShowPopup(true)}
        />
      )}

      {showOrders && (
        <div
          style={{
            // marginTop: 50,
            height: "100%",
            position: "relative",
            paddingTop: 50,
          }}
        >
          <h1
            className={`${styles.header} ${styles.headerFont}`}
            style={{
              ...(backgroundImage && { color: "white" }),
              marginLeft: 32,
            }}
          >
            My Orders
          </h1>

          {orderHistory && (
            <Orders
              orderHistory={orderHistory}
              onOrderItemExpanded={showOrderDetails}
            ></Orders>
          )}
        </div>
      )}

      {showOrderDetail && (
        <div
          style={{
            // marginTop: 50,
            height: "100%",
            position: "relative",
            paddingTop: 50,
          }}
        >
          <h1
            className={`${styles.header} ${styles.headerFont}`}
            style={{
              ...(backgroundImage && { color: "white" }),
            }}
          >
            Order Details
          </h1>

          <OrderDetails
            orderId={orderId}
            orderTotal={orderTotal}
          ></OrderDetails>
        </div>
      )}

      {showOrderHistory && (
        <div
          style={{
            // marginTop: 50,
            height: "85vh",
            position: "relative",
            backgroundColor: "#fff",
            paddingTop: 2,
            overflow: "auto",
            paddingBottom: 10,
          }}
        >
          <h1
            className={`${styles.header} ${styles.headerFont}`}
            style={{
              ...(backgroundImage && { color: "white" }),
            }}
          >
            Orders History
          </h1>
          {orderHistories.map(
            (orderDetail: CustomerOrderHistory, index: number) => (
              <div
                className={styles.orderContainer}
                key={orderDetail?.id + "_" + index}
              >
                <div className={styles.orderDetailContainer}>
                  <div>
                    <span style={{ fontWeight: 600 }}>Order ID: </span>
                    {orderDetail?.id}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Status: </span>
                    {orderDetail?.status}{" "}
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Ordered On: </span>
                    {orderDetail && orderDetail.orderedOn !== undefined
                      ? new Date(orderDetail.orderedOn).toLocaleDateString()
                      : ""}{" "}
                  </div>
                </div>
                <hr></hr>
                <div>
                  <div className={styles.lineItemHeaderContainer}>
                    <div className={styles.userImage}></div>
                    <div className={styles.productNameColumn}>
                      <p className={styles.header}>Product Name</p>
                    </div>
                    <div className={styles.amountColumn}>
                      <p className={styles.header}>Amount</p>
                    </div>
                    <div className={styles.actionColumn}>
                      <p className={styles.header}>Amount</p>
                    </div>
                  </div>
                  {orderDetail?.lineItems?.map(
                    (lineItem: ProductDetail, index) => (
                      <div
                        className={styles.lineItemContainer}
                        key={lineItem.product[0].productId + "_" + index}
                      >
                        <div className={styles.userImage}>
                          <img
                            src={lineItem?.product[0].imageUrl}
                            alt={lineItem?.product[0].productName}
                          />
                        </div>
                        <div className={styles.productNameColumn}>
                          <p>{lineItem?.product[0].productName}</p>
                        </div>
                        <div className={styles.amountColumn}>
                          <p>${String(lineItem?.lineAmount)}</p>
                        </div>
                        <div className={styles.amountColumn}>
                          <Button
                            onClick={() => addToCart(lineItem?.product[0])}
                            className={styles.actionButton}
                          >
                            Buy Again
                          </Button>
                          <Button
                            onClick={() =>
                              getProductsOrLooksByProductName(
                                "Show me some looks for " +
                                  lineItem?.product[0].productName
                              )
                            }
                            className={styles.actionButton}
                          >
                            Create Looks
                          </Button>
                          <Button
                            onClick={() =>
                              getProductsOrLooksByProductName(
                                "Show me some " +
                                  lineItem?.product[0].productName
                              )
                            }
                            className={styles.actionButton}
                          >
                            Show Similar Products
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {showCart && (
        <Cart
          address={orderHistory?.addresses?.[0]}
          onGoBack={() => {
            paymentFailedDemo ? setShowCart(true) : setShowCart(false);
            !paymentFailedDemo && setShowPopup(true);
            getOrderDetails();
            !paymentFailedDemo && setOrderDetails(null);
            !paymentFailedDemo && setProducts([]);
          }}
          onShoppingPageGoBack={() => {
            setShowCart(false);
            getOrderDetails();
          }}
          cartDetails={cartDetails}
          cartLoading={loading}
          getCart={getCart}
          orderDetails={orderDetails}
          paymentFailedDemo={paymentFailedDemo}
        />
      )}

      {!showCart && !selectedProduct && Object.keys(products)?.length > 0 && (
        <div
          style={{
            marginTop: -16,
            height: "100%",
            position: "relative",
          }}
        >
          <h1
            className={`${styles.header} ${styles.headerFont}`}
            style={{
              color: "white",
            }}
          >
            Product Recommendations
          </h1>
          <div
            className={styles.productRecommendation}
            style={{ marginTop: 24 }}
          >
            {products?.map((group: any) => {
              return (
                <>
                  {group?.groupName !== "Default" && (
                    <div className={styles.collectionHeader}>
                      <h3
                        className={`${styles.header} ${styles.headerFont}`}
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          margin: 0,
                          marginBottom: 8,
                          color: "white",
                        }}
                      >
                        {group?.groupName}
                      </h3>
                    </div>
                  )}
                  <div
                    className={`${styles.productContainer} ${
                      !isCollapsed && styles.collapsedProductContainer
                    }`}
                  >
                    {group?.productsList?.map((product: any, index: number) => {
                      return (
                        <div className={styles.product}>
                          {!group?.groupName.includes("Look") && (
                            <div className={styles.tag}>
                              <Tag20Filled /> Option {index + 1}
                            </div>
                          )}
                          <div className={styles.imageContainer}>
                            <img
                              src={product?.imageUrl}
                              alt={product?.productName}
                              onClick={() => {
                                addToCart(product);
                              }}
                            />
                          </div>
                          <div className={styles.horizontalLine} />
                          <div className={styles.metadata}>
                            <div className={styles.productTitle}>
                              <strong>{product?.productName}</strong>
                            </div>
                            {group?.groupName?.includes("Look") &&
                            product?.isOwned?.toLowerCase() === "true" ? (
                              <div className={styles.alreadyOwned}>
                                Already Owned
                              </div>
                            ) : (
                              <div>
                                <div className={styles.productPrice}>
                                  ${product?.price}
                                </div>
                                <div className={styles.btnGrp}>
                                  <Button
                                    onClick={() => addToCart(product)}
                                    className={`${styles.addButton} ${
                                      product?.shouldHighlight?.toLowerCase() ===
                                        "true" && styles.glow
                                    }`}
                                  >
                                    <PlusIcon /> Add to Cart
                                  </Button>
                                  {!group?.groupName.includes("Look") && (
                                    <Button
                                      onClick={() => createLooks(index)}
                                      className={styles.createLooksButton}
                                    >
                                      <CreateLooksIcon /> Create looks
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
          } ${!isCollapsed && styles.chatContainerCollapsed} ${
            messages.length < 2 && styles.glowContainer
          }`}
        >
          <div
            className={styles.chatHeader}
            style={{
              backgroundColor: "#005D90",
              // backgroundImage: `url(https://dreamdemoassets.blob.core.windows.net/appspluscosmos/cosmos_chatbot_bg.png)`,
              // backgroundSize: 'cover',
            }}
          >
            <div className={styles.headerFont}>
              <h1 className={styles.headerFont}>Cora</h1>
              <span style={{ fontSize: 14 }}>
                Powered by Azure OpenAI Service
              </span>
              <DropDownList
                className={styles.dropdownList}
                data={sessions}
                textField="name"
                dataItemKey="id"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                defaultItem={sessions?.[0]}
              />
            </div>
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
          {selectedSession?.id && (
            <Delete24Filled
              className={styles.deleteIcon}
              onClick={() => setIsDelete((old) => !old)}
            />
          )}
          {isDelete && (
            <div className={styles.deleteConfirmation}>
              <div className={styles.text}>
                Are you sure you want to clear this chat?
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  className={styles.button}
                  onClick={() => deleteSession()}
                >
                  Yes
                </Button>
                <Button
                  className={styles.button}
                  onClick={() => setIsDelete(false)}
                >
                  No
                </Button>
              </div>
            </div>
          )}
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
      <Notification
        message={notificationMessage}
        setMessage={setNotificationMessage}
      />
      {showCartNotification && (
        <NotificationGroup
          style={{ bottom: 0, left: "40%", transform: "translateX(-50%)" }}
        >
          <KendoNotification
            type={{ style: "success", icon: true }}
            closable={true}
            onClose={() => setShowCartNotification(false)}
            className={styles.cartNotification}
          >
            <span>Your item is added to cart.</span>
          </KendoNotification>
        </NotificationGroup>
      )}
    </div>
  );
};
