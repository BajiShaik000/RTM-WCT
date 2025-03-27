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
import Thankyou from "./Thankyou.jpg"

export const ThankYou: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <img src={Thankyou} alt="thank-you" />
      </div>
    </div>
  );
};
