import { Center } from "components/center/center";
import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { HOME_ROUTE } from "routes/app.routes";
import styled from "styled-components";
import {
  $panelBackgroundColor,
  $secondaryBackgroundColor
} from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapePhone,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "utils/style/media";
import {
  $borderRadius,
  $fontSizeCommon,
  $fontSizeH2,
  $paddingBig,
  $paddingLarge,
  $paddingMedium,
  $paddingSmall,
  $paddingXlarge,
  $paddingXsmall,
  $paddingXxlarge
} from "utils/style/sizes";

import background from "../../../../media/bgnd.svg";
import { ILoginFooterProps } from "../login-footer/login-footer";

interface Props extends OwnProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  footerAuthRoute: string;
  titleKey: string;
  children: React.ReactChild;
  quoteNo: number;
}

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${background}) no-repeat bottom;
  background-size: 100%;

  ${mediaBreakpointLandscapePhone(`
     padding: ${$paddingXsmall}px;
  `)}
  ${mediaBreakpointLandscapeTablet(`
    padding: ${$paddingLarge}px 0;
    flex-direction: row;
    align-items: inherit;
  `)}
  ${mediaBreakpointDesktop(`
    padding: ${$paddingXlarge}px ${$paddingXxlarge}px;
    justify-content: space-between;
  `)}
`;

const Left = styled.div`
  padding: ${$paddingSmall} 0;
  ${mediaBreakpointLandscapeTablet(`
      min-height: 600px;
      padding-left: ${$paddingMedium}px;
    `)}
  ${mediaBreakpointDesktop(`
      padding-left: 0;
    `)}
`;

const Right = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 340px;
  background-color: ${$panelBackgroundColor};
  border-radius: ${$borderRadius}px;
  ${mediaBreakpointTablet(`
      min-width: 460px;
  `)}
  ${mediaBreakpointDesktop(`
      box-sizing: border-box;
      min-width: 476px;
  `)}
`;

const StyledLink = styled(Link)`
  display: none;
  ${mediaBreakpointTablet(`
     display: flex;
  `)}
`;
const Quote = styled.blockquote`
  display: none;
  font-weight: 400;
  font-size: 44px;
  letter-spacing: 0.3px;
  ${mediaBreakpointLandscapeTablet(`
      display: block;
      margin-top: 110px;
      margin-left: 0;
      max-width: 760px;
  `)}
`;
const QuoteFooter = styled.footer`
  font-size: ${$fontSizeH2}px;
  margin-top: ${$paddingMedium}px;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: ${$paddingXsmall}px;
  ${mediaBreakpointTablet(`
      padding: ${$paddingMedium}px;
  `)}
  ${mediaBreakpointDesktop(`
      padding: ${$paddingLarge}px ${$paddingLarge}px ${$paddingBig}px;
  `)}
`;

const FooterContainer = styled(Center)`
  justify-content: space-between;
  font-size: ${$fontSizeCommon}px;
  background-color: ${$secondaryBackgroundColor};
  border-radius: 0 0 ${$borderRadius}px ${$borderRadius}px;
  padding: ${$paddingXsmall}px;
  ${mediaBreakpointTablet(`
      padding: ${$paddingXsmall}px ${$paddingMedium}px;
  `)}
  ${mediaBreakpointDesktop(`
      padding: ${$paddingMedium}px ${$paddingLarge}px;
  `)}
`;

const _AuthLayout: NextPage<Props> = ({
  quoteNo,
  children,
  titleKey,
  Footer,
  footerAuthRoute
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <Container>
      <Left>
        <StyledLink to={linkCreator(HOME_ROUTE)}>
          <Center>
            <RowItem size={"small"}>
              <GvLogo />
            </RowItem>
            <RowItem size={"small"}>
              <GvBrand />
            </RowItem>
          </Center>
        </StyledLink>
        <Quote>
          {t(`auth:auth-quotes.${quoteNo}.quote`)}
          <QuoteFooter>
            — <cite>{t(`auth:auth-quotes.${quoteNo}.author`)}</cite>
          </QuoteFooter>
        </Quote>
      </Left>
      <Right>
        <Content>
          {titleKey && <h1>{t(titleKey)}</h1>}
          <Row size={"large"} onlyOffset>
            {children}
          </Row>
        </Content>
        {Footer && (
          <FooterContainer>
            <Footer ROUTE={footerAuthRoute} />
          </FooterContainer>
        )}
      </Right>
    </Container>
  );
};

const AuthLayout = React.memo(_AuthLayout);
export default AuthLayout;
