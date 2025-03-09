import { FC, useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  setActiveTileGlobally,
  setActiveTileNumber,
  setPageTitle,
  setPageType,
  setShowPopup,
  setSideBarCurrentItemMenu,
  setSideBarMenunextExpanded,
} from "store";
import { PageType } from "types";
import Tile from "components/Tile";
import { ChatBot } from "components/ChatBot";
import { Button } from "@progress/kendo-react-buttons";

interface Props {
  pageTitle: string;
  pageType: PageType;
  src: string;
  className?: string;
  originalSize?: boolean;
  backgroundImage?: string;
}

const { BlobBaseUrl, INITIAL_ACTIONS } = window.config;

export const ArchImage: FC<Props> = ({
  pageTitle,
  pageType,
  src,
  className,
  originalSize,
  backgroundImage,
}) => {
  const dispatch = useAppDispatch();
  //const [showPopup, setShowPopup] = useState(false);
  const { ActiveTileGlobally, ActiveTileNumber, showPopup, sideBarMenu } =
    useAppSelector((state) => state.config);
  const [actions, setActions] = useState<any>(INITIAL_ACTIONS);
  const [type, setType] = useState("home");
  const imgRef = useRef<HTMLImageElement>(null);
  const [scaledCoords, setScaledCoords] = useState([]);
  useEffect(() => {
    if (imgRef.current) {
      const imgWidth = imgRef.current.clientWidth;
      const imgHeight = imgRef.current.clientHeight;

      // Define your original coordinates here
      const originalCoords = [
        { name: "Azure Databricks", coords: [1180, 64, 950, 250] },
        {
          name: "Microsoft Purview Data Governance",
          coords: [1200, 64, 1280, 620],
        },
        { name: "Copilot", coords: [180, 70, 920, 180] },
        { name: "Azure AI Studio", coords: [1180, 300, 950, 465] },
        { name: "Azure Cosmos DB", coords: [1180, 510, 950, 610] },
      ];
      // Calculate new coordinates based on the current image size
      const updatedCoords: any = originalCoords.map((area) => {
        const adjustedCoords = area.coords.map((val, index) =>
          index % 2 === 0 ? (val / 1280) * imgWidth : (val / 720) * imgHeight
        );
        return { ...area, coords: adjustedCoords.join(",") };
      });
      setScaledCoords(updatedCoords);
    }
  }, [imgRef.current?.clientWidth, imgRef.current?.clientHeight]);
  // const AUTHORS = [
  //   {
  //     id: "bot",
  //     avatarUrl: BotAvatar,
  //   },
  //   {
  //     id: "user",
  //     avatarUrl: UserAvatar,
  //   },
  // ];

  const ImageAreaClicked = (areaname: string) => {
    if (areaname == "with-microsoft-fabric-and-azure-databricks") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "5",
      //         index: 18,
      //         selected: true,
      //       },
      //     },
      //   },
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: undefined,
      //         id: "5-sub-1",
      //         index: "19",
      //         selected: true,
      //         parentId: "5",
      //       },
      //     },
      //   },
      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));
    } else if (areaname == "Data Engineering") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/data-engineering";
    } else if (areaname == "Data Factory") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/dataflow-gen2";
    } else if (areaname == "Data Warehouse") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/operating-profits";
    } else if (areaname == "Data Science") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/notebook-copilot";
    } else if (areaname == "Real-Time Intelligence + Data Activator") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/real-time-intelligence";
    } else if (areaname == "Power BI Experience") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "3",
      //         index: 10,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));

      window.location.href = "#/powerbi-experience";
    }
    // else if (areaname == "Copilot") {
    //   // const currentItem: any = [
    //   //   {
    //   //     itemTarget: {
    //   //       props: {
    //   //         dataExpanded: false,
    //   //         id: "3",
    //   //         index: 10,
    //   //         selected: false,
    //   //       },
    //   //     },
    //   //   },

    //   // ];
    //   // dispatch(setSideBarCurrentItemMenu(currentItem));

    //   window.location.href = "#/lakehouse-creation-demo";
    // }
    else if (areaname == "Azure Databricks") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "4",
      //         index: 16,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      window.location.href = "#/with-microsoft-fabric-and-azure-databricks";

      //dispatch(setSideBarCurrentItemMenu(currentItem));
    } else if (areaname == "Azure AI Studio") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "7",
      //         index: 34,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));
      window.location.href = "#/call-center-before-sentiment";
    } else if (areaname == "Microsoft Purview Data Governance") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "8",
      //         index: 52,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));
      window.location.href = "#/problem-statement";
    } else if (areaname == "Apps + Azure Cosmos DB") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "8",
      //         index: 52,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));
      window.location.href = "#/apps-azure-cosmos-db-highlights";
    } else if (areaname == "Eventstream") {
      // const currentItem: any = [
      //   {
      //     itemTarget: {
      //       props: {
      //         dataExpanded: false,
      //         id: "8",
      //         index: 52,
      //         selected: false,
      //       },
      //     },
      //   },

      // ];
      // dispatch(setSideBarCurrentItemMenu(currentItem));
      window.location.href = "#/real-time-intelligence";
    } else {
    }
  };

  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageTitle, pageType]);
  const [messages, setMessages] = useState("");
  const clickEvent = (e: any) => {
    // console.log(e.nativeEvent, "event");
  };
  // console.log(imgRef.current?.clientHeight, "Height");
  // console.log(imgRef.current?.clientWidth, "width");

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.subContainer}>
        <div></div>
        <img
          ref={imgRef}
          src={src.includes("http") ? src : `${BlobBaseUrl}${src}`}
          alt="Workplace"
          className={styles.image}
          useMap="#image-map"
        />
        <div
          title="Data Engineering"
          className={`${styles.pulsingDiv} ${styles.dataEngineering}`}
          onClick={(e) => {
            ImageAreaClicked("Data Engineering");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Data Factory"
          className={`${styles.pulsingDiv} ${styles.dataFactory}`}
          onClick={(e) => {
            ImageAreaClicked("Data Factory");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Data Warehouse"
          className={`${styles.pulsingDiv} ${styles.dataWarehouse}`}
          onClick={(e) => {
            ImageAreaClicked("Data Warehouse");
            clickEvent(e);
          }}
        ></div>

        <div
          title="Data Science"
          className={`${styles.pulsingDiv} ${styles.dataScience}`}
          onClick={(e) => {
            ImageAreaClicked("Data Science");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Real-Time Intelligence + Data Activator"
          className={`${styles.pulsingDiv} ${styles.realTimeIntelligenceDataActivator}`}
          onClick={(e) => {
            ImageAreaClicked("Real-Time Intelligence + Data Activator");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Power BI Experience"
          className={`${styles.pulsingDiv} ${styles.powerBiExperience}`}
          onClick={(e) => {
            ImageAreaClicked("Power BI Experience");
            clickEvent(e);
          }}
        ></div>

        <div
          title="Azure Databricks"
          className={`${styles.pulsingDiv} ${styles.azureDatabricks}`}
          onClick={(e) => {
            ImageAreaClicked("Azure Databricks");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Azure Databricks"
          className={`${styles.pulsingDiv} ${styles.azureDatabricks}`}
          onClick={(e) => {
            ImageAreaClicked("Azure Databricks");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Microsoft Purview Data Governance"
          className={`${styles.pulsingDiv} ${styles.purview}`}
          onClick={(e) => {
            ImageAreaClicked("Microsoft Purview Data Governance");
            clickEvent(e);
          }}
        ></div>
        {/* <div
          title="Microsoft Fabric"
          className={`${styles.pulsingDiv} ${styles.copilot}`}
          onClick={(e) => {
            ImageAreaClicked("Microsoft Fabric");
            clickEvent(e);
          }}
        ></div> */}
        <div
          title="AI Design Wins"
          className={`${styles.pulsingDiv} ${styles.aiStudio}`}
          onClick={(e) => {
            ImageAreaClicked("Azure AI Studio");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Apps + Cosmos DB"
          className={`${styles.pulsingDiv} ${styles.appCosmosDB}`}
          onClick={(e) => {
            ImageAreaClicked("Apps + Azure Cosmos DB");
            clickEvent(e);
          }}
        ></div>
        <div
          title="Eventstream"
          className={`${styles.pulsingDiv} ${styles.eventStream}`}
          onClick={(e) => {
            ImageAreaClicked("Eventstream");
            clickEvent(e);
          }}
        ></div>

        {/* <div
          title="Azure AI Studio"
          className={`${styles.pulsingDiv} ${styles.aiStudio}`}
          onClick={(e) => {
            ImageAreaClicked("Azure AI Studio");
            clickEvent(e);
          }}
        ></div> */}
        {/* <div
          title="Azure AI Studio"
          className={`${styles.pulsingDiv} ${styles.aiStudio}`}
          onClick={(e) => {
            ImageAreaClicked("Azure AI Studio");
            clickEvent(e);
          }}
        ></div> */}
        {/* <map name="image-map">
          <area
            target="_self"
            onClick={(e) => {
              ImageAreaClicked("Azure Databricks");
              clickEvent(e);
            }}
            alt=""
            title="Azure Databricks"
            // href="#/with-microsoft-fabric-and-azure-databricks"
            // coords="940, 64, 770, 220"
            coords="1180, 64, 950, 250"
            shape="rect"
          ></area>

          <area
            target="_self"
            onClick={(e) => {
              ImageAreaClicked("Microsoft Purview Data Governance");
              clickEvent(e);
            }}
            alt=""
            title="Microsoft Purview Data Governance"
            // href="#/problem-statement"
            coords="1200, 64, 1280, 620"
            shape="rect"
          ></area>
          <area
            target="_self"
            onClick={(e) => {
              ImageAreaClicked("Copilot");
              clickEvent(e);
            }}
            alt=""
            title="Microsoft Fabric"
            // href="#/with-microsoft-fabric-and-azure-databricks"
            // coords="140, 64, 570, 220"
            coords="180, 70, 920, 180"
            shape="rect"
          ></area>
          <area
            target="_self"
            onClick={(e) => {
              ImageAreaClicked("Azure AI Studio");
              clickEvent(e);
            }}
            alt=""
            title="AI Design Wins"
            // href="#/with-microsoft-fabric-and-azure-databricks"
            // coords="940, 264, 770, 420"
            coords="1180, 300, 950, 465"
            shape="rect"
          ></area>
          <area
            target="_self"
            onClick={(e) => {
              ImageAreaClicked("Azure Cosmos DB");
              clickEvent(e);
            }}
            alt=""
            title="Apps + Cosmos DB"
            // href="#/with-microsoft-fabric-and-azure-databricks"
            // coords="940, 264, 770, 420"
            coords="1180, 510, 950, 610"
            shape="rect"
          ></area>
        </map> */}
      </div>
    </div>
  );
};
