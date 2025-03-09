import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { TextArea } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import axios from "axios";
import {
  setChurnResult,
  setCustomerDetails,
  setCustomerReview,
  setEmail,
} from "store/slice/configSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks";
import { CustomerDetailsForm, Popup, Video } from "components";
import { PageType } from "types";

const { BlobBaseUrl } = window.config;

const CUSTOMER_LIST = [
  { id: 0, name: "Select Customer Id", disabled: true },
  {
    id: 40001,
    name: "40001",
    review:
      "I am extremely happy with this product. It has exceeded all of my expectations and I couldn't be more satisfied. The customer service has been exceptional and the quality of the product is outstanding. I highly recommend it to others.",
  },
  {
    id: 40002,
    name: "40002",
    review:
      "Great product! It has met all my expectations. The ordering process was smooth, and the delivery was prompt. Highly recommended.",
  },
  {
    id: 40003,
    name: "40003",
    review:
      "I'm quite pleased with my purchase. The product quality is excellent, and the delivery was faster than I expected. Will definitely buy again!",
  },
  {
    id: 40010,
    name: "40010",
    review:
      "I am extremely disappointed with this product. It has not lived up to my expectations and has caused more problems than it has solved. The customer service has been unhelpful and unresponsive, leaving me feeling frustrated and unsatisfied. I do not recommend this product to others.",
  },
  {
    id: 40032,
    name: "40032",
    review:
      "The customer expressed their mixed feelings about the product. They highlighted that the customer service was good and responsive, but they have experienced occasional technical issues. They trust the brand for its quality and reliability but may consider alternatives due to these setbacks.",
  },
];

const CUSTOMER_DETAILS_API =
  "https://func-fabric-aistudio-dev-001.azurewebsites.net/api/customerdetails";
const CUSTOMER_CHURN_PROPENSITY_API =
  "https://func-fabric-aistudio-dev-001.azurewebsites.net/api/customerchurn";

export const ChurnPropensity: FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<{
    id: number;
    name: string;
  } | null>(CUSTOMER_LIST[0]);
  const { customerReview, customerDetails, churnResult } = useAppSelector(
    (state) => state.config
  );
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(setCustomerDetails(null));
    dispatch(setEmail(null));
    dispatch(setCustomerReview(null));
    dispatch(setChurnResult(0));
  }, []);

  const dispatch = useAppDispatch();

  const onCustomerChange = (e: DropDownListChangeEvent) => {
    setSelectedCustomer(e.value);
    dispatch(setCustomerDetails(null));
    dispatch(setCustomerReview(e.value?.review));
    dispatch(setChurnResult(0));
    dispatch(setEmail(null));
    if (e.value?.id !== 0) getCustomerDetails(e.value.id);
  };

  const getCustomerDetails = (customerId: number) => {
    axios
      .post(CUSTOMER_DETAILS_API, {
        CustomerID: customerId,
      })
      .then((res) => {
        // setCustomerDetails(res.data.Customer_Details);
        dispatch(setCustomerDetails(res.data.Customer_Details));
      });
  };

  const onPropensityClick = () => {
    axios
      .post(CUSTOMER_CHURN_PROPENSITY_API, {
        customer_review: customerReview,
      })
      .then((res) => {
        dispatch(
          setChurnResult(
            parseInt(res.data?.ChurnScore.replace("%", ""), 10) ?? 0
          )
        );
      });
  };

  return (
    <div className={styles.container}>
      <DropDownList
        style={{
          alignSelf: "flex-start",
          width: "300px",
        }}
        data={CUSTOMER_LIST}
        textField="name"
        dataItemKey="id"
        value={selectedCustomer}
        onChange={onCustomerChange}
      />

      <div className={styles.detailsContainer}>
        <div>
          <p>Customer Details:</p>
          <div className={styles.details}>
            {customerDetails?.CustomerName && (
              <CustomerDetailsForm showChurnResult={false} />
            )}
          </div>
        </div>
        <div>
          <p style={{ alignSelf: "flex-start" }}>Add Customer Review:</p>
          <TextArea
            placeholder="Add customer review here..."
            disabled={selectedCustomer?.id === 0}
            value={customerReview}
            onChange={(e) => {
              dispatch(setCustomerReview(e.value));
              setEmail(null);
            }}
          />
          <Button
            disabled={!customerReview}
            className={styles.predictBtn}
            onClick={() => onPropensityClick()}
          >
            Predict Customer Churn Propensity
          </Button>
          <div style={{ position: "relative" }}>
            <img
              src="https://dreamdemoassets.blob.core.windows.net/nrf/fab_sce_3_range_bar.png"
              alt="range"
            />
            <img
              src="https://dreamdemoassets.blob.core.windows.net/nrf/fab_sce_3_pointer.png"
              alt="pointer"
              className={styles.pointer}
              style={{
                left: `calc(${churnResult}% - 1.25%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -45,
                fontWeight: "bold",
                left: `calc(${churnResult}% - 0.75%)`,
              }}
            >
              {`${churnResult}%`}
            </div>
          </div>
        </div>
      </div>
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
        title="Enrich Customer Data"
      >
        <Video
          autoPlay={false}
          pageTitle="Enrich Customer Data"
          pageType={PageType.AnalyticsInMIDPArchitecture}
          src="https://mediasvcprodhealthcare-usw22.streaming.media.azure.net/319195b6-9da4-490e-b86b-7f1436dce2a0/AI_STUDIO_01_Enriching_Customer_.ism/manifest"
        />
      </Popup>
    </div>
  );
};
