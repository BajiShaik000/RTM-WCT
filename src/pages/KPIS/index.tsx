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
// import KPI from "./before_chatbot.jpg";
import Source from './dashboard_after.png'


export const KPIS: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img src={Source} alt="dashboard-after" />
      </div>
    </div>
  );
};
