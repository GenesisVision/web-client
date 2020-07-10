import clsx from "clsx";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { UserDetailsList } from "gv-api-web";
import React from "react";

import styles from "./rating.module.scss";

type RatingValueType = string | number | JSX.Element;

export interface IRatingBlockOuterProps {
  renderValue: (value: RatingValueType) => JSX.Element;
}

interface IPropsRatingBlockRow extends UserDetailsList, IRatingBlockOuterProps {
  winner?: boolean;
  number: number;
  value: RatingValueType;
}

const _RatingBlockRow: React.FC<IPropsRatingBlockRow> = ({
  renderValue,
  number,
  value,
  winner,
  logoUrl,
  username
}) => {
  const renderedValue = renderValue(value);
  return (
    <Row>
      <RowItem>
        {winner ? (
          <h1 className={styles["rating__winner"]}>{number}</h1>
        ) : (
          <>{number}</>
        )}
      </RowItem>
      <RowItem>
        <AvatarWithName
          avatar={
            <ProfileAvatar
              className={clsx({
                [styles["rating__winner-avatar"]]: winner
              })}
              big={winner}
              middle={!winner}
              url={logoUrl}
              alt={username}
            />
          }
          name={
            <Center className={clsx({ [styles["rating__winner"]]: winner })}>
              <RowItem>
                <b>{username}</b>
              </RowItem>
              <RowItem>
                {winner ? <h2>{renderedValue}</h2> : <h3>{renderedValue}</h3>}
              </RowItem>
            </Center>
          }
        />
      </RowItem>
    </Row>
  );
};

const RatingBlockRow = React.memo(_RatingBlockRow);

interface IPropsRatingBlock extends IRatingBlockOuterProps {
  valueField: keyof UserDetailsList;
  title: string;
  items: UserDetailsList[];
}

const _RatingBlock: React.FC<IPropsRatingBlock> = ({
  renderValue,
  title,
  items,
  valueField
}) => {
  const winner = items[0];
  const other = items.slice(1);
  return (
    <DefaultBlock solid>
      <Row>
        <h2>{title}</h2>
      </Row>
      <RatingBlockRow
        renderValue={renderValue}
        number={1}
        value={String(winner[valueField])}
        winner
        {...winner}
      />
      <Row onlyOffset>
        {other.map((user, index) => (
          <RatingBlockRow
            renderValue={renderValue}
            number={index + 2}
            value={String(user[valueField])}
            {...user}
          />
        ))}
      </Row>
    </DefaultBlock>
  );
};

export const RatingBlock = React.memo(_RatingBlock);
