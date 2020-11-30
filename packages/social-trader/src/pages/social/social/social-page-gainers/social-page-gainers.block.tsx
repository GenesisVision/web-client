import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { Separator } from "components/separator/separator";
import { SocialPostPlatformAsset } from "gv-api-web";
import { SocialPageGainersItem } from "pages/social/social/social-page-gainers/social-page-gainers-item";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $paddingXxsmall } from "utils/style/sizes";

interface Props {
  assets: SocialPostPlatformAsset[];
}

const Container = styled(Row)`
  white-space: nowrap;
  height: 380px;
  overflow: scroll;
  padding-right: ${$paddingXxsmall}px;
`;

const _SocialPageGainersBlock: React.FC<Props> = ({ assets }) => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h3>{t("Trending assets")}</h3>
      </Row>
      <Container size={"large"} onlyOffset>
        {assets.map(({ logoUrl, asset, price, change24Percent }, index) => (
          <>
            <Row>
              <SocialPageGainersItem
                logoUrl={logoUrl}
                title={asset}
                price={price}
                change={change24Percent}
              />
            </Row>
            {index !== assets.length - 1 && (
              <Row>
                <Separator />
              </Row>
            )}
          </>
        ))}
      </Container>
    </DefaultBlock>
  );
};

export const SocialPageGainersBlock = React.memo(_SocialPageGainersBlock);
