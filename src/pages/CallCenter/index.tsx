import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.scss";
import { Popup, Video } from "components";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";
import { useAppDispatch, useNav } from "hooks";
import { setPageType, setPageTitle } from "store";
import { PageType } from "types";
import { TextArea } from "@progress/kendo-react-inputs";
import { SettingsContext } from "context";
import { useNavigate } from "react-router-dom";

const { BlobBaseUrl } = window.config;

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  generateSummary: () => void;
}

const {
  callCenterScript,
  callCenterAgentImage,
  callCenterCustomerImage,
  callCenterBackendImage,
  callCenterVideoURL,
} = window.config;

export const CallCenter: FC<Props> = ({ setVisible, visible }) => {
  const dispatch = useAppDispatch();
  const [isEnded, setIsEnded] = useState(false);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getSummary = () => {
    setIsLoading(true);

    let myHeaders = new Headers();
    myHeaders.append("api-key", "01fd4995e24c40e0803b59fa7dc20d51");
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      prompt: callCenterScript + "Create a summary of the conversation.",
      temperature: 0.9,
      max_tokens: 1200,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    return fetch(
      "https://healthcare2test.openai.azure.com/daidemo/deployments/clinical-notes/completions?api-version=2022-12-01",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSummary(result?.choices?.[0]?.text?.trim()))
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    dispatch(setPageType(PageType.CallCenter));
    dispatch(setPageTitle("Call Center"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Popup
        showPopup={visible}
        onClose={() => {
          setVisible(false);
          setIsEnded(false);
          setSummary("");
          navigate(`/call-center`);
        }}
        className={styles.popup}
        title="Customer Conversation"
      >
        {isEnded ? (
          <>
            <div className={styles.summaryContainer}>
              <div className={styles.avatar}>
                <h2>Agent</h2>
                <img
                  src={`${BlobBaseUrl}${callCenterAgentImage}`}
                  alt="agent"
                />
              </div>
              <div className={styles.summary}>
                <Button onClick={getSummary} className={styles.summaryBtn}>
                  Summarize Conversation
                </Button>
                {isLoading ? (
                  <div className={styles.loaderContainer}>
                    <Loader themeColor="light" />
                  </div>
                ) : (
                  summary && (
                    <div className={styles.conversationContainer}>
                      <h2
                        style={{
                          textAlign: "center",
                          marginTop: 10,
                          fontSize: "1.5rem",
                        }}
                      >
                        Powered by Azure OpenAI Services
                      </h2>
                      <TextArea
                        value={summary}
                        onChange={(e) => setSummary(e.value)}
                        autoSize={true}
                        className={styles.textArea}
                      />
                    </div>
                  )
                )}
              </div>
              <div className={styles.avatar}>
                <h2>Customer</h2>
                <img
                  src={`${BlobBaseUrl}${callCenterCustomerImage}`}
                  alt="customer"
                />
              </div>
              <div className={styles.avatar}>
                <h2>Backend</h2>
                <img
                  src={`${BlobBaseUrl}${callCenterBackendImage}`}
                  alt="customer"
                />
                {summary && (
                  <Button
                    onClick={() => {
                      setVisible(false);
                      setIsEnded(false);
                      setSummary("");
                      navigate(`/call-center`);
                    }}
                    className={styles.summaryBtn}
                  >
                    Send to Application
                  </Button>
                )}
              </div>
              <img
                style={{ position: "absolute", bottom: 40 }}
                src={`${BlobBaseUrl}feedback_bar.png`}
                alt="agent"
              />
            </div>
          </>
        ) : (
          <Video
            autoPlay={false}
            src={callCenterVideoURL}
            pageTitle={"Call Center"}
            pageType={PageType.CallCenterRalph}
            setIsEnded={setIsEnded}
          />
        )}
      </Popup>
    </>
  );
};
