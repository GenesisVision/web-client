import { CurrencyItem } from "components/currency-item/currency-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import TradingViewWidget, {
  Themes
} from "components/trading-view/trading-view";
import { withBlurLoader } from "decorators/with-blur-loader";
import { AssetInfo } from "gv-api-web";
import { useNetworkStatusInWindow } from "hooks/network-status";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $primaryColor } from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";

import SocialLinksBlock from "../social-links-block/social-links-block";
import TagItemList from "../tags/tag-item/tag-item-list";

interface Props {
  data: AssetInfo;
}

const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 600;
  color: ${$primaryColor};
  ${fontSize($fontSizeParagraph)};
`;

const ChartContainer = styled(Row)`
  height: 300px;
`;

const Description = styled(Row)`
  font-size: ${$fontSizeParagraph}px;
  line-height: 1.8;
`;

const _Active: React.FC<Props> = ({
  data: { name, description, tags, chartSymbol, logoUrl, socialLinks, symbol }
}) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [isServer, setIsServer] = useState(true);
  const [t] = useTranslation();
  useEffect(() => {
    setIsServer(false);
  }, []);
  const isGoodNetwork = effectiveConnectionType === "4g";

  return (
    <div>
      <Row size={"large"}>
        <CurrencyItem logo={logoUrl} name={name} clickable={false} big />
      </Row>
      <Row size={"large"}>{tags && <TagItemList tags={tags} />}</Row>
      <Row size={"large"} onlyOffset>
        <Row>
          <Title>{t("active.chart")}</Title>
        </Row>
        <ChartContainer>
          {!isServer && isGoodNetwork && (
            <TradingViewWidget
              symbol={chartSymbol}
              autosize
              theme={Themes.DARK}
            />
          )}
        </ChartContainer>
        <Row>
          <Text>
            <a
              rel="noopener"
              target="_blank"
              title={"TradingView"}
              href={`https://www.tradingview.com/symbols/${chartSymbol}/`}
            >
              {name} Chart
            </a>{" "}
            by TradingView
          </Text>
        </Row>
      </Row>
      <Row size={"large"} onlyOffset>
        <Row>
          <Title>
            {t("active.about")} {name}
          </Title>
        </Row>
        <Description>{description}</Description>
      </Row>
      <Row size={"large"}>
        {socialLinks && <SocialLinksBlock socialLinks={socialLinks} />}
      </Row>
    </div>
  );
};

const Active = withBlurLoader(React.memo(_Active));
export default Active;
