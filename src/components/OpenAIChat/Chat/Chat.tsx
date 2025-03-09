import { useRef, useState, useEffect, useContext } from "react";
import styles from "./Chat.module.scss";
import {
  chatApi,
  Approaches,
  AskResponse,
  ChatRequest,
  ChatTurn,
  uploadDataChatApi,
} from "api";
import {
  Answer,
  AnswerError,
  AnswerLoading,
  Example,
} from "components/OpenAIChat";
import { QuestionInput } from "components/OpenAIChat";
import { ExampleList } from "components/OpenAIChat";
import { UserChatMessage } from "components/OpenAIChat";
import { AnalysisPanel, AnalysisPanelTabs } from "components/OpenAIChat";
import { ClearChatButton } from "components/OpenAIChat";
import { Switch, SwitchChangeEvent } from "@progress/kendo-react-inputs";
import { UploadPanel } from "../UploadPanel/UploadPanel";
import { DemoContext } from "context/DemoContext";
import { useMic } from "hooks/useMic";
import { Popup } from "components";
import {
  Camera20Regular,
  Camera24Filled,
  Mic24Filled,
  Mic28Filled,
} from "@fluentui/react-icons";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { setSelectedQuestion } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ArchitectureOverview, ArchitectureWithTags } from "pages";
import { PageType } from "types";
import { Icons } from "components/Icons";
import { Button } from "@progress/kendo-react-buttons";
import { SidebarToggleIcon } from "assets";
import { PivotItem } from "@fluentui/react";
import { SvgIcon } from "@progress/kendo-react-common";
import { uploadIcon } from "@progress/kendo-svg-icons";
import { ArchitectureIcon } from "assets/ArchitectureIcon";
const {
  endPointURL,
  backgroundImageURL,
  chatImageLogoURL,
  subTitle,
  prompt1,
  prompt2,
  prompt3,
  questionPlaceHolder,
  title,
  chatApproach,
  chatCompany,
  disableTitle,
  description,
  index,
  container,
  tryYourOwnDataEndpoint,
} = window.config;

