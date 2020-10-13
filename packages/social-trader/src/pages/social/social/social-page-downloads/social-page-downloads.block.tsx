import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import Link from "components/link/link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { AndroidIcon } from "pages/landing-page/components/app-icons/android-icon";
import { AppleIcon } from "pages/landing-page/components/app-icons/apple-icon";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $separatorColor } from "utils/style/colors";

const Item = styled(DefaultBlock)`
  background: rgba(255, 255, 255, 0.04);
`;

const IconContainer = styled(Center)`
  width: 30px;
  height: 30px;
  svg {
    height: 100%;
    width: 100%;
    fill: white;
    stroke: ${$separatorColor};
  }
`;

const _SocialPageDownloadsBlock: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <Text wrap={false}>
          <h3>{t("Genesis Vision App")}</h3>
        </Text>
      </Row>
      <Row size={"large"} onlyOffset>
        <Row wide size={"small"}>
          <Link
            wide
            white
            to={{
              pathname:
                "https://itunes.apple.com/app/genesis-vision-investor/id1369865290"
            }}
          >
            <Item>
              <Center>
                <RowItem>
                  <IconContainer>
                    <AppleIcon />
                  </IconContainer>
                </RowItem>
                <RowItem size={"small"}>
                  <Row size={"small"}>
                    <Text muted>Available on</Text>
                  </Row>
                  <Row size={"small"}>App Store</Row>
                </RowItem>
              </Center>
            </Item>
          </Link>
        </Row>
        <Row wide size={"small"}>
          <Link
            wide
            white
            to={{
              pathname:
                "https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor"
            }}
          >
            <Item>
              <Center>
                <RowItem>
                  <IconContainer>
                    <AndroidIcon />
                  </IconContainer>
                </RowItem>
                <RowItem size={"small"}>
                  <Row size={"small"}>
                    <Text muted>Get it on</Text>
                  </Row>
                  <Row size={"small"}>Google Play</Row>
                </RowItem>
              </Center>
            </Item>
          </Link>
        </Row>
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageDownloadsBlock = React.memo(_SocialPageDownloadsBlock);
