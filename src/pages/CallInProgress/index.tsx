import {
  ChevronLeft28Filled,
  ChevronRight28Filled,
  Info16Regular,
  Info20Regular,
  Info24Filled,
  Info24Regular,
  Info48Filled,
  Mic28Filled,
  Speaker224Filled,
  SpeakerMute24Filled,
} from "@fluentui/react-icons";
import {
  Chat,
  ChatMessageBoxProps,
  ChatMessageSendEvent,
  Message,
  User,
} from "@progress/kendo-react-conversational-ui";
import axios from "axios";
import { useMic } from "hooks/useMic";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import {
  setMessages as setConversationMessages,
  setCustomerDetails,
  setEmail,
} from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import Lottie from "lottie-react";
import loading from "../../assets/loader.json";
import {
  Popover,
  PopoverActionsBar,
  Tooltip,
} from "@progress/kendo-react-tooltip";
import { AgentIcon, InfoIcon } from "assets";
import { TextArea, Slider as KendoSlider } from "@progress/kendo-react-inputs";
import { ArchitectureWithTags } from "pages/ArchitectureWithTags";
import { EmailPopupWrapper, Popup } from "components";
import { PageType } from "types";
import { AVATARS } from "pages/SetupWizardPersona";
import React from "react";
import { ArchitectureIcon } from "assets/ArchitectureIcon";
let {
  CALL_CENTER_API,
  SPEECH_KEY,
  SPEECH_REGION,
  CUSTOMER_DETAILS_API,
  EMAIL_GENERATION_API,
} = window.config;

interface ConvertedMessage {
  [key: string]: string;
  //content: string;
}
interface ChatMessage {
  user?: string;
  bot?: string;
}
export function convertMessages(inputMessages: Message[]): ConvertedMessage[] {
  const convertedMessages: ConvertedMessage[] = [];

  for (let i = 0; i < inputMessages.length; i++) {
    const authorId = inputMessages[i].author.id;
    const messageText = inputMessages[i].text;
    const propertyName = authorId === "user" ? "user" : "bot";
    if (authorId === "assistant" || authorId === "user") {
      const currentMessage: ConvertedMessage = {
        role: authorId ?? "",
        content: messageText ?? "",
      };
      convertedMessages.push(currentMessage);
    }
  }

  return convertedMessages;
}
export function convertMessages2(inputMessages: Message[]): ConvertedMessage[] {
  const convertedMessages: ConvertedMessage[] = [];

  for (let i = 0; i < inputMessages.length; i++) {
    const authorId = inputMessages[i].author.id;
    const messageText = inputMessages[i].text;
    const propertyName = authorId === "user" ? "user" : "bot";
    if (authorId === "assistant" || authorId === "user") {
      const currentMessage: ConvertedMessage = {
        [propertyName]: messageText ?? "",
        //content: messageText ?? "",
      };
      convertedMessages.push(currentMessage);
    }
  }

  return convertedMessages;
}
export function convertMessages1(inputMessages: Message[]): ChatMessage[] {
  const convertedMessages: ConvertedMessage[] = [];
  const chatHistory: ChatMessage[] = [];
  // eslint-disable-next-line react-hooks/rules-of-hooks

  for (let i = 0; i < inputMessages.length; i++) {
    const role = inputMessages[i].author.id;
    const message = inputMessages[i].text;

    // if (authorId === "assistant" || authorId === "user") {
    //   const currentMessage: ConvertedMessage = {
    //     role: authorId,
    //     content: messageText ?? "",
    //   };
    //   convertedMessages.push(currentMessage);
    // }
    if (role === "user") {
      chatHistory.push({
        user: message,
      });
    } else if (role === "assistant") {
      if (chatHistory.length) {
        const lastUserMessage = chatHistory[chatHistory.length - 1];
        //   if (lastUserMessage) {
        //     //lastUserMessage.bot = message;
        //   }
        // } else {
        chatHistory.push({
          bot: message,
        });
        // }
      }
    }
  }

  return chatHistory;
}
const PROBLEMS = [
  { scenario: "wrong item delivered" },
  {
    //problem: "exchanges",
    scenario: "smaller size received",
  },
];

const EMOJIS: any = {
  Neutral:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/neutral_emoji.png",
  Negative:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/negative_emoji.png",
  Positive:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/positive_emoji.png",
  "Very Negative":
    "https://dreamdemoassets.blob.core.windows.net/daidemo/very_negative_emoji.png",
  "Very Positive":
    "https://dreamdemoassets.blob.core.windows.net/daidemo/very_positive_emoji.png",
};

