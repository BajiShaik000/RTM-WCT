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

export const DemoVideo: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <video width="90%" height="90%" controls>
          <source
            src={`${process.env.PUBLIC_URL}/wct-RPM.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
