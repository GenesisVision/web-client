import { ChartIcon } from "shared/components/icon/chart-icon";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

const TableBody = ({
  t,
  items,
  children,
  tag: Tag,
  className,
  createButtonBody,
  createText
}) => {
  const createAsset = (createButtonBody, createText) => {
    return (
      <div className="create-asset">
        <div className="create-asset__create-icon">
          <ChartIcon />
        </div>
        <div className="create-asset__text">{createText}</div>
        <div className="create-asset__button">{createButtonBody}</div>
      </div>
    );
  };

  const setMessage = message => {
    return Tag === "tbody" ? (
      <tr>
        <td colSpan="11">
          {(createButtonBody &&
            message !== t("table.loading") &&
            createAsset(createButtonBody, createText)) || (
            <div className="message">{message}</div>
          )}
        </td>
      </tr>
    ) : (
      (createButtonBody &&
        message !== t("table.loading") &&
        createAsset(createButtonBody, createText)) || (
        <div className="message">{message}</div>
      )
    );
  };

  const renderItems = () => {
    if (items === null || items === undefined)
      return setMessage(t("table.loading"));
    if (items.length === 0) return setMessage(t("table.no-items"));
    return items.map((x, idx) => (
      <Fragment key={x.id || idx}>{children(x)}</Fragment>
    ));
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default translate()(TableBody);
