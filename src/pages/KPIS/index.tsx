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
import KPI from "./before_chatbot.jpg";

export const KPIS: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
      <iframe title="Rpm-KPIs-bfr-aftr-v1" width="95%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=6284bc3e-a279-4222-a969-08fa703e2d7e&autoAuth=true&ctid=e6e6c779-4c40-45d8-9921-00f00a06d3a8"  allowFullScreen></iframe>
      </div>
    </div>
  );
};
