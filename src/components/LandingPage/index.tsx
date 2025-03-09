// import { FC, useEffect, useState, useCallback } from "react";
// import styles from "./styles.module.scss";
// import { PageType } from "types";
// import { useAppDispatch, useAppSelector } from "hooks";
// import {
//   setActiveTileGlobally,
//   setActiveTileNumber,
//   setChildNodes,
//   setDemoMenus,
//   setPageTitle,
//   setPageType,
//   setPreviousTileGlobally,
//   setShowPopup,
//   setSolutionPlay,
//   setSolutionPlayGlobally,
//   setSwitchOn,
// } from "store";
// import Tile from "components/Tile";
// import {
//   ReactFlow,
//   Position,
//   Handle,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   MiniMap,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { ChatBot } from "components/ChatBot";
// import { RadioButton } from "@progress/kendo-react-inputs";
// import { AllNodes } from "./allnodes";
// import { Label } from "@progress/kendo-react-labels";
// import { dataCsvIcon } from "@progress/kendo-svg-icons";
// import { Button } from "@progress/kendo-react-buttons";
// const { BlobBaseUrl, INITIAL_ACTIONS } = window.config;

// interface Props {
//   pageTitle: string;
//   pageType: PageType;
//   src: string;
//   className?: string;
//   originalSize?: boolean;
//   backgroundImage?: string;
// }

// const generateEdge = (
//   source: string,
//   target: string,
//   isAnimated: boolean = true
// ) => {
//   return {
//     id: `${source}-${target}`,
//     source: source,
//     target: target,
//     animated: isAnimated,
//   };
// };

// const getEdgesForSelectedNode = (
//   sourceNode: string,
//   destinationNodes: string[] | undefined,
//   destinationNodeSelected: string | undefined = ""
// ) => {
//   return destinationNodes?.map((destinationNode) => {
//     return generateEdge(
//       sourceNode,
//       destinationNode,
//       destinationNodeSelected != destinationNode
//     );
//   });
// };

// const CustomNode: React.FC<any> = ({ data }) => {
//   return (
//     <div
//       onClick={(e) => {
//         if (data.isDisabled) {
//           e.preventDefault();
//           return;
//         }
//       }}
//     >
//       <Tile
//         title={data.label}
//         type={data.id}
//         isActive={data.isActive}
//         isDisabled={data.isDisabled}
//         level={data.level}
//         text={data.label}
//       />
//       <Handle
//         type="target"
//         id={"ha-" + data.id}
//         position={Position.Left}
//         style={{
//           borderRadius: "50%",
//           background: "transparent",
//           border: "unset",
//         }}
//       />
//       <Handle
//         type="source"
//         id={"hb-" + data.id}
//         position={Position.Right}
//         style={{
//           borderRadius: "50%",
//           background: "transparent",
//           border: "unset",
//         }}
//       />
//     </div>
//   );
// };

// export const LandingPage: FC<Props> = ({
//   pageTitle,
//   pageType,
//   src,
//   className,
//   originalSize,
//   backgroundImage,
// }) => {
//   const dispatch = useAppDispatch();
//   const [Previous, setPrevious] = useState<any>("");

//   const {
//     ActiveTileGlobally,
//     ActiveTileNumber,
//     showPopup,
//     solutionPlayGlobally,
//     previousTileGlobally,
//     solutionPlay,
//     defaultLandingPage,
//   } = useAppSelector((state) => state.config);

//   const handleTileClick = useCallback(
//     (
//       id: string,
//       tileTitle: string,
//       isDisabled: boolean,
//       e: React.MouseEvent
//     ) => {
//       if (isDisabled) {
//         e.preventDefault();
//         e.stopPropagation();
//         return;
//       }
//       switch (id) {
//         case "n1-1":
//           tileTitle = "End-to-End Demo";
//           break;
//         case "nl1-3":
//           tileTitle = "Microsoft Fabric + Azure Databricks";
//           break;
//         case "nl1-4":
//           tileTitle = "Apps + Azure Cosmos DB";
//           break;
//         case "nl1-1":
//           tileTitle = "Microsoft Purview";
//           break;
//         case "nl1-6":
//           tileTitle = "AI Design Wins";
//           break;
//         case "nl2-2":
//           tileTitle = "Microsoft Fabric";
//           break;
//         case "n1-1":
//           tileTitle = "Unify your Intelligent Data and Analytics Platform";
//           break;
//         case "n1-2":
//           tileTitle = "Innovate with Azure AI Platform";
//           break;

//         case "n1-3":
//           tileTitle = "Build and Modernize AI Apps";
//           break;
//         case "n1-4":
//           tileTitle = "Data Security";
//           break;
//         default:
//           tileTitle = "Build and Modernize AI Apps";
//           id = "17";
//           break;
//       }