export const Chat = (props: any) => {
  const {
    config,
    setBackground,
    setEndpoint,
    setLogo,
    setPrompt1,
    setPrompt2,
    setPrompt3,
    setPlaceholderQuestion,
    setTitle,
  } = useContext(DemoContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const lastQuestionRef = useRef<string>("");
  const chatMessageStreamEnd = useRef<HTMLDivElement | null>(null);
  const timerRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [isPressed, setIsPressed] = useState(false);
  const [text] = useState("");
  const [activeCitation, setActiveCitation] = useState<string>();
  const [activeAnalysisPanelTab, setActiveAnalysisPanelTab] = useState<
    AnalysisPanelTabs | undefined
  >(undefined);
  const onTextSend = (text: string) => {
    uploadToggle ? makeCustomUploadApiRequest(text) : makeApiRequest(text);
  };
  const [sttFromMic] = useMic(text, onTextSend);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0);
  const [answers, setAnswers] = useState<
    [user: string, response: AskResponse][]
  >([]);
  const [externalDomain, setExternalDomain] = useState(false);
  const [uploadToggle, setUploadToggle] = useState(false);
  const [showArchPopup, setShowArchPopup] = useState(false);

  const [fileUploadResponse, setFileUploadResponse] = useState<any>({
    index_name: "b433cfdc-1720520340196",
    container_name: "c1feefd6-1720520340196",
  });
  const [showNews, setshowNews] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isImage, setIsImage] = useState("");
  const { question } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  // const { showArchPopup, hideTooltips } = useAppSelector(
  //   (state) => state.config
  // );
  let popupTitle = " ";
  useEffect(
    function () {
      if (endPointURL) {
        setEndpoint(endPointURL);
      }
      lastQuestionRef.current = "";
      setAnswers([]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endPointURL]
  );

  const setPromptsTitleAndImages = () => {
    setBackground(
      // localStorage.getItem(`${name}-background`) ??
      backgroundImageURL
    );
    setLogo(
      // localStorage.getItem(`${name}-logo`) ??
      props?.componentParameters?.chatImageLogoURL ?? chatImageLogoURL
    );
    setTitle(
      // localStorage.getItem(`${name}-title`) ??
      subTitle
    );
    setPrompt1(
      // localStorage.getItem(`${name}-prompt1`) ??
      props?.componentParameters?.prompt1 ?? prompt1
    );
    setPrompt2(
      // localStorage.getItem(`${name}-prompt2`) ??
      props?.componentParameters?.prompt2 ?? prompt2
    );
    setPrompt3(
      // localStorage.getItem(`${name}-prompt3`) ??
      props?.componentParameters?.prompt3 ?? prompt3
    );
    setPlaceholderQuestion(
      // localStorage.getItem(`${name}-question`) ??
      props?.componentParameters?.placeholderQuestion ?? questionPlaceHolder
    );
  };

  useEffect(() => {
    setPromptsTitleAndImages();
    setUploadToggle(false);
    setShowSidebar(false);
    setExternalDomain(false);
    setIsImageVisible(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const makeApiRequest = async (question: string) => {
    lastQuestionRef.current = question;
    error && setError(undefined);
    setIsLoading(true);
    setShowSidebar(false);
    setActiveCitation(undefined);
    setActiveAnalysisPanelTab(undefined);
    try {
      const history: ChatTurn[] = answers.map((a) => ({
        user: a[0],
        bot: a[1].answer,
      }));

      const request: ChatRequest = {
        history: [...history, { user: question, bot: undefined }],
        ...(chatApproach
          ? {
              approach: chatApproach,
            }
          : {
              approach: Approaches.ReadRetrieveRead,
            }),
        industry: "default",
        index: props?.componentParameters?.index ?? index,
        container: props?.componentParameters?.container ?? container,
        overrides: {
          promptTemplate:
            config?.promptTemplate?.length === 0
              ? undefined
              : config?.promptTemplate,
          excludeCategory:
            config?.excludeCategory?.length === 0
              ? undefined
              : config?.excludeCategory,
          top: config?.retrieveCount,
          semanticRanker: config?.useSemanticRanker,
          semanticCaptions: config?.useSemanticCaptions,
          suggestFollowupQuestions: config?.useSuggestFollowupQuestions,
        },
        ...(chatCompany && { company: chatCompany }),
        enableExternalDomain: externalDomain,
      };
      const result = await chatApi(
        request,
        endPointURL + "/chat"
        // uploadToggle || externalDomain
        //   ? tryYourOwnDataEndpoint + "/chat"
        //   : endPointURL + "/adb_ragchat_dev"
      );
      setAnswers([...answers, [question, result]]);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const makeCustomUploadApiRequest = async (question: string) => {
    lastQuestionRef.current = question;
    error && setError(undefined);
    setIsLoading(true);
    setActiveCitation(undefined);
    // setActiveAnalysisPanelTab(undefined);

    try {
      const history: ChatTurn[] = answers.map((a) => ({
        user: a[0],
        bot: a[1].answer,
      }));

      const request: ChatRequest = {
        history: [...history, { user: question, bot: undefined }],
        approach: Approaches.ReadRetrieveRead,
        overrides: {
          promptTemplate:
            config?.promptTemplate?.length === 0
              ? undefined
              : config?.promptTemplate,
          excludeCategory:
            config?.excludeCategory?.length === 0
              ? undefined
              : config?.excludeCategory,
          top: config?.retrieveCount,
          semanticRanker: config?.useSemanticRanker,
          semanticCaptions: config?.useSemanticCaptions,
          suggestFollowupQuestions: config?.useSuggestFollowupQuestions,
        },
        enableExternalDomain: externalDomain,
        container: fileUploadResponse.container_name,
        index: fileUploadResponse.index_name,
      };
      const result = await uploadDataChatApi(
        request,
        endPointURL + "/chat"
        // uploadToggle || externalDomain
        //   ? tryYourOwnDataEndpoint + "/chat"
        //   : endPointURL + "/adb_ragchat_dev"
      );
      setAnswers([...answers, [question, result]]);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    lastQuestionRef.current = "";
    error && setError(undefined);
    setActiveCitation(undefined);
    setAnswers([]);
    setshowNews(false);
    setIsImageVisible(false);
    setSelectedExample(null);
  };

  useEffect(
    () => chatMessageStreamEnd.current?.scrollIntoView({ behavior: "smooth" }),
    [isLoading]
  );

  useEffect(() => {
    setBackground(
      // localStorage.getItem(`${name}-background`) ??
      backgroundImageURL
    );
    return setLogo(
      // localStorage.getItem(`${name}-logo`) ??
      props?.componentParameters?.chatImageLogoURL ?? chatImageLogoURL
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.isClearChat) {
      clearChat();
      setUploadToggle(false);
      setShowSidebar(false);
      setExternalDomain(false);
      setIsImageVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isClearChat]);

  const onExampleClicked = (example: string) => {
    dispatch(setSelectedQuestion(example));
    makeApiRequest(example);
    // if (example === prompt1) {
    //   //setIsImage("https://nrfcdn.azureedge.net/Arrow-A.png");
    // }
    // if (example === prompt2) {
    //   //setIsImage("https://nrfcdn.azureedge.net/Arrow-B.png");
    // }
    // if (example == prompt1 || example == prompt2) {
    //   //setIsImageVisible(true);
    // }
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
  const onShowCitation = (citation: string, index: number) => {
    // if (
    //   activeCitation === citation &&
    //   activeAnalysisPanelTab === AnalysisPanelTabs.CitationTab &&
    //   selectedAnswer === index
    // ) {
    //   setActiveAnalysisPanelTab(undefined);
    //   setShowSidebar(false);
    // } else {
    setActiveCitation(citation);
    setActiveAnalysisPanelTab(AnalysisPanelTabs.CitationTab);
    setShowSidebar(true);
    // }

    setSelectedAnswer(index);
  };

  const onContextReady = (result: string) => {};

  const onToggleTab = (tab: AnalysisPanelTabs, index: number) => {
    // if (activeAnalysisPanelTab === tab && selectedAnswer === index) {
    //   setActiveAnalysisPanelTab(undefined);
    // } else {
    setActiveAnalysisPanelTab(tab);
    setShowSidebar(true);
    // }

    setSelectedAnswer(index);
  };

  const onToggleExternalDomain = (event: SwitchChangeEvent) => {
    setExternalDomain(event.target.value);
  };

  const onToggleUploadButton = (event: SwitchChangeEvent) => {
    if (event.target.value) {
      setFileUploadResponse({});
    }
    setExternalDomain(false);
    setUploadToggle(event.target.value);
    if (event.target.value) {
      setShowSidebar(true);
      setActiveAnalysisPanelTab(AnalysisPanelTabs.UploadTab);
    } else {
      setActiveAnalysisPanelTab(undefined);
      setShowSidebar(false);
    }
    clearChat();
  };
  const [copiedQuestion, setCopiedQuestion] = useState("");
  const [isReplay, setIsReplay] = useState(false);
  const onCopyMessage = (message: string) => {
    setCopiedQuestion(message);
  };
  const showNewsImage = () => {
    setshowNews(true);
    //setIsImageVisible(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [selectedExample, answers]);

  return (
    <div key={props?.componentParameters?.prompt1} className={styles.container}>
      <div className={styles.arrow} onClick={showNewsImage}>
        {/* <img src="https://nrfcdn.azureedge.net/Arrow-C.png" alt="" /> */}
        {isImageVisible && (
          <img src={isImage} alt="Arrow Icon" className={styles.newsImage} />
        )}
      </div>
      <div className={styles.chatRoot}>
        <div
          className={styles.chatContainer}
          // style={{
          //   ...(showSidebar && { marginRight: "25vw" }),
          // }}
        >
          <div
            className={styles.chatContainermanufacturingShadow}
            style={{
              paddingBottom: 40,
            }}
          >
            {!lastQuestionRef.current ? (
              <div className={styles.chatEmptyState}>
                <img
                  src={
                    props?.componentParameters?.chatImageLogoURL ?? config?.logo
                  }
                  alt="logo"
                  className={styles.chatEmptyStateLogo}
                  style={{ marginBottom: !disableTitle ? 0 : 16 }}
                />
                {!disableTitle && (
                  <h1 className={styles.chatEmptyStateTitle}>
                    {config?.title}
                  </h1>
                )}
                {/* <h2 className={styles.chatEmptyStateSubtitle}>{description}</h2> */}
              </div>
            ) : (
              <div className={styles.chatMessageStream}>
                {answers.map((answer, index) => (
                  <div key={index}>
                    <UserChatMessage
                      message={answer[0]}
                      disabled={isLoading}
                      onCopyMessage={onCopyMessage}
                      setIsReplay={setIsReplay}
                    />
                    <div className={styles.chatMessageGpt}>
                      <Answer
                        key={index}
                        answer={answer[1]}
                        isSelected={
                          selectedAnswer === index &&
                          activeAnalysisPanelTab !== undefined
                        }
                        onCitationClicked={(c) => {
                          onShowCitation(c, index);
                        }}
                        onThoughtProcessClicked={() =>
                          onToggleTab(
                            AnalysisPanelTabs.ThoughtProcessTab,
                            index
                          )
                        }
                        onSupportingContentClicked={() =>
                          onToggleTab(
                            AnalysisPanelTabs.SupportingContentTab,
                            index
                          )
                        }
                        onFollowupQuestionClicked={(q) => makeApiRequest(q)}
                        showFollowupQuestions={
                          config?.useSuggestFollowupQuestions &&
                          answers?.length - 1 === index
                        }
                        endpoint={config?.endPoint}
                        container={
                          !uploadToggle
                            ? props?.componentParameters?.container ?? container
                            : fileUploadResponse?.container_name
                        }
                      />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <>
                    <UserChatMessage
                      message={lastQuestionRef.current}
                      disabled={isLoading}
                      onCopyMessage={onCopyMessage}
                      setIsReplay={setIsReplay}
                    />
                    <div className={styles.chatMessageGptMinWidth}>
                      <AnswerLoading />
                    </div>
                  </>
                )}
                {error ? (
                  <>
                    <UserChatMessage
                      message={lastQuestionRef.current}
                      disabled={isLoading}
                      onCopyMessage={onCopyMessage}
                      setIsReplay={setIsReplay}
                    />
                    <div className={styles.chatMessageGptMinWidth}>
                      <AnswerError
                        error={error.toString()}
                        onRetry={() => makeApiRequest(lastQuestionRef.current)}
                      />
                    </div>
                  </>
                ) : null}
                <div ref={chatMessageStreamEnd} />
              </div>
            )}
            <div className={styles.chatInput}>
              <QuestionInput
                key={config.placeholderQuestion}
                copiedQuestion={copiedQuestion}
                setCopiedQuestion={setCopiedQuestion}
                isReplay={isReplay}
                setIsReplay={setIsReplay}
                clearOnSend
                placeholder={
                  props?.componentParameters?.placeholderQuestion ??
                  config?.placeholderQuestion
                }
                disabled={isLoading}
                onSend={(question) =>
                  uploadToggle
                    ? makeCustomUploadApiRequest(question)
                    : makeApiRequest(question)
                }
              />
              {/* <div className={styles.mic1}
          title="Hold to Speak"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          
        >
          <Mic28Filled
                className={styles.mic}
                primaryFill="var(--primary-color)"
              />
        </div> */}
              <div className={styles.chatInputFooter}>
                <div>
                  <div className={styles.chatInputToggle}>
                    <label>
                      Pre-trained knowledge{" "}
                      <Switch
                        onChange={onToggleExternalDomain}
                        checked={externalDomain}
                      />
                    </label>
                    <label>
                      Try your own data{" "}
                      <Switch
                        onChange={onToggleUploadButton}
                        checked={uploadToggle}
                      />
                    </label>
                  </div>
                </div>
                <ClearChatButton
                  className={styles.clearChatButton}
                  onClick={() => {
                    clearChat();
                    setShowSidebar(false);
                  }}
                  disabled={!lastQuestionRef.current || isLoading}
                />
              </div>
            </div>
            {!uploadToggle && (
              <ExampleList
                examples={[
                  {
                    text:
                      // localStorage.getItem(
                      //   `${name}-prompt1`
                      // ) ??
                      props?.componentParameters?.prompt1 ?? prompt1,
                    value:
                      // localStorage.getItem(
                      //   `${name}-prompt1`
                      // ) ??
                      props?.componentParameters?.prompt1 ?? prompt1,
                  },
                  {
                    text:
                      // localStorage.getItem(
                      //   `${name}-prompt2`
                      // ) ??
                      props?.componentParameters?.prompt2 ?? prompt2,
                    value:
                      // localStorage.getItem(
                      //   `${name}-prompt2`
                      // ) ??
                      props?.componentParameters?.prompt2 ?? prompt2,
                  },
                  {
                    text:
                      // localStorage.getItem(
                      //   `${name}-prompt3`
                      // ) ??
                      props?.componentParameters?.prompt3 ?? prompt3,
                    value:
                      // localStorage.getItem(
                      //   `${name}-prompt3`
                      // ) ??
                      props?.componentParameters?.prompt3 ?? prompt3,
                  },
                ]}
                onExampleClicked={onExampleClicked}
                selectedExample={selectedExample}
                setSelectedExample={setSelectedExample}
              />
            )}{" "}
            <div
              className={styles.note}
              style={{
                marginBottom: uploadToggle && lastQuestionRef.current ? 12 : 0,
              }}
            >
              AI generated content may be incomplete or factually incorrect.
            </div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          {/* <Button
            onClick={() => setShowArchPopup(true)}
            className={"secondaryButton1"}
          >
            Architecture Diagram
          </Button> */}
          <span onClick={() => setShowArchPopup(true)}>
            <ArchitectureIcon />
          </span>
        </div>
        {showNews && (
          <Popup
            title="News"
            onClose={() => setshowNews(false)}
            showPopup={true}
          >
            {/* <img
                  // className={styles.newsImage}
                  src="https://dreamdemoassets.blob.core.windows.net/nrf/badnews.png"
                  alt=""
                /> */}
            {question === prompt1 ? (
              <img
                className={styles.newsImage}
                src="https://dreamdemoassets.blob.core.windows.net/nrf/badnews.png"
                alt=""
              />
            ) : question === prompt2 ? (
              <img
                className={styles.newsImage}
                src="https://dreamdemoassets.blob.core.windows.net/nrf/goodnews.png"
                alt=""
              />
            ) : null}
          </Popup>
        )}

        <Popup
          showPopup={showArchPopup}
          title={popupTitle}
          onClose={() => setShowArchPopup(false)}
          dialogWidth={1400}
          dialogHeight={960}
        >
          <ArchitectureWithTags
            pageTitle={"Architecture diagram"}
            pageType={PageType.Architecture}
            // imageUrl="https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_outside_in_view_arch_diagram.png"
            imageUrl="https://dreamdemoassets.blob.core.windows.net/openai/ai_first_outside_in_view_arch_diagram2.png"
            // videoURL={
            //   "https://dreamdemoassets.blob.core.windows.net/daidemo/videos/AI_Studio_Scenario_1_v2.mp4"
            // }
            tags={[
              {
                tagName: "Indexing",
                tagDescription: "Indexing",
              },
              {
                tagName: "Query",
                tagDescription: "Query",
              },
              {
                tagName: "Query",
                tagDescription: "Query",
              },
              {
                tagName: "Query for Embedding",
                tagDescription: "Query for Embedding",
              },
              {
                tagName: "Embedded Query",
                tagDescription: "Embedded Query",
              },
              {
                tagName: "Search Result",
                tagDescription: "Search Result",
              },
              {
                tagName: "Response stored in parquet files",
                tagDescription: "Response stored in parquet files",
              },
              {
                tagName: "Response",
                tagDescription: "Response",
              },
              {
                tagName: "Answer",
                tagDescription: "Answer",
              },
              {
                tagName: "Answer",
                tagDescription: "Answer",
              },
              {
                tagName: "Delta table data",
                tagDescription: "Delta table data",
              },
            ]}
          />
        </Popup>

        <div
          className={styles.rightSidebar}
          style={{
            ...(showSidebar && { width: "25vw", padding: "8px 16px" }),
          }}
        >
          <div
            className={styles.sidebarToggleIcon}
            onClick={() => {
              if (activeAnalysisPanelTab || uploadToggle) {
                setShowSidebar((old) => !old);
              }
            }}
          >
            <SidebarToggleIcon rotate={showSidebar ? "0deg" : "180deg"} />
          </div>

          <div
            style={{
              ...(!showSidebar && { visibility: "hidden" }),
              width: "100%",
              height: "100%",
            }}
          >
            {(activeAnalysisPanelTab !== undefined ||
              activeAnalysisPanelTab !== null) && (
              <AnalysisPanel
                className={styles.chatAnalysisPanel}
                activeCitation={activeCitation}
                onActiveTabChanged={(x) => onToggleTab(x, selectedAnswer)}
                citationHeight="810px"
                answer={answers?.[selectedAnswer]?.[1]}
                activeTab={activeAnalysisPanelTab!}
                onContextReady={onContextReady}
                setFileUploadResponse={setFileUploadResponse}
                uploadToggle={uploadToggle}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
