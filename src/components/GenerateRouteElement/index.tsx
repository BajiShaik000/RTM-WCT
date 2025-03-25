import {
  Dashboard,
  DashboardWithReport,
  GenericPopup,
  IFrame,
  Report,
  Video,
  Image,
  LandingPage,
  ArchImage,
  VideoWIthClickByClick,
} from "components";
import { ImageSlideShow } from "components/ImageSlideShow";
import { SettingsContext } from "context";
import { useAppDispatch } from "hooks";
import {
  CallInProgress,
  ChatBot,
  ChatBot2,
  CityView,
  ShoppingSelection,
  SocialMediaCampaign,
  ArchitectureWithTags,
  ChurnPropensity,
  GenerateEmail,
  ArchitectureOverview,
  NewShoppingMTCForAIDesignWins,
  Architecture,
  ProblemStatement,
  Dashboards,
} from "pages";
import { CustomerReview } from "pages/CustomerReview";
import { DemoVideo } from "pages/DemoVideo";
import { IncomingCall } from "pages/IncomingCall";
import { KPIS } from "pages/KPIS";
import { NewShoppingCopilotForAIDesignWins } from "pages/NewShoppingCopilotForAIDesignWins";
import { NewWebsite } from "pages/NewWebsite";
import { NewWebsiteShoppingCopilot } from "pages/NewWebsiteShoppingCopilot";
import { OldWebsite } from "pages/OldWebsite";
//import { NewReimagined } from "pages/NewReimagined";
import { PredictChurn } from "pages/PredictChurn";
import { ReImaginedNewWebsite } from "pages/ReImaginedNewWebsite";
import { ReImaginedNewWebsiteScope } from "pages/ReImaginedNewWebsiteScope";
import { SetupWizardPersona } from "pages/SetupWizardPersona";
import { ShoppingCopilotMTC } from "pages/ShoppingCopilotMTC";
import { ThankYou } from "pages/ThankYou";
import React, { FC, useContext, useEffect } from "react";
import { setPersona, setTimeline } from "store";
import { PageType } from "types";
import { getPowerBIData } from "utilities";

interface Props {
  data: any;
}

const { landingPageImage } = window.config;

