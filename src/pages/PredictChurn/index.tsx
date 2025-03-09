import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@progress/kendo-react-buttons";
import axios from "axios";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks";
import { setEmail } from "store";
import { CustomerDetailsForm, Popup, Video } from "components";
import { Loader } from "@progress/kendo-react-indicators";
import { PageType } from "types";

const { BlobBaseUrl } = window.config;

const EMAIL_GENERATION_API =
  "https://func-fabric-aistudio-dev-001.azurewebsites.net/api/fabric_aistudio_dev_scenario3";

export const PredictChurn: FC = () => {
  const {
    churnResult: ChurnResult,
    customerDetails,
    customerReview,
    email,
  } = useAppSelector((state) => state.config);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useAppDispatch();
  const [imageUrl, setImageUrl] = useState(
    "https://dreamdemoassets.blob.core.windows.net/daidemo/customers.png"
  );
  const [loading, setLoading] = useState(false);

  const onGenerateEmail = () => {
    setLoading(true);
    axios
      .post(EMAIL_GENERATION_API, {
        Customer_info: [
          {
            ...customerDetails,
            CustomerReview: customerReview,
            ChurnScore: `${ChurnResult}%`,
          },
        ],
      })
      .then((res) => {
        dispatch(
          setEmail({
            ...res.data,
            email: res.data?.email?.replace(/\\n/g, "<br />"),
          })
        );

        if (res.data.prediction === "Not predicted to churn") {
          setImageUrl(
            "https://dreamdemoassets.blob.core.windows.net/daidemo/customers_non_churn.png"
          );
        } else {
          setImageUrl(
            "https://dreamdemoassets.blob.core.windows.net/daidemo/customers_churn.png"
          );
        }
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div>
          <p>Customer Details:</p>
          <div className={styles.details}>
            {customerDetails?.CustomerName && (
              <CustomerDetailsForm showChurnResult={true} isDisabled={true} />
            )}
          </div>
        </div>
        <div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Loader type="pulsing" style={{ color: "white" }} />
            </div>
          ) : (
            <>
              <img
                src={imageUrl}
                className={styles.img}
                alt="Churn Prediction"
                id="image"
              />
              {email?.prediction && (
                <div style={{ textAlign: "center", fontWeight: 600 }}>
                  {email?.prediction === "Not predicted to churn"
                    ? "Predicted to Not-Churn"
                    : "Predicted to Churn"}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Button className={styles.generateBtn} onClick={() => onGenerateEmail()}>
        Predict Customer Churn Status
      </Button>
      <div onClick={() => setShowPopup(true)}>
        <img
          src={`${BlobBaseUrl}Arrow-A.png`}
          alt="Arrow-A"
          className={styles.arrowA}
        />
      </div>
      <Popup
        showPopup={showPopup}
        onClose={() => setShowPopup(false)}
        title="Predict Churn"
      >
        <Video
          autoPlay={false}
          pageTitle="Predict Churn"
          pageType={PageType.AnalyticsInMIDPArchitecture}
          src="https://mediasvcprodhealthcare-usw22.streaming.media.azure.net/a9564472-5820-408c-aa7c-bce2aeac5445/AI_STUDIO_02_Predict_Churn.ism/manifest"
        />
      </Popup>
    </div>
  );
};
