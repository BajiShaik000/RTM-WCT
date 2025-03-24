window.config = {
  LogAPI: "https://app-common-powerbi-server.azurewebsites.net/ActivityLog/",
  SPEECH_KEY: "08829058ce334a5f950440324be656db",
  LANDING_PAGE_IMAGE: "",
  SPEECH_REGION: "eastus",
  BlobBaseUrl: "https://dreamdemoassets.blob.core.windows.net/daidemo/",
  IconBlobBaseUrl:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/left-nav-icons/",

  APIUrl: "https://app-common-powerbi-server.azurewebsites.net",
  BackendAPIUrl: "https://app-openai-backend-uat.azurewebsites.net",
  // APIUrl: "https://localhost:5001",
  StartCallAPI: "https://func-aoai2-demo-prod.azurewebsites.net/api/start_call",
  CUSTOMER_DETAILS_API:
    "https://func-aoai2-demo-prod.azurewebsites.net/api/customerdetails",
  // "https://func-generate-email-campaign-telco.azurewebsites.net/api/customerdetails",
  EMAIL_GENERATION_API:
    "https://func-aoai2-demo-prod.azurewebsites.net/api/predicting_customer_churn",
  // "https://func-generate-email-campaign-telco.azurewebsites.net/api/customized_machine_learning",
  INITIAL_ACTIONS: [
    "Do you have any demos for AI Design Wins?",
    "Do you have any demos for Fabric with Databricks?",
    "Are there any demos available for the latest Fabric features?",
    "Do you have any demo that shows integration of Microsoft Purview and Microsoft Fabric?",
  ],

  demoMenus: [
    {
      id: 1,
      url: "/landing-page",
      name: "Landing Page",
      icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_2.png",
      arrowIcon: null,
      order: 1,
      componentId: 3,
      componentName: "custom landing page",
      componentParameters: [
        {
          id: 1,
          key: "url",
          value: "",
        },
      ],
      externalArrows: [],
      personaId: 1,
      personaName: "April",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    {
      id: 3,
      url: "/problem-statement",
      name: "Problem Statement",
      icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_3.png",
      arrowIcon: null,
      order: 1,
      componentId: 3,
      componentName: "problem statement",
      componentParameters: [
        {
          id: 1,
          key: "url",
          value:
            // "https://dreamdemoassets.blob.core.windows.net/nrf/telco_orgchart_updatedV2.png"
            "",
        },
      ],
      externalArrows: [],
      personaId: 1,
      personaName: "April",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    {
      id: 3,
      url: "/solution-architecture",
      name: "Solution Architecture",
      icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_3.png",
      arrowIcon: null,
      order: 1,
      componentId: 3,
      componentName: "architecture",
      componentParameters: [
        {
          id: 1,
          key: "url",
          value:
            // "https://dreamdemoassets.blob.core.windows.net/nrf/telco_orgchart_updatedV2.png"
            "",
        },
      ],
      externalArrows: [],
      personaId: 1,
      personaName: "April",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    // {
    //   id: 1,
    //   url: "/mediguard-assurance-agent",
    //   name: "Mediguard Assurance Agent",
    //   icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_2.png",
    //   arrowIcon: null,
    //   order: 1,
    //   componentId: 3,
    //   componentName: "call in progress",
    //   componentParameters: [
    //     {
    //       id: 1,
    //       key: "url",
    //       value: "",
    //     },
    //   ],
    //   externalArrows: [],
    //   personaId: 1,
    //   personaName: "April",
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    // },
    {
      id: 3,
      url: "/backend-video",
      name: "Solution Backend",
      title: "",
      //  icon: "https://dreamdemoassets.blob.core.windows.net/sustainability/images/icon_video.png",
      icon: "https://dreamdemoassets.blob.core.windows.net/daidemo/post-fabric-icon.png",
      arrowIcon: "",
      order: 1,
      componentId: 3,
      componentName: "Video",
      componentParameters: [
        {
          key: "url",
          value:
            "https://dreamdemoassets.blob.core.windows.net/daidemo/videos/ADS_Migration_Video_V01.mp4",
        },
      ],
      externalArrows: [],
      personaId: 1,
      personaName: "Anna",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    {
      url: "/dashboard",
      name: "Dashboard",
      icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
      arrowIcon: null,
      order: 3,
      componentId: 2,
      componentName: "dashboard",
      componentParameters: [
        // {
        //   key: "reportUrl",
        //   value:
        //     "https://app.powerbi.com/groups/102eb9b7-4dc0-449f-b9cb-e1b9432d00cd/reports/0a875433-9d0a-4806-83de-3cd51f91666b/ReportSection68cb8066934630a72b53?experience=power-bi&clientSideAuth=0",
        // },
        {
          id: 303,
          key: "url",
          value:
            // "https://app.powerbi.com/groups/7c79bda5-c68f-4eb5-ade9-3873ddb98c4d/kustodashboards/c64a1627-a88a-4da0-98d1-273dc8fda3c4?experience=power-bi&clientSideAuth=0&extensionScenario=openArtifact&v-_startTime=1hours&v-_endTime=now&page=f49df6fa-885c-4ca2-afb0-3a7f7aa879fe",
            "https://app.powerbi.com/groups/7c79bda5-c68f-4eb5-ade9-3873ddb98c4d/reports/526b3f10-fe5a-49b0-b2a0-7c15da1f9497/35d7b1f49339aa737a23?experience=power-bi",
        },
      ],
      externalArrows: [],
      personaId: null,
      personaName: "April",
      personaDesignation: "Chief Executive Officer",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    {
      id: 142,
      url: "/contact-center-before",
      // title: "Contact Center - Before",
      name: "Contact Us",
      toolTip: "contact us",
      icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
      arrowIcon: null,
      order: 4,
      componentId: 2,
      componentName: "thank you",
      componentParameters: [
        {
          id: 301,
          key: "url",
          value:
            "https://app.powerbi.com/groups/e798f66a-a55c-42e7-aa5c-d426d3367cba/reports/6ba5d503-ba1f-4a95-aa9f-13660db3134c/ReportSectionda209890a7f0f9e42736?experience=power-bi",
          // "https://app.powerbi.com/groups/b012f945-3207-4b33-ae49-4a6da9f02c28/reports/6365cc71-9c17-48d2-9221-68304c84b3cf/ReportSectionda209890a7f0f9e42736?experience=power-bi",
        },
      ],
      externalArrows: [],
      personaId: 3,
      personaName: "April",
      personaDesignation: "Chief Executive Officer",
      personaImageUrl:
        "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    },
    // {
    //   id: 1,
    //   demoId: 4,
    //   url: "",
    //   name: "Intro & CEO Dashboard",
    //   order: 1,
    //   icon: "https://dreamdemoassets.blob.core.windows.net/openai/aoai_2_home_icon.png",
    //   arrowIcon: "",
    //   demoSubMenus: [
    //     {
    //       id: 1,
    //       url: "/landing-page",
    //       name: "Landing Page",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_2.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "custom landing page",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://dreamdemoassets.blob.core.windows.net/nrf/telconLandingPageV2.png",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //     {
    //       id: 2,
    //       url: "/world-map",
    //       name: "World Map",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_4.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "power bi report",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/f94bb87b-e748-4eae-9ed6-01313579d374/reports/96509277-2e13-4365-a31d-24405cc351bf/ReportSectionae2d438d3737f6ada513?experience=power-bi",
    //         },
    //         {
    //           id: 2,
    //           key: "background",
    //           value: "black",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/city-view",
    //       name: "Beach View",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon4_3.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "iframe",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://app-contoso-openai-dreamdemo.azurewebsites.net/#/city-view",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },

    //     {
    //       url: "/ceo-dashboard-before",
    //       name: "CEO Dashboard Before",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
    //       arrowIcon: null,
    //       order: 3,
    //       componentId: 2,
    //       componentName: "power bi report",
    //       componentParameters: [
    //         // {
    //         //   key: "reportUrl",
    //         //   value:
    //         //     "https://app.powerbi.com/groups/102eb9b7-4dc0-449f-b9cb-e1b9432d00cd/reports/0a875433-9d0a-4806-83de-3cd51f91666b/ReportSection68cb8066934630a72b53?experience=power-bi&clientSideAuth=0",
    //         // },
    //         {
    //           id: 303,
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/f94bb87b-e748-4eae-9ed6-01313579d374/reports/f1e2b11f-798a-4507-aed9-2702f2a16a44/ffce5ed4a1a06d5fc7c9?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "April",
    //       personaDesignation: "Chief Executive Officer",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },

    //     {
    //       id: 3,
    //       url: "/org-chart",
    //       name: "Org Chart",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon1_3.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "image",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://dreamdemoassets.blob.core.windows.net/nrf/telco_orgchart_updatedV2.png",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //   ],
    //   componentParameters: [],
    //   externalArrows: [],
    //   componentId: null,
    //   componentName: null,
    //   personaId: null,
    //   personaName: null,
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    // },
    // {
    //   id: 5,
    //   demoId: 4,
    //   url: "",
    //   name: "Microsoft Fabric",
    //   // icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon2.png",
    //   icon: "https://dreamdemoassets.blob.core.windows.net/nrf/microSoftLogoV3.png",
    //   demoSubMenus: [
    //     {
    //       id: 3,
    //       url: "/current-state-architecture",
    //       name: "Current State Architecture",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon12.png",

    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "image",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://dreamdemoassets.blob.core.windows.net/sustainability/telco_current_state.png",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Fred.png",
    //     },

    //     {
    //       id: 3,
    //       url: "/introduction-to-microsoft-fabric",
    //       name: "Introduction to Microsoft Fabric",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon12.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "image",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://dreamdemoassets.blob.core.windows.net/sustainability/telcoIntro2.png",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Fred.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/future-state-architecture",
    //       name: "Future State Architecture",
    //       icon: "https://nrfcdn.azureedge.net/left-nav-icons/icon12.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 3,
    //       componentName: "image",
    //       componentParameters: [
    //         {
    //           id: 1,
    //           key: "url",
    //           value:
    //             "https://dreamdemoassets.blob.core.windows.net/nrf/telcoDreamDemoArchDiagramV3.png",
    //         },
    //         {
    //           id: 1,
    //           key: "originalSize",
    //           value: true,
    //         },
    //       ],
    //       externalArrows: [
    //         {
    //           id: 20,
    //           name: "External Link",
    //           icon: "https://nrfcdn.azureedge.net/Arrow-A.png",
    //           link: "https://app.fabric.microsoft.com/home",
    //           openInNewTab: true,
    //           topPosition: 70,
    //           rightPosition: 100,
    //         },
    //       ],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Fred.png",
    //     },
    //   ],
    // },
    // {
    //   url: "/scale-ai-with-unified-telco-data-estate",
    //   name: "Scale AI with a Unified Telco Data Estate",
    //   toolTip: "Scale AI with a Unified Telco Data Estate",
    //   title: "",
    //   videoDisabled: false,
    //   clickbyclickDisabled: true,
    //   liveHostedDisabled: false,
    //   productDemoVideoDisabled: true,
    //   icon: "https://dreamdemoassets.blob.core.windows.net/nrf/scaleAI.png",
    //   arrowIcon: null,
    //   order: 2,
    //   componentId: 3,
    //   componentName: "videoWIthClickByClick",
    //   video: [
    //     {
    //       id: 1,
    //       name: "Azure Databricks Mirroring in Fabric",
    //       thumbnailImage:
    //         "https://dreamdemoassets.blob.core.windows.net/dataandaidemo/dataScience1.jfif",
    //       navigateUrl:
    //         "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EdU8Amzq0lJIhJGfLRDIHVIByv9mTsScNyZE69_NfJT3oA?e=jE9hoh",
    //     },
    //   ],
    //   dropDownMenu: [
    //     {
    //       id: 1,
    //       text: "Scale AI with a Unified Telco Data Estate",
    //       videoPlayurl:
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/530ba8f2-8918-4bd1-97b2-1b39e4e97ec2/Telco_Backend_Domain_video_V5mp4.ism/manifest(format=m3u8-cmaf)",
    //       // "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/5c9eaf85-f45a-46fa-9992-f70f1546f5ba/TelcobackendV03.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     // {
    //     //   id: 2,
    //     //   text: "Databricks Integration",
    //     //   videoPlayurl:
    //     //     "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/efd9b9b1-1e81-4009-b4b9-392187332bb7/AzureDatabricksIntegration_V01_2.ism/manifest(format=m3u8-cmaf)",
    //     // },
    //   ],
    //   componentParameters: [
    //     {
    //       key: "video",
    //       value:
    //         // "https://mediasvcprodhealthcare-usw22.streaming.media.azure.net/c4abd415-743f-4eeb-9f7b-31768bd63c56/Unity_Catalogue_Video_V06.ism/manifest",
    //         // "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/d5906b10-9213-46d6-89c8-ae733c8f65d9/Azure_Databricks_Integration_V02.ism/manifest(format=m3u8-cmaf)",
    //         // "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/5c9eaf85-f45a-46fa-9992-f70f1546f5ba/TelcobackendV03.ism/manifest(format=m3u8-cmaf)",
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/530ba8f2-8918-4bd1-97b2-1b39e4e97ec2/Telco_Backend_Domain_video_V5mp4.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     {
    //       key: "videoType",
    //       value: "clickVideo",
    //     },
    //     {
    //       key: "videoName1",
    //       value: "Scale AI with a Unified Telco Data Estate",
    //     },
    //     // {
    //     //   key: "videoName2",
    //     //   value: "Databricks Integration",
    //     // },
    //     {
    //       key: "videoUrl1",
    //       value:
    //         // "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/5c9eaf85-f45a-46fa-9992-f70f1546f5ba/TelcobackendV03.ism/manifest(format=m3u8-cmaf)",
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/bb7623bf-1d00-4595-aaad-20453b9180aa/scale_ai_with_unified_telco_data.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     // {
    //     //   key: "videoUrl2",
    //     //   value:
    //     //     "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/efd9b9b1-1e81-4009-b4b9-392187332bb7/AzureDatabricksIntegration_V01_2.ism/manifest(format=m3u8-cmaf)",
    //     // },
    //     {
    //       key: "liveHosted",
    //       value:
    //         // "https://microsoft.sharepoint.com/teams/DataandAIReadinessCoolTeam/Shared Documents/General/_____Data & AI Big Demo/../../../../../:u:/t/Demochamp868/Eelfm8bxIP9BjCbpLTXlZpwB4lvTBgWeaAzwKcz6jbWCBA?e=RG0bTH",
    //         "https://app.powerbi.com",
    //     },
    //     {
    //       key: "clickByClick",
    //       value:
    //         "https://regale.cloud/microsoft/play/3655/microsoft-fabric-individual-sections-for-web-app-embedding-20#/6/0",
    //     },
    //     {
    //       key: "productDemoVideo",
    //       value:
    //         "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EdU8Amzq0lJIhJGfLRDIHVIByv9mTsScNyZE69_NfJT3oA?e=jE9hoh",
    //     },
    //   ],

    //   externalArrows: [
    //     // {
    //     //   name: "Azure Databricks Backend",
    //     //   icon: "https://nrfcdn.azureedge.net/FinalUpdatedArrow-A.png",
    //     //   link: "https://adb-3218079371877032.12.azuredatabricks.net",
    //     //   openInNewTab: true,
    //     //   topPosition: 70,
    //     //   rightPosition: 100,
    //     // },
    //   ],
    //   personaId: null,
    //   personaName: "Eva",
    //   personaDesignation: "Data Engineer",
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/Eva.png",
    // },

    // {
    //   url: "/leverage-ai-discover-network-subscriber-insights",
    //   name: "Leverage AI to Discover Network and Subscriber Insights",
    //   toolTip: "Leverage AI to Discover Network and Subscriber Insights",
    //   title: "",
    //   videoDisabled: false,
    //   clickbyclickDisabled: true,
    //   liveHostedDisabled: false,
    //   productDemoVideoDisabled: true,
    //   icon: "https://dreamdemoassets.blob.core.windows.net/nrf/search.png",
    //   arrowIcon: null,
    //   order: 2,
    //   componentId: 3,
    //   componentName: "videoWIthClickByClick",
    //   video: [
    //     {
    //       id: 1,
    //       name: "Azure Databricks Mirroring in Fabric",
    //       thumbnailImage:
    //         "https://dreamdemoassets.blob.core.windows.net/dataandaidemo/dataScience1.jfif",
    //       navigateUrl:
    //         "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EdU8Amzq0lJIhJGfLRDIHVIByv9mTsScNyZE69_NfJT3oA?e=jE9hoh",
    //     },
    //   ],
    //   dropDownMenu: [
    //     {
    //       id: 1,
    //       text: "Leverage AI to Discover Network and Subscriber Insights",
    //       videoPlayurl:
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/TelcoCopilotVideo_V01/TelcoCopilotVideo_V01.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     // {
    //     //   id: 2,
    //     //   text: "Databricks Integration",
    //     //   videoPlayurl:
    //     //     "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/efd9b9b1-1e81-4009-b4b9-392187332bb7/AzureDatabricksIntegration_V01_2.ism/manifest(format=m3u8-cmaf)",
    //     // },
    //   ],
    //   componentParameters: [
    //     {
    //       key: "video",
    //       value:
    //         // "https://mediasvcprodhealthcare-usw22.streaming.media.azure.net/c4abd415-743f-4eeb-9f7b-31768bd63c56/Unity_Catalogue_Video_V06.ism/manifest",
    //         // "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/d5906b10-9213-46d6-89c8-ae733c8f65d9/Azure_Databricks_Integration_V02.ism/manifest(format=m3u8-cmaf)",
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/TelcoCopilotVideo_V01/TelcoCopilotVideo_V01.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     {
    //       key: "videoType",
    //       value: "clickVideo",
    //     },
    //     {
    //       key: "videoName1",
    //       value: "Leverage AI to Discover Network and Subscriber Insights",
    //     },
    //     // {
    //     //   key: "videoName2",
    //     //   value: "Databricks Integration",
    //     // },
    //     {
    //       key: "videoUrl1",
    //       value:
    //         "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/TelcoCopilotVideo_V01/TelcoCopilotVideo_V01.ism/manifest(format=m3u8-cmaf)",
    //     },
    //     // {
    //     //   key: "videoUrl2",
    //     //   value:
    //     //     "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/efd9b9b1-1e81-4009-b4b9-392187332bb7/AzureDatabricksIntegration_V01_2.ism/manifest(format=m3u8-cmaf)",
    //     // },
    //     {
    //       key: "liveHosted",
    //       value: "https://app.powerbi.com",
    //     },
    //     {
    //       key: "clickByClick",
    //       value:
    //         "https://regale.cloud/microsoft/play/3655/microsoft-fabric-individual-sections-for-web-app-embedding-20#/6/0",
    //     },
    //     {
    //       key: "productDemoVideo",
    //       value:
    //         "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EdU8Amzq0lJIhJGfLRDIHVIByv9mTsScNyZE69_NfJT3oA?e=jE9hoh",
    //     },
    //   ],

    //   externalArrows: [
    //     // {
    //     //   name: "Azure Databricks Backend",
    //     //   icon: "https://nrfcdn.azureedge.net/FinalUpdatedArrow-A.png",
    //     //   link: "https://adb-3218079371877032.12.azuredatabricks.net",
    //     //   openInNewTab: true,
    //     //   topPosition: 70,
    //     //   rightPosition: 100,
    //     // },
    //   ],
    //   personaId: null,
    //   personaName: "Eva",
    //   personaDesignation: "Data Engineer",
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/Eva.png",
    // },

    // {
    //   id: 8,
    //   demoId: 4,
    //   url: "",
    //   name: "Predicting Customer Churn",
    //   icon: "https://dreamdemoassets.blob.core.windows.net/openai/predicting_customer_churn_icon.png",
    //   arrowIcon: null,
    //   demoSubMenus: [
    //     {
    //       id: 3,
    //       url: "/customer-review",
    //       name: "Customer Review",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/customer_review_icon.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "customer review",
    //       componentParameters: [],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "Miguel",
    //       personaDesignation: "Data Scientist",
    //       personaImageUrl:
    //         "https://dreamdemoassets.blob.core.windows.net/openai/Miguel.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/generate-email-campaign",
    //       name: "Generate Email Campaign",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/generate_email_icon.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "generate email campaign",
    //       componentParameters: [],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "Miguel",
    //       personaDesignation: "Data Scientist",
    //       personaImageUrl:
    //         "https://dreamdemoassets.blob.core.windows.net/openai/Miguel.png",
    //     },
    //   ],
    // },
    // {
    //   id: 8,
    //   demoId: 4,
    //   url: "",
    //   name: "Contact Center Manager",
    //   icon: "https://dreamdemoassets.blob.core.windows.net/openai/aoai_2_predicting_churn.png",
    //   arrowIcon: null,
    //   demoSubMenus: [
    //     {
    //       id: 142,
    //       url: "/contact-center-before",
    //       // title: "Contact Center - Before",
    //       name: "Contact Center - Before",
    //       toolTip: "Contact Center - Before",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
    //       arrowIcon: null,
    //       order: 4,
    //       componentId: 2,
    //       componentName: "power bi report",
    //       componentParameters: [
    //         {
    //           id: 301,
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/e798f66a-a55c-42e7-aa5c-d426d3367cba/reports/6ba5d503-ba1f-4a95-aa9f-13660db3134c/ReportSectionda209890a7f0f9e42736?experience=power-bi",
    //           // "https://app.powerbi.com/groups/b012f945-3207-4b33-ae49-4a6da9f02c28/reports/6365cc71-9c17-48d2-9221-68304c84b3cf/ReportSectionda209890a7f0f9e42736?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 3,
    //       personaName: "April",
    //       personaDesignation: "Chief Executive Officer",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/customer-Selection",
    //       name: "Customer Selection",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/reports_icon.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "setup wizard persona",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value: "",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/incoming-call",
    //       name: "Incoming Call",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/left-nav-icons/GM%20menu%20item%203.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "incoming call",
    //       componentParameters: [],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl: null,
    //     },
    //     {
    //       id: 3,
    //       url: "/customer-call-in-progress",
    //       name: "Call in Progress",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/left-nav-icons/GM%20menu%20item%203.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "call in progress",
    //       componentParameters: [],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl: null,
    //     },
    //     {
    //       id: 3,
    //       url: "/customer-call-transcript-analysis",
    //       name: "Call Transcript Analysis",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/openai/call_transcript_analysis_icon.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "Call Transcript Analysis",
    //       componentParameters: [],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "April",
    //       personaImageUrl: null,
    //     },

    //     {
    //       id: 142,
    //       url: "/contact-center-after",
    //       // title: "Contact Center - After",
    //       name: "Contact Center - After",
    //       toolTip: "SCM Persona",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
    //       arrowIcon: null,
    //       order: 4,
    //       componentId: 2,
    //       componentName: "power bi report",
    //       componentParameters: [
    //         {
    //           id: 301,
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/e798f66a-a55c-42e7-aa5c-d426d3367cba/reports/d3c735ea-d6c9-4ed8-aa80-8384ced7b705/ReportSectionda209890a7f0f9e42736?experience=power-bi",
    //           // "https://app.powerbi.com/groups/b012f945-3207-4b33-ae49-4a6da9f02c28/reports/6c39a91a-fe8b-4fb6-ac53-2c801ea50e9b/ReportSectionda209890a7f0f9e42736?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 3,
    //       personaName: "April",
    //       personaDesignation: "Chief Executive Officer",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //   ],
    // },
    // {
    //   url: null,
    //   name: "Power BI Reports by Department",
    //   order: 4,
    //   icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/pbi_reports_icon_updated.png",
    //   arrowIcon: null,
    //   demoSubMenus: [
    //     {
    //       url: "/campaign-report",
    //       name: "Campaign Analytics Report",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/reports_2_icon.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 1,
    //       componentName: "Power BI Report",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/374d73e5-299e-457e-9890-9614e20396e7/reports/311a1785-b790-4987-8f9b-2777e3fb8e42/2ec3641121d4103a81f8?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "Geraldine",
    //       personaDesignation: "Business Analyst / Data Citizen",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Geraldine.png",
    //     },
    //     {
    //       url: "/finance-report",
    //       name: "Finance Report",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/reports_2_icon.png",
    //       arrowIcon: null,
    //       order: 4,
    //       componentId: 1,
    //       componentName: "Power BI Report",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/f497565b-323a-44bb-a07e-6e4024284753/reports/5e08fcaa-280f-4679-97e0-7eca9dcfeaaa/ReportSection?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "Wendy",
    //       personaDesignation: "Business Analyst / Data Citizen",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Wendy.png",
    //     },
    //     {
    //       url: "/operations-report",
    //       name: "Operations Report",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/reports_2_icon.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 1,
    //       componentName: "Power BI Report",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/99c30eaa-3f08-47f3-942c-d208aef797e3/reports/dcf1e734-99f2-4c9d-9091-332cf652d5dd/ReportSection?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "Geraldine",
    //       personaDesignation: "Business Analyst / Data Citizen",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Geraldine.png",
    //     },
    //     {
    //       url: "/network-report",
    //       name: "Network Report",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/reports_2_icon.png",
    //       arrowIcon: null,
    //       order: 1,
    //       componentId: 1,
    //       componentName: "Power BI Report",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/0aa53d12-2996-4d09-ae83-d0a5984912db/reports/4a8d768d-9ecc-49c9-96de-c721d82a70bf/ReportSection?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "Geraldine",
    //       personaDesignation: "Business Analyst / Data Citizen",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/Geraldine.png",
    //     },
    //   ],
    //   componentParameters: [],
    //   externalArrows: [],
    //   componentId: null,
    //   componentName: null,
    //   personaId: null,
    //   personaName: "Wendy",
    //   personaDesignation: "Business Analyst / Data Citizen",
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/Wendy.png",
    // },
    // {
    //   id: 1,
    //   demoId: 4,
    //   url: "",
    //   name: "Demo Finale",
    //   order: 1,
    //   icon: "https://dreamdemoassets.blob.core.windows.net/daidemo/post-fabric-icon.png",
    //   arrowIcon: "",
    //   demoSubMenus: [
    //     {
    //       url: "/executive-dashboard-after",
    //       name: "Executive Dashboard - After",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/nrf/left-nav-icons/dashboard_icon.png",
    //       arrowIcon: null,
    //       order: 3,
    //       componentId: 2,
    //       componentName: "power bi report",
    //       componentParameters: [
    //         // {
    //         //   key: "reportUrl",
    //         //   value:
    //         //     "https://app.powerbi.com/groups/102eb9b7-4dc0-449f-b9cb-e1b9432d00cd/reports/0a875433-9d0a-4806-83de-3cd51f91666b/ReportSection68cb8066934630a72b53?experience=power-bi&clientSideAuth=0",
    //         // },
    //         {
    //           id: 303,
    //           key: "url",
    //           value:
    //             "https://app.powerbi.com/groups/f94bb87b-e748-4eae-9ed6-01313579d374/reports/f1e2b11f-798a-4507-aed9-2702f2a16a44/6f0f2d6c9b170a8d6531?experience=power-bi",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: null,
    //       personaName: "April",
    //       personaDesignation: "Chief Executive Officer",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //     {
    //       id: 3,
    //       url: "/finale-video",
    //       name: "Finale Video",
    //       title: "",
    //       //  icon: "https://dreamdemoassets.blob.core.windows.net/sustainability/images/icon_video.png",
    //       icon: "https://dreamdemoassets.blob.core.windows.net/daidemo/post-fabric-icon.png",
    //       arrowIcon: "",
    //       order: 1,
    //       componentId: 3,
    //       componentName: "Video",
    //       componentParameters: [
    //         {
    //           key: "url",
    //           value:
    //             "https://ep-default-mediakind-common-demo.eastus.streaming.mediakind.com/94bfd4ce-ade5-4310-8343-5977957eb7db/Finale_Telco_Demo_Video_Edited_O.ism/manifest(format=m3u8-cmaf)",
    //         },
    //       ],
    //       externalArrows: [],
    //       personaId: 1,
    //       personaName: "Anna",
    //       personaImageUrl:
    //         "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    //     },
    //   ],
    //   componentParameters: [],
    //   externalArrows: [],
    //   componentId: null,
    //   componentName: null,
    //   personaId: null,
    //   personaName: null,
    //   personaImageUrl:
    //     "https://openaidemoassets.blob.core.windows.net/personas/April.png",
    // },
  ],
  id: 410,
  userId: 85,
  customerId: 374,
  industryId: 1,
  preFillCredentials: true,
  customerName: "Contoso",
  customerEmail: "anna@city.gov.cs",
  name: "Contoso",
  password: "12345",
  title: "Contoso",
  logoImageURL:
    // "https://dreamdemoassets.blob.core.windows.net/nrf/education_top_left_logo_CONTOSO.png",
    // "https://dreamdemoassets.blob.core.windows.net/openai/Sustainability/sustainability_logo.svg",
    "https://dreamdemoassets.blob.core.windows.net/nrf/ContosoLogoForTelcoDemo.svg",
  backgroundImageURL:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_login_background.png",
  // "https://dreamdemoassets.blob.core.windows.net/daidemo/ai_first_event_chatbot_bg.png",
  chatImageLogoURL:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_chat_logo.png",
  backgroundColor: null,
  primaryColor: "#00a1cbff",
  secondaryColor: "#004b76ff",
  headerImageUrl:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/contoso_top_level_header_bg.png",
  headerBgColor: "rgba(97, 160, 4, 1)",
  navImageUrl:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/contoso_left_nav_bg.png",
  navColor: "rgba(97, 160, 4, 1)",
  isFavorite: false,
  description: "Ask me something",
  subTitle: "Contoso",
  color: null,
  isEnabled: true,
  endPointURL: null,
  documents: [],
  campaigns: [
    {
      id: 397,
      name: "Electric Bus",
      imageUrl:
        "https://dreamdemoassets.blob.core.windows.net/sustainability/Input_Bus.png",
      demoId: 410,
      order: 3,
      instagramText:
        "Write an Instagram post for the city Contoso, showcasing their groundbreaking electric bus fleet and its eco-friendly technology and efficiency. The post should include the following: \n1. A captivating headline for the Instagram post. \n2. Use words that convey sustainability and efficiency. \n3. Craft a short paragraph that highlights the bus's features and benefits. \n4. Choose emojis that emphasize eco-friendliness and convenience. \n5. Incorporate relevant hashtags to increase visibility. \n6. The post should have a minimum of 40 words. \nConsidering everything described above, give me an Instagram post having a title, post content with appropriate hashtags and emojis. Close the post with a poem as described above. ",
      emailText:
        "Write an email advertisement for the city of Contoso, showcasing their groundbreaking electric bus fleet. The email should highlight a special promotion of a 20% discount on electric bus tours to celebrate the city's commitment to eco-friendly and efficient public transportation. The email should include the following: \n1. A captivating subject line for the email. \n2. Words that emphasize sustainability and convenient travel. \n3. A brief poem capturing the essence of green mobility. \n4. Include emojis that signify eco-friendliness. \n5. Add relevant hashtags to engage a broader audience. \n6. The email should comprise a minimum of 40 words. \nConsidering everything described above, give me an Instagram post having a title, post content with appropriate hashtags and emojis. Close the post with a poem as described above. ",
      bgPrompt: null,
    },
    {
      id: 396,
      name: "Electric Taxi/Cab",
      imageUrl:
        "https://dreamdemoassets.blob.core.windows.net/sustainability/electric_car_input.png",
      demoId: 410,
      order: 2,
      instagramText:
        "Create an Instagram post for Contoso, featuring their cutting-edge electric taxi/cab service. The post should highlight the eco-conscious and speedy nature of our taxis. Your post should include: \n1. An attention-grabbing headline for the Instagram post. \n2. Use words that convey eco-awareness and speed. \n3. Craft a short paragraph showcasing the taxi's eco-friendly features and efficiency. \n4. Include emojis that emphasize sustainability and performance. \n5. Include relevant hashtags to boost visibility. \n6. Ensure the post contains a minimum of 40 words. \nConsidering everything described above, give me an Instagram post having a title, post content with appropriate hashtags and emojis. Close the post with a poem as described above. ",
      emailText:
        "Write an email advertisement for Contoso, featuring their cutting-edge electric taxi/cab service. The email should highlight a special promotion of a 20% discount on electric taxi/cab tours to celebrate the city's commitment to eco-friendly and efficient public transportation services. The email should include the following: \n1. A captivating subject line. \n2. Use words that convey eco-awareness and speed. \n3. Craft a short message highlighting the discount and the eco-friendly car's features. \n4. Choose emojis that emphasize sustainability and performance. \n5. Incorporate relevant hashtags. \n6. The email should have a minimum of 40 words. \nConsidering everything described above, give me an Instagram post having a title, post content with appropriate hashtags and emojis. Close the post with a poem as described above. ",
      bgPrompt: null,
    },
  ],
  prompt1:
    "What are the five most important insights for effectively marketing to millennials?",
  prompt2:
    "How are the shopping behaviors and preferences of millennials shaping the retail industry?",
  prompt3: "What can we learn and deduce around retaining millennials?",
  questionPlaceHolder:
    "What are the five most important insights for effectively marketing to millennials?",
  iFrames: [],
  userName: "April@contoso.com",
  loginBoxImage:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/New_Contoso/CONTOSO_login_visual.png",
  loginBackground:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_login_background.png",
  // loginBackgroundColor: "#619E07",
  loginTextBoxImage:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/contoso_login_text_box.png",
  disableTitle: true,
  navBarPrimaryColor: "#004b76ff",
  navBarSecondaryColor: "#004b76ff",
  navBarTextColor: "rgba(255, 255, 255, 1)",
  tabPrimaryColor: "#00a1cbff",
  tabSecondaryColor: "#004b76ff",
  dropdownPrimaryColor: "#00a1cbff",
  dropdownSecondaryColor: "#004b76ff",
  scrollBarPrimaryColor: "rgba(255, 255, 255, 0.5)",
  scrollBarSecondaryColor: "#004b76ff",
  pdfUploadApi: null,
  florenceAdApi: null,
  florenceDallEApi: null,
  dalleRegenerateAPI: null,
  dropdownTextColor: null,
  tabTextColor: "rgba(255, 255, 255, 1)",
  chatApproach: null,
  guid: "9fc02dce-55d7-4e23-8007-58566b55e3a1",
  chatCompany: null,
  DELAY_TIME: 2000,
  callCenterReportID: "2621cd34-cf08-4852-b892-a0bffc5e153b",
  callCenterReportSectionName: "ReportSection623b64746831c0065bc0",
  callCenterVideoURL: "",
  callCenterScript: `Meena: Thank you for reaching out to the City Call Center. I'm Meena, and I'm here to assist you. \nBrent: Hi Meena, I'm a concerned resident in the city. I've been hearing about the city's sustainability efforts, particularly related to air quality and green initiatives. Can you tell me more about these? \nMeena: Absolutely, Brent. We take sustainability seriously, and we have some exciting initiatives in place. First, let's talk about air quality. We've introduced a fleet of green buses that run on clean energy sources. These buses are reducing harmful emissions and contributing to cleaner air in the city. \nBrent: That's impressive. What about the sustainable buildings and the green rooftops I've heard about? \nMeena: We're equally committed to sustainable urban planning. Our new buildings incorporate proper ventilation and eco-friendly materials, ensuring better indoor air quality. The green rooftops you mentioned are indeed a part of our efforts. They help retain rainwater, reducing pressure on our drainage systems, and also play a role in temperature regulation, making our city more energy-efficient. \nBrent: It's great to see these efforts. Are there more sustainability initiatives you can tell me about? \nMeena: Of course, Brent. We have an array of programs. Recycling is a big part of our sustainability push. We also encourage urban gardening and work on waste reduction and energy efficiency initiatives. If you'd like more information or want to participate, I can provide you with details. \nBrent: That's fantastic, Meena. I'd love to learn more about the recycling programs and urban gardens. How can I get involved? \nMeena: I can certainly provide you with all the details you need. You can join our urban gardening community and participate in various recycling drives. We appreciate residents like you who actively contribute to our sustainability goals. \nBrent: Thank you, Meena. I'm excited to get involved and support these initiatives. \nMeena: We're delighted to have you on board, Brent. If you have more questions or need further information, please feel free to ask. We're here to assist you. \nBrent: Thank you, Meena. I appreciate your help. Have a great day! \nMeena: You too, Brent! Have a wonderful day, and thank you for your dedication to a greener, healthier city.`,
  callCenterCustomerImage: "customer_gm.png",
  callCenterBackendImage: "backend_gm.png",
  callCenterAgentImage: "agent_gm.png",
  callCenterExtractFromConversationWithKey:
    "Extract the following information from the conversation below:\nCall reason (key: reason) \nCaller name (key: caller_name)\nAgent Name (key: agent_name)\nCaller sentiment (key: caller_sentiment) \nMobile number (key: mobile_number) \nCustomer Plan Type (key: customer_plan_type)\nOffer Value (key: offered_discount) \nTravel Destination (key: travel_destination)\n A short, yet detailed summary (key: summary)\n Please answer in JSON machine-readable format, using the keys from above.If any value is not available, it should be None.Format the output as a JSON object called “results”. Pretty print the JSON and make sure that it is properly closed at the end .",
  callCenterExtractFromConversationWithoutKey:
    // "Generate a summary of the conversation in the following format with proper numbering: \n\n1. Main reason for the conversation.\n2. Sentiment of the customer.\n3. Create a short summary of the conversation.",
    // `Generate a summary of the conversation in the following format with proper numbering: \n1. Main reason for the conversation.\n2. Sentiment of the customer.\n3. How did the agent handle the conversation?\n4. What was the final outcome of the conversation?\n5. Create a short summary of the conversation.\n6. Did the agent request the order number?\n7. What SKU Number did the call correspond to?\n8. What Store ID did the call correspond to?`,
    `Generate a summary of the conversation in the following format with proper numbering: : \n1. What issue is the customer experiencing while traveling? \n2. How did the customer's sentiment change during the conversation?\n3. How did the agent handle the conversation?\n4. What was the final outcome of the conversation?\n5. Create a short summary of the conversation.\n6. What is the standard price of the International Travel Pack offered by the agent? \n7. What discounted price did the agent offer for the International Travel Pack? \n8. What final steps did the agent advise the customer to take to activate the service? `,

  showSettings: true,
  chatContainerBackgroundColor: "rgba(0, 75, 118, 1)",
  isSampleDemo: null,
  landingPageImage:
    "https://dreamdemoassets.blob.core.windows.net/daidemo/New_Contoso/landing_page_visual.png",
  order: 0,
  active: true,
  pdfUploadApi:
    "https://func-search-openai-dev-001-staging.azurewebsites.net/api/pdfindexer",
  florenceAdApi:
    "https://backupclientfunction.azurewebsites.net/api/campaigngenerationv3",
  florenceDallEApi:
    "https://func-recommend-images.azurewebsites.net/api/recommendimages",
  dalleRegenerateAPI:
    "https://func-florence-openai-dev001.azurewebsites.net/api/regenerate-dalle",
  summarizeConversationAPI:
    "https://chatgpttest45.openai.azure.com/daidemo/deployments/text-davinci-003/completions?api-version=2022-12-01",
  summarizeConversationAPIKey: "9dcb9b4900584019ab8f2c23eb8643d7",
  //CALL_CENTER_API: "https://func-call-center.azurewebsites.net/api/",
  CALL_CENTER_API: "https://func-aoai2-demo-prod.azurewebsites.net/api/",

  // endPointURL: "https://func-fabric-aistudio-dev-001.azurewebsites.net/api",
  // endPointURL: "https://enterprise-chatbot-001.azurewebsites.net/api",
  index: "ai-first-mover-index",
  container: "ai-first-mover-container",
  CEODashboardBeforeID: "ec25d000-89b4-42cf-9872-a18aa3068c52",
  CEODashboardBeforeReportID: "34c71953-7092-46be-a1d1-704273b6cbd7",
  CEODashboardBeforeReportSectionName: "e4c992de-6186-4887-a935-a45bcbb47e3a",
  tryYourOwnDataEndpoint:
    "https://enterprise-chatbot-001.azurewebsites.net/api",
  endPointURL: "https://enterprise-chatbot-001.azurewebsites.net/api",
};
