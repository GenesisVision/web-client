import "./cookie-message.scss";

import React, { useCallback, useEffect, useState } from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { getCookie, setCookie } from "utils/cookie";

const ACCEPT_PARAM_NAME = "ACCEPTCONSENT";

const CookieMessage: React.FC = () => {
  const [hasAcceptance, setAcceptance] = useState(true);
  useEffect(() => {
    const cookie = getCookie(ACCEPT_PARAM_NAME);
    if (!cookie) setAcceptance(false);
  }, [hasAcceptance]);
  const handleClick = useCallback(() => {
    setCookie(ACCEPT_PARAM_NAME, "y");
    setAcceptance(true);
  }, [hasAcceptance]);
  if (hasAcceptance) return null;
  return (
    <div className="cookie-message">
      <div className="cookie-message__container">
        <p className="cookie-message__text">
          This website uses cookies. By continuing to use this website, you
          consent to our use of these cookies.{" "}
          <a
            title={"Read privacy policy"}
            href="/privacy-policy"
            target="_blank"
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
