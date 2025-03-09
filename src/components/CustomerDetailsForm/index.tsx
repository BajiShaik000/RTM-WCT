import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Checkbox, TextBox } from "@progress/kendo-react-inputs";
import { RangeSlider } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { FC } from "react";
import { setCustomerDetails } from "store";

const LOGIN_DEVICES: string[] = ["Mobile Phone", "Computer"];

const PAYMENT_MODES: string[] = [
  "Debit Card",
  "Credit Card",
  "E wallet",
  "COD",
  "UPI",
];
const SATISFACTION_SCORES: string[] = [
  "Moderately Satisfied",
  "Not Satisfied",
  "Highly Satisfied",
  "Satisfied",
  "Unsatisfied",
];

interface Props {
  showChurnResult?: boolean;
  isDisabled?: boolean;
}

export const CustomerDetailsForm: FC<Props> = ({
  showChurnResult,
  isDisabled = false,
}) => {
  const { customerDetails, churnResult } = useAppSelector(
    (state) => state.config
  );
  const dispatch = useAppDispatch();

  const onInputChange = (name: string, value: any) => {
    dispatch(setCustomerDetails({ ...customerDetails, [name]: value }));
  };

  return (
    <div
      style={{
        overflowY: "auto",
        height: "calc(100% - 82px)",
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <label>Customer Name</label>
        <TextBox
          disabled={isDisabled}
          value={customerDetails?.CustomerName}
          onChange={(e) => onInputChange("CustomerName", e.value)}
        ></TextBox>
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>Preferred Login Device:</label>
        <DropDownList
          disabled={isDisabled}
          data={LOGIN_DEVICES}
          value={customerDetails?.PreferredLoginDevice}
          onChange={(e) =>
            onInputChange("PreferredLoginDevice", e.target.value)
          }
        />
      </div>
      {/* <div style={{ marginBottom: "8px" }}>
        <label>Preferred Payment Mode:</label>
        <DropDownList
          disabled={isDisabled}
          data={PAYMENT_MODES}
          value={customerDetails?.PreferredPaymentMode}
          onChange={(e) =>
            onInputChange("PreferredPaymentMode", e.target.value)
          }
        />
      </div> */}
      <div style={{ marginBottom: "8px" }}>
        <label>Satisfaction Score:</label>
        <DropDownList
          disabled={isDisabled}
          data={SATISFACTION_SCORES}
          value={customerDetails?.SatisfactionScore}
          onChange={(e) => onInputChange("SatisfactionScore", e.target.value)}
        />
      </div>
      {/* <div style={{ marginBottom: "8px" }}>
        <label>Online Delivery:</label>
        <Checkbox
          style={{ marginLeft: 12 }}
          disabled={isDisabled}
          type="checkbox"
          checked={customerDetails?.OnlineDelivery}
          onChange={(e) => onInputChange("OnlineDelivery", e.value)}
        />
      </div> */}

      {/* <RangeSlider
        isDisabled={isDisabled}
        max={105}
        min={12}
        label="Age"
        onChange={(value: number) => onInputChange("Age", value)}
        value={customerDetails?.Age}
      /> */}
      <RangeSlider
        isDisabled={isDisabled}
        max={120}
        min={1}
        label="Tenure (months)"
        onChange={(value: number) => onInputChange("Tenure", value)}
        value={customerDetails?.Tenure ?? 1}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={1}
        min={0}
        label="Complaints Count"
        onChange={(value: number) => onInputChange("Complain", value)}
        value={customerDetails?.Complain ?? 0}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={100}
        min={0}
        label="Order Amount Hike From Last Year (%)"
        onChange={(value: number) =>
          onInputChange("OrderAmountHikeFromlastYear", value)
        }
        value={customerDetails?.OrderAmountHikeFromlastYear ?? 0}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={10}
        min={0}
        label="Coupons Used"
        onChange={(value: number) => onInputChange("CouponUsed", value)}
        value={customerDetails?.CouponUsed ?? 0}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={1000}
        min={1}
        label="Order Count"
        onChange={(value: number) => onInputChange("OrderCount", value)}
        value={customerDetails?.OrderCount ?? 1}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={500}
        min={0}
        label="Days Since Last Order"
        onChange={(value: number) => onInputChange("DaySinceLastOrder", value)}
        value={customerDetails?.DaySinceLastOrder ?? 0}
      />
      <RangeSlider
        isDisabled={isDisabled}
        max={100000}
        min={100}
        label="Total Amount Spent ($)"
        onChange={(value: number) => onInputChange("TotalAmount", value)}
        value={customerDetails?.TotalAmount ?? 100}
      />
      {showChurnResult && churnResult ? (
        <RangeSlider
          isDisabled={isDisabled}
          max={100}
          min={1}
          label="Churn Propensity (%)"
          onChange={(value: number) => onInputChange("ChurnResult", value)}
          value={churnResult}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
