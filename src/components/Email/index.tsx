import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@progress/kendo-react-buttons";

export function EmailPopup({
  email,
  headerImage,
  footerImage,
  bodyImage,
}: {
  email: string;
  headerImage: string;
  footerImage: string;
  bodyImage: string;
}) {
  return (
    <div className={styles.outerDiv}>
      <div className={styles.header}>
        <img
          // src="https://dreamdemoassets.blob.core.windows.net/nrf/contoso.PNG"
          src="https://dreamdemoassets.blob.core.windows.net/nrf/contoso_email_logo.png"
          alt="Contoso logo"
          style={{ borderRadius: 8, marginLeft: 8 }}
        />
        <hr />
        <img style={{ width: "100%" }} src={headerImage} alt="Contoso logo" />
      </div>

      <div className={styles.content}>
        <img src={bodyImage} alt="body" />
        <div
          style={{ fontSize: 10 }}
          // dangerouslySetInnerHTML={{ __html: email }}
        >
          <p style={{ marginBottom: "4px" }}>
            Subject: Exclusive Offer Just for You{" "}
          </p>

          <p style={{ marginBottom: "4px" }}>Dear Mr. Williams, </p>

          <p style={{ marginBottom: "4px" }}>
            {/* I hope this message finds you well. On behalf of Contoso Telecom, We
            would like to extend a special offer just for you. We understand how
            essential reliable communication is when you’re traveling abroad,
            and we sincerely hope you choose us for your future needs.{" "} */}
            Thank you for being a valued Contoso Mobile customer! As a loyal
            customer, we would like to extend a special offer just for you. We
            understand how essential reliable communication is when you’re
            traveling abroad, and we sincerely hope you choose us for your
            future needs.
          </p>

          <p style={{ marginBottom: "4px" }}>
            {/* As a token of our appreciation for your patience and understanding,
            we are pleased to offer you an exclusive 40% discount on your next
            purchase or service with us. To redeem this offer, please use the
            coupon code WELCOME40 at checkout 🛍️ or mention it to our customer
            service representative when you make your next purchase. */}
            As a token of our appreciation for your patience and understanding,
            we are pleased to offer you an exclusive 40% discount on your next
            purchase or service with us. To redeem this offer, use the coupon
            code WELCOME40 at checkout or mention it to our customer service
            representative when you make your next purchase.
          </p>

          <p style={{ marginBottom: "2px" }}>Warm regards, </p>

          <p>Contoso Mobile </p>
        </div>
        {/* <a href="#" className={styles.button}>
            SHOP NOW
          </a> */}
      </div>
      <div style={{ margin: 12 }}>
        <img src={footerImage} style={{ width: "100%" }} alt="Contoso logo" />
      </div>
    </div>
  );
}

export function EmailPopupWrapper({
  email,
  showEditor = false,
  onSend,
  disableSend = false,
  onCancel,
  isFull,
}: {
  email: any;
  showEditor?: boolean;
  onSend?: any;
  onCancel?: any;
  disableSend?: boolean;
  isFull?: boolean;
}) {
  const [textareaValue, setTextareaValue] = useState(
    "We have a fantastic promotional offer just for you! Please check your inbox for all the details."
  );
  return (
    email?.email && (
      <React.Fragment>
        <div
          className={styles.wrapper}
          style={{
            height: isFull
              ? "100%"
              : email.prediction.toLowerCase().includes("not")
              ? "calc(100%)"
              : "100%",
          }}
        >
          {email.prediction.toLowerCase().includes("not") ? (
            <EmailPopup
              email={email.email}
              bodyImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_-_email_footer_new_1.jpg"
              headerImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_letsTogether.png"
              footerImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_body_new_1.png"
            />
          ) : (
            <EmailPopup
              email={email.email}
              bodyImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_-_email_footer_new_1.jpg"
              headerImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_somethingJustForYou.png"
              footerImage="https://dreamdemoassets.blob.core.windows.net/daidemo/aoai_2_body_new_1.png"
            />
          )}
          {showEditor && (
            <div className={styles.textAreaContainer}>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Type your message here..."
                className={styles.textarea}
              />
              <div className={styles.buttonContainer}>
                <Button
                  onClick={() => {
                    onSend?.(textareaValue);
                  }}
                  className={`${styles.button} ${
                    disableSend && styles.disableBtn
                  }`}
                  disabled={disableSend}
                  themeColor="primary"
                >
                  Send
                </Button>
                <Button
                  themeColor="primary"
                  fillMode="outline"
                  onClick={() => onCancel?.()}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  );
}
