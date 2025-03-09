import React from "react";
import styles from "./styles.module.scss";
const VideoProductCard = () => {
  const products = [
    {
      id: 1,
      name: "End-to-end AI powered solution development",

      videoUrl:
        "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EV0vNT4ws2NEsMYyN5BoSxgBJeW2oQJuaPXuakLoZIRHWQ?e=DgCliN",
    },
    {
      id: 2,
      name: "AI Powered Analytics",

      videoUrl:
        "https://microsoft.sharepoint.com/:v:/t/Demochamp868/EblKYhCku7VAqSCogiUO9xUB8Jo-7Y1Ww6y3AYg5qvrDQQ?e=ZYExcB",
    },
  ];
  function handleOnclick(url: string) {
    window.open(url);
  }

  return (
    <div className={styles.productCardContainer}>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => {
              handleOnclick(product.videoUrl);
            }}
          >
            <video width="90%" height="200px" controls>
              <source src={product.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3>{product.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default VideoProductCard;
