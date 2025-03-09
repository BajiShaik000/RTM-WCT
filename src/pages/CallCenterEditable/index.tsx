import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import {
  Switch,
  SwitchChangeEvent,
  TextArea,
} from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import axios from "axios";
import { Loader } from "@progress/kendo-react-indicators";
import { Popover, Tooltip } from "@progress/kendo-react-tooltip";
import { Report, Popup } from "components";
import { PageType } from "types";
import {
  ArchitectureWithTags,
  CallCenter,
  convertMessages,
  convertMessages1,
} from "pages";
import { useLocation, useNavigate } from "react-router-dom";
import { Chat, Message, User } from "@progress/kendo-react-conversational-ui";
import { useAppDispatch, useAppSelector } from "hooks";

import {
  ChevronLeft28Filled,
  ChevronRight28Filled,
} from "@fluentui/react-icons";
import { ArchitectureIcon } from "assets/ArchitectureIcon";

const { BlobBaseUrl } = window.config;

interface Props {
  showBeforeScript: boolean;
  showCallCenterBefore: boolean;
  showAfterSummary: boolean;
  showCallCenterAfter: boolean;
  showCustomerConversation: boolean;
}

let {
  callCenterExtractFromConversationWithKey,
  callCenterExtractFromConversationWithoutKey,
  callCenterVideoURL,
} = window.config;

