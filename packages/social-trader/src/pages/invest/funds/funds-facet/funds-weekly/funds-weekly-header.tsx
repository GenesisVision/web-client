import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { height } from "utils/style/mixins";

import image from "./media/background.svg";

const Container = styled.div`
  ${height(350)};
  width: 100%;
  background-image: url(${image});
  background-position-x: 50%;
  background-position-y: center;
  background-size: initial;
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const FundsWeeklyHeader: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Container>
      <h1>{t("asset-list:facets.texts.challenge-title")}</h1>
      <a href="https://blog.genesis.vision/gv-funds-weekly-challenge-58e23edc876b">
        {t("asset-list:facets.texts.challenge-sub-title")}
      </a>
    </Container>
  );
};
