import { UserDetailsList, UsersFilterSorting } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { IRatingBlockOuterProps, RatingBlock } from "pages/rating/rating.block";
import { getUsersRating } from "pages/rating/rating.service";
import React from "react";

interface Props extends IRatingBlockOuterProps {
  sorting: UsersFilterSorting;
  title: string;
  valueField: keyof UserDetailsList;
}

export const RatingBlockContainer: React.FC<Props> = ({
  renderValue,
  sorting,
  title,
  valueField
}) => {
  const { data } = useApiRequest<UserDetailsList[]>({
    name: "getUsersRating",
    cache: true,
    request: getUsersRating,
    fetchOnMount: true,
    fetchOnMountData: { sorting }
  });
  if (!data) return null;
  return (
    <RatingBlock
      renderValue={renderValue}
      title={title}
      items={data}
      valueField={valueField}
    />
  );
};
