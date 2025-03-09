import React, { CSSProperties, useEffect } from "react";
import startCase from "lodash.startcase";
import styles from "./styles.module.scss";
import { eq } from "fp-tools";
import { rootPath, urlify } from "utilities";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { useAppDispatch, useAppSelector, useArrows } from "hooks";
import { toolTips } from "common";
import { Button } from "@progress/kendo-react-buttons";
import {
  ChevronRight28Filled,
  Dismiss20Filled,
  Dismiss24Filled,
  Dismiss28Filled,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { BackArrow } from "assets/BackArrow";
import { NextArrow } from "assets/NextArrow";
import { CloseIcon } from "assets/CloseIcon";

import { Forward, Backward, Home, Architecture } from "assets";
import { BackendArrow } from "assets/BackendArrow";
import { ArchitectureIcon } from "assets/ArchitectureIcon";
import { HomeNewIcon } from "assets/HomeNewIcon";
import { BackendButton } from "assets/BackendButton";
import {
  RadioButton,
  RadioButtonChangeEvent,
} from "@progress/kendo-react-inputs";
import HomeNewIconV2 from "assets/HomeNewIconV2";
import NewArchV2 from "assets/NewArchV2";
import NewbackEndButton from "assets/NewbackEndButton";
import NewbackEndButtonBlue from "assets/NewbackEndButtonBlue";
import { setChildNodes, setDefaultLandingPage } from "store";

const labelAchronymList = [
  "esg",
  "msci",
  "hof",
  "cro",
  "cco",
  "cfo",
  "ceo",
  "ml",
  "cdp",
  "vp",
];

export type ArrowProps = {
  className?: string;
  to: string;
  previous: string;
  linkStyles?: CSSProperties;
  name: string;
  openInNewTab?: boolean;
  type?: "default" | "skip" | "custom";
  tooltip?: string;
  top?: number;
  right?: number;
};

const { BlobBaseUrl, demoMenus } = window.config;

export const Arrow: React.FC<ArrowProps> = ({
  className,
  name,
  openInNewTab,
  to,
  type = "default",
  tooltip,
  previous,
  top,
  right,
}) => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = React.useState("video");
  const { childNodes } = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const { tooltips } = useArrows();
  // arrowUrl :: string -> string
  const arrowUrl = (arrowName: string) => `${BlobBaseUrl}${arrowName}`;

  if (childNodes === "nl2-2") {
    to = "data_engineering";
  } else if (childNodes === "nl2-3") {
    to = "with_microsoft_fabric_and_azure_databricks";
  } else if (childNodes === "nl2-4") {
    to = "wardrobe_selection";
  } else if (childNodes === "nl2-5") {
    to = "call_center_before_sentiment";
  } else if (childNodes === "nl2-6") {
    to = "problem_statement";
  } else {
  }

  // currentPath :: string -> string
  const currentPath = (s: string) =>
    name.includes("fast") ? "Fast Forward" : startCase(rootPath(s));

  // skip :: string -> boolean
  const skip = eq("skip");

  // def :: string -> boolean
  const def = eq("default");

  const href: string = to.includes("http") ? to : urlify(to);
  const previousHref: string = previous.includes("http")
    ? previous
    : urlify(previous);
  const label: string = to.includes("http")
    ? tooltip ?? "External Link"
    : currentPath(urlify(to))
        .split(" ")
        .map((w: string) =>
          labelAchronymList.indexOf(w.toLowerCase()) > -1 ? w.toUpperCase() : w
        )
        .join(" ");

  const src: string = name?.includes("http")
    ? name
    : skip(type)
    ? arrowUrl("fastforward.png")
    : arrowUrl(name);

  const arrowClass: string = skip(type)
    ? styles.arrowSkip
    : className ?? styles.arrowTopRight;

  const isLabel = to.includes("http");

  const handleNavigate = () => {
    dispatch(setDefaultLandingPage(true));
    navigate("/");
  };

  const NavigateToPrevious = (previousHref: any) => {
    navigate(previousHref);
  };

  const NavigateToForward = (href: any) => {
    navigate(href);
    dispatch(setChildNodes(""));
  };

  return (
    <>
      {" "}
      {/* <div className={styles.backEndBtn}>
        <a
          // className={styles.newArrow}
          href={isLabel ? href : `/#${href}`}
          target={openInNewTab ? "_blank" : "_self"}
          rel="noreferrer"
        >
          {(src.toLowerCase().includes("arrow-a") ||
            src.toLowerCase().includes("fastforward") ||
            src.toLowerCase().includes("rewind")) && (
            // <Button className={styles.backendArrow}>
            //   <div className={styles.backendArrowCont}>
            //     {" "}
            //     <BackendArrow />
            //     Backend
            //   </div>
            // </Button>
            // <BackendButton />

            <NewbackEndButton />
          )}
        </a>
      </div> */}
      <div className="buttonsContainerLeft">
        {tooltips?.map((item, index) => {
          if (true) {
            if (item?.url === to) {
              return (
                <div className={styles.buttons}>
                  <div
                    onClick={() => NavigateToPrevious(previousHref)}
                    className={` ${to === "landing_page" && "endButton"}`}
                  >
                    {to === "landing_page" ? (
                      <>
                        <div className={styles.Arrows} title="End Demo">
                          <CloseIcon />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div
                    onClick={() => NavigateToForward(href)}
                    className={`${to === "landing_page" && "endButton"}`}
                  >
                    {to === "landing_page" ? (
                      <>{/* <Dismiss20Filled /> End Demo */}</>
                    ) : (
                      <div className={styles.Arrows}>
                        {/* <BackArrow /> */}
                        <Forward />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          }
          return null;
        })}{" "}
      </div>
      <div className="buttonsContainerRight">
        {tooltips?.map((item, index) => {
          if (!["world_map", "landing_page"].includes(to)) {
            if (item?.url === to) {
              return (
                <div className={styles.buttons}>
                  <div
                    onClick={() => navigate(previousHref)}
                    className={` ${to === "landing_page" && "endButton"}`}
                  >
                    {to === "landing_page" ? (
                      <>
                        <div className={styles.Arrows} title="End Demo">
                          <CloseIcon />
                        </div>
                      </>
                    ) : (
                      <div className={styles.Arrows}>
                        {/* <NextArrow /> */}
                        <Backward />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </div>
      {window.location.href.includes("/finale-video") && (
        <>
          <div
            className={styles.ArrowsBack}
            title="End Demo"
            onClick={() => {
              NavigateToPrevious("/executive-dashboard-after");
            }}
          >
            <Backward />
          </div>
        </>
      )}
      {!window.location.href.includes("/landing-page") && (
        <div
          className="homeButtonsContainer"
          onClick={handleNavigate}
          aria-label="Home"
          title="Home"
        >
          <HomeNewIconV2 />
        </div>
      )}
      {!window.location.href.includes("/dream-demo-architecture") && (
        <div className="arcButtonsContainer">
          <div
            onClick={() => (window.location.href = "#/dream-demo-architecture")}
          >
            {/* <ArchitectureIcon /> */}
            {/* <Architecture /> */}
            {/* <img
              className={styles.archButton}
              src="https://dreamdemoassets.blob.core.windows.net/nrf/architectureButton.png"
            /> */}
          </div>
        </div>
      )}
    </>
  );
};
