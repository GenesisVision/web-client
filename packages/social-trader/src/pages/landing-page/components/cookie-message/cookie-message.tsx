import LPButton from "pages/landing-page/components/lp-button/lp-button";
import React, { useCallback, useState } from "react";

import { setAccept } from "./cookie-message.helpers";
import styles from "./cookie-message.module.scss";

interface Props {
  cookieAccept?: string;
}

const CookieMessage: React.FC<Props> = ({ cookieAccept }) => {
  const [hasAcceptance, setAcceptance] = useState(!!cookieAccept);
  const handleClick = useCallback(() => {
    setAccept("y");
    setAcceptance(true);
  }, []);
  if (hasAcceptance) return null;
  return (
    <div className={styles["cookie-message"]}>
      <div className={styles["cookie-message__container"]}>
        <p className={styles["cookie-message__text"]}>
          This website uses cookies. By continuing to use this website, you
          consent to our use of these cookies.{" "}
          <a
            title={"Read privacy policy"}
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find out more
          </a>
        </p>
        <LPButton onClick={handleClick}>I agree</LPButton>
      </div>
    </div>
  );
};

export default CookieMessage;
