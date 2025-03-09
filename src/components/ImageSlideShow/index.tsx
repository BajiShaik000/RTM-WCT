import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "hooks";
import { setPageTitle, setPageType } from "store";
import { PageType } from "types";
import { useLocation } from "react-router-dom";

interface Props {
  pageTitle: string;
  pageType: PageType;
  src: string;
  className?: string;
  count?: number;
}

export const ImageSlideShow: FC<Props> = ({
  pageTitle,
  pageType,
  src,
  className,
  count,
}) => {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(1);
  const location = useLocation();
  useEffect(() => {
    dispatch(setPageType(pageType));
    dispatch(setPageTitle(pageTitle));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCurrentIndex(1);
  }, [location.pathname]);

  return (
    <div key={pageType} className={`${styles.container} ${className}`}>
      <div key={pageType} className={`${styles.subContainer} ${className}`}>
        {currentIndex !== 1 && (
          <img
            className={styles.prevArrow}
            onClick={() => setCurrentIndex((old) => old - 1)}
            src="https://dreamdemoassets.blob.core.windows.net/nrf/left_arrow.png"
            alt="previous"
          />
        )}
        {currentIndex !== count && (
          <img
            className={styles.nextArrow}
            onClick={() =>
              currentIndex !== count && setCurrentIndex((old) => old + 1)
            }
            src="https://dreamdemoassets.blob.core.windows.net/nrf/right_arrow.png"
            alt="next"
          />
        )}
        <img
          src={`${src}/${currentIndex}.png`}
          alt={pageTitle}
          className={styles.image}
        />
      </div>
    </div>
  );
};
