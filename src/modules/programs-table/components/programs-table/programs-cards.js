import React, { Fragment } from "react";

const ProgramsCards = ({ items, children }) => {
  const renderItems = () => {
    if (items === undefined)
      return <div className="programs-cards">Loading...</div>;
    if (items.length === 0)
      return <div className="programs-cards">There are no items.</div>;
    return items.map(program => (
      <Fragment key={program.id}>{children(program)}</Fragment>
    ));
  };

  return <div className="programs-cards">{renderItems()}</div>;
};
export default ProgramsCards;