//       const storedTileGlobally = localStorage.getItem("ActiveTileGlobally");
//       setPrevious(storedTileGlobally);

//       dispatch(setPreviousTileGlobally(storedTileGlobally));

//       dispatch(setActiveTileGlobally(tileTitle));
//       dispatch(setActiveTileNumber(type));
//       localStorage.setItem("ActiveTileGlobally", tileTitle);
//       localStorage.setItem("ActiveTileNumber", type);

//       // disableOtherTiles(ActiveTileGlobally);
//     },
//     [dispatch]
//   );

//   const handleSolutionPlayClick = useCallback(
//     (nodeId: string, label: string) => {
//       const edges = getEdgesForSelectedNode(
//         nodeId,
//         nodes.filter((c) => c.id == nodeId)[0].data?.nodes
//       );
//       setEdges(edges as any);
//     },
//     [handleTileClick]
//   );

//   const handleTileClick1 = (id: string, isDisabled: boolean, e: any) => {
//     if (isDisabled) {
//       e.preventDefault();
//       e.stopPropagation();
//       return;
//     }
//     let tileTitle: string;
//     switch (id) {
//       case "nl2-1":
//         tileTitle = "End-to-End Demo";
//         dispatch(setDemoMenus(window.config.demoMenus));
//         window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
//         break;
//       case "nl2-6":
//         tileTitle = "Microsoft Purview";
//         dispatch(setDemoMenus(window.config.Microsoft_Purview));
//         window.dispatchEvent(new CustomEvent("demoMenusUpdate"));
//         break;
//       case "nl2-4":
//         tileTitle = "Apps + Azure Cosmos DB";
//         dispatch(setDemoMenus(window.config.Apps_Azure_Cosmos_DB));
//         break;
//       case "nl2-3":
//         tileTitle = "Microsoft Fabric + Azure Databricks";
//         dispatch(
//           setDemoMenus(window.config.Microsoft_Fabric_Azure_Databricks_Menu)
//         );
//         break;
//       case "nl2-5":
//         tileTitle = "AI Design Wins";
//         dispatch(setDemoMenus(window.config.AI_Design_Wins));
//         break;
//       case "nl2-2":
//         tileTitle = "Microsoft Fabric";
//         dispatch(setDemoMenus(window.config.Microsoft_Fabric));
//         break;
//       case "n1-1":
//         tileTitle = "Unify your Intelligent Data and Analytics Platform";
//         break;
//       case "n1-2":
//         tileTitle = "Innovate with Azure AI Platform";
//         break;
//       case "n1-3":
//         tileTitle = "Build and Modernize AI Apps";
//         break;
//       case "n1-4":
//         tileTitle = "Data Security";
//         break;
//       default:
//         tileTitle = "Microsoft Purview";
//         break;
//     }
//     if (id == "n1-1" || id == "n1-2" || id == "n1-3" || id == "n1-4") {
//       if (id == "n1-1") {
//         dispatch(
//           setPreviousTileGlobally(
//             "Unify your Intelligent Data and Analytics Platform"
//           )
//         );
//       } else if (id == "n1-2") {
//         dispatch(setPreviousTileGlobally("Innovate with Azure AI Platform"));
//       } else if (id == "n1-3") {
//         dispatch(setPreviousTileGlobally("Build and Modernize AI Apps"));
//       } else {
//         dispatch(setPreviousTileGlobally("Data Security"));
//       }
//     }
//     dispatch(setActiveTileGlobally(tileTitle));
//     dispatch(setActiveTileNumber(id));
//     localStorage.setItem("ActiveTileGlobally", tileTitle);
//     localStorage.setItem("ActiveTileNumber", id);
//   };

