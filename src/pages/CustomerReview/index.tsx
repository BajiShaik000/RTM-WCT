import { useState, useEffect, FC } from "react";

import styles from "./styles.module.scss";
import {
  setAvatar,
  setCustomerDetails,
  setCustomerId,
  setEmail,
  setName,
} from "store";
import { useAppDispatch } from "hooks";
import { Card, CardBody, CardHeader } from "@progress/kendo-react-layout";
import { Star20Filled, Star20Regular } from "@fluentui/react-icons";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  review: string;
  rating: number;
  img: string;
  churnStatus: string;
  avatarName: string;
};

export const customers: Customer[] = [
  {
    id: 50092,
    name: "50092 Liam Williams",
    avatarName: "Liam Williams",
    review:
      "Unfortunately, I was signed up for the wrong mobile plan, which didn’t match what I requested. It was frustrating as I was on vacation in Santorini, Greece without internet access. This left me dissatisfied with the overall experience.",
    rating: 1,
    img: "asian_male",
    churnStatus: "Predicted to Churn",
  },
  {
    id: 50482,
    name: "50482 Sarah Ali",
    avatarName: "Sarah Ali",
    review:
      "The customer service agent was helpful and quickly assisted in switching me to the correct data plan after I was mistakenly enrolled in the wrong one.",
    rating: 5,
    img: "asian_female",
    churnStatus: "Predicted to Not Churn",
  },
  {
    id: 50498,
    name: "50498 James Johnson",
    avatarName: "James Johnson",
    review:
      "I received excellent customer support from Contoso when I needed to change my mobile plan. They made the process hassle-free and convenient.",
    rating: 4,
    img: "african_male",
    churnStatus: "Predicted to Not Churn",
  },

  {
    id: 50532,
    name: "50532 Amanda Wilson",
    avatarName: "Amanda Wilson",
    review:
      "The service did not meet my expectations. I encountered multiple network issues, and customer support was unhelpful. My initial plan activation was incorrect, causing major inconvenience.",
    rating: 2,
    img: "african_female",
    churnStatus: "Predicted to Churn",
  },
  {
    id: 50457,
    name: "50457 Amber Jones",
    avatarName: "Amber Jones",
    review:
      "Customer service was attentive and promptly corrected my billing issue, ensuring I was charged the correct amount for my data plan.",
    rating: 3,
    img: "american_female",
    churnStatus: "Predicted to Not Churn",
  },
  {
    id: 50186,
    name: "50186 Jeffrey Andrews",
    avatarName: "Jeffrey Andrews",
    review:
      "Customer service fell short—while my issue was eventually resolved, the initial frustration of being placed on the wrong plan and dealing with long wait times was disappointing.",
    rating: 2,
    img: "american_male",
    churnStatus: "Predicted to Churn",
  },
];
interface Props {
  liveHosted?: string;
}
export const CustomerReview: FC<Props> = ({ liveHosted }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    customers[0]
  );
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCardClick = (customer: Customer) => {
    const selectedId = customer.id;
    const cust = customers.find((c) => c.id === selectedId);
    setSelectedCustomer(customer || null);
    dispatch(setEmail(null));
    dispatch(setCustomerDetails(customer));
    dispatch(setAvatar(customer.img));
    dispatch(setName(customer.avatarName));
    dispatch(setCustomerId(customer.id));
  };

  useEffect(() => {
    if (selectedCustomer) {
      dispatch(setAvatar(selectedCustomer.img));
      dispatch(setName(selectedCustomer.avatarName));
      dispatch(setCustomerId(selectedCustomer.id));
      dispatch(setCustomerDetails(selectedCustomer));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.wrapper}>
          <h2 className={styles.header}>Customer Reviews</h2>
          <div className={styles.mainContainer}>
            {customers.map((customer) => (
              <Card
                className={`${styles.card} ${
                  selectedCustomer?.id === customer.id ? styles.activeCard : ""
                }`}
                key={customer.id}
                onClick={() => handleCardClick(customer)}
              >
                <CardHeader className={styles.cardHeader}>
                  <img
                    src={`https://dreamdemoassets.blob.core.windows.net/mtc/${customer.img}_avatar.png`}
                    alt={customer.name}
                  />
                  <div>
                    <h2>
                      {customer.name.split(" ")[1]}{" "}
                      {customer.name.split(" ")[2]}
                    </h2>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <>
                          {i < customer.rating ? (
                            <Star20Filled className={styles.filledStar} />
                          ) : (
                            <Star20Regular className={styles.regularStar} />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardBody className={styles.cardBody}>
                  {customer.review}
                </CardBody>
              </Card>
            ))}
          </div>

          <Button
            disabled={!selectedCustomer?.id}
            themeColor="primary"
            className={styles.predictBtn}
            onClick={() => navigate("/generate-email-campaign")}
          >
            Predict Customer Churn and Generate Email
          </Button>
        </div>
        {/* {
          <div>
            <button
              className={`${styles.Button2New}`}
              onClick={(e) => {
                window.open(
                  "https://microsoft.sharepoint.com/teams/DataandAIReadinessCoolTeam/Shared Documents/General/_____Data & AI Big Demo/../../../../../:u:/t/Demochamp868/EWt1fAEh9gZMuS8LT55cUJEB4fJP6fjM8dooheoHNcktZw?e=pKVQHV",
                  "_blank"
                );
              }}
            >
              Live Hosted
            </button>
          </div>
        } */}
      </div>
    </div>
  );
};
