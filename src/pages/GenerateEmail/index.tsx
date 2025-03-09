import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useAppDispatch, useAppSelector } from "hooks";
import { EmailPopupWrapper, Popup } from "components";
import { PageType } from "types";
import { setCustomerDetails, setEmail } from "store";
import axios from "axios";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";
import {
  Desktop24Filled,
  Desktop24Regular,
  Phone24Filled,
  Phone24Regular,
  Star20Filled,
  Star20Regular,
  Tablet24Filled,
  Tablet24Regular,
  ThumbDislike24Filled,
  ThumbLike24Filled,
} from "@fluentui/react-icons";
import { ArchitectureWithTags } from "pages/ArchitectureWithTags";
import { ArchitectureIcon } from "assets/ArchitectureIcon";

const IconComponent = ({
  deviceType,
  activeDevice,
  FilledIcon,
  RegularIcon,
}: any) => (
  <div
    className={`${styles.icon} ${
      activeDevice === deviceType && styles.activeIcon
    }`}
  >
    {activeDevice === deviceType ? <FilledIcon /> : <RegularIcon />}
    {deviceType}
  </div>
);

const PreferredLoginDeviceIcons = ({ customerDetails }: any) => (
  <>
    <IconComponent
      deviceType="Internet"
      activeDevice={customerDetails?.PreferredLoginDevice}
      FilledIcon={Desktop24Filled}
      RegularIcon={Desktop24Regular}
    />
    <IconComponent
      deviceType="Cable"
      activeDevice={customerDetails?.PreferredLoginDevice}
      FilledIcon={Tablet24Filled}
      RegularIcon={Tablet24Regular}
    />
    <IconComponent
      deviceType="Data Card"
      activeDevice={customerDetails?.PreferredLoginDevice}
      FilledIcon={Phone24Filled}
      RegularIcon={Phone24Regular}
    />
  </>
);
const CUSTOMER_LIST = [
  { id: 0, name: "Select Customer Id", disabled: true },
  {
    id: 50482,
    name: "50482",
  },
  {
    id: 50498,
    name: "50498",
  },
  {
    id: 50092,
    name: "50092",
  },
  {
    id: 50532,
    name: "50532",
  },
  {
    id: 50457,
    name: "50457",
  },
  {
    id: 50186,
    name: "50186",
  },
];

const { CUSTOMER_DETAILS_API, EMAIL_GENERATION_API } = window.config;

