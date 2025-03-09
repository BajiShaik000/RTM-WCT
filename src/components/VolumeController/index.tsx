import { Slider, SliderChangeEvent } from "@progress/kendo-react-inputs";
import { FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  volume: number;
  mute: boolean;
  onMuteChange(isMute: boolean): void;
  onVolumeChange(volume: number): void;
}

const { BlobBaseUrl } = window.config;

export const VolumeController: FC<Props> = ({
  mute,
  onMuteChange,
  onVolumeChange,
  volume,
}) => {
  const getVolumeSliderValue = ({ value }: SliderChangeEvent) => {
    onVolumeChange(value / 100);
  };

  return (
    <div className={styles.position}>
      <div
        className={styles.mute}
        onClick={() => {
          onMuteChange(!mute);
        }}
      >
        {mute ? (
          <img src={`${BlobBaseUrl}mute-icon.png`} alt="" />
        ) : (
          <img src={`${BlobBaseUrl}sound-icon.png`} alt="" />
        )}
      </div>
      <Slider
        value={volume * 100}
        onChange={getVolumeSliderValue}
        step={5}
        defaultValue={20}
        min={0}
        max={100}
        className={styles.slider}
      />
    </div>
  );
};
