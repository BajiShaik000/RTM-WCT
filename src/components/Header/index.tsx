import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks";
import styles from "./styles.module.scss";
import { Helmet } from "react-helmet";
import { Button } from "@progress/kendo-react-buttons";
import Image from "./MediGuard.avif";
import WCT from "./WCT.png";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const { headerImageUrl, headerBgColor, logoImageURL, disableTitle, title } =
  window.config;

export const Header: FC<Props> = ({ expanded, setExpanded }) => {
  const { BlobBaseUrl } = window.config;
  const { pageTitle, persona, timeline, ActiveTileGlobally } = useAppSelector(
    (state) => state.config
  );

  const navigate = useNavigate();

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Helmet>
        <title>MediGuard Assurance</title>
      </Helmet>
      <AppBar className={styles.appBar} style={{}}>
        <AppBarSection>
          <div
            className={styles.logo}
            onClick={() => navigate(`/legal-notice`)}
          >
            <img src={Image} alt="logo" />
            {!disableTitle && (
              <p
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: 600,
                  marginBottom: 0,
                }}
              >
                {title?.toUpperCase()}
              </p>
            )}
          </div>
        </AppBarSection>
        <h4 style={{ marginLeft: "10px" }}>MediGuard Assurance</h4>
        <AppBarSpacer />

        {/* <div className={styles.selectedComponentsText}>
          {ActiveTileGlobally}
        </div> */}

        {/* {persona && (
          <AppBarSection>
            <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
              <Avatar type="image" className={styles.avatar} size="large">
                <img src={persona} alt="persona" />
              </Avatar>
            </button>
          </AppBarSection>
        )} */}
        <AppBarSection>
          <NavLink to="https://waferwire.com/" target="_blank">
            <img
              src={WCT}
              alt="WCT"
              style={{
                padding: "3px",
                paddingBottom: "5px",
              }}
            />
          </NavLink>
          {/* <NavLink
            to="/logout"
            className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
          >
            Sign Out
            {/* <img
              src={`${BlobBaseUrl}header_icon_logout.png`}
              alt="header_icon_logout"
            /> */}
          {/* </NavLink>  */}
        </AppBarSection>
      </AppBar>
    </>
  );
};
