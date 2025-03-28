import { Delete24Regular } from "@fluentui/react-icons";
import ReactMarkdown from "react-markdown";
import {
  Chat,
  ChatMessageBoxProps,
  ChatMessageSendEvent,
  Message,
  User,
} from "@progress/kendo-react-conversational-ui";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import problemStatement from "./problem_statement.png"
// import dashboard_before from "./dashboard_before.png"

export const RTMDashboard: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {/* <h4>The goal is to help doctors watch chronic illnesses like diabetes or abnormal heart rate in real time from home, catch problems early, and make care easier for patients and providers.</h4> */}
        {/* <img src={dashboard_before} alt="architecture" /> */}
        <iframe title="AvgBloodPressureDetails" width="100%" height="100%" src="https://app.fabric.microsoft.com/reportEmbed?reportId=fd8869b0-e460-4fff-bc35-45baf0430c33&autoAuth=true&ctid=e6e6c779-4c40-45d8-9921-00f00a06d3a8" allowFullScreen></iframe>
      </div>
    </div>
  );
};
