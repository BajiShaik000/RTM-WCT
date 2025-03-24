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
import ImageOne from "./dashboard1.png";
import ImageTwo from "./dashboard2.png";
import Image from "./dashboard.png"

export const Dashboards: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img src={Image} alt="dashboard2" />
      </div>
    </div>
  );
};
