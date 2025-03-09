import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import {
  ChevronLeft28Filled,
  ChevronRight28Filled,
  Dismiss28Filled,
} from "@fluentui/react-icons";
import { useAppDispatch, useArrows, useNav } from "hooks";
import { setShoppingGender, setShoppingStyle } from "store";
import { urlify } from "utilities";

const GROUPS = [
  {
    id: 2,
    lookName: "Wedding Collection",
    products: [
      {
        name: "Women’s Lemon Dress",
        price: "$199",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_3_1.svg",
      },
      {
        name: "Women’s Lemon Handbag",
        price: "$89",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_3_2.svg",
      },
      {
        name: "Women’s High Heels",
        price: "$80",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_3_3.svg",
      },
    ],
  },
  {
    id: 1,
    lookName: "Office Collection",
    products: [
      {
        name: "Women’s Blazer Cream",
        price: "$200",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_1_1.svg",
      },
      {
        name: "Women's Trousers",
        price: "$170",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_1_2.svg",
      },
      {
        name: "Women's High Heels",
        price: "$110",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_1_3.svg",
      },
    ],
  },

  {
    id: 3,
    lookName: "Summer and Beach Wear",
    products: [
      {
        name: "Men’s Casual Shirt",
        price: "$49",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_2_3_v2.png",
      },
      {
        name: "Men’s Shorts",
        price: "$170",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_2_4_v2.png",
      },
      {
        name: "Men’s Sunglasses",
        price: "$39",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_2_3.svg",
      },
    ],
  },
  {
    id: 4,
    lookName: "Evening Wear",
    products: [
      {
        name: "Men’s Button Down Shirt",
        price: "$180",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_4_1.svg",
      },
      {
        name: "Men’s Trousers",
        price: "$200",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_4_2.svg",
      },
      {
        name: "Men’s Formal Shoes",
        price: "$80",
        image:
          "https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_look_4_4.svg",
      },
    ],
  },
];

export const ShoppingSelection: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedCard, setSelectedCard] = useState<number | null>(2);
  const handleGroupButtonClick = (groupId: number) => {
    setSelectedCard(groupId);

    switch (groupId) {
      case 2:
        dispatch(setShoppingStyle("casual"));
        dispatch(setShoppingGender("female"));
        break;
      case 1:
        dispatch(setShoppingStyle("formal"));
        dispatch(setShoppingGender("female"));
        break;
      case 3:
        dispatch(setShoppingStyle("casual"));
        dispatch(setShoppingGender("male"));
        break;
      case 4:
        dispatch(setShoppingStyle("formal"));
        dispatch(setShoppingGender("male"));
        break;
    }

    // if (groupId === 1 || groupId === 2) dispatch(setShoppingGender("female"));
    // else dispatch(setShoppingGender("male"));

    // const groupImages =
    //   imageGroups.find((group) => group.id === groupId)?.images || [];
    // setSelectedImages(groupImages);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.title}>What’s in your Wardrobe?</div>
        <div className={styles.cardContainer}>
          {GROUPS.map((g) => (
            <div
              className={`${styles.card} ${
                g.id === selectedCard && styles.selectedCard
              }`}
              onClick={() => handleGroupButtonClick(g.id)}
            >
              <div className={styles.productContainer}>
                <div className={styles.mainProduct}>
                  <div className={styles.cardTitle}>{g.lookName}</div>
                  <div className={styles.svgContainer}>
                    {" "}
                    <img src={g.products[0].image} alt={g.products[0].name} />
                  </div>
                  <div className={styles.data}>
                    <span>{g.products[0].name}</span>
                    <span className={styles.price}>{g.products[0].price}</span>
                  </div>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.additionalProducts}>
                  {g.products.slice(1, 3).map((p) => (
                    <div className={styles.product}>
                      <div className={styles.svgOtherProductContainer}>
                        {" "}
                        <img src={p.image} alt={p.name} />
                      </div>
                      <div className={styles.data}>
                        <p>{p.name}</p>
                        <p className={styles.price}>{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