//   useEffect(() => {
//     debugger;
//     setNodes(AllNodes);
//     setIsSwitchOn(true);
//     dispatch(setSwitchOn(true));
//     const syntheticEvent = {
//       preventDefault: () => {},
//       stopPropagation: () => {},
//     } as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>;
//     let endToEndDemoNode;
//     AllNodes.map((c) => {
//       if (
//         c.data.id == "nl2-2" ||
//         c.data.id == "nl2-3" ||
//         c.data.id == "nl2-6"
//       ) {
//         c.data.isDisabled = false;
//       }
//     });
//     if (solutionPlay == "AI Design Wins") {
//       endToEndDemoNode =
//         AllNodes.find((node) => node.id === "nl2-5") || AllNodes[0];
//       endToEndDemoNode.data.isDisabled = false;
//     } else if (solutionPlay == "Microsoft Fabric + Azure Databricks") {
//       endToEndDemoNode =
//         AllNodes.find((node) => node.id === "nl2-3") || AllNodes[0];
//       endToEndDemoNode.data.isDisabled = false;
//     } else if (solutionPlay == "Microsoft Fabric") {
//       endToEndDemoNode =
//         AllNodes.find((node) => node.id === "nl2-2") || AllNodes[0];
//       endToEndDemoNode.data.isDisabled = false;
//     } else if (solutionPlay == "Microsoft Purview") {
//       endToEndDemoNode =
//         AllNodes.find((node) => node.id === "nl2-6") || AllNodes[0];
//       endToEndDemoNode.data.isDisabled = false;
//     } else {
//       endToEndDemoNode =
//         AllNodes.find((node) => node.id === "nl2-1") || AllNodes[0];
//       endToEndDemoNode.data.isDisabled = false;
//     }
//     if (endToEndDemoNode) {
//       onNodeClick(syntheticEvent, endToEndDemoNode, "synth");
//     }
//   }, [solutionPlay]);

//   const onNodeClick = (event: any, node: any, type = "normal") => {
//     debugger;
//     console.log(AllNodes);
//     if (node.data.isDisabled) {
//       event.preventDefault();
//       event.stopPropagation();
//       return;
//     }
//     if (node?.data?.url) {
//       if (isSwitchOn) {
//         if (node?.data?.url.includes("https"))
//           window.open(node?.data?.url, "_blank");
//         else window.location.href = node.data.url;
//       }
//     }

//     //Start of - Make Tile active or deactive

//     nodes
//       .filter((c) => c.id.split("-")[0] === node.id.split("-")[0])
//       .map((c) => (c.data.isActive = false));
//     nodes.filter((c) => !c.isParent).map((c) => (c.data.isActive = false));
//     node.data.isActive = true;
//     dispatch(setChildNodes(node.data.id));
//     //Stop of - Make Tile active or deactive

//     //Start Of - Below code is for making tile enable or disabled based on clicked tile
//     if (node.isParent) {
//       let expectedActiveNodes = nodes.filter((c) => c.id == node.id)[0].data
//         .nodes;

//       nodes.map((c) => {
//         if (!c.isParent) {
//           c.data.isDisabled = true;
//           if (expectedActiveNodes?.includes(c.id)) {
//             c.data.isDisabled = false;
//           }
//         }
//         return c;
//       });
//       setParentNodeId(node.id);
//     } else {
//       let parentNodes: any;
//       if (type != "normal")
//         parentNodes = nodes.filter((c) => c.id == "nl1-1")[0].data.nodes;
//       else
//         parentNodes = nodes.filter((c) => c.id == parentNodeId)[0].data.nodes;
//       let childNodes = nodes.filter((c) => c.id == node.id)[0].data.nodes;
//       let expectedActiveNodes = parentNodes?.concat(childNodes as any);
//       nodes.map((c) => {
//         if (!c.isParent && c.level === 3) {
//           c.data.isDisabled = true;
//           if (expectedActiveNodes?.includes(c.id)) {
//             c.data.isDisabled = false;
//           }
//         }

//         return c;
//       });
//     }

//     //END OF - Below code is for making tile enable or disabled based on clicked tile
//     if (node.data.isDisabled) {
//       event.preventDefault();
//       event.stopPropagation();
//       return;
//     }
//     //Start Of - Below code is for making edges based on selected Node
//     if (node?.id) {
//       const newEdges = getEdgesForSelectedNode(
//         node.id,
//         nodes.filter((c) => c.id == node.id)[0].data.nodes
//       );
//       if (!node.isParent) {
//         let parentNodes: any;
//         if (type != "normal")
//           parentNodes = nodes.filter((c) => c.id == "nl1-1")[0].data.nodes;
//         else
//           parentNodes = nodes.filter((c) => c.id == parentNodeId)[0].data.nodes;
//         // parentNodes.map((c:any) => {
//         console.log(AllNodes);
//         // if(node.data.id == "nl2-5"){
//         //   AllNodes.map((c) => {
//         //     if(c.data.id == "nl2-2" || c.data.id == "nl2-3" || c.data.id == "nl2-6"){
//         //       c.data.isDisabled = false;
//         //     }
//         //   })
//         // }

//         //})
//         let parentEdges = getEdgesForSelectedNode(
//           parentNodeId,
//           parentNodes,
//           node.id
//         );
//         setEdges(newEdges?.concat(parentEdges as any) as any);
//       } else {
//         setEdges(newEdges as any);
//       }
//       // handleSolutionPlayClick(node.id, node.data.label);
//       // handleExper
//     }
//     //End Of - Below code is for making edges based on selected Node

