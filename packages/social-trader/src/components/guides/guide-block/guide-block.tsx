import DetailsBlock from "components/details/details-block";
import GuideBlockLink from "components/guides/guide-block/guide-block-link";
import GVButton from "components/gv-button";
import { Guide } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import styles from "./guide-block.module.scss";

interface Props {
  guide: Guide;
  prevGuideName?: string;
  nextGuideName?: string;
  onClickPass: (id: string) => void;
  errorMessage?: string;
}

const _GuideBlock: React.FC<Props> = ({
  guide,
  nextGuideName,
  prevGuideName,
  onClickPass,
  errorMessage
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const handlePass = useCallback(() => {
    if (guide.isPassed || isSubmitted) return null;
    onClickPass(guide.id);
    setIsSubmitted(true);
  }, [guide, isSubmitted]);
  useEffect(() => {
    setIsSuccessful(guide.isPassed || (!errorMessage && isSubmitted));
  }, [guide, errorMessage, isSubmitted]);
  useEffect(() => {
    setIsSubmitted(false);
  }, [guide]);
  const [t] = useTranslation();
  return (
    <DetailsBlock className={styles["guide-block"]}>
      <h3 className={styles["guide-block__subtitle"]}>{guide.name}</h3>
      <div className={styles["guide-block__content"]}>{guide.content}</div>
      <div className={styles["guide-block__controls"]}>
        {prevGuideName && (
          <GuideBlockLink guideCanonicalName={prevGuideName}>
            {t("guides:controls.back")}
          </GuideBlockLink>
        )}
        {isAuthenticated && (
          <GVButton
            className={styles["guide-block__button"]}
            onClick={handlePass}
            isSuccessful={isSuccessful}
            disabled={isSuccessful}
          >
            {t("guides:controls.done")}
          </GVButton>
        )}
        {nextGuideName && (
          <GuideBlockLink guideCanonicalName={nextGuideName} isNext>
            {t("guides:controls.next")}
          </GuideBlockLink>
        )}
      </div>
    </DetailsBlock>
  );
};

const GuideBlock = React.memo(_GuideBlock);
export default GuideBlock;