export const CallInProgress: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text] = useState("");
  const [issueToken, setIssueToken] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [sentiment, setSentiment] = useState("Neutral");
  const [sentimentScore, setSentimentScore] = useState("5");
  const { email, customerDetails } = useAppSelector((state) => state.config);
  const [disableSend, setDisableSend] = useState(false);
  const anchor = React.useRef<Button>(null);
  const [isCalled, setIsCalled] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [show, setShow] = React.useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onClick = React.useCallback(() => {
    setShow(!show);
  }, [setShow, show]);

  const thStyle = {
    color: "#528aae",
  };
  const { fileName, customerId, name, avatar } = useAppSelector(
    (state) => state.config
  );

  const timerRef: any = useRef(null);
  const [assistantSuggestion, setAssistantSuggestion] = useState<any>(
    `Thank you for calling Contoso Mobile Customer Support. How may I assist you today? `
  );
  //const [assistantSuggestion2, setAssistantSuggestion2] = useState(`Hey`);
  //const [suggestionLoading2, setSuggestionLoading2] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [problem] = useState(
    PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)]
  );
  const dispatch = useAppDispatch();
  const [isEnded, setIsEnded] = useState(false);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  const [showArchPopup, setShowArchPopup] = useState(false);

  let popupTitle = " ";

  const AUTHORS: User[] = [
    {
      id: "user",
      name: name,
      avatarUrl: `https://dreamdemoassets.blob.core.windows.net/mtc/${avatar}_selected_avatar.png`,
    },
    {
      id: "assistant",
      name: "Agent",
      avatarUrl:
        "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_agent.png",
    },
  ];

  const [buttonGlow, setButtonGlow] = useState({
    isSuggest: true,
    isSendPromotion: false,
    isChat: false,
    isAuto: false,
    isProceed: false,
  });
  const [popoverShow, setPopoverShow] = useState({
    isSuggest: true,
    isChat: false,
    isAuto: false,
    isProceed: false,
  });

  useEffect(() => {
    setTimeout(
      () => setPopoverShow((old) => ({ ...old, isSuggest: false })),
      3000
    );
  }, []);

  const navigate = useNavigate();

  const MessageTemplate = (props: any) => {
    return (
      props.item.text && (
        <div className="k-bubble" key={props.item?.id}>
          {props.item.text}
        </div>
      )
    );
  };

  const getCustomerDetails = (customerId: number) => {
    axios
      .post(CUSTOMER_DETAILS_API, {
        CustomerID: customerId,
      })
      .then((res) => {
        // setCustomerDetails(res.data.Customer_Details);
        dispatch(
          setCustomerDetails({
            ...res.data.Customer_Details,
          })
        );
        return res.data.Customer_Details;
      })
      .then((cuDetail: any) => {
        onGenerateEmail(cuDetail);
      });
  };

  const onGenerateEmail = (customerDetails: any) => {
    axios
      .post(EMAIL_GENERATION_API, {
        Customer_info: [customerDetails],
      })
      .then((res) => {
        dispatch(
          setEmail({
            ...res.data,
            email: res.data?.email?.replace(/\\n/g, "<br />"),
          })
        );
      });
  };

  useEffect(() => {
    if (!email && customerId && !isCalled) {
      setIsCalled(true);
      getCustomerDetails(customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, customerDetails, customerId, isCalled]);

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
  const [questionCount, setQuestionCount] = useState<any>(0);
  const istUser: any = [
    // "Thank you for calling Contoso Telecom Customer Support. How may I assist you today? ",
    "I'm sorry to hear that you're experiencing this issue, sir. May I have your name and mobile number so I can assist you further?",

    "Thank you, Mr. Williams. Let me quickly check your number. It appears that you're on our standard domestic plan, which doesn't include international roaming services. To access internet and calls while abroad, we recommend adding our International Travel Pack.",
    "The International Travel Pack provides unlimited data, calls, and texts while you're abroad. The standard price is $70 for the duration of your trip.",
    "I completely understand, Mr. Williams. Let me see what I can do for you. Since you're a valued customer, I can offer you a special discount, reducing the price to $50.",
    "Excellent, Mr. Williams. I've applied the International Travel Pack to your account at the discounted rate of $50. You should now have full access to internet, calls, and texts in Greece. Please restart your phone to activate the service.",
    "You're very welcome, Mr. Williams. Is there anything else I can assist you with today?",
    "That’s great to hear. As a thank you for being a loyal customer, we have a fantastic promotional offer just for you! Please check your inbox for all the details.",
    "It's my pleasure! Enjoy your stay in Santorini. If you need any further assistance, please don't hesitate to contact us. Have a wonderful day!",
  ];
  const secondUser: any = [
    "Hi, I'm currently traveling in Santorini, Greece, and I'm not getting any internet on my phone. This is really frustrating!",
    "It's Liam Williams, and my mobile number is 987654321.",
    "I wasn't aware that my plan wouldn't work overseas. I'm only here for a week, and I really need internet access. How much does this International Travel Pack cost?",
    "$70? That's quite expensive for just a week!",
    "Hmm, $50 is more reasonable. I appreciate the discount. Let's go ahead and add the pack.",
    "That's great! Thank you so much for your help.",
    "No, that's all. You've been very helpful.",
    "Thank you for the promotional offer. I will check it after this call",
    "DISCONNECT",
  ];
  const onTextSend = (text: string) => {
    onMessageSend(undefined, text);
  };

  const [sttFromMic] = useMic(text, onTextSend);

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

  const generateAudio = (text: string, avatar: string) => {
    const id = +new Date();
    let gender = avatar.includes("female") ? "Female" : " Male";
    let voiceChange =
      gender === "Female" ? "en-US-AmberNeural" : "en-US-GuyNeural";

    let xml: any = `<speak version=\'1.0\' xml:lang="en-US">
    <voice xml:id='${id}' xml:lang='en-US' xml:gender='${gender}' name='${voiceChange}'  >${text.replaceAll(
      "&",
      "and"
    )}</voice>
    </speak>`;
    //    let xml = <speak version=\'1.0\' xml:lang="en-US">
    // <voice xml:id='${id}' xml:lang='en-US' xml:gender="Male" name='en-US-GuyNeural'   >${text.replaceAll(
    //   "&",
    //   "and"
    // )}</voice>
    // </speak>;

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
          // sampleAudioPlayer.play();
          // sampleAudioPlayer.muted = isMuted;
          // sampleAudioPlayer.hidden = false;
        }
      })
      .catch((err) => {
        // generateToken();
        // generateAudio(text, avatar);
      });
  };

  const callAPI = async () => {
    const payload = {
      history: convertMessages1(messages),
      customerID: customerId,
      filename: fileName,
      ongoingCall: "false",
    };
    try {
      const { data } = await axios.post(
        "https://func-aoai2-demo-prod.azurewebsites.net/api/analyze_customer_interaction",
        payload
      );
      return data; // You might want to return the data for further processing
    } catch (error) {
      console.error("Error calling API:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const onMessageSend = async (e?: ChatMessageSendEvent, text?: string) => {
    const userMessage: Message = {
      author: AUTHORS[1],
      text: text?.trim() ?? e?.message.text?.trim(),
      timestamp: e?.message.timestamp ?? new Date(),
    };
    if (
      e?.message?.text?.toLowerCase() === "disconnect" ||
      text?.toLowerCase() === "disconnect"
    ) {
      setMessages((old) => [...(old ?? []), userMessage]);
      return null;
    }

    setMessages((old) => [
      ...(old ?? []),
      userMessage,
      { author: AUTHORS[0], typing: true },
    ]);

    try {
      const { data } = await axios.post(CALL_CENTER_API + "customer_response", {
        conversation: convertMessages2([...messages, userMessage]),
        ...problem,
      });

      if (data?.callDisconnect) {
        setIsEnded(true);
      }

      if (data?.answer == "disconnect") {
        setSuggestionLoading(false);
      }

      if (data?.answer) {
        generateAudio(data.answer, avatar);
        setMessages((old) => {
          const finalMessages = [
            ...(old ?? []).slice(0, old.length - 2),
            userMessage,
            {
              author: AUTHORS[0],
              // text: data.answer,
              text: secondUser[questionCount],
              timestamp: new Date(),
            },
          ];
          // console.log(finalMessages, "final");

          if (data.ongoingCall && !data?.callDisconnect)
            getAssistantSuggestion(finalMessages);
          else {
            setAssistantSuggestion("");
          }
          return finalMessages;
        });
        if (data?.callDisconnect) {
          setIsEnded(true);
          setButtonGlow((old) => ({
            ...old,
            isSuggest: false,
            isAuto: false,
            isChat: false,
            isProceed: true,
          }));
          setPopoverShow((old) => ({
            ...old,
            isSuggest: false,
            isAuto: false,
            isChat: false,
            isProceed: true,
          }));
          setTimeout(
            () => setPopoverShow((old) => ({ ...old, isProceed: false })),
            3000
          );
        } else {
          setButtonGlow((old) => ({ ...old, isChat: false, isAuto: true }));
          setPopoverShow((old) => ({ ...old, isChat: false, isAuto: true }));
          setTimeout(
            () => setPopoverShow((old) => ({ ...old, isAuto: false })),
            3000
          );
        }
      } else {
        setMessages((old) => [...(old ?? []).slice(0, old.length - 1)]);
      }
      dispatch(
        setConversationMessages(
          messages.map(({ timestamp, selectionIndex, ...rest }: any) => ({
            ...rest,
          }))
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAssistantSuggestion = async (textMessages?: Message[]) => {
    setAssistantSuggestion("");
    setSuggestionLoading(true);
    try {
      const { data } = await axios.post(
        CALL_CENTER_API + "analyze_customer_interaction",
        {
          history: convertMessages2(textMessages ?? messages),
          customerID: customerId,
          filename: fileName,
          ongoingCall: "true",
          //...problem,
        }
      );

      //generateAudio(data?.answer);
      // setAssistantSuggestion(data?.agent_suggestion);
      // console.log(questionCount);
      // console.log(istUser[questionCount]);

      setQuestionCount(questionCount + 1);

      setAssistantSuggestion(istUser[questionCount]);
      // console.log(questionCount);
      // console.log(istUser[questionCount]);
      if (data?.agent_suggestion?.includes("(Send Promotional Offer)")) {
        setButtonGlow((old) => ({
          ...old,
          isSendPromotion: true,
        }));
      } else {
        setButtonGlow((old) => ({
          ...old,
          isSendPromotion: false,
        }));
      }
      setSentimentScore(data?.Sentimentscore);
      setSentiment(data?.sentiment);
      if (isEnded) setAssistantSuggestion("");
      //setAssistantSuggestion(data?.answer);
      setSuggestionLoading(false);
    } catch (error) {
      console.error(error);
      setSuggestionLoading(false);
    } finally {
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      //await getAssistantSuggestion();
      // Assuming that onMessageSend sets the necessary state and calls getAssistantSuggestion
    };
    // if (convertMessages?.length) dispatch(setConversationMessages([]));
    fetchData();
  }, []);

  useEffect(() => {
    const element = document.getElementsByClassName(
      "k-message-list k-avatars"
    )?.[0];
    const spanElement = document.createElement("span");
    spanElement.classList.add(styles.chatEndedMessage);

    const messageBox: any = document.getElementsByClassName(
      "k-message-box k-textbox k-input k-input-md k-rounded-md k-input-solid"
    )[0];

    if (isEnded && element) {
      element.classList.add(styles.chatEnded);
      element.scrollTop = element.scrollHeight;
      element.appendChild(spanElement);
      messageBox.classList.add(styles.disabled);
    }
  }, [isEnded]);

  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const customMessage = (props: ChatMessageBoxProps) => {
    return (
      <>
        {props.messageInput}
        {props.sendButton}

        <div
          title="Hold to Speak, Please wait for 2-3 seconds while holding down the mic button before you begin to speak."
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            opacity: !isPressed ? 1 : 0.5,
          }}
        >
          <Mic28Filled
            className={`${styles.mic} ${buttonGlow.isSuggest && styles.glow}`}
          />
        </div>
      </>
    );
  };

  const churnStatus = AVATARS?.find(
    (a) => a.customerId === customerId
  )?.churnStatus;

  const handleSend = (text: string) => {
    onMessageSend(undefined, text);
    setShowEmailPopup(false);
    setDisableSend(true);
  };

  const handleCancel = () => {
    setShowEmailPopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1>MediGuard Assurance Agent</h1>
        <div className={styles.middleContainer}>
          <Chat
            messageTemplate={MessageTemplate}
            attachmentTemplate={AttachmentTemplate}
            onMessageSend={onMessageSend}
            className={styles.chat}
            user={AUTHORS[0]}
            messages={messages}
            messageBox={customMessage}
          />
        </div>
      </div>
    </div>
  );
};
