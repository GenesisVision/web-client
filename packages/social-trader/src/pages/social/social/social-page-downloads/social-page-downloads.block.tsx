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

import styles from "./social-page-downloads.module.scss";

interface Props {}

const _SocialPageDownloadsBlock: React.FC<Props> = () => {
  const [t] = useTranslation();
  return (
    <DefaultBlock wide solid>
      <Row>
        <h3 className={styles["social-page-downloads__title"]}>
          {t("Genesis Vision App")}
        </h3>
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
            <DefaultBlock className={styles["social-page-downloads__item"]}>
              <Center>
                <RowItem>
                  <Center className={styles["social-page-downloads__icon"]}>
                    <AppleIcon />
                  </Center>
                </RowItem>
                <RowItem size={"small"}>
                  <Row size={"small"}>
                    <Text muted>Available on</Text>
                  </Row>
                  <Row size={"small"}>App Store</Row>
                </RowItem>
              </Center>
            </DefaultBlock>
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
            <DefaultBlock className={styles["social-page-downloads__item"]}>
              <Center>
                <RowItem>
                  <Center className={styles["social-page-downloads__icon"]}>
                    <AndroidIcon />
                  </Center>
                </RowItem>
                <RowItem size={"small"}>
                  <Row size={"small"}>
                    <Text muted>Get it on</Text>
                  </Row>
                  <Row size={"small"}>Google Play</Row>
                </RowItem>
              </Center>
            </DefaultBlock>
          </Link>
        </Row>
      </Row>
    </DefaultBlock>
  );
};

export const SocialPageDownloadsBlock = React.memo(_SocialPageDownloadsBlock);