export const GenerateRouteElement: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPersona(data?.personaImageUrl));
    dispatch(setTimeline(data?.componentParameters?.timeline));
  }, [data, dispatch]);
  let url = "";
  if (data.componentParameters.url === undefined)
    url = data.componentParameters[0]?.value;
  else url = data.componentParameters.url;
  switch (data.componentName.toLowerCase()) {
    case "power bi report":
      const powerBIData = getPowerBIData(url);
      return data.componentParameters.isPopup ? (
        <GenericPopup data={data}>
          <Report
            // apiUrl={data.componentParameters.api}
            id={powerBIData?.id}
            pageTitle={data?.name}
            pageType={data?.name}
            name={powerBIData?.section}
            url={url}
            background={data?.componentParameters?.background}
          />
        </GenericPopup>
      ) : (
        <Report
          // apiUrl={data.componentParameters.api}
          id={powerBIData?.id}
          pageTitle={data?.name}
          pageType={data?.name}
          name={powerBIData?.section}
          url={url}
          background={data?.componentParameters?.background}
        />
      );

    case "enriching customer data":
      return <ChurnPropensity />;

    case "predict churn":
      return <PredictChurn />;

    case "generate email campaign":
      return <GenerateEmail />;

    case "power bi dashboard":
      const powerBIDashboardData = getPowerBIData(data.componentParameters.url);
      const powerBIReportData: any = data.componentParameters?.reportUrl
        ? getPowerBIData(data.componentParameters.reportUrl)
        : {};

      return data.componentParameters?.reportUrl ? (
        data.componentParameters.isPopup ? (
          <GenericPopup data={data}>
            <DashboardWithReport
              // apiUrl={data.componentParameters.api}
              dashboardId={powerBIDashboardData?.id}
              dashboardImage={data.componentParameters.image}
              topReportId={powerBIReportData?.id}
              topReportName={powerBIReportData?.section}
              pageTitle={data.name}
              pageType={data.name}
              url={data.componentParameters.url}
              reportUrl={data.componentParameters.reportUrl}
            />
          </GenericPopup>
        ) : (
          <DashboardWithReport
            // apiUrl={data.componentParameters.api}
            dashboardId={powerBIDashboardData?.id}
            dashboardImage={data.componentParameters.image}
            topReportId={powerBIReportData?.id}
            topReportName={powerBIReportData?.section}
            pageTitle={data.name}
            pageType={data.name}
            url={data.componentParameters.url}
            reportUrl={data.componentParameters.reportUrl}
          />
        )
      ) : data.componentParameters.isPopup ? (
        <GenericPopup data={data}>
          <Dashboard
            // apiUrl={data.componentParameters.api}
            id={powerBIDashboardData?.id}
            dashboardImage={data.componentParameters.image}
            pageTitle={data.name}
            pageType={data.name}
            url={data.componentParameters.url}
          />
        </GenericPopup>
      ) : (
        <Dashboard
          // apiUrl={data.componentParameters.api}
          id={powerBIDashboardData?.id}
          dashboardImage={data.componentParameters.image}
          pageTitle={data.name}
          url={data.componentParameters.url}
          pageType={data.name}
        />
      );
    case "image":
      return data.componentParameters?.isPopup ? (
        <GenericPopup data={data}>
          <Image
            src={data.componentParameters.url}
            pageTitle={data.name}
            pageType={data.name}
            originalSize={data.componentParameters.originalSize}
            backgroundImage={data?.componentParameters?.backgroundImage}
          />
        </GenericPopup>
      ) : (
        <Image
          src={data.componentParameters.url}
          pageTitle={data.name}
          pageType={data.name}
          originalSize={data.componentParameters.originalSize}
          backgroundImage={data?.componentParameters?.backgroundImage}
        />
      );

    case "video":
      return data.componentParameters?.isPopup ? (
        <GenericPopup data={data}>
          <Video
            autoPlay={data.componentParameters?.autoPlay ?? false}
            src={data.componentParameters.url}
            pageTitle={data.title}
            pageType={data.name}
            videoTag={data?.videoTag}
          />
        </GenericPopup>
      ) : (
        <Video
          autoPlay={data.parameters?.autoPlay ?? false}
          src={data.componentParameters.url}
          pageTitle={data.title}
          pageType={data.name}
          videoTag={data?.videoTag}
          liveHosted={data?.componentParameters?.liveHosted}
          productDemoVideo={data?.componentParameters?.productDemoVideo}
        />
      );
    case "videowithclickbyclick":
      return data.componentParameters?.isPopup ? (
        <GenericPopup data={data}>
          <VideoWIthClickByClick
            autoPlay={data.componentParameters?.autoPlay ?? false}
            videoSrc={data.componentParameters.video}
            clickByClickURL={data.componentParameters.clickByClick}
            pageTitle={data.title}
            pageType={data.name}
            videoType={data?.componentParameters?.videoType}
            videoTag={data?.videoTag}
            productDemoVideoDisabled={data?.productDemoVideoDisabled}
            videoDisabled={data?.videoDisabled}
            clickbyclickDisabled={data?.clickbyclickDisabled}
            liveHostedDisabled={data?.liveHostedDisabled}
            videoDetails={data.componentParameters}
            videoArray={data.video}
            dropDownMenu={data.dropDownMenu}
            selectedItem={data.dropDownMenu[0]}
          />
        </GenericPopup>
      ) : (
        <VideoWIthClickByClick
          autoPlay={data.parameters?.autoPlay ?? false}
          videoSrc={data.componentParameters.video}
          clickByClickURL={data.componentParameters.clickByClick}
          pageTitle={data.title}
          pageType={data.name}
          videoTag={data?.videoTag}
          videoType={data?.componentParameters?.videoType}
          liveHosted={data?.componentParameters?.liveHosted}
          productDemoVideo={data?.componentParameters?.productDemoVideo}
          slider={data.componentParameters?.slider}
          productDemoVideoDisabled={data?.productDemoVideoDisabled}
          videoDisabled={data?.videoDisabled}
          clickbyclickDisabled={data?.clickbyclickDisabled}
          liveHostedDisabled={data?.liveHostedDisabled}
          videoDetails={data.componentParameters}
          videoArray={data.video}
          dropDownMenu={data.dropDownMenu}
          selectedItem={data.dropDownMenu[0]}
        />
      );
    case "iframe":
      return data.componentParameters?.isPopup ? (
        <GenericPopup data={data}>
          <IFrame
            url={data.componentParameters.url}
            pageTitle={data.name}
            pageType={data.name}
          />
        </GenericPopup>
      ) : (
        <IFrame
          url={data.componentParameters.url}
          pageTitle={data.name}
          pageType={data.name}
        />
      );

    case "landing page":
      return (
        <LandingPage
          pageTitle="Landing Page"
          pageType={PageType.LandingPage}
          src={landingPageImage}
        />
      );

    case "beach view":
    case "city view":
      return <CityView />;

    case "chat bot":
      return (
        <ChatBot2
          key={data?.componentParameters}
          componentParameters={data?.componentParameters}
        />
      );
    case "archimage":
      return (
        <ArchImage
          src={data.componentParameters.url}
          pageTitle={data.name}
          pageType={data.name}
          originalSize={data.componentParameters.originalSize}
          backgroundImage={data?.componentParameters?.backgroundImage}
        />
      );
    case "setup wizard persona":
      return <SetupWizardPersona />;
    case "incoming call":
      return <IncomingCall />;
    case "call in progress":
      return <CallInProgress />;
    case "thank you":
      return <ThankYou />;
    case "architecture":
      return <Architecture />;
    case "problem statement":
      return <ProblemStatement />;
    case "dashboard":
      return <Dashboards />;
    case "demo video":
      return <DemoVideo />;
    case "kpi":
      return <KPIS />;
    case "customer review":
      return (
        <CustomerReview liveHosted={data?.componentParameters?.liveHosted} />
      );
    case "old website":
      return <OldWebsite />;
    case "reimagined new website":
      return <ReImaginedNewWebsite />;
    case "reimagined website with scaling":
      return <ReImaginedNewWebsiteScope />;
    case "shopping copilot":
      return <ShoppingCopilotMTC />;
    case "shopping selection":
      return <ShoppingSelection />;
    case "social media campaign":
      return <SocialMediaCampaign />;
    // case "new shopping copilot for ai design wins":
    //   return <NewShoppingCopilotForAIDesignWins />;
    case " new shopping selection":
      return <ShoppingSelection />;
    case "new shopping mtc for ai design wins":
      return <NewShoppingMTCForAIDesignWins />;

    case "architecture overview":
      return (
        <ArchitectureOverview
          tabData={data.componentParameters.tabData}
          pageTitle={data.name}
          pageType={data.name}
        />
      );

    case "reimagined":
      return <NewWebsite scaling />;

    case "kubernates highlights":
      return (
        <ImageSlideShow
          src="https://dreamdemoassets.blob.core.windows.net/appspluscosmos/Kuberenetes_highlights"
          pageType={data.name}
          pageTitle="Azure Kubernetes Highlights"
          count={39}
        />
      );

    case "azuredb":
      return (
        <ImageSlideShow
          src="https://dreamdemoassets.blob.core.windows.net/dataandaidemo"
          pageType={data.name}
          pageTitle="Azure Kubernetes Highlights"
          count={16}
        />
      );
    case "architecture with tags":
      return (
        <ArchitectureWithTags
          pageTitle={data.name}
          pageType={data.name}
          videoURL={data.componentParameters.url}
          tags={data.componentParameters?.tags}
        />
      );
    case "custom landing page":
      return (
        <LandingPage
          src={data.componentParameters.innerImageUrl}
          pageTitle={data.name}
          pageType={data.name}
          originalSize={data.componentParameters.originalSize}
          backgroundImage={data?.componentParameters?.url}
        />
      );
    default:
      return <></>;
  }
};
