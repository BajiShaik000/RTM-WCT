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

export const ProblemStatement: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h4>The goal is to help doctors watch chronic illnesses like diabetes or abnormal heart rate in real time from home, catch problems early, and make care easier for patients and providers.</h4>
        <img src={problemStatement} alt="architecture" />
      </div>
    </div>
  );
};
