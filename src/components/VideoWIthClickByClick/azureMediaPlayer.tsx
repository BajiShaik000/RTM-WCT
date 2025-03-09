import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.scss";

interface Props {
  src?: string;
  style?: CSSProperties;
  autoPlay: boolean;
  setIsEnded?: Dispatch<SetStateAction<boolean>>;
}

export const AzureMediaPlayer: FC<Props> = ({
  src,
  style,
  autoPlay,
  setIsEnded,
}) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  const myOptions = {
    autoPlay,
    controls: true,
    width: "100%",
    height: "100%",
    hotKeys: {
      volumeStep: 50,
    },
    logo: { enabled: false },
  };

  // can add customization to skins if needed
  const skin = "amp-default";

  useEffect(() => {
    if (!loaded) {
      const linkTag = document.createElement("link");
      linkTag.rel = "stylesheet";
      linkTag.href = `//amp.azure.net/libs/amp/latest/skins/${skin}/azuremediaplayer.min.css`;
      const script = document.createElement("script");
      script.src = "//amp.azure.net/libs/amp/latest/azuremediaplayer.min.js";
      script.async = true;
      script.onload = () => ref.current && setLoaded(true);
      document.head.insertBefore(linkTag, document.head.firstChild);
      document.body.appendChild(script);
    }
  }, [loaded, ref]);

  useEffect(() => {
    if (ref.current && loaded) {
      // @ts-ignore
      const myPlayer = amp("azuremediaplayer", myOptions);
      myPlayer.src([
        {
          src,
          type: "application/vnd.ms-sstr+xml",
          protectionInfo: [{ type: "AES" }],
        },
      ]);
      myPlayer.addEventListener("ended", () => {
        setIsEnded?.(true);
      });
      return () => {
        ref.current = null;
        myPlayer.dispose();
      };
    }
    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, ref]);

  return (
    <>
      <div className={styles.azureMediaPlayerWrapper} style={style}>
        {!loaded && (
          <p className={styles.text}>Downloading Azure Media Service Client</p>
        )}
        <video
          ref={ref}
          id="azuremediaplayer"
          className="azuremediaplayer amp-default-skin amp-big-play-centered"
        >
          Your browser does not support HTML5 videos.
        </video>
      </div>
    </>
  );
};
