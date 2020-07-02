import classNames from "classnames";
import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import React, { useCallback, useState } from "react";

import styles from "./accordion.module.scss";

interface Props {
  label: string | JSX.Element;
  text: string | JSX.Element;
}

export const Accordion: React.FC<Props> = ({ label, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickLabel = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const handleClickText = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <DefaultBlock
      wide
      size={"small"}
      className={classNames(styles["accordion"])}
    >
      <Row onClick={handleClickLabel} className={styles["accordion__label"]}>
        <RowItem size={"small"}>
          <Center
            className={classNames(styles["accordion__icon"], {
              [styles["accordion__icon--open"]]: isOpen
            })}
          >
            <FilterArrowIcon isOpen={isOpen} />
          </Center>
        </RowItem>
        <RowItem>{label}</RowItem>
      </Row>
      {isOpen && (
        <Row size={"small"} onClick={handleClickText}>
          {text}
        </Row>
      )}
    </DefaultBlock>
  );
};
