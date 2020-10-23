import LPButton from "pages/landing-page/components/lp-button/lp-button";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { $landingBg, $mainColor, $primaryColor } from "utils/style/colors";
import { landingContainer, landingResetLink } from "utils/style/mixins";

import { setAccept } from "./cookie-message.helpers";

interface Props {
  cookieAccept?: string;
}

const Block = styled.div`
  padding: 30px 0;
  background-color: ${$landingBg};
  box-shadow: 0 -23px 32px -31px ${$primaryColor}bf;
  position: fixed;
  width: 100%;
  bottom: 0;
  color: ${$mainColor};
  z-index: 3;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${landingContainer};
`;

const Text = styled.p`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledA = styled.a`
  color: ${$primaryColor};
  ${landingResetLink}
`;

const CookieMessage: React.FC<Props> = ({ cookieAccept }) => {
  const [hasAcceptance, setAcceptance] = useState(!!cookieAccept);
  const handleClick = useCallback(() => {
    setAccept("y");
    setAcceptance(true);
  }, []);
  if (hasAcceptance) return null;
  return (
    <Block>
      <Container>
        <Text>
          This website uses cookies. By continuing to use this website, you
          consent to our use of these cookies.{" "}
          <StyledA
            title={"Read privacy policy"}
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find out more
          </StyledA>
        </Text>
        <LPButton onClick={handleClick}>I agree</LPButton>
      </Container>
    </Block>
  );
};

export default CookieMessage;
