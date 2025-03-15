import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PageType } from "types";
import { Message } from "@progress/kendo-react-conversational-ui";

interface Demo {
  chat: boolean;
  shopping: boolean;
  campaign: boolean;
}

// Define a type for the slice state
interface ConfigState {
  pageType: PageType;
  pageTitle: string;
  persona: string;
  timeline: string;
  selectedButtonId: number | null;
  showDefaultLooks: boolean;
  shoppingGender: string;
  shoppingStyle: string;
  messages: Message[];
  avatar: string;
  name: string;
  selectedDemos: Demo;
  fileName: string;
  customerId: number;
  sessionId: number | null;
  churnResult: number;
  hideTooltips: boolean;
  customerDetails: any;
  customerReview: string;
  email: any;
  question: string;
  allowCallInProgress: boolean;
  notificationCount: number;
  reImaginedDemoComplete: boolean;
  reImaginedScalingDemoComplete: boolean;
  ActiveTileGlobally: string;
  ActiveTileNumber: string;
  showPopup: boolean;
  sideBarMenu: any;
  sideBarMenuExpanded: boolean;
  demoMenus: any;
  solutionPlayGlobally: string;
  previousTileGlobally: string;
  switchOn: boolean;
  solutionPlay: string;
  defaultLandingPage: boolean;
  childNodes: any;
  policyInfo: any;
  isLoggedIn: boolean;
  patientName: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
  pageType: PageType.LandingPage,
  pageTitle: "Landing Page",
  persona: "",
  timeline: "",
  shoppingGender: "female",
  shoppingStyle: "casual",
  selectedButtonId: null,
  showDefaultLooks: false,
  messages: [],
  avatar: "asian_female",
  name: "Sarah Ali",
  fileName: "",
  sessionId: null,
  customerId: 50092,
  hideTooltips: false,
  selectedDemos: {
    chat: false,
    campaign: false,
    shopping: false,
  },
  churnResult: 0,
  customerDetails: {},
  customerReview: "",
  email: null,
  question: "",
  allowCallInProgress: false,
  notificationCount: 0,
  reImaginedDemoComplete: false,
  ActiveTileGlobally: "",
  ActiveTileNumber: "",
  reImaginedScalingDemoComplete: false,
  showPopup: false,
  sideBarMenu: null,
  sideBarMenuExpanded: false,
  demoMenus: [],
  solutionPlayGlobally: "",
  previousTileGlobally: "",
  switchOn: false,
  solutionPlay: "",
  defaultLandingPage: false,
  childNodes: "",
  policyInfo: {},
  isLoggedIn: false,
  patientName: "Guest",
};

export const configSlice = createSlice({
  name: "persona",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
    setPolicyInfo: (state, action) => {
      state.policyInfo = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setPatientName: (state, action) => {
      state.patientName = action.payload;
    },
    setPageType: (state, action: PayloadAction<PageType>) => {
      state.pageType = action.payload;
    },
    setPersona: (state, action: PayloadAction<string>) => {
      state.persona = action.payload;
    },
    setTimeline: (state, action: PayloadAction<string>) => {
      state.timeline = action.payload;
    },
    setShoppingGender: (state, action: PayloadAction<string>) => {
      state.shoppingGender = action.payload;
    },
    setShoppingStyle: (state, action) => {
      state.shoppingStyle = action.payload;
    },

    setSelectedButtonId: (state, action) => {
      state.selectedButtonId = action.payload;
    },

    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
    setShowDefaultLooks: (state, action) => {
      state.showDefaultLooks = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSessionId: (state, action: PayloadAction<number>) => {
      state.sessionId = action.payload;
    },
    setSelectedDemos: (state, action: PayloadAction<Demo>) => {
      state.selectedDemos = action.payload;
    },
    setCustomerId: (state, action: PayloadAction<number>) => {
      state.customerId = action.payload;
    },
    setHideTooltips: (state, action) => {
      state.hideTooltips = action.payload;
    },

    setChurnResult: (state, action) => {
      state.churnResult = action.payload;
    },
    setCustomerDetails: (state, action) => {
      state.customerDetails = action.payload;
    },
    setCustomerReview: (state, action) => {
      state.customerReview = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSelectedQuestion: (state, action) => {
      state.question = action.payload;
    },
    setAllowCallInProgress: (state, action) => {
      state.allowCallInProgress = action.payload;
    },
    setNotificationCount: (state) => {
      state.notificationCount = state.notificationCount + 1;
    },
    setReImaginedDemoComplete: (state, action: PayloadAction<boolean>) => {
      state.reImaginedDemoComplete = action.payload;
    },
    setReImaginedScalingDemoComplete: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.reImaginedScalingDemoComplete = action.payload;
    },
    setActiveTileGlobally: (state, action) => {
      state.ActiveTileGlobally = action.payload;
    },
    setActiveTileNumber: (state, action) => {
      state.ActiveTileNumber = action.payload;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setSideBarCurrentItemMenu: (state, action) => {
      state.sideBarMenu = action.payload;
    },
    setSideBarMenunextExpanded: (state, action) => {
      state.sideBarMenuExpanded = action.payload;
    },
    setDemoMenus(state, action) {
      state.demoMenus = action.payload;
    },
    setSolutionPlayGlobally(state, action) {
      state.solutionPlayGlobally = action.payload;
    },
    setPreviousTileGlobally(state, action) {
      state.previousTileGlobally = action.payload;
    },
    setSwitchOn: (state, action) => {
      state.switchOn = action.payload;
    },
    setSolutionPlay: (state, action) => {
      state.solutionPlay = action.payload;
    },
    setDefaultLandingPage: (state, action) => {
      state.defaultLandingPage = action.payload;
    },
    setChildNodes: (state, action) => {
      state.childNodes = action.payload;
    },
  },
});

export const {
  setPageType,
  setPageTitle,
  setPersona,
  setTimeline,
  setSelectedButtonId,
  setShoppingGender,
  setShoppingStyle,
  setShowDefaultLooks,
  setMessages,
  setAvatar,
  setName,
  setFileName,
  setSessionId,
  setCustomerId,
  setHideTooltips,
  setChurnResult,
  setCustomerDetails,
  setCustomerReview,
  setEmail,
  setSelectedQuestion,
  setAllowCallInProgress,
  setSelectedDemos,
  setNotificationCount,
  setReImaginedDemoComplete,
  setReImaginedScalingDemoComplete,
  setActiveTileGlobally,
  setActiveTileNumber,
  setShowPopup,
  setSideBarCurrentItemMenu,
  setSideBarMenunextExpanded,
  setDemoMenus,
  setSolutionPlayGlobally,
  setPreviousTileGlobally,
  setSwitchOn,
  setSolutionPlay,
  setDefaultLandingPage,
  setChildNodes,
  setIsLoggedIn,
  setPolicyInfo,
  setPatientName,
} = configSlice.actions;

export default configSlice.reducer;
