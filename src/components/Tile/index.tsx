import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  RetailBanking,
  CapitalMarket,
  Insurance,
  EndToEnd,
  FinancialInt,
  Sustainablility,
  Unify,
} from "assets";
import { useDispatch } from "react-redux";
import { useAppSelector } from "hooks";
import { UnifyLogo } from "assets/UnifyLogo";
import { Invoation } from "assets/Invoation";
import { ModernizeApps } from "assets/ModernizeAiApps";
import { DataAndSecurity } from "assets/DataAndSecurity";
import { MicrosoftFabric } from "assets/MicrosoftFabric";
import { MicroSoftFabricLogo } from "assets/MicroSoftFabricLogo";
import { setDemoMenus } from "store";
import { DataEngg } from "assets/DataEngg";
import { DataFactory } from "assets/DataFactory";
import { DataScience } from "assets/DataScience";
import { DataGoverance } from "assets/DataGoveranace";
import { MIrroredAzureDatabricks } from "assets/MIrroredAzureDatabricks";
import { DataActivator } from "assets/DataActivator";
import { DatabaseLogo } from "assets/DatabaseLogo";
import { RealTImeIntelligence } from "assets/RealTImeIntelligence";
import { DataWareHouse } from "assets/DataWareHouse";
import { CopilotForPowerBI } from "assets/CopilotForPowerBI";
import { ContactCenterAssistant } from "assets/ContactCenterAssistant";
import { CustomerChurn } from "assets/CustomerChurn";

