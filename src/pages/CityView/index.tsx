import { useAppDispatch, useNav } from "hooks";
import { FC, useContext, useEffect } from "react";
import { setPageType, setPageTitle } from "store";
import { PageType } from "types";
import { urlify } from "utilities";
import styles from "./styles.module.scss";
import { SettingsContext } from "context";

const { BlobBaseUrl } = window.config;

export const CityView: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPageType(PageType.CityView));
    dispatch(setPageTitle("Miami Beach"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
    <div className={styles.subContainer}>
      <div className={styles.pulsatingCircle}>
        <a href={"#/executive-dashboard-before"}>
          <img
            className={styles.animatedIcon}
            src={`${BlobBaseUrl}miami_heart.gif`}
            alt=""
          />
        </a>
      </div>
      <img
        src={`${BlobBaseUrl}IoT_Network.png`}
        alt="Miami Beach"
        className={styles.image}
      />
    </div>
    </div>
  );
};
