import styles from "./styles.module.scss";
import { ChevronRight28Filled } from "@fluentui/react-icons";
import { Button } from "@progress/kendo-react-buttons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { setAvatar, setCustomerId, setName } from "store";
import { useEffect, useState } from "react";
import { customers } from "pages/CustomerReview";

export const AVATARS = [
  {
    name: "Asian Male",
    id: "asian_male",
    avatarName: "Liam Williams",
    customerId: 50092,
    churnStatus: "Predicted to Churn",
  },
  {
    name: "Asian Female",
    id: "asian_female",
    avatarName: "Sarah Ali",
    customerId: 50482,
    churnStatus: "Predicted to Not Churn",
  },
  {
    name: "African Male",
    id: "african_male",
    avatarName: "James Johnson",
    customerId: 50498,
    churnStatus: "Predicted to Not Churn",
  },
  {
    name: "African Female",
    id: "african_female",
    avatarName: "Amanda Wilson",
    customerId: 50532,
    churnStatus: "Predicted to Churn",
  },
  {
    name: "American Female",
    id: "american_female",
    avatarName: "Amber Jones",
    customerId: 50457,
    churnStatus: "Predicted to Not Churn",
  },

  {
    name: "American Male",
    id: "american_male",
    avatarName: "Jeffrey Andrews",
    customerId: 50186,
    churnStatus: "Predicted to Churn",
  },
];

export const SetupWizardPersona = () => {
  const dispatch = useAppDispatch();
  const { avatar } = useAppSelector((state) => state.config);
  const [avatrName, setAvatarName] = useState<string>();
  const navigate = useNavigate();
  const onAvatarSelect = (
    text: string,
    avatarName: string,
    customerId: number
  ) => {
    dispatch(setAvatar(text));
    dispatch(setName(avatarName));
    dispatch(setCustomerId(customerId));
    setAvatarName(avatarName);

    // setCustomAvatarText(avatarName);
  };
  const { customerDetails } = useAppSelector((state) => state.config);

  const [buttonGlow, setButtonGlow] = useState({
    isEdit: true,
    isProceed: false,
  });

  useEffect(() => {
    if (customerDetails) {
      const selectedAvatar = AVATARS.find(
        (avatar) => avatar.customerId === customerDetails.CustomerID
      );
      if (selectedAvatar) {
        setAvatarName(selectedAvatar.avatarName);
        onAvatarSelect(
          selectedAvatar.id,
          selectedAvatar.avatarName,
          selectedAvatar.customerId
        );
      }
    }
  }, [customerDetails]);

  useEffect(() => {
    const selectedAvatar = AVATARS.find(
      (avatar) => avatar.customerId === customers[0].id
    );
    if (selectedAvatar) {
      onAvatarSelect(
        selectedAvatar.id,
        selectedAvatar.avatarName,
        selectedAvatar.customerId
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.leftContainer}>
        <div className={styles.title}>
          Setup
          <br />
          <strong>Wizard</strong>
        </div>
      </div> */}
      <div className={styles.rightContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.header}>Select a Customer</div>
          <div className={styles.imageContainer}>
            <img
              src={`https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_selected_${avatar}_avatar.png`}
              alt="avatar"
            />
          </div>
          <span className={styles.avtarName}>{avatrName}</span>
          <div className={styles.imageList}>
            {AVATARS.map(({ name, id, avatarName, customerId }) => (
              <div>
                {" "}
                <div
                  key={id}
                  className={`${styles.img} ${
                    avatar === id ? styles.selectedAvatar : ""
                  }`}
                >
                  <img
                    // className={avatar === id ? styles.selectedAvatar : ""}
                    onClick={() => onAvatarSelect(id, avatarName, customerId)}
                    src={`https://dreamdemoassets.blob.core.windows.net/mtc/${id}_avatar.png`}
                    alt={name}
                  />
                </div>
                <span className={styles.imgTxt}>
                  {avatarName.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className={"buttonsContainer"}>
        <Button
          className={`primaryButton ${buttonGlow.isProceed && styles.glow}`}
          onClick={() => {
            // dispatch(setName(customAvatarText));
            navigate("/incoming-call");
          }}
        >
          Proceed <ChevronRight28Filled />
        </Button>
      </div> */}
    </div>
  );
};
