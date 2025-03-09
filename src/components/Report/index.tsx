import { FC, useEffect, useState } from "react";
import { height, width } from "common";
import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { EmbedType, PageType } from "types";
import { PowerBiService } from "utilities";
import styles from "./styles.module.scss";

interface Props {
  pageType: PageType | any;
  pageTitle: string;
  id: string;
  name?: string;
  background?: "transparent" | "black" | "white";
  reportWithoutName?: boolean;
  removeBackArrow?: boolean;
  apiUrl?: string;
  url?: string;
}

const { APIUrl } = window.config;

export const Report: FC<Props> = ({
  id,
  pageType,
  name,
  pageTitle,
  background = "white",
  reportWithoutName = false,
  apiUrl,
  removeBackArrow = true,
  url,
}) => {
  const [reportLoading, setReportLoading] = useState(false);
  const dispatch = useAppDispatch();

  const PowerBiServiceInstance = new PowerBiService(apiUrl ?? APIUrl);

  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reportLoading) {
      return;
    }

    setReportLoading(true);
    try {
      if (reportWithoutName) {
        PowerBiServiceInstance.load(
          id,
          {
            type: EmbedType.Report,
            elementId: id,
            height,
            width,
          },
          url
        );
      } else {
        if (name) {
          PowerBiServiceInstance.load(
            id,
            {
              type: EmbedType.Report,
              elementId: name,
              pageName: name,
              height,
              width,
            },
            url
          );
        } else {
          PowerBiServiceInstance.load(
            id,
            {
              type: EmbedType.Dashboard,
              elementId: id,
              height,
              width,
            },
            url
          );
        }
      }

      setReportLoading(false);
    } catch (error) {
      setReportLoading(false);
    }
  }, [reportLoading, pageType, name, id, reportWithoutName]);

  useEffect(() => {
    if (reportLoading || !name) {
      return;
    }
    PowerBiServiceInstance.switchPage(id, name);
  }, [reportLoading, name, id, PowerBiServiceInstance]);

  return (
    <div key={id + name} className={`${styles.container} ${name}`}>
    <div key={id + name} className={`${styles.subContainer}`}>
      {id !== "" && (
        <div
          key={name}
          id={name ?? id}
          className={`${styles.report} ${styles[background]}`}
        />
      )}
    </div>
    </div>
  );
};
