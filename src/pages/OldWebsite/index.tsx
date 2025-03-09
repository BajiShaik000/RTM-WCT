import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { IFrame, Report } from "components";
import { PageType } from "types";
import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
} from "@progress/kendo-react-layout";
import { ShoppingCopilot } from "pages/ShoppingCopilot";
import { ShoppingCopilotMTC } from "pages/ShoppingCopilotMTC";
import { getPowerBIData } from "utilities";
import { TopReport } from "components/TopReport";

const {
  OldWebsiteUrl,
  BlackFridayQ42022ReportID,
  BlackFridayQ42022ReportSectionName,
} = window.config;

export const OldWebsite: FC = () => {
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    { collapsible: false, scrollable: false },
    { size: "25%", collapsible: true, scrollable: false, collapsed: false },
  ]);

  const onChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  const powerBIData = getPowerBIData("/old-website");

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.reportContainer}>
          <TopReport
            // apiUrl={data.componentParameters.api}
            id={"6fe52bb1-3b77-4baf-a441-eb09695c9b0a"}
            pageTitle={"Old Website"}
            pageType={PageType.OldWebsite}
            name={"ReportSection71c438a7e46c234ae42b"}
            url={
              "https://app.powerbi.com/groups/aa5b399b-2191-4760-b9e6-751e8729eed7/reports/6fe52bb1-3b77-4baf-a441-eb09695c9b0a/ReportSection71c438a7e46c234ae42b?experience=power-bi"
            }
            background={"white"}
          />
        </div>
        <Splitter style={{ height: "calc(100% - 200px)", background: "unset", border: "none" }} panes={panes} onChange={onChange}>
          <ShoppingCopilotMTC></ShoppingCopilotMTC>
        </Splitter>
      </div>
    </div>
  );
};