export const CallCenterEditable: FC<Props> = (props) => {
  const [extractFromConversation, setExtractFromConversation] = useState("");
  const [includeKey, setIncludeKey] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(
    props.showCallCenterAfter ?? false
  );
  const { fileName, customerId, name, avatar } = useAppSelector(
    (state) => state.config
  );
  const [isEditConv, setIsEditConv] = useState(false);
  const [isEditScript, setIsEditScript] = useState(false);
  const [visible, setVisible] = useState(
    props.showCustomerConversation ?? false
  );
  const [showCallCenterBefore, setShowCallCenterBefore] = useState(
    props.showCallCenterBefore ?? true
  );
  const [showBeforeScript, setShowBeforeScript] = useState(
    props.showBeforeScript ?? false
  );
  const [showAfterSummary, setShowAfterSummary] = useState(
    props.showAfterSummary ?? false
  );
  const [showArchPopup, setShowArchPopup] = useState(false);

  let popupTitle = " ";

  const [messages, setMessages] = useState<Message[]>([]);
  const [buttonGlow, setButtonGlow] = useState({
    isEdit: false,
    isEditing: false,
    isSave: false,
    isSummary: false,
    isMachineReadable: false,
    isGenerateSummary: false,
    isProceed: false,
  });
  const [showPopover, setShowPopover] = useState({
    isEdit: false,
    isEditing: false,
    isSave: false,
    isSummary: false,
    isMachineReadable: false,
    isGenerateSummary: false,
    isProceed: false,
  });
  const dispatch = useAppDispatch();
  const { messages: conversationMessages } = useAppSelector(
    (state) => state.config
  );

  useEffect(() => {
    if (conversationMessages?.length) {
      setMessages(conversationMessages);
    }
  }, [conversationMessages]);

  const AUTHORS: User[] = [
    {
      id: "user",
      name: "Customer",
      avatarUrl: `https://dreamdemoassets.blob.core.windows.net/mtc/${avatar}_selected_avatar.png`,
    },
    {
      id: "assistant",
      name: `Agent`,
      avatarUrl: `https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_call_in_progress_agent.png`,
    },
  ];

  useEffect(() => {
    setVisible(props.showCustomerConversation);
    setShowPopup(props.showCallCenterAfter);
    setShowCallCenterBefore(props.showCallCenterBefore);
    setShowAfterSummary(props.showAfterSummary);
    setShowBeforeScript(props.showBeforeScript);
  }, [props]);

  useEffect(() => {
    setExtractFromConversation(
      includeKey
        ? callCenterExtractFromConversationWithKey
        : callCenterExtractFromConversationWithoutKey
    );
    setButtonGlow((old) => ({ ...old, isEdit: true }));
    setShowPopover((old) => ({ ...old, isEdit: true }));
    setTimeout(() => {
      setShowPopover((old) => ({ ...old, isEdit: false }));
    }, 3000);
  }, []);

  const generateSummary = (extractFromConv?: string) => {
    setIsLoading(true);
    setIsEditConv(false);
    setIsEditScript(false);
    axios
      .post(
        "https://func-aoai2-demo-prod.azurewebsites.net/api/generatesummary",
        {
          // questions: extractFromConv ?? extractFromConversation,
          // utility: "questionAnswer",
          conversation: convertMessages1(messages),
          question: extractFromConv ?? extractFromConversation,
        }
      )
      .then((res) => setSummary(res.data?.summary ?? ""))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        if (buttonGlow.isGenerateSummary) {
          setButtonGlow((old) => ({
            ...old,
            isGenerateSummary: false,
            isProceed: true,
          }));
          setShowPopover((old) => ({
            ...old,
            isGenerateSummary: false,
            isProceed: true,
          }));
          setTimeout(() => {
            setShowPopover((old) => ({ ...old, isProceed: false }));
          }, 3000);
        }
        buttonGlow.isSummary &&
          setButtonGlow((old) => ({
            ...old,
            isSummary: false,
            isMachineReadable: true,
          }));
        setShowPopover((old) => ({
          ...old,
          isSummary: false,
          isMachineReadable: true,
        }));
        setTimeout(() => {
          setShowPopover((old) => ({ ...old, isMachineReadable: false }));
        }, 3000);
      });
  };

  const onToggle = (e: SwitchChangeEvent) => {
    if (e.value) {
      setExtractFromConversation(callCenterExtractFromConversationWithKey);
    } else {
      setExtractFromConversation(callCenterExtractFromConversationWithoutKey);
    }
    setIncludeKey(e.value);
    setButtonGlow((old) => ({
      ...old,
      isGenerateSummary: true,
      isMachineReadable: false,
    }));
    setShowPopover((old) => ({
      ...old,
      isGenerateSummary: true,
      isMachineReadable: false,
    }));
    setTimeout(() => {
      setShowPopover((old) => ({ ...old, isGenerateSummary: false }));
    }, 3000);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const anchor: any = useRef(null);
  const generateAnchor: any = useRef(null);
  const saveAnchor: any = useRef(null);
  const machineReadableAnchor: any = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.transcriptContainer}>
          <div className={styles.header}>Call Transcript Analysis</div>
          {/* <Legend currentPage={location.pathname} /> */}
          <div className={styles.tabContainer}>
            <div className={styles.tab}>
              <h5>Call Transcript</h5>
              <hr />

              <div
                style={{
                  overflowY: "auto",
                  flex: 1,
                  padding: isEditScript ? "8px" : 0,
                  fontSize: 15,
                }}
              >
                <Chat
                  className={styles.chat}
                  user={AUTHORS[1]}
                  messages={conversationMessages?.map((m) => ({
                    author: m.author.id === "user" ? AUTHORS[0] : AUTHORS[1],
                    text: m.text,
                  }))}
                />
              </div>
            </div>
            <div className={styles.tab}>
              <div className={styles.tabHeader}>
                <h5>Extract from Conversation</h5>
                <div className={styles.switchContainer}>
                  <Popover
                    show={showPopover.isMachineReadable}
                    anchor={
                      showPopover.isMachineReadable
                        ? machineReadableAnchor.current &&
                          machineReadableAnchor.current.element
                        : machineReadableAnchor.current &&
                          machineReadableAnchor.current.element
                    }
                    className={styles.popover}
                    callout={true}
                    onPosition={(e) => console.log(e)}
                  >
                    {showPopover.isMachineReadable &&
                      'Switch on the "Machine Readable" button, then click on the "Generate Analysis" button again to obtain transcript analysis in JSON, enabling analysis at scale.'}
                  </Popover>
                  <h6>Machine Readable</h6>
                  <Switch
                    ref={machineReadableAnchor}
                    className={buttonGlow.isMachineReadable ? styles.glow : ""}
                    size="small"
                    checked={includeKey}
                    onChange={onToggle}
                  />
                </div>
              </div>
              <hr />
              <TextArea
                value={extractFromConversation}
                onChange={(e) => {
                  setExtractFromConversation(e.value);
                }}
                autoSize={true}
                className={`${styles.textArea} ${
                  !isEditConv && styles.disabledTextArea
                }`}
                onFocus={() => {
                  buttonGlow.isEditing = false;
                }}
                style={{
                  // overflowY: "auto",
                  flex: 1,
                  padding: "8px",
                  fontSize: 15,
                }}
              />
              {isEditConv && !includeKey && (
                <div className={styles.questionContainer}>
                  <div>
                    <div>
                      <strong>Note:</strong> Feel free to add your own
                      contextual or non-contextual questions. Example:
                    </div>

                    <div>9. Did the agent extend any promotional offer?</div>
                    <div>10. What is the purpose of life?</div>
                  </div>
                </div>
              )}
              {showPopover.isEditing && (
                <Popover
                  show={showPopover.isEditing}
                  className={styles.textPopover}
                  callout={true}
                  position="bottom"
                >
                  Type additional inputs to extract specific information from
                  your interaction.
                  <br />
                  For example,"What is the order number?"
                  <br />
                  <strong>Note</strong>: You can add content to extract from the
                  conversation that is and is NOT related to the conversation.
                  Azure AI will only generate results to prompts related to the
                  conversation.
                </Popover>
              )}
              {(showPopover.isSummary || showPopover.isGenerateSummary) && (
                <Popover
                  show={showPopover.isSummary || showPopover.isGenerateSummary}
                  anchor={
                    generateAnchor.current && generateAnchor.current.element
                  }
                  className={styles.popover}
                  callout={true}
                >
                  {showPopover.isSummary &&
                    "Click on the Generate Transcript Analysis\nbutton to generate a summary of the\nentire interaction and assess the quality of the call."}
                  {showPopover.isGenerateSummary &&
                    "Click on Generate Transcript Analyses again\nand wait for the results to generate.\nThis creates a transcript analysis for thousands of calls,\nenabling you to manage data and extract insights at scale."}
                </Popover>
              )}
              {showPopover.isSave && (
                <Popover
                  show={showPopover.isSave}
                  anchor={saveAnchor.current && saveAnchor.current.element}
                  className={styles.popover}
                  callout={true}
                  onPosition={(e) => console.log(e)}
                >
                  {showPopover.isSave && "Click on the Save button."}
                </Popover>
              )}
              {showPopover.isEdit && (
                <Popover
                  show={showPopover.isEdit}
                  anchor={anchor.current && anchor.current.element}
                  className={styles.popover}
                  callout={true}
                  onPosition={(e) => console.log(e)}
                >
                  {showPopover.isEdit &&
                    "Click on the Edit button in the Extract from Conversation pane."}
                </Popover>
              )}
              <div className={styles.btnContainer} style={{ gap: 10 }}>
                <Button
                  ref={anchor}
                  className={`${styles.btn} ${
                    buttonGlow.isEdit && styles.glow
                  }`}
                  style={{
                    backgroundColor: "#0078D4",
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    setIsEditConv(true);
                    setButtonGlow((old) => ({
                      ...old,
                      isEdit: false,
                      isEditing: true,
                      isSave: true,
                    }));
                    setShowPopover((old) => ({
                      ...old,
                      isEdit: false,
                      isEditing: true,
                      isSave: true,
                    }));
                    setTimeout(() => {
                      setShowPopover((old) => ({
                        ...old,
                        isEditing: false,
                        isSave: false,
                      }));
                    }, 3000);
                  }}
                  title='Click on the Edit button and type additional inputs. Example: "What is the order number?"'
                  disabled={isEditConv}
                >
                  Edit
                </Button>

                <Button
                  ref={saveAnchor}
                  className={`${styles.btn} ${
                    buttonGlow.isSave && styles.glow
                  }`}
                  onClick={() => {
                    setIsEditConv(false);
                    setButtonGlow((old) => ({
                      ...old,
                      isEditing: false,
                      isSave: false,
                      isSummary: true,
                    }));
                    setShowPopover((old) => ({
                      ...old,
                      isEditing: false,
                      isSave: false,
                      isSummary: true,
                    }));
                    setTimeout(() => {
                      setShowPopover((old) => ({ ...old, isSummary: false }));
                    }, 3000);
                  }}
                  disabled={!isEditConv}
                  title="Click on the Save button and then click on the Generate Transcript Analysis in pane on the right."
                >
                  Save
                </Button>
              </div>
            </div>
            <div className={styles.tab}>
              <h5>Generated Result</h5>
              <hr />
              <div className={styles.summaryContainer}>
                {isLoading ? (
                  <Loader style={{ color: "#092952", alignSelf: "center" }} />
                ) : (
                  <p style={{ fontSize: 15 }}>{summary}</p>
                )}
              </div>
              <div
                className={styles.btnContainer}
                style={{
                  justifyContent: "center",
                }}
              >
                <Button
                  className={`${styles.btn} ${
                    (buttonGlow.isSummary || buttonGlow.isGenerateSummary) &&
                    styles.glow
                  }`}
                  style={{ width: 250 }}
                  ref={generateAnchor}
                  onClick={() => {
                    generateSummary();
                    setButtonGlow((old) => ({
                      ...old,
                      isSummary: false,
                      isGenerateSummary: false,
                    }));
                    setShowPopover((old) => ({
                      ...old,
                      isSummary: false,
                      isGenerateSummary: false,
                    }));
                  }}
                >
                  Generate Transcript Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionButtonsContainer}>
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
        <div
          className={styles.disclaimerText}
          style={{
            color: "#605e5c",
          }}
        >
          AI generated content may be incomplete or factually incorrect.
        </div>

        {/* <div className={"buttonsContainer"}>
        <Button
          onClick={() => dispatch(setShowArchPopup(true))}
          className={"archButton"}
        >
          Architecture Diagram
        </Button>
        <Button
          className={"secondaryButton"}
          onClick={() => navigate(previousRoute)}
        >
          <ChevronLeft28Filled /> Back
        </Button>
        <Button
          className={`primaryButton ${buttonGlow.isProceed && styles.glow}`}
          onClick={() => {
            navigate(nextRoute);
            setButtonGlow((old) => ({ ...old, isProceed: false }));
            setShowPopover((old) => ({ ...old, isProceed: false }));
          }}
        >
          Proceed <ChevronRight28Filled />
        </Button>
      </div> */}
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
            imageUrl="https://dreamdemoassets.blob.core.windows.net/openai/CKM.png"
            // videoURL={
            //   "https://dreamdemoassets.blob.core.windows.net/daidemo/videos/AI_Studio_Scenario_2_v2.mp4"
            // }
            tags={[
              {
                tagName: "Agent Customer Reaction",
                tagDescription: "Agent Customer Reaction",
                tagIndexName: "1A",
              },
              {
                tagName: "User Question",
                tagDescription: "User Question",
                tagIndexName: "1B",
              },
              {
                tagName: "Analyze Content Safety",
                tagDescription: "Analyze Content Safety",
                tagIndexName: "2",
              },
              {
                tagName: "Verified Query",
                tagDescription: "Verified Query",
                tagIndexName: "3",
              },
              {
                tagName: "Tailored Response",
                tagDescription: "Tailored Response",
                tagIndexName: "4",
              },
              {
                tagName: "Answer",
                tagDescription: "Answer",
                tagIndexName: "5",
              },
              {
                tagName: "Response",
                tagDescription: "Response",
                tagIndexName: "6A",
              },
              {
                tagName: "Answer in JSON Format",
                tagDescription: "Answer in JSON Format",
                tagIndexName: "6B",
              },
              {
                tagName: "Data For Report",
                tagDescription: "Data For Report",
                tagIndexName: "7",
              },
              // {
              //   tagName: "Suggestion",
              //   tagDescription: "Suggestion",
              //   tagIndexName: "",
              // },
              // {
              //   tagName: "Delta table data​",
              //   tagDescription: "Delta table data​",
              //   tagIndexName: "",
              // },
            ]}
          />
        </Popup>
        <Popup
          key={showBeforeScript.toString()}
          showPopup={showCallCenterBefore}
          title="Call Center Report - Before"
          onClose={() => {
            // setShowCallCenterBefore(false);
            // setVisible(true);
            navigate(`/scenario-2-arch-diagram`);
          }}
          className={styles.popup}
        >
          <Tooltip
            tooltipClassName={styles.tooltip}
            position="bottom"
            anchorElement="target"
            key={showBeforeScript.toString()}
          >
            <div>
              <img
                onClick={() => {
                  if (showBeforeScript) {
                    callCenterVideoURL
                      ? navigate("/customer-Selection")
                      : navigate(`/customer-Selection`);
                    // setShowBeforeScript(false);
                    // setVisible(true);
                    // setShowCallCenterBefore(false);
                  } else {
                    navigate(`/call-center-before-script`);
                    // setShowBeforeScript(true);
                  }
                }}
                title={
                  showBeforeScript
                    ? callCenterVideoURL
                      ? "Customer Conversation"
                      : "Call Center - Call In Progress"
                    : "Call Center Report - Script"
                }
                src={
                  showBeforeScript
                    ? `${BlobBaseUrl}Arrow-B.png`
                    : `${BlobBaseUrl}Arrow-A.png`
                }
                alt="Arrow"
                className={styles.arrowA}
                style={{ right: 30 }}
              />
            </div>
          </Tooltip>
          {
            showBeforeScript ? (
              <Report
                removeBackArrow
                pageTitle="Call Center - Before Script"
                pageType={PageType.CallCenterBeforeScript}
                url={`https://app.powerbi.com/groups/6bf3a801-9501-4269-99eb-56a65ebc4a19/reports/c36006de-7d4e-4b80-9dce-a7d305db96bf/ReportSection623b64746831c0065bc0?experience=power-bi`}
                id="c36006de-7d4e-4b80-9dce-a7d305db96bf"
                name="ReportSection623b64746831c0065bc0"
              />
            ) : (
              <Report
                removeBackArrow
                pageTitle="Call Center - Before"
                pageType={PageType.CallCenterBeforeSummary}
                url={`https://app.powerbi.com/groups/6bf3a801-9501-4269-99eb-56a65ebc4a19/reports/c36006de-7d4e-4b80-9dce-a7d305db96bf/ReportSectionda209890a7f0f9e42736?experience=power-bi`}
                id={"c36006de-7d4e-4b80-9dce-a7d305db96bf"}
                name={"ReportSectionda209890a7f0f9e42736"}
              />
            )
            // )
          }
        </Popup>
        <CallCenter
          generateSummary={generateSummary}
          visible={visible}
          setVisible={setVisible}
        />
        <Popup
          showPopup={showPopup}
          title="Call Center Report - After"
          onClose={() => {
            setShowPopup(false);
            navigate(`/customer-call-transcript-analysis`);
          }}
          className={styles.popup}
        >
          <Tooltip
            tooltipClassName={styles.tooltip}
            position="bottom"
            anchorElement="target"
            key={showAfterSummary.toString()}
          >
            <div>
              <img
                onClick={() => {
                  if (showAfterSummary) {
                    setShowAfterSummary(false);
                    setShowPopup(false);

                    navigate(`/customer-sentiment-analysis-after`);
                  } else {
                    navigate(`/call-center-after-summary`);
                  }
                }}
                title={
                  showAfterSummary
                    ? "Landing Page"
                    : "Call Center Report - Summary"
                }
                src={
                  showAfterSummary
                    ? `${BlobBaseUrl}Arrow-D.png`
                    : `${BlobBaseUrl}Arrow-C.png`
                }
                alt="Arrow"
                className={styles.arrowA}
                style={{ right: 30 }}
              />
            </div>
          </Tooltip>
          {showAfterSummary ? (
            <Report
              removeBackArrow
              url={`https://app.powerbi.com/groups/6bf3a801-9501-4269-99eb-56a65ebc4a19/reports/e7f35f91-bd75-4723-9d11-997994e626d2/ReportSectionda209890a7f0f9e42736?experience=power-bi`}
              id={"e7f35f91-bd75-4723-9d11-997994e626d2"}
              name={"ReportSectionda209890a7f0f9e42736"}
              pageTitle="Call Center - After"
              pageType={PageType.CallCenterAfterSummary}
            />
          ) : (
            <Report
              removeBackArrow
              url={`https://app.powerbi.com/groups/6bf3a801-9501-4269-99eb-56a65ebc4a19/reports/e7f35f91-bd75-4723-9d11-997994e626d2/ReportSection623b64746831c0065bc0?experience=power-bi`}
              id={"e7f35f91-bd75-4723-9d11-997994e626d2"}
              name={"ReportSection623b64746831c0065bc0"}
              pageTitle="Call Center - After"
              pageType={PageType.CallCenterAfterScript}
            />
          )}
        </Popup>
      </div>
    </div>
  );
};
