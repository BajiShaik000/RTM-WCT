import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Report } from "components";
import { PageType } from "types";
import {
  Splitter,
  SplitterOnChangeEvent,
  SplitterPaneProps,
} from "@progress/kendo-react-layout";
import { ShoppingCopilot } from "pages/ShoppingCopilot";
import axios from "axios";
import { ShoppingCopilotMTC } from "pages/ShoppingCopilotMTC";
// import { NewWebsiteShoppingCopilot } from "pages/NewWebsiteShoppingCopilot";
import { TopReport } from "components/TopReport";

const {
  BlackFridayQ42023ReportID,
  BlackFridayQ42023ReportSectionName,
  December2023ReportID,
  December2023ReportSectionName,
  OrderAPI,
} = window.config;

interface Props {
  scaling?: boolean;
}

const SUGGESTED_ACTIONS = [
  {
    type: "reply",
    value:
      "I am going to Santorini Greece next week for a vacation and am looking for some turquoise blue dresses.",
  },
];

const SUGGESTED_ACTIONS_FOR_SCALING = [
  {
    type: "reply",
    value: "Show me some looks for my vacation",
  },
  {
    type: "reply",
    value: "Can you show me some Indian dresses for a wedding in Udaipur?",
  },
];

export const ReImaginedNewWebsite: FC<Props> = ({ scaling }) => {
  const [panes, setPanes] = useState<SplitterPaneProps[]>([
    { collapsible: false, scrollable: false },
    { size: "25%", collapsible: true, scrollable: false },
  ]);

  const onChange = (event: SplitterOnChangeEvent) => {
    setPanes(event.newState);
  };

  useEffect(() => {
    if (scaling) {
      axios.get(OrderAPI + "/ResetDemoData");
    }
  }, [scaling]);

  return (
    <div
      key={scaling ? PageType.NewWebsiteWithScaling : PageType.NewWebsite}
      className={styles.container}
    >
      <div className={styles.subContainer}>
        <div className={styles.reportContainer}>
          <TopReport
            // apiUrl={data.componentParameters.api}
            id={"6fe52bb1-3b77-4baf-a441-eb09695c9b0a"}
            pageTitle={"Old Website"}
            pageType={"Old Website"}
            name={"ReportSection867c91402ed962002067"}
            url={
              "https://app.powerbi.com/groups/aa5b399b-2191-4760-b9e6-751e8729eed7/reports/6fe52bb1-3b77-4baf-a441-eb09695c9b0a/ReportSection867c91402ed962002067?experience=power-bi"
            }
            background={"white"}
          />
        </div>
        <Splitter style={{ height: "calc(100% - 200px)", background: "unset", border: "none" }}  panes={panes} onChange={onChange}>
          <ShoppingCopilotMTC></ShoppingCopilotMTC>
        </Splitter>
      </div>
    </div>
  );
};
