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

export const ThankYou: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 style={{ color: "#27388B", fontSize: "108px", marginBottom: "100px",fontWeight:"bold",letterSpacing:"5px" }}>
          Thank You
        </h1>
      </div>
    </div>
  );
};
