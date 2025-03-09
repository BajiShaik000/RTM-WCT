import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { FC, useEffect, useState } from "react";

import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { PageType } from "types";

import styles from "./styles.module.scss";

interface Data {
  title: string;
  type?: "image" | "video";
  src: string;
}

interface Props {
  pageType: PageType;
  pageTitle: string;
  tabData: Data[];
  blobUrl?: string;
  activeTab?: number;
}

const { BlobBaseUrl } = window.config;

export const ArchitectureOverview: FC<Props> = ({
  tabData,
  pageTitle,
  pageType,
  activeTab = 0,
  blobUrl = BlobBaseUrl,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelected(activeTab);
  }, [activeTab, pageType]);

  const [selected, setSelected] = useState(activeTab);

   const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
   };

  return (
    <div className={styles.container}>
      <TabStrip
        className={styles.tabStrip}
        selected={selected}
         onSelect={handleSelect}
      >
        {tabData.map(({ src, title }) => (
          <TabStripTab title={title}>
            <img src={`${blobUrl}${src}`} alt={title} />
          </TabStripTab>
        ))}
      </TabStrip>
    </div>
  );
};
