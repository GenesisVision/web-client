import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import Link from "components/link/link";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
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
        <h2 className={styles["social-page-downloads__title"]}>
          {t("Genesis Vision App")}
        </h2>
      </Row>
      <Row large onlyOffset>
        <Row wide small>
          <Link
            wide
            white
            to={
              "https://itunes.apple.com/app/genesis-vision-investor/id1369865290"
            }
          >
            <DefaultBlock className={styles["social-page-downloads__item"]}>
              <Center>
                <RowItem>
                  <Center className={styles["social-page-downloads__icon"]}>
                    <AppleIcon />
                  </Center>
                </RowItem>
                <RowItem small>
                  <Row small>
                    <MutedText>Available on the</MutedText>
                  </Row>
                  <Row small>App Store</Row>
                </RowItem>
              </Center>
            </DefaultBlock>
          </Link>
        </Row>
        <Row wide small>
          <Link
            wide
            white
            to={
              "https://play.google.com/store/apps/details?id=vision.genesis.clientapp.investor"
            }
          >
            <DefaultBlock className={styles["social-page-downloads__item"]}>
              <Center>
                <RowItem>
                  <Center className={styles["social-page-downloads__icon"]}>
                    <AndroidIcon />
                  </Center>
                </RowItem>
                <RowItem small>
                  <Row small>
                    <MutedText>Get it on</MutedText>
                  </Row>
                  <Row small>Google Play</Row>
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
