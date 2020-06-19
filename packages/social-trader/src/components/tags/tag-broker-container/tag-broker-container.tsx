import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Tooltip from "components/tooltip/tooltip";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { Tag } from "gv-api-web";
import * as React from "react";

import TagItem from "../tag-item/tag-item";
import TagItemTooltip from "../tag-item/tag-item-tooltip";
import styles from "./tag-broker-container.module.scss";

const MAX_VISIBLE_TAGS = 1;

const _TagBrokerContainer: React.FC<Props & WithLoaderProps> = ({
  tags,
  className
}) => {
  const length = tags.length;
  const remainder = length > MAX_VISIBLE_TAGS ? `${length - 1}` : null;
  return (
    <Row className={className}>
      {tags.map(
        (tag, idx) =>
          ((remainder && idx === 0) || !remainder) && (
            <RowItem small>
              <TagItem name={tag.name} color={tag.color} key={idx} />
            </RowItem>
          )
      )}
      {remainder && (
        <RowItem>
          <Tooltip
            render={() => (
              <TagItemTooltip
                tags={tags}
                className={styles["tag-broker-container__tooltip"]}
              />
            )}
          >
            <div className={styles["tag-broker-container__others"]}>...</div>
          </Tooltip>
        </RowItem>
      )}
    </Row>
  );
};

interface Props {
  tags: Tag[];
  className?: string;
}

const TagBrokerContainer = React.memo(withLoader(_TagBrokerContainer));

export default TagBrokerContainer;
