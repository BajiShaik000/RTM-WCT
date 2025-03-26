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
        <iframe
          title="Rpm-KPIs-v2"
          width="95%"
          height="100%"
          src="https://app.powerbi.com/reportEmbed?reportId=54c6e977-0a9a-4bd6-9879-4db3f73569b2&autoAuth=true&ctid=e6e6c779-4c40-45d8-9921-00f00a06d3a8"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