type TileProps = {
  title: string;
  type: string;
  isActive: boolean;
  isDisabled: boolean;
  //onClick: () => void;
  text: string;
  ref?: any;
  level?: number;
  isSolutionPlay?: boolean;
};
export default function Tile({
  title,
  isActive,
  isDisabled,
  type,
  text,
  isSolutionPlay,
  level,
}: TileProps) {
  const dispatch = useDispatch();
  const { demoMenus, ActiveTileGlobally, previousTileGlobally, switchOn } =
    useAppSelector((state: any) => state.config);
  // const handleClick = () => {
  //   // alert(type);
  //   onClick();
  //   if (type == "2") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus2));

  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else if (type == "3") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus1));
  //     //dispatch(setTooltips(window.config.demoMenus1));
  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else if (type == "4") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus3));

  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else if (type == "5") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus4));

  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else if (type == "6") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus5));

  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else if (type == "7") {
  //     // console.log(demoMenus);
  //     dispatch(setDemoMenus(window.config.demoMenus6));

  //     // console.log(demoMenus);
  //     window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  //   } else {
  //     dispatch(setDemoMenus(window.config.demoMenus));
  //   }
  // };

  const handleClick = () => {
    //onClick();
    switch (type) {
      case "2":
        dispatch(setDemoMenus(window.config.Microsoft_Purview));
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
      case "3":
        dispatch(
          setDemoMenus(window.config.Microsoft_Fabric_Azure_Databricks_Menu)
        );
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
      case "4":
        dispatch(setDemoMenus(window.config.Apps_Azure_Cosmos_DB));
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
      case "5":
        dispatch(setDemoMenus(window.config.AI_Design_Wins));
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
      case "6":
        dispatch(setDemoMenus(window.config.Microsoft_Fabric));
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
      case "11":
        text = "Apps + Azure Cosmos DB";
        if (text === "Apps + Azure Cosmos DB") {
          //isDisabled = true;
        }
        break;
      default:
        dispatch(setDemoMenus(window.config.demoMenus));
        window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
        break;
    }
    window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
  };

  let IconComponent;

  // const storedTileGlobally = localStorage.getItem("ActiveTileGlobally");

  if (previousTileGlobally === "Innovate with Azure AI Platform") {
    if (
      text === "Microsoft Fabric + Azure Databricks" ||
      text === "Apps + Azure Cosmos DB" ||
      text === "Microsoft Purview" ||
      text === "Microsoft Fabric"
    ) {
      //isDisabled = true;
    }
  }

  if (previousTileGlobally === "Build and Modernize AI Apps") {
    if (
      text === "Microsoft Fabric + Azure Databricks" ||
      text === "Microsoft Purview" ||
      text === "Microsoft Fabric"
    ) {
      // isDisabled = true;
    }
  }

  if (previousTileGlobally === "Data Security") {
    if (
      text === "Microsoft Fabric + Azure Databricks" ||
      text === "AI Design Wins" ||
      text === "Apps + Azure Cosmos DB" ||
      text === "Microsoft Fabric"
    ) {
      //isDisabled = true;
    }
  }

  if (
    previousTileGlobally ===
    "Unify your Intelligent Data and Analytics Platform"
  ) {
    if (text === "Apps + Azure Cosmos DB" || text === "AI Design Wins") {
      // isDisabled = true;
    }
  }

  if (previousTileGlobally === "Microsoft Fabric") {
    if (
      text === "Mirrored Azure Databricks Catalogue" ||
      text === "Apps + Azure Cosmos" ||
      text === "Data Governance"
    ) {
      // isDisabled = true;
    }
  }

  if (previousTileGlobally === "Microsoft Fabric + Azure Databricks") {
    if (
      text === "Data Engineering" ||
      text === "Apps + Azure Cosmos" ||
      text === "Data Governance" ||
      text === "Data Factory" ||
      text === "Data Science" ||
      text === "Data Warehouse" ||
      text === "Real-Time Intelligence" ||
      text === "Databases" ||
      text === "Data Activator"
    ) {
      // isDisabled = true;
    }
  }

  //console.log({ switchOn });
  if (switchOn == false) {
    if (
      text === "Data Engineering" ||
      text === "Apps + Azure Cosmos" ||
      text === "Data Governance" ||
      text === "Data Factory" ||
      text === "Data Science" ||
      text === "Data Warehouse" ||
      text === "Real-Time Intelligence" ||
      text === "Databases" ||
      text === "Data Activator" ||
      text === "Mirrored Azure Databricks Catalogue" ||
      text === "Apps + Azure Cosmos DB" ||
      text === "Copilot for Power BI in Microsoft Fabric" ||
      text === "Data Governance"
    ) {
      // isDisabled = true;
    }
  }

  if (title === "End-to-End Demo") {
    IconComponent = EndToEnd;
  } else if (title === "Microsoft Fabric + Azure Databricks") {
    IconComponent = MicrosoftFabric;
  } else if (title === "Apps + Azure Cosmos DB") {
    IconComponent = CapitalMarket;
  } else if (title === "Microsoft Purview") {
    IconComponent = Insurance;
  } else if (title === "AI Design Wins") {
    IconComponent = FinancialInt;
  } else if (title === "Unify your Intelligent Data and Analytics Platform") {
    IconComponent = Unify;
  } else if (title === "Innovate with Azure AI Platform") {
    IconComponent = Invoation;
  } else if (title === "Build and Modernize AI Apps") {
    IconComponent = ModernizeApps;
  } else if (title === "Data Security") {
    IconComponent = DataAndSecurity;
  } else if (title === "Microsoft Fabric") {
    IconComponent = MicroSoftFabricLogo;
  } else if (title === "Data Engineering") {
    IconComponent = DataEngg;
  } else if (title === "Data Factory") {
    IconComponent = DataFactory;
  } else if (title === "Data science") {
    IconComponent = DataScience;
  } else if (title === "Data Warehouse") {
    IconComponent = DataWareHouse;
  } else if (title === "Real-Time Intelligence") {
    IconComponent = RealTImeIntelligence;
  } else if (title === "Databases") {
    IconComponent = DatabaseLogo;
  } else if (title === "Data Activator") {
    IconComponent = DataActivator;
  } else if (title === "Mirrored Azure Databricks Catalogue") {
    IconComponent = MIrroredAzureDatabricks;
  } else if (title === "Apps + Azure Cosmos DB") {
  } else if (title === "Data Governance") {
    IconComponent = DataGoverance;
  } else if (title === "Copilot for Power BI in Microsoft Fabric") {
    IconComponent = CopilotForPowerBI;
  } else if (title === "Configurable Demo for Copilot in Microsoft Fabric") {
    IconComponent = CopilotForPowerBI;
  } else if (title === "Build your own Contact Center Assistant") {
    IconComponent = ContactCenterAssistant;
  } else if (title === "Predicting Customer Churn") {
    IconComponent = CustomerChurn;
  } else {
    IconComponent = IconComponent = RetailBanking;
  }

  const tileClass = isActive ? styles.activeTile : styles.container;

  let titleProps = {
    cssName: "",
    cursor: "pointer",
    opacity: 1,
    color: "#717171 !important",
    backgroundColor: "#64717C !important",
    border: "",
  };

  if (isDisabled) {
    titleProps = {
      cssName: styles.disabled,
      cursor: "not-allowed",
      opacity: 0.5,
      color: "#D0D0D0 !important",
      backgroundColor: "#E9E9E9 !important",
      border: "2px solid #C8C8C8",
    };
  } else {
    if (!switchOn) {
      if (type.split("-")[0] === "nl3") {
        titleProps = {
          cssName: styles.disabled,
          cursor: "not-allowed",
          opacity: 0.5,
          color: "#D0D0D0 !important",
          backgroundColor: "#E9E9E9 !important",
          border: "2px solid #C8C8C8",
        };
      }
    }
  }

  return (
    <div
      className={`${tileClass} ${isSolutionPlay ? styles.solutionPlay : ""}${
        titleProps.cssName
      } ${level === 3 ? styles.childNode : ""}`}
      style={{
        cursor: titleProps.cursor,
        opacity: titleProps.opacity,
        color: titleProps.color,
        backgroundColor: titleProps.backgroundColor,
        border: titleProps.border,
      }}
    >
      <div className={styles.tileItem}>
        <div> {IconComponent && <IconComponent color="#092952" />}</div>
        <div>
          {" "}
          <h4
            style={{
              color: isDisabled ? "#717171 !important" : "#717171 !important",
            }}
          >
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
}