export const GenerateEmail: FC = () => {
  const { customerDetails, email } = useAppSelector((state) => state.config);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_event_user_prediction.png"
  );
  const [showArchPopup, setShowArchPopup] = useState(false);
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (customerDetails?.id && !email && !isCalled) {
      setIsCalled(true);
      getCustomerDetails(customerDetails?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerDetails, email, isCalled]);

  let popupTitle = " ";

  const getCustomerDetails = (customerId: number) => {
    axios
      .post(CUSTOMER_DETAILS_API, {
        CustomerID: customerId,
      })
      .then((res) => {
        // setCustomerDetails(res.data.Customer_Details);
        dispatch(
          setCustomerDetails({
            ...customerDetails,
            ...res.data.Customer_Details,
          })
        );
        return {
          ...customerDetails,
          ...res.data.Customer_Details,
        };
      })
      .then((res) => onGenerateEmail(res));
  };

  const onGenerateEmail = (customerDetails: any) => {
    setLoading(true);
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

        if (res.data.prediction.toLowerCase().includes("not")) {
          setImageUrl(
            "https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_event_user_not_churn_prediction.png"
          );
        } else {
          setImageUrl(
            "https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_event_user_churn_prediction.png"
          );
        }
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.detailsContainer}>
          <div>
            <div className={styles.details}>
              <h4>Customer Details</h4>
              <div className={styles.dcw}>
                <div className={styles.customerCard}>
                  <div>
                    <img
                      src={`https://dreamdemoassets.blob.core.windows.net/mtc/${customerDetails?.img}_avatar.png`}
                      alt={customerDetails?.name}
                    />
                    <div>
                      <span>
                        {customerDetails?.name?.split(" ")[1]}{" "}
                        {customerDetails?.name?.split(" ")[2]}
                      </span>
                      <span>ID: {customerDetails?.id}</span>
                    </div>
                  </div>

                  <div className={styles.verticalLine}></div>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <>
                        {i < customerDetails?.rating ? (
                          <Star20Filled className={styles.filledStar} />
                        ) : (
                          <Star20Regular className={styles.regularStar} />
                        )}
                      </>
                    ))}
                  </div>
                </div>
                <hr className={styles.horizontalLine} />
                <div className={styles.preferredDeviceContainer}>
                  {/* <span>Preferred Login Device</span> */}
                  <span>Service Used</span>
                  <PreferredLoginDeviceIcons
                    customerDetails={customerDetails}
                  />
                </div>
                <hr className={styles.horizontalLine} />
                <div className={styles.detailsWrapper}>
                  <table>
                    <tr>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Satisfaction\nLevel"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.SatisfactionScore?.toLowerCase().includes(
                              "unsatisfied"
                            ) ? (
                              <>
                                <ThumbDislike24Filled
                                  className={styles.unsatisfiedIcon}
                                />
                                {customerDetails?.SatisfactionScore}
                              </>
                            ) : (
                              <>
                                <ThumbLike24Filled
                                  className={styles.satisfiedIcon}
                                />
                                {customerDetails?.SatisfactionScore}
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Customer\nTenure (Months)"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.Tenure ?? 1}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Complaints\nCount"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.Complain ?? 0}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Data\nPlan Upgrade"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.OrderAmountHikeFromlastYear ?? 0}%
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <div className={styles.detailsCard}>
                          <span>{"Recharge\nCount"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.CouponUsed ?? 1}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Call\nDrop Rate"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.OrderCount ?? 1}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Last\nInteraction (Days)"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.DaySinceLastOrder ?? 0}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={styles.detailsCard}>
                          <span>{"Total\nMonthly Bill"}</span>
                          <div className={styles.dCard}>
                            {customerDetails?.TotalAmount ?? 100}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className={styles.churnStatus}>
                {email &&
                  (imageUrl.includes("not") ? (
                    <>
                      <img
                        src="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_predicted_to_not_churn.png"
                        alt="pre"
                      />
                      <span className={styles.not}>Predicted to Not Churn</span>
                    </>
                  ) : (
                    <>
                      <img
                        src="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_predicted_to_churn.png"
                        alt="pre"
                      />
                      <span className={styles.yes}>Predicted to Churn</span>
                    </>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.emailContainer}>
            <h4>Email Campaign</h4>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Loader
                  type="pulsing"
                  style={{ color: "var(--kendo-color-primary)" }}
                />
              </div>
            ) : (
              <>
                <div className={styles.popupContainer}>
                  <EmailPopupWrapper email={email} isFull />
                </div>
              </>
            )}
            {/* <div className={styles.footerContainer}>
            <div>
              <img
                src={imageUrl}
                alt="user_avatar"
                style={{ marginRight: 8 }}
              />
              {email == null
                ? "Prediction Status"
                : imageUrl.includes("not")
                ? "Predicted to Not Churn"
                : "Predicted to Churn"}
            </div>
            <div
              className={`${styles.iconsContainer} ${
                !email && styles.disabledContainer
              }`}
            >
              <ThumbLike24Regular
                className={`${styles.icon} ${
                  like === true && styles.selectedIcon
                }`}
                onClick={() => setLike(true)}
              />
              <ThumbDislike24Regular
                className={`${styles.icon} ${
                  like === false && styles.selectedIcon
                }`}
                onClick={() => setLike(false)}
              />
            </div>
          </div> */}
          </div>
        </div>
        <div className={styles.disclaimer}>
          AI generated content may be incomplete or factually incorrect.
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
            // videoURL={
            //   "https://dreamdemoassets.blob.core.windows.net/daidemo/videos/AI_Studio_Scenario_3_v2.mp4"
            // }
            imageUrl="https://dreamdemoassets.blob.core.windows.net/openai/pendingCustomerChurn.png"
            tags={[
              {
                tagName: "Load/ingest Data",
                tagDescription: "Load/ingest Data",
              },
              {
                tagName: "Pre-processed data",
                tagDescription: "Pre-processed data",
              },
              {
                tagName: "Training Data",
                tagDescription: "Training Data",
              },
              {
                tagName: "Register best model",
                tagDescription: "Register best model",
              },
              {
                tagName: "Model Deployment",
                tagDescription: "Model Deployment",
              },
              {
                tagName: "Use AML assets in prompt flow",
                tagDescription: "Use AML assets in prompt flow",
              },
              {
                tagName: "Interface Data",
                tagDescription: "Interface Data",
              },
              {
                tagName: "Save predictions and campaign information to OneLake",
                tagDescription:
                  "Save predictions and campaign information to OneLake",
              },
            ]}
          />
        </Popup>
      </div>
    </div>
  );
};