//     // Start Of - level 3 navigation on click if url is present

//     // End Of - level 3 navigation on click if url is present
//     handleTileClick(node.data.id, node.data.label, node.data.isDisabled, event);
//     handleTileClick1(node.data.id, node.data.isDisabled, event);
//   };

//   const nodeTypes = {
//     custom: CustomNode,
//   };

//   const [parentNodeId, setParentNodeId] = useState("nl1-1");
//   const [actions, setActions] = useState<any>(INITIAL_ACTIONS);
//   const [messages, setMessages] = useState("");
//   const [type, setType] = useState("home");
//   const initialEdges = getEdgesForSelectedNode(
//     AllNodes[0].id,
//     AllNodes[0].data.nodes
//   );
//   const [nodes, setNodes, onNodesChange] = useNodesState(AllNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges as []);
//   const [isSwitchOn, setIsSwitchOn] = useState(false);

//   const handleToggle = (isBDM: any) => {
//     setIsSwitchOn(isBDM);

//     dispatch(setSwitchOn(isBDM));
//   };

//   return (
//     <div className={`${styles.container} ${className}`}>
//       {/* <div className={styles.title}>
//         <img
//           className={styles.titleImage}
//           src="https://dreamdemoassets.blob.core.windows.net/nrf/dataAndAILogNameV03.png"
//         />
//       </div>
//       <div className={styles.switch}>
//         <span>
//           {" "}
//           <RadioButton
//             value="TDM"
//             checked={isSwitchOn === true}
//             onChange={() => handleToggle(true)}
//           />
//           <Label>TDM</Label>
//         </span>
//         <span>
//           <RadioButton
//             value="BDM"
//             checked={isSwitchOn === false}
//             onChange={() => handleToggle(false)}
//           />
//           <Label>BDM</Label>
//         </span>
//       </div>

//       <div className={styles.subContainer1}>
//         <div className={styles.titleContainer}>
//           <h5 className={styles.solutionPlays}>Solution Plays</h5>
//           <h5 className={styles.demoFlows}>Demo Flows</h5>
//           <h5 className={styles.experience}>Experiences</h5>
//         </div> */}
//       <div className={styles.tileContainer}>
//         <img
//           src="https://dreamdemoassets.blob.core.windows.net/nrf/telconLandingPage.png"
//           alt=""
//         />
//         {/* <div className={styles.reactFlowContainer}>
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodeClick={onNodeClick}
//               nodeTypes={nodeTypes}
//               zoomOnPinch={false}
//               zoomOnScroll={false}
//               draggable={false}
//               nodesDraggable={false}
//               panOnDrag={false}
//               nodesConnectable={false}
//               zoomOnDoubleClick={false}
//               panOnScroll={true}
//             >
//               <Controls orientation="horizontal"></Controls>
//             </ReactFlow>
//           </div>
//           <div className={styles.chatBotDetails}>
//             <img
//               className={styles.chatIcon}
//               src={`https://dreamdemoassets.blob.core.windows.net/nrf/copilot_image.svg`}
//               alt="chat-icon"
//               onClick={() => dispatch(setShowPopup(true))}
//             />
//             {!showPopup && (
//               <div className={styles.logo}>
//                 <img src="https://dreamdemoassets.blob.core.windows.net/nrf/DreamLogo_v3.png" />
//               </div>
//             )}
//             {showPopup && (
//               <div className={styles.chatBotLandingPageContainer}>
//                 <ChatBot
//                   INITIAL_ACTIONS={INITIAL_ACTIONS}
//                   messages={messages}
//                   setMessages={setMessages}
//                   actions={actions}
//                   setActions={setActions}
//                   type={type}
//                   setType={setType}
//                   onPlayClick={handleSolutionPlayClick}
//                 />
//               </div>
//             )}
//           </div> */}
//       </div>
//     </div>
//   );
// };
import { FC } from "react";
import styles from "./styles.module.scss";
import { PageType } from "types";
import Image from './MediGuardLandingPage.png';

interface Props {
  pageTitle: string;
  pageType: PageType;
  src: string;
  className?: string;
  originalSize?: boolean;
  backgroundImage?: string;
}

const { BlobBaseUrl } = window.config;

// For Tabs (i.e. form recognizer, hospital incident insights)
export const LandingPage: FC<Props> = ({
  pageTitle,
  pageType,
  src,
  className,
  originalSize,
  backgroundImage,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.subContainer}>
        <img
          // src="https://dreamdemoassets.blob.core.windows.net/nrf/telconLandingPage.png"
          src={Image}
          alt=""
        />
      </div>
    </div>
  );
};
